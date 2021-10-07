import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';

import { RealEstateDataResponse } from '@imovel-ideal/api-interfaces';

import { RealEstateService } from './real-estate.service';
// import * as uuid from 'uuid';
// console.log(uuid.v4());

@Controller('real-estate')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) {}

  @Get('search/:sku/')
  async getData(
    @Param('sku') sku: string,
  ): Promise<any> {
    console.log('entrou');
    // if(!userDemand) {
    //   throw new NotFoundException('Token not found');
    // }
    try{
      return await this.realEstateService.getData(sku)
    } catch(e ) {
      console.log(e);
    }

    return null;
  }

  // @Get('bulk')
  // async teste(): Promise<string>{
  //   return this.realEstateService.bulkData();
  // }
}
