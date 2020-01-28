import { Counter } from '../game-of-life/Counter';
import { buildMatrix } from '../game-of-life/matrix';
import { trivago } from '../patterns/trivago';
import { mapToStrategy } from '../game-of-life/game-loop';
import { of, from } from 'rxjs';

import { map } from 'rxjs/operators';

const testProperty = (...properties) => async iterations => {
    const p = [].concat(properties);
    let tick = 0;
    const cycles =
        iterations > 0 ? from(Array.from({ length: iterations })) : of();
    const data = {
        props: buildMatrix(cycles.pipe(mapToStrategy()))(of(trivago)).pipe(
            map(matrix => ({
                matrix,
                tick: ++tick,
                resets: false,
            })),
        ),
    };
    const c = Counter(data);
    return Promise.all(p.map(o => c[o].toPromise()));
};

describe('Counter tests', () => {
    const testWithIterations = testProperty(
        'living',
        'diedOverTime',
        'generations',
    );
    it('should have proper state after initialization', async () =>
        expect(testWithIterations(0)).resolves.toEqual([1117, 0, 1]));
    it('should have proper state after 1 iteration', async () =>
        expect(testWithIterations(1)).resolves.toEqual([254, 863, 2]));
    it('should have proper state after 2 iteration', async () =>
        expect(testWithIterations(2)).resolves.toEqual([332, 863, 3]));
    it('should have proper state after 3 iteration', async () =>
        expect(testWithIterations(3)).resolves.toEqual([251, 944, 4]));
    it('should have proper state after 4 iteration', async () =>
        expect(testWithIterations(4)).resolves.toEqual([318, 944, 5]));
});
