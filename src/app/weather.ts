import { Main } from './main';
import { Sys } from './sys';
import { Sky } from './sky';
export class Weather {
 name: string;
 base: string;
 main: Main;
 sys: Sys;
 weather: Array<Sky>;
}
