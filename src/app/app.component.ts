import { Component, OnInit, trigger, state, style, transition, animate} from '@angular/core';
import { LocationService } from './location.service';
import { Weather } from './weather';
import { Response } from '@angular/http';
import { GetApiService } from './get-api.service';
import { GetData } from './GetData';



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
  providers: [LocationService, GetApiService, GetData]
})
export class AppComponent implements OnInit {
  hide = false;
  weather: Weather[] = [];
  onError = null;

  constructor(private service: GetApiService, private getData: GetData) {}


  ngOnInit() {
   this.service.apiMethod().subscribe((data: Response) => {
     this.onError = null;
     this.getData.addWeather(data.json().name, data.json().base, data.json().main, data.json().sys, data.json().weather, this.weather);
   },
     error => { this.onError = error.json().message; this.weather = []; },
   );
   }
  }


