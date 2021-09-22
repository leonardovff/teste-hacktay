import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RealEstate } from './real-estate';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RealEstateService {

  private readonly API = '/assets/imoveis.json';
  // private readonly API = 'http://20.38.5.27:81/api/real-estate/search/15354faeufbidaifjbn';
  // private readonly API = '/v1/real-estate/search/A!^23ds@as@!#'

  constructor(private http: HttpClient) {

  }

  list(page: number) {
    return this.http.get<RealEstate[]>(`${this.API}?page=${page}&itensPerPage=20`)
    .pipe(
      tap(console.log)
    );
  }

}

