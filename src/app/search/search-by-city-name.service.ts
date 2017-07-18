import { Injectable, ViewChild } from '@angular/core';
import {AppID } from '../AppID';
import { appURL } from '../appURL';
import { Weather } from '../weather';
import {Observable} from 'rxjs/Observable';
import { Http } from '@angular/http';

@Injectable()
export class SearchByCityNameService {
  @ViewChild('cityNamesInput')
  cityNamesInput: HTMLElement;
  constructor(private http: Http) {}
  apiMethod(cityName): Observable<any> {
    return Observable.create(observer => {
        this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric${AppID}`).subscribe(data => {
            observer.next(data);
        },
          error => observer.error(error)
        );
      });
    }
}
