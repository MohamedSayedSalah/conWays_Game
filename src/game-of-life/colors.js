import { BLUE, ORANGE, RED } from '../utils/helper';
const colors = [BLUE, ORANGE, RED];

const cycle = length => index => Math.max(1, (index + 1) % (length + 1));

export const getNextColor = cycle(colors.length);
