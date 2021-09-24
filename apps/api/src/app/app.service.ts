import { Injectable } from '@nestjs/common';
import { Message } from '@imovel-ideal/api-interfaces';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class AppService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {
  }
  getData(): Message {
    return { message: "olá" };
  }
  
}
