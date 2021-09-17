import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

import { Message, RealEstateData } from '@imovel-ideal/api-interfaces';

import { RealEstateService } from './real-estate.service';
// import * as uuid from 'uuid';
// console.log(uuid.v4());

@Controller('real-estate')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) {}

  @Get('search/:userToken')
  async getData(@Param('userToken') userToken: string): Promise<RealEstateData> {
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
      maxValue: userDemand.demandMaxValue
    });
  }
}
