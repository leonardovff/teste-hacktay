import { Component, Input } from '@angular/core';

@Component({
  selector: 'imovel-ideal-real-estate',
  template: `
    <h1>Hello {{ name }}!</h1>
  `,
  styles: [
    `
      :host {
        display: flex;
        height: 100vh;
        // background: red;
      }
      h1 {
        font-family: Lato;
      }
    `
  ]
})
export class RealEstateComponent {
  @Input() name = '';
}
