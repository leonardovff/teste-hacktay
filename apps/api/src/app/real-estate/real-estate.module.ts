import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BImovelCarac } from './datawarehouse/b_imovel_carac';
import { DImovel } from './datawarehouse/d-imovel.';
import { DCaract } from './datawarehouse/d_caract';
import { SnapshotImovelFotos } from './datawarehouse/snapshot_imovel_fotos';
import { RealEstateController } from './real-estate.controller';
import { RealEstateService } from './real-estate.service';
import { UserDemand } from './user-demand.entity';


@Module({
  imports: [
    ElasticsearchModule.register({
      node: ``,
    }),
    TypeOrmModule.forFeature([UserDemand, DImovel, SnapshotImovelFotos, DCaract, BImovelCarac ])
  ],
  controllers: [RealEstateController],
  providers: [RealEstateService],
})
export class RealEstateModule {}
