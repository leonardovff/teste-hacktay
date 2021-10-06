import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BImovelCarac } from './real-estate/datawarehouse/b_imovel_carac';
import { DImovel } from './real-estate/datawarehouse/d-imovel.';
import { DCaract } from './real-estate/datawarehouse/d_caract';
import { SnapshotImovelFotos } from './real-estate/datawarehouse/snapshot_imovel_fotos';
import { RealEstateModule } from './real-estate/real-estate.module';
import { UserDemand } from './real-estate/user-demand.entity';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: ``,
    }), 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MARIADB_HOST || 'localhost',
      port: parseInt(process.env.MARIADB_PORT) || 3306,
      username: process.env.MARIADB_USER || 'imovelideal',
      password: process.env.MARIADB_PASSWORD || '1234',
      database: process.env.MARIADB_DATABASE || 'imovelideal',
      entities: [ 
        UserDemand, DImovel, SnapshotImovelFotos,
        DCaract, BImovelCarac
      ],
      synchronize: false,
    }),
    RealEstateModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
