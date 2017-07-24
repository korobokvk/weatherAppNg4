import { Component, trigger, state, style, transition, animate, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Weather } from '../weather';
import { SearchByCityNameService } from './search-by-city-name.service';
import { Response } from '@angular/http';
import { GetData } from '../GetData';





@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('flyInOut', [
      state('true', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('void => *', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ])
  ],
  providers: [SearchByCityNameService, GetData]
})
export class SearchComponent {
  cityName: string = null;
  over = false;
  choose = false;
  weather: Weather[] = [];
  onError = '';
  @Output() countUpdate = new EventEmitter();
  TakeCity(name) {
    this.countUpdate.emit({name});
  }
  constructor(private service: SearchByCityNameService, private getData: GetData) { }
  myForm: FormGroup = new FormGroup({
    'cityName': new FormControl('', <any>Validators.required)
  });

  onSubmit(cityName: string) {
    this.service.apiMethod(cityName).subscribe((data: Response) => {
        console.log(this.weather);
        this.onError = '';
        this.cityName = '';
       this.getData.addWeather(data.json().name, data.json().base, data.json().main, data.json().sys, data.json().weather, this.weather);
       },
      error => { this.onError = error.json().message; this.weather = []}
    );
  }


}
