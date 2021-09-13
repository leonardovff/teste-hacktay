import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RealEstateModule } from './real-estate/app.module';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
    }), 
    RealEstateModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
