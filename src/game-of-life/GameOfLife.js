import { createComponent, attachEvent } from 'melody-streams';
import template from './GameOfLife.twig';
import { mapTo, startWith, scan, pluck, shareReplay } from 'rxjs/operators';
import { combineLatest, merge } from 'rxjs';
import { head } from 'ramda';
import { startEager, toggle } from '../utils/operator';
import { getNextColor } from './colors';
import { powerToggle } from './power';
import { drawOnScreen } from './draw';
import { gameLoop } from './game-loop';
import { buildMatrix } from './matrix';
import { trivago } from '../patterns/trivago';

const PATTERNS = [trivago];
const DEFAULT_FRAMERATE = 24;

const GameView = () => {
    const [powerSwitch, powerStream] = attachEvent('click');
    const [reset, resetStream] = attachEvent('click');
    const [colorSwitch, colorStream] = attachEvent('click');
    const [framerateSlider, frameRateSliderStream] = attachEvent('change');
    const [grid, gridStream] = attachEvent('mousedown', 'mouseover', 'mouseup');

    const [power, turnedOn, turnedOff] = powerToggle(powerStream);

    const color = colorStream.pipe(startEager(), scan(getNextColor, -1));
    const draw = drawOnScreen(gridStream, color);
    const frameRate = frameRateSliderStream.pipe(
        pluck('target', 'value'),
        startWith(DEFAULT_FRAMERATE),
        shareReplay(1),
    );
    const resets = resetStream.pipe(startEager(), toggle()); // Emits cycling values [true|false] so that sub-components can use distinctUntilChanged
    const run = combineLatest(turnedOn, frameRate);
    const runLoop = gameLoop(
        run, // running condition stream
        turnedOff, // stopping condition stream
    );

    const matrix = resets.pipe(
        mapTo(head(PATTERNS)),
        buildMatrix(merge(runLoop, draw)),
    );

    const tick = runLoop.pipe(startEager(), toggle()); // Emits cycling values [true|false] so that sub-components can use distinctUntilChanged

    return {
        matrix,
        powerSwitch,
        reset,
        tick,
        resets,
        colorSwitch,
        framerateSlider,
        frameRate,
        grid,
        color,
        running: power,
    };
};

export default createComponent(GameView, template);
