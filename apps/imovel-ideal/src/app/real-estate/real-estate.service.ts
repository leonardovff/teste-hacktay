import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RealEstate } from './real-estate';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RealEstateService {

  private readonly API = 'http://localhost:3000/data';

  constructor(private http: HttpClient) {

  }

  list(page: number) {
    return this.http.get<RealEstate[]>(`${this.API}?page=${page}`)
    .pipe(
      tap(console.log)
    );
  }

}


