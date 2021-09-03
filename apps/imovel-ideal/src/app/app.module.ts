import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppRoutingModule } from './app-routing.module';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { RealEstateComponent } from './real-estate.component';

@NgModule({
  declarations: [AppComponent, RealEstateComponent],
  imports: [
    NgxPageScrollCoreModule.forRoot({ duration: 1600 }),
    BrowserModule, HttpClientModule, BrowserAnimationsModule, 
    NbThemeModule.forRoot({ name: 'default' }), NbLayoutModule, 
    NbEvaIconsModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
