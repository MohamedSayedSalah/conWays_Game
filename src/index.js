import { options } from 'melody-idom';
import { render } from 'melody-component';
import GameOfLife from './game-of-life';

options.experimentalSyncDeepRendering = true;

const documentRoot = document.getElementById('root');
render(documentRoot, GameOfLife);
