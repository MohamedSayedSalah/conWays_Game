import { createComponent } from 'melody-streams';
import template from './Counter.twig';
import { Observable } from 'rxjs';
import { getCurrentLiving } from '../utils/helper';
import { forEach } from 'ramda';

// ################################################################
// ### TASK: WEB-103: Implement component "Counter" (OPTIONAL) ####
// ################################################################
// Please implement all the needed parts by finishing this file as a melody-streams component, similar to how the parent component was built.
//
// Requirements:
// -   LivingCells: Compute a real-time counter value for living cells on each generation or drawing of cells
// -   DiedOverTime: Compute a real-time counter value for generation-loss to accumulate cell death over time.
//     Keep it simple: We are not interested in the dead of individual cells between two generations,
//     but summing up the (positive!) difference between previous and current to accumulate this generation-loss over time.
//
//     E.g. for 4 generations:
//     -------------------------
//    | Gen | prev | cur | died |
//    |-------------------------|
//    |  1  | 50   | 50  |   0  |
//    |-------------------------|
//    |  2  | 50   | 40  |  10  |
//    |-------------------------|
//    |  3  | 40   | 100 |  10  |
//    |-------------------------|
//    |  4  | 100  | 30  |  80  |
//     -------------------------
// -   Generation: Show the current generation value in real-time
//
// All of the above values should resepct a `reset` triggered by the parent component that will re-initialize all values.
//
// Tips:
// - check the 'Counter.twig' file to see what the UI needs from this component.
// - 'countEmittance' from '/src/utils/operator.js' and 'getCurrentLiving' from '/src/utils/helper' can be helpful while building the functionality of this file
// - Keep in mind that melody-streams will only render a component at all, if **all** of the streaming state-values have emitted at least once. That is exactly, why you can not see the component rendering at the moment.

/**
 * The Melody Counter component that wires the parents stream to a statistic counter that displays
 * the current generation, living cells and dead cells over time.
 *
 * NOTE: A Melody-Streaming-Component must return a new stream (observable) or an Object composed of streams.
 */
const countLiving = (matrixOfLiving)=>{
    let count = 0 ;
    Object.keys(matrixOfLiving).forEach(row=>{
        count += row.length ;
    });
    return count ;
};

const initialState = { generations: 0, living: 0, diedOverTime: 0 };


export const Counter = ({ props }) => {
    return  Observable.create((observable) => {
        let prevLiving = 0 ;
        let state = initialState ;
        let generationsCounter = 0 ;
        let diedOverTime = 0 ;
        let currentLiving = 0 ;
        let prevReset = true ;

        props.subscribe((x) => {
            currentLiving = countLiving(getCurrentLiving(x.matrix));
            if (x.resets === prevReset) {
                generationsCounter = 0 ;
                currentLiving = 0 ;
                diedOverTime = 0 ;
                prevLiving = 0 ;
                prevReset = !x.resets;
                state = {...initialState};
            }

            state['generations'] = generationsCounter ;
            state['living'] = currentLiving ;
            state['diedOverTime'] = diedOverTime ;
            observable.next(state);
            diedOverTime += prevLiving > currentLiving ? prevLiving - currentLiving : 0;
            prevLiving = currentLiving ;
            generationsCounter +=1 ;
        });
    });
};

export default createComponent(Counter, template);
