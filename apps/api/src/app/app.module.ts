import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RealEstateController } from './real-estate/real-estate.controller';
import { RealEstateService } from './real-estate/real-estate.service';

@Module({
  imports: [ElasticsearchModule.register({
    node: 'http://localhost:9200',
  })],
  controllers: [AppController, RealEstateController],
  providers: [AppService, RealEstateService],
})
export class AppModule {}
