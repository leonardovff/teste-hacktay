import { Component } from '@angular/core';

declare const fullpage: new (arg0: string, arg1: { sectionsColor: string[]; anchors: string[]; menu: string; continuousVertical: boolean; afterLoad: (e: any, f: any) => void; onLeave: (e: any, d: any, f:any) => void; }) => any;

@Component({
  selector: 'imovel-ideal-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  realEstate1: any;
  realEstate2: any;
  realEstate3: any;
  current = 0;
  realEstates = [
    {name: 'Angular1', photo: 'https://raw.githubusercontent.com/alvarotrigo/fullPage.js/master/examples/imgs/bg1.jpg'},
    {name: 'Angular2', photo: 'https://raw.githubusercontent.com/alvarotrigo/fullPage.js/master/examples/imgs/bg2.jpg'},
    {name: 'Angular3', photo: 'https://raw.githubusercontent.com/alvarotrigo/fullPage.js/master/examples/imgs/bg3.jpg'},
    {name: 'Angular4', photo: 'https://raw.githubusercontent.com/alvarotrigo/fullPage.js/master/examples/imgs/bg4.jpg'},
    {name: 'Angular5', photo: 'https://raw.githubusercontent.com/alvarotrigo/fullPage.js/master/examples/imgs/bg5.jpg'},
    {name: 'Angular6', photo: 'https://raw.githubusercontent.com/alvarotrigo/fullPage.js/master/examples/imgs/bg6.jpg'}
  ];


  constructor() {
    this.realEstate1 = this.realEstates[0];
    this.realEstate2 = this.realEstates[1];
    this.realEstate3 = this.realEstates[2];
    // setTimeout(() => {

    //  new fullpage('#fullpage', {
    //     sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
    //     anchors: [],
    //     menu: '#menu',
    //     continuousVertical: true,
    //     afterLoad: function(){
    //       // console.log("AFTER LOAD - anchorLink:" +anchorLink + " index:" +index );
    //     },
    //     onLeave: function(){
    //         // console.log("ONLEAVE - index:" +index + " nextIndex:" +nextIndex  + " direction:" + direction);

    //     },
    //   });
    setTimeout(() => {
      const myFullpage = new fullpage('#fullpage', {
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
        sectionsColor: [],
        menu: '#menu',
        continuousVertical: true,
        afterLoad: (anchorLink: any, index: any) => {
          console.log(
            'AFTER LOAD - anchorLink:' + anchorLink + ' index:' + index
          );
        },
        onLeave: (previusIndex: any, nextIndex: any, direction: any) => {

          if(nextIndex.index==2 && previusIndex.index == 1){
            this.realEstate1 = this.realEstates[this.current+2];
          }

          if(nextIndex.index==1 && previusIndex.index == 2){
            this.realEstate1 = this.realEstates[this.current];
          }
          if(nextIndex.index==0 && previusIndex.index == 2){
            this.current ++;
          }
          if(nextIndex.index==2 && previusIndex.index == 0){
            this.current --;
          }

          this.current += direction == 'down' ? +1 : -1;
          

          // console.log(index, nextIndex, direction);
          // if(nextIndex.index == 0 && direction == "down"){
          //   this.realEstate1 = this.realEstates[this.current+1];
          //   this.realEstate2 = this.realEstates[this.current+2];
          //   this.realEstate3 = this.realEstates[this.current+3];
          // } 
          // if(nextIndex.index == 3 && direction == "up") {
          //   this.realEstate1 = this.realEstates[this.current-1];
          //   this.realEstate2 = this.realEstates[this.current-2];
          //   this.realEstate3 = this.realEstates[this.current-3];
          // }

          // console.log(
          //   'ONLEAVE - index:' +
          //     index +
          //     ' nextIndex:' +
          //     nextIndex +
          //     ' direction:' +
          //     direction
          // );
        }
      });
      console.log(myFullpage);
    }, 1000);

  }
}