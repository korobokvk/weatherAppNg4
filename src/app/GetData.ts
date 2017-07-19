import { Sky } from './sky';
import { Sys } from './sys';
import { Main } from './main';
import { Weather } from './weather';

export class GetData {
  addWeather(name: string, base: string, main: Main, sys: Sys, weather: Array<Sky>, weatherArr: Array<Weather>) {
    weatherArr.push(new Weather(name, base, main, sys, weather));
  }
}
