import { pipe } from 'rxjs';
import { startWith, mapTo, scan } from 'rxjs/operators';
import { add } from 'ramda';
export const startEager = () => pipe(startWith(true));
export const toggle = (start = true) => pipe(scan(acc => !acc, start));
export const countEmittance = (start = 0) => pipe(mapTo(1), scan(add, start));
