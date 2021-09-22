import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealEstateComponent } from './real-estate.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [RealEstateComponent],
  imports: [
    CommonModule,
    SwiperModule
  ],
  exports: [
    RealEstateComponent
  ]
})
export class RealEstateModule { }
