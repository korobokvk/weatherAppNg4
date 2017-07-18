import { Main } from './main';
import { Sys } from './sys';
import { Sky } from './sky';
export class Weather {
 name: string;
 base: string;
 main: Main;
 sys: Sys;
 weather: Array<Sky>;

 constructor(name: string, base: string, main: Main, sys: Sys, weather: Array<Sky>) {
   this.name = name;
   this.base = base;
   this.main = main;
   this.sys = sys;
   this.weather = weather;
 }
}
