import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { Weather } from '../weather';
import { SearchByCityNameService } from './search-by-city-name.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchByCityNameService]
})
export class SearchComponent {
  weather = new Weather();
  onError = '';
  constructor(private service: SearchByCityNameService) { }
  myForm: FormGroup = new FormGroup({
    'cityName': new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)])
  });
  onSubmit(cityName: string) {
    this.service.apiMethod(cityName).subscribe((data: Response) => {
      this.weather = data.json();
      console.log(this.weather);
    },
      error => this.onError = error.json().message
    );
  }
}
