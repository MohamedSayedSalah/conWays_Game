import { scan, startWith, shareReplay, filter } from 'rxjs/operators';
import { complement } from 'ramda';

export const powerToggle = stream => {
    const power = stream.pipe(
        scan(acc => !acc, false),
        startWith(false),
        shareReplay(1),
    );
    const on = power.pipe(filter(Boolean));
    const off = power.pipe(filter(complement(Boolean)));
    return [power, on, off];
};
