import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';

import { RealEstateDataResponse } from '@imovel-ideal/api-interfaces';

import { RealEstateService } from './real-estate.service';
// import * as uuid from 'uuid';
// console.log(uuid.v4());

@Controller('real-estate')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) {}

  @Get('search/:userToken/')
  async getData(
    @Param('userToken') userToken: string,
    @Query('page') page: number,
    @Query('itensPerPage') itensPerPage = 20
  ): Promise<RealEstateDataResponse> {
    const userDemand = await this.realEstateService.getToken(userToken);
    if(!userDemand) {
      throw new NotFoundException('Token not found');
    }

    return this.realEstateService.getData({
      state: userDemand.demandState,
      city: userDemand.demandCity,
      neighborhood: userDemand.demandNeighborhood,
      transationType: userDemand.demandType,
      productType: userDemand.demandPoductType,
      maxValue: userDemand.demandMaxValue,
    }, page, itensPerPage );  
  }

  @Get('bulk')
  async teste(): Promise<string>{
    return this.realEstateService.bulkData();
  }
}
