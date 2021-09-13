import { Controller, Get } from '@nestjs/common';

import { Message } from '@imovel-ideal/api-interfaces';

import { RealEstateService } from './real-estate.service';

@Controller('real-estate')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) {}

  @Get('search')
  async getData(): Promise<Message> {
    return this.realEstateService.getData();
  }
}
