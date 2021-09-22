import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { AppRoutingModule } from './app-routing.module';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { RealEstateModule } from './real-estate/real-estate.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [AppComponent],
  imports: [
    NgxPageScrollCoreModule.forRoot({ duration: 1600 }),
    BrowserModule, 
    HttpClientModule, 
    BrowserAnimationsModule, 
    NbThemeModule.forRoot({ name: 'default' }), 
    NbLayoutModule, 
    AppRoutingModule,
    RealEstateModule,
    NbEvaIconsModule,
    SwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
