import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';

import { RealEstateDataResponse } from '@imovel-ideal/api-interfaces';

import { RealEstateService } from './real-estate.service';
// import * as uuid from 'uuid';
// console.log(uuid.v4());

@Controller('real-estate')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) { }

  @Get('get-duplicado')
  async getDuplicado(
    @Query('cidade') cidade: string,
    @Query('bairro') bairro: string,
    @Query('descricao') descricao: string,
    @Query('areaTotal') areaTotal: string,
    @Query('areaUtil') areaUtil: string,
    @Query('valor') valor: string,
    @Query('bedroom_qty') bedroom_qty: string,
    @Query('suite_qty') suite_qty: string,
    @Query('bathroom_qty') bathroom_qty: string,
    @Query('parking_spot_qty') parking_spot_qty: string,
    @Query('total_parking_qty') total_parking_qty: string,
    @Query('total_bathroom_qty') total_bathroom_qty: string,
    @Query('lat') lat: string,
    @Query('lon') lon: string,
  ): Promise<any> {
    console.log('entrou');
    // if(!userDemand) {
    //   throw new NotFoundException('Token not found');
    // }
    try {
      return await this.realEstateService.getByFields({
        cidade,
        bairro,
        descricao,
        areaTotal,
        areaUtil,
        valor,
        bedroom_qty,
        suite_qty,
        bathroom_qty,
        parking_spot_qty,
        total_parking_qty,
        total_bathroom_qty,
        lat,
        lon
      });
    } catch (e) {
      console.log(e);
    }

    return null;
  }

  @Get('search/:sku/')
  async getData(
    @Param('sku') sku: string,
  ): Promise<any> {
    console.log('entrou');
    // if(!userDemand) {
    //   throw new NotFoundException('Token not found');
    // }
    try {
      return await this.realEstateService.getData(sku);
    } catch (e) {
      console.log(e);
    }

    return null;
  }

  // @Get('bulk')
  // async teste(): Promise<string>{
  //   return this.realEstateService.bulkData();
  // }
}
