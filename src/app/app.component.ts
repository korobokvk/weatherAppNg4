import { Component, OnInit} from '@angular/core';
import { LocationService } from './location.service';
import { Weather } from './weather';
import { Http, Response } from '@angular/http';
import {GetApiService} from './get-api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LocationService, GetApiService]
})
export class AppComponent implements OnInit {
  weather: Weather;
  constructor(private service: GetApiService, private http: Http) {}
  ngOnInit() {
   this.service.apiMethod().subscribe((data: Response) => {
     this.weather = data.json();
   });
   }
  }


