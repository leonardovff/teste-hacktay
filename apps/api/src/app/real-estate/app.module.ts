import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { RealEstateController } from './real-estate.controller';
import { RealEstateService } from './real-estate.service';


@Module({
  imports: [ElasticsearchModule.register({
    node: 'http://localhost:9200',
  })],
  controllers: [RealEstateController],
  providers: [RealEstateService],
})
export class RealEstateModule {}
