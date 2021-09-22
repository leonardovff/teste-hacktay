import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealEstateComponent } from './real-estate.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule } from '@nebular/theme';

@NgModule({
  declarations: [RealEstateComponent],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule
  ],
  exports: [
    RealEstateComponent
  ]
})
export class RealEstateModule { }
