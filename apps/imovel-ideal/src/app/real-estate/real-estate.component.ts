import { Component, OnInit } from '@angular/core';
import { RealEstate } from './real-estate';
import { RealEstateService } from './real-estate.service';

declare const fullpage: new (arg0: string, arg1: { continuousVertical: boolean; onLeave: (e: any, d: any, f:any) => void; }) => any;

@Component({
  selector: 'imovel-ideal-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.scss']
})

export class RealEstateComponent implements OnInit {
  realEstate1: any;
  realEstate2: any;
  realEstate3: any;
  current = 0;
  realEstates: RealEstate[] = [];

  constructor(private service: RealEstateService) {}
    

  ngOnInit(): void {
    this.service.list(0).subscribe(dados => {
      this.realEstates = dados;
      this.rodar();
    });

  }

  rodar(): void {
    this.realEstate1 = this.realEstates[0];
    this.realEstate2 = this.realEstates[1];
    this.realEstate3 = this.realEstates[2];

    setTimeout(() => {
      
      this.setupFullPage();
    }, 500);
  }

  setupFullPage(): void {
    const myFullpage = new fullpage('#fullpage', {
      continuousVertical: true,

      onLeave: (origin: any, destination: any, direction: any) => {

        if (this.current==0 && direction=='up'){
          return false;
        }

        if (origin.index==0){
          this.realEstate2 = this.realEstates[this.current+1];
          this.realEstate3 = this.realEstates[this.current-1];
        }

        if (origin.index==1){
          this.realEstate1 = this.realEstates[this.current-1];
          this.realEstate3 = this.realEstates[this.current+1];
        }

        if (origin.index==2){
          this.realEstate2 = this.realEstates[this.current-1];
          this.realEstate1 = this.realEstates[this.current+1];
        }

        if (this.current == this.realEstates.length-5){
          this.service.list(1).subscribe(dados => {
            this.realEstates = [...this.realEstates,...dados];
          })
        }

        this.current += direction == 'down' ? +1 : -1;

        return ;
        
      }
    });
  }
}