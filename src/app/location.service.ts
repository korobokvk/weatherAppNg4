import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class LocationService {
  getLocation(): Observable<any> {
    return Observable.create(observer => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
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
