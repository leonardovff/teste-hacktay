import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import SwiperCore, { Pagination, Navigation, Virtual } from "swiper";
// import Swiper, { Navigation, Pagination, Virtual } from 'swiper';
import { RealEstate } from './real-estate';
import { RealEstateService } from './real-estate.service';

SwiperCore.use([Pagination, Navigation, Virtual]);
// const swiper = new Swiper('.swiper', {
//   modules: [Navigation, Pagination, Virtual],
// });
// swiper.on('slideChange', function () {
//   console.log('slide changed');
// });

@Component({
  selector: 'imovel-ideal-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class RealEstateComponent implements OnInit {

  page = 0;
  realEstates: RealEstate[] = [];
  isCollapsed = true;

  constructor(private service: RealEstateService) {}

  ngOnInit(): void {
    this.service.list(this.page).subscribe(dados => {
      this.realEstates = dados.data;
    });

    // setTimeout(() => {
    //   this.service.list(this.page+1).subscribe(dados => {
    //     this.realEstates = [...this.realEstates, ...dados.data];
    //     console.log(this.realEstates);
    //   });

    // }, 10000)

  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  addPage({realIndex}: any){
    if (realIndex == this.realEstates.length-5){
      this.service.list(this.page++).subscribe(dados => {
        this.realEstates = [...this.realEstates, ...dados.data];
      })
    }
  }

  teste(e: any){
    console.log(e);
  }

  // slides = Array.from({ length: 1000 }).map((_, index) => `Slide ${index + 1}`)


}