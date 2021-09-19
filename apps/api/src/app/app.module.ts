import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RealEstateModule } from './real-estate/real-estate.module';
import { UserDemand } from './real-estate/user-demand.entity';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: `http://${process.env.ELASTIC_HOST || 'localhost'}:${process.env.ELASTIC_PORT || '9200'}`,
    }), 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MARIADB_HOST || 'localhost',
      port: parseInt(process.env.MARIADB_PORT) || 3306,
      username: process.env.MARIADB_USER || 'imovelideal',
      password: process.env.MARIADB_PASSWORD || '1234',
      database: process.env.MARIADB_DATABASE || 'imovelideal',
      entities: [ UserDemand ],
      synchronize: true,
    }),
    RealEstateModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
