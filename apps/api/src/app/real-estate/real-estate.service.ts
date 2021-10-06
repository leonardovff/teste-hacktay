import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { RealEstateDataResponse } from '@imovel-ideal/api-interfaces';

import { UserDemand } from './user-demand.entity';
import { DImovel } from './datawarehouse/d-imovel.';
import { SnapshotImovelFotos } from './datawarehouse/snapshot_imovel_fotos';
import { BImovelCarac } from './datawarehouse/b_imovel_carac';
import { DCaract } from './datawarehouse/d_caract';
import * as sm from 'sequencematcher';
import * as difflib from 'difflib';

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function cosinesim(A,B){
  let dotproduct=0;
  let mA=0;
  let mB=0;
  for(let i = 0; i < A.length; i++){ // here you missed the i++
      dotproduct += (A[i] * B[i]);
      mA += (A[i]*A[i]);
      mB += (B[i]*B[i]);
  }
  mA = Math.sqrt(mA);
  mB = Math.sqrt(mB);
  const similarity = (dotproduct)/((mA)*(mB)) // here you needed extra brackets
  return similarity;
}

@Injectable()
export class RealEstateService {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    @InjectRepository(UserDemand)
    private userDemandRepository: Repository<UserDemand>,
    @InjectRepository(DImovel)
    private dImovelRepository: Repository<DImovel>,
    @InjectRepository(SnapshotImovelFotos)
    private photosRepository: Repository<SnapshotImovelFotos>,
    @InjectRepository(BImovelCarac)
    private bImovelRepository: Repository<BImovelCarac>,
    @InjectRepository(DCaract)
    private dCractRepository: Repository<DCaract>,
    private manager: EntityManager
  ) {
  }
  hashTipoImovel = {};
  hashTipoImoveLQtd = 1;
 
  private tratarImovel(imovel) {
    // const tipoImovel = this.getValueHash(
    //   'hashTipoImovel',
    //   'hashTipoImovelQtd',      
    //   imovel.product.type,
    // )
    const typology = imovel.product_detail.detail.typology;
    // tem duas areas - living e total
    if(!typology){
      return [0, 0, 0, 0, 0, 0, 0]
    }

    const location = imovel.product_detail.real_estate_detail && imovel.product_detail.real_estate_detail.geometry 
      && imovel.product_detail.real_estate_detail.geometry.location ? imovel.product_detail.real_estate_detail.geometry.location : {lat: 0, lon:  0}; 
      
    const areaTemp = typology.areas.find(area => area.type == "total_area");
    const area = areaTemp ? areaTemp.value : 0;
    const arraySku1 = [
      area, 
      typeof typology.bedroom_qty == "undefined" ? 0 : typology.bedroom_qty,
      typeof typology.suite_qty == "undefined" ? 0 : typology.suite_qty,
      typeof typology.bathroom_qty == "undefined" ? 0 : typology.bathroom_qty,
      typeof typology.parking_spot_qty == "undefined" ? 0 : typology.parking_spot_qty,
      typeof typology.total_parking_qty == "undefined" ? 0 : typology.total_parking_qty,
      typeof typology.total_bathroom_qty == "undefined" ? 0 : typology.total_bathroom_qty,
      location.lat,
      location.lon
    ]
    return arraySku1;
  } 
  getValueHash(hash, qtd, value){
    if(!this[hash][value]){
      this[hash][value] = this[qtd]; 
      this[qtd]++;
    } 
    return this[hash][value];
  } 
  async getData(sku: string): Promise<any> {
    const dataSku1Temp = await this.elasticsearchService.search({
      index: 'products_v12',
      body: {
        query: {
          "bool": {
            "must": [{ "match": { "product.sku": sku } }],
          }
        }
      }
    });
    const skuParaAcharDuplicado =  dataSku1Temp.body.hits.hits[0]._source;
    const arraySku1 = this.tratarImovel( 
      skuParaAcharDuplicado
    );
    const addressSku1 = skuParaAcharDuplicado['product_detail'].real_estate_detail.address;
    const bairroSku1 = addressSku1.find(address => address.type=="neighborhood").name;
    const citySku1 = addressSku1.find(address => address.type=="city").name;
    const must = [
      {
        nested: {
          path: "product_detail.real_estate_detail.address",
          query: {
            bool: {
                must: [
                { term: {"product_detail.real_estate_detail.address.name.keyword": bairroSku1} },
                { term: {"product_detail.real_estate_detail.address.type.keyword": "neighborhood"} }
              ]
            }
          }
        }
      },
      {
        nested: {
          path: "product_detail.real_estate_detail.address",
          query: {
            bool: {
              must: [
                { term: {"product_detail.real_estate_detail.address.name.keyword": citySku1} },
                { term: {"product_detail.real_estate_detail.address.type.keyword": "city"} }
              ]
            }
          }
        }
      }
    ]
    const dataOthers = await this.elasticsearchService.search({
      index: 'products_v12',
      body: {
        query: {
          bool: {
            must,
            filter: [{ term: { "product.type": "real_estate"   }}]
          }
        }
      },
      from: 0,
      size: 10000
    });
   
    const dadosDepois = dataOthers.body?.hits?.hits
      .map(imovelParaComparar => {
        const imovelParaCompararData = imovelParaComparar._source;
        const arraySku2 = this.tratarImovel( 
          imovelParaCompararData
        );

        const imovelParaCompararDataDescription = imovelParaCompararData.product_detail.real_estate_detail && 
          imovelParaCompararData.product_detail.real_estate_detail.description ? imovelParaCompararData.product_detail.real_estate_detail.description : ''; 
    
        const skuParaAcharDuplicadoDescription = skuParaAcharDuplicado.product_detail.real_estate_detail && 
        skuParaAcharDuplicado.product_detail.real_estate_detail.description ? skuParaAcharDuplicado.product_detail.real_estate_detail.description : ''; 

        const similaridadeDescricao = new difflib
        .SequenceMatcher(null, imovelParaCompararDataDescription, skuParaAcharDuplicadoDescription)
        .ratio();
        const isDescricaoSemelhante = similaridadeDescricao > 0.8;
        const similaridade = isDescricaoSemelhante ? 
          cosinesim([...arraySku2, 0], [...arraySku1, 0]) :  
          cosinesim([...arraySku2, 0], [...arraySku1, 100]);
        if(imovelParaCompararData.product.sku == "REO447971"){
            console.log(isDescricaoSemelhante);
            // console.log('sku1:',arraySku1);
            // console.log('sku2:', arraySku2);
            // console.log("similaridade:", similaridade);
        }
        return {
          ...imovelParaCompararData,
          similaridade
        }
      })
      // .filter(a => a.similaridade == 1)
      .sort((a,b) => b.similaridade - a.similaridade)
      .splice(0, 300)
      .map(a => ({similaridade: a.similaridade, sku: a.product.sku}));
    return dadosDepois;
  }

  getToken(userToken): Promise<UserDemand> {
    return this.userDemandRepository.findOne({
      where: {
        userToken,
      },
    });
  }
  
}
