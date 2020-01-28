import { equals, curry, update } from 'ramda';
import { concat, of } from 'rxjs';
import {
    switchMap,
    map,
    takeUntil,
    filter,
    withLatestFrom,
} from 'rxjs/operators';
import { parseFields, updateCells } from '../utils/helper';

const eq = eventType => ({ type }) => equals(eventType, type);

const events = ['mousedown', 'mouseover', 'mouseup'];
const filterEvent = curry((stream, event) => stream.pipe(filter(eq(event))));

const updateWithCoordinates = ([[x, y], color]) => [
    updateCells,
    { [x]: [y, color] },
];

const captureMovementUntil = (move, end) => event => {
    event.preventDefault();
    return concat(of(event), move).pipe(
        map(event => parseFields(event.target.id)),
        takeUntil(end),
    );
};

export const drawOnScreen = (stream, colorStream) => {
    const [start, move, end] = events.map(filterEvent(stream));
    return start.pipe(
        switchMap(captureMovementUntil(move, end)),
        withLatestFrom(colorStream),
        map(updateWithCoordinates),
    );
};
