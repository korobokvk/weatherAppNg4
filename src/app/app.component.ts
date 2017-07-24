import { Component, OnInit, trigger, state, style, transition, animate, OnChanges} from '@angular/core';
import { LocationService } from './location.service';
import { Weather } from './weather';
import { Response } from '@angular/http';
import { GetApiService } from './get-api.service';
import { GetData } from './GetData';
import {SearchByCityNameService} from "./search/search-by-city-name.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('visibilityChanged', [
      state('true' , style({ opacity: 1, transform: 'translateX(0%)' })),
      state('false', style({ opacity: 0, transform: 'translate(-50%)'  })),
      transition('1 => 0', animate('100ms')),
      transition('0 => 1', animate('300ms'))
    ])
  ],
  providers: [LocationService, GetApiService, GetData, SearchByCityNameService]
})
export class AppComponent implements OnInit {
  items: string;
  hide = false;
  weather: Weather[] = [];
  onError = null;
  cityHash: string[] = [];
  citiesItem: Weather[] = [];
  constructor(private service: GetApiService, private getData: GetData, private search: SearchByCityNameService) {}
  getVal(val: any) {
    if ((this.cityHash.indexOf(val.name)) === -1 ) {
      console.log(this.cityHash)
      this.cityHash.push(val.name);
    }
  }
  // ngOnChanges() {
  //     this.search.apiMethod(this.items).subscribe((data: Response) => {
  //         console.log(this.citiesItem);
  //         this.onError = '';
  //         this.getData.addWeather(data.json().name, data.json().base, data.json().main, data.json().sys, data.json().weather, this.citiesItem);
  //       },
  //       error => { this.onError = error.json().message; this.weather = []}
  //     );
  // }

  ngOnInit() {
   this.service.apiMethod().subscribe((data: Response) => {
     this.onError = null;
     this.getData.addWeather(data.json().name, data.json().base, data.json().main, data.json().sys, data.json().weather, this.weather);
   },
     error => { this.onError = error.json().message; this.weather = []; },
   );
   }
  }


