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

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
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
  

  async bulkData(): Promise<string> {
    const imoveis = (await this.dImovelRepository.find()).splice(0, 1000);
    imoveis.forEach(async imovel => {

      if(!imovel.numero){
        return false;
      }
      const atributosBase = await this.bImovelRepository
      .find({
        where: {
          d_imovel_cod_imovel: imovel.cod_imovel,
        },
      });
      const arraysCaractsCode = atributosBase ? atributosBase.map(caract => caract.d_caract_cod_caract) : [];
      
      const caracts = await this.manager.createQueryBuilder(DCaract, "d_caract")
      .where("d_caract.cod_caract IN (:authors)", { authors: arraysCaractsCode })
      .getMany();

      const caractsTratados = caracts ? caracts.map(caract => {
        return {
          type: caract.chave,
          name: caract.descricao,
          value: caract.valor
        }
      }) : [];
      const priceRent = imovel.para_alugar == 1 ? randomIntFromInterval(1000, 3000) : null
      const photos = await this.photosRepository.find({
        where: {
          d_imovel_cod_imovel: imovel.cod_imovel,
        },
      });
      const photosTratadas = photos ? photos.splice(0, 8).map(photo => photo.url) : []; 
      await this.elasticsearchService.index({
        index: 'imovel-ideal',
        id: imovel.cod_imovel.toString(), 
        type: 'real-estate', // uncomment this line if you are using Elasticsearch ≤ 6
        body: {
          description: imovel.descricao_resumida.substring(0, 400),
          sourcePortal: 'www.lopes.com.br',
          priceSale: imovel.preco_venda_atual,
          priceRent: priceRent,
          totalPriceRent: priceRent ? priceRent + imovel.preco_condominio_atual : null,
          iptuValue: imovel.preco_iptu_atual,
          condominiumValue: imovel.preco_condominio_atual,
          isToRent: imovel.para_alugar,
          isToSell: imovel.para_vender,
          productType: imovel.tipo_imovel,
          state: imovel.estado,
          city: imovel.cidade,
          neighborhood: imovel.bairro,
          street: imovel.rua,
          number: imovel.numero,
          photos: photosTratadas,
          attributes: caractsTratados
        }
      })
    
    });
    return 'foi';
  }

  async getData(userDemand,page,itensPerPage): Promise<RealEstateDataResponse> {
    const query = {
      bool: {
        must: []
      }
      
    };

    if(userDemand.state){
      query.bool.must.push({
        match: { state: userDemand.state}
      });
    }
    
    if(userDemand.city){
      query.bool.must.push({
        match: { city: userDemand.city}
      });
    }

    if(userDemand.neighborhood){
      query.bool.must.push({
        match: { neighborhood: userDemand.neighborhood}
      });
    }
    const isToRent = userDemand.transationType && userDemand.transationType == 'rent';
    const isToSell = userDemand.transationType && userDemand.transationType == 'sale';
    if(isToRent || isToSell){
      query.bool.must.push({
        term: isToRent ? { isToRent: 1} :  { isToSell: 1}
      });
    }

    if(userDemand.maxValue){
      query.bool.must.push({
        range: isToSell ? 
          { priceSale: { lte:  userDemand.maxValue }} : { totalPriceRent: { lte:  userDemand.maxValue }}
      });
    }
    
    const data = await this.elasticsearchService.search({
      index: 'imovel-ideal',
      type: 'real-estate',
    
      body: {
        query,
      },
      
      from: itensPerPage * page,
      size: itensPerPage
    });
    
    return {
       metadata: {
        currentPage:parseInt(page),
        totalPages: Math.ceil(data.body.hits.total.value / itensPerPage) ,
        itensPerPage: parseInt(itensPerPage),
        totalItens: data.body.hits.total.value
      },
      data: data.body.hits.hits.map(data => data._source), 
    };
  }

  getToken(userToken): Promise<UserDemand> {
    return this.userDemandRepository.findOne({
      where: {
        userToken,
      },
    });
  }
  
}
