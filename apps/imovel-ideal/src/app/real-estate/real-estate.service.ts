import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RealEstate } from './real-estate';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RealEstateService {

  // private readonly API = '/assets/imoveis.json';
  private readonly API = 'http://localhost:3333/api/real-estate/search/9589bfa7-bd5e-4e65-afae-defdf32eaf5f';


  constructor(private http: HttpClient) {

  }

  list(page: number) {
    return this.http.get<RealEstate[]>(`${this.API}?page=${page}&itensPerPage=20`)
    .pipe(
      tap(console.log)
    );
  }

}

