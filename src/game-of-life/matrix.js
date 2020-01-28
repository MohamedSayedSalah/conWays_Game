import { drawMatrix } from '../utils/helper';
import { identity } from 'ramda';
import { pipe } from 'rxjs';
import { startWith, scan, switchMap } from 'rxjs/operators';

const COLUMNS = 103;
const ROWS = 67;

const drawNewState = drawMatrix(COLUMNS, ROWS);
const progressState = (acc, [strategy, payload]) =>
    drawNewState(strategy(acc, payload));

export const buildMatrix = stream =>
    pipe(
        switchMap(pattern =>
            stream.pipe(startWith([identity]), scan(progressState, pattern)),
        ),
    );
