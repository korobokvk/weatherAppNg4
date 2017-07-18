import { Component, OnInit} from '@angular/core';
import { LocationService } from './location.service';
import { Weather } from './weather';
import { Http, Response } from '@angular/http';
import {GetApiService} from './get-api.service';
import {Sky} from './sky';
import {Sys} from './sys';
import {Main} from './main';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LocationService, GetApiService]
})
export class AppComponent implements OnInit {
  weather: Weather[] = [];
  constructor(private service: GetApiService) {}
  addWeather(name: string, base: string, main: Main, sys: Sys, weather: Array<Sky>) {
    this.weather.push(new Weather(name, base, main, sys, weather));
  }

  ngOnInit() {
   this.service.apiMethod().subscribe((data: Response) => {
     this.addWeather(data.json().name, data.json().base, data.json().main, data.json().sys, data.json().weather);
   });
   }
  }


