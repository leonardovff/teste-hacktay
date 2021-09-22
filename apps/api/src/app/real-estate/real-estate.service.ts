import { Injectable } from '@nestjs/common';
import { RealEstateData, RealEstateDataResponse } from '@imovel-ideal/api-interfaces';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { UserDemand } from './user-demand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Check, DataTypeNotSupportedError, Index, MetadataWithSuchNameAlreadyExistsError, Repository } from 'typeorm';
import { format } from 'path';
import { totalmem } from 'os';
import { __asyncValues, __param, __values } from 'tslib';
import { count, identity } from 'rxjs';
import { truncate } from 'fs';
import { RequestParams } from '@elastic/elasticsearch';
import { Console } from 'console';

@Injectable()
export class RealEstateService {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    @InjectRepository(UserDemand)
    private userDemandRepository: Repository<UserDemand>,
  ) {
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
    console.log(data.body.hits.total.value);
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
    console.log(userToken)
    return this.userDemandRepository.findOne({
      where: {
        userToken,
      },
    });
  }
  
}
