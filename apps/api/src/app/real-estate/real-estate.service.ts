import { Injectable } from '@nestjs/common';
import { Message } from '@imovel-ideal/api-interfaces';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class RealEstateService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {
  }
  async getData(): Promise<Message> {
    const data = await this.elasticsearchService.search({
      index: 'indexname',
      body: {
        query: {
          match_all: {}
        }
      }
    });
    return { message: data.body.hits.hits[0]._source.street };
  }
  
}
