import { Injectable, OnInit } from '@angular/core';
import { LocationService } from './location.service';
import { Http } from '@angular/http';
import {AppID } from './AppID';
import { appURL } from './appURL';
import { Weather } from './weather';
import {Observable} from 'rxjs/Observable';



@Injectable()
export class GetApiService {

  constructor(private http: Http, private service: LocationService) {}
  apiMethod(): Observable<any> {
    return Observable.create(observer => {
      this.service.getLocation().subscribe((getApi) => {
      this.http.get(`${appURL}lat=${getApi.coords.latitude}&lon=${getApi.coords.longitude}&units=metric${AppID}`).subscribe(data => {
        observer.next(data);
      },
      error => observer.error(error)
      );
    });
    });
}

}
