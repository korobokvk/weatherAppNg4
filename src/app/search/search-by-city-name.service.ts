import { Injectable } from '@angular/core';
import {AppID } from '../AppID';
import {Observable} from 'rxjs/Observable';
import { Http } from '@angular/http';

@Injectable()
export class SearchByCityNameService {
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
