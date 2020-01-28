import { animationFrameScheduler, interval } from 'rxjs';
import { takeUntil, switchMap, mapTo } from 'rxjs/operators';
import { survivalRule, mostFrequentColor } from './rules';
import { getNextGeneration } from '../utils/helper';
import { startEager } from '../utils/operator';
import { divide } from 'ramda';

const RULES = [survivalRule, mostFrequentColor];
const nextGeneration = [getNextGeneration(RULES)];
const fps = divide(1000);

export const mapToStrategy = () => mapTo(nextGeneration);

export const gameLoop = (startStream, endStream) => {
   return  startStream.pipe(
        switchMap(([_, frameRate]) =>
            interval(fps(frameRate), animationFrameScheduler).pipe(
                startEager(),
                takeUntil(endStream),
            ),
        ),
        mapToStrategy(),
    );
}
