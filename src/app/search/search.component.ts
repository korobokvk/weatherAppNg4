import {   Component, trigger, state, style, transition, animate, keyframes, ViewChild } from '@angular/core';
import { FormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { Weather } from '../weather';
import { SearchByCityNameService } from './search-by-city-name.service';
import { Response } from '@angular/http';
import {Main} from '../main';
import {Sys} from '../sys';
import {Sky} from '../sky';
// import {trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ])
  ],
  providers: [SearchByCityNameService]
})
export class SearchComponent {
  cityName: string = null;
  state: string = 'inactive';
  weather: Weather[] = [];
  onError = '';
  constructor(private service: SearchByCityNameService) { }
  myForm: FormGroup = new FormGroup({
    'cityName': new FormControl('', <any>Validators.required)
  });
  onSubmit(cityName: string) {
    this.service.apiMethod(cityName).subscribe((data: Response) => {
        this.state = (this.state === 'inactive' ? 'active' : 'inactive');
        this.onError = '';
        this.cityName = '';
       this.addWeather(data.json().name, data.json().base, data.json().main, data.json().sys, data.json().weather);
       },
      error => { this.onError = error.json().message; this.weather = []}
    );
  }
  addWeather(name: string, base: string, main: Main, sys: Sys, weather: Array<Sky>) {
      this.weather.push(new Weather(name, base, main, sys, weather));
      console.log(this.weather);
  }
}
