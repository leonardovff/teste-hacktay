import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RealEstateController } from './real-estate.controller';
import { RealEstateService } from './real-estate.service';
import { UserDemand } from './user-demand.entity';


@Module({
  imports: [
    ElasticsearchModule.register({
      node: `http://${process.env.ELASTIC_HOST || 'localhost'}:${process.env.ELASTIC_PORT || '9200'}`,
    }),
    TypeOrmModule.forFeature([UserDemand])
  ],
  controllers: [RealEstateController],
  providers: [RealEstateService],
})
export class RealEstateModule {}
