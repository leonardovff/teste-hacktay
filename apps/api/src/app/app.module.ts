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
      node: 'http://localhost:9200',
    }), 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'imovelideal',
      password: '1234',
      database: 'imovelideal',
      entities: [UserDemand],
      synchronize: true,
    }),
    RealEstateModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
