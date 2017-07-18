import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { appURL } from './appURL';
import { AppID } from './AppID';
import { Weather } from './weather';

@Injectable()
export class LocationService {
  getLocation(): Observable<any> {
    return Observable.create(observer => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(`${appURL}lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric${AppID}`);
            // observer.complete();
          },
          (error) => observer.error(console.log('sdds'))
        );
      } else {
        observer.error('Unsupported Browser');
      }
    });
  }

}
