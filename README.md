# trivago´s Game of Live

## Preface

Welcome to the trivago version of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life).

This game is a cellular automaton, meaning it consists of a large matrix of cells that can change
state over time.

In its original version, the game determines its evolution by its initial state, requiring no further input. The evolution of cells to be alive or dead are specified by a few simple rules.

Given one cell's current living state, the game takes the cell's neighbours' states into account and then calculates the successor state for the cell.
This rule is called the `survivalRule` or `Rule#1`. You can find its implementation in `/src/game-of-life/rules.js`.

Our version adds a rule-chain to the game. That means our game can work with several rules at a time, which will be chained together. To make it more interesting, we implemented multi-color support for the game by adding a `colorRule` in the same direction. More information on the rules are found in the code.

The implementation you are looking at is written in a functional flavor on top of our own js-framework [Melody](https://melody.js.org).
Detailed knowledge of the framework itself is not needed to solve this case study. In case you are interested or feel the urge to read more documentation you can find it at [https://melody.js.org](https://melody.js.org);

Unfortunately, for some reasons, there are parts missing in this application, some need refactoring and we also spotted a bug (ouch!). Further information is given in the section "Tasks".

## Requirements

Please make sure that you have Node.js and yarn|npm installed on your system. This
application is built with webpack, and without those two tools, you can't proceed.

-   Node.js (recommended: >= 8.x)
-   yarn (recommended: >= 1.2.x) or npm (recommended: >= 5.x)

## Setup

Once you're sure everything is in order, please install all required npm modules
by using the command:

```sh
yarn
```

To build and to keep rebuilding it while you're working on the project, use

```sh
yarn start
```

Once you've compiled the bundle, you can open the application in your browser

[http://localhost:3456](http://localhost:3456)

## The tasks

### WEB-101: Find and fix the bug in the application

You probably have run the application already. If not, press the `Power` button on the TV.
Oh, that is really disappointing ... we were expecting cell evolution based on our initial pattern.
After some hundred generations it **should** turn into:

![](img/blue_cells.gif)

But after two generations all cells are immediately dead.
You see the following:

![](img/bug.jpg)

Please find and fix the bug!

Hints:
The heavy lifting of the application is done by some core utility functions inside the `/src/utils` folder.
This methods are safe and working, so they don´t need to be parsed for errors by you.
We believe the bug is coming more from a logical perspective that `Conway´s Game of Life` is relying on to be working properly. One engineer we spoke to indicated that it might be a problem with the implementation of the rules.
**Tip: Read the comments in the code.**

<br>

### WEB-102: Finish multi-color support implementation

Well done! You fixed the bug in WEB-101!
After some hundred generations (and without setting additional cells by you) the evolution **should** be stable with the following switching pattern:

![](img/gol_final.gif)

Instead, you're only getting blue cells evolving even though the application started with blue, orange and red cells:

![](img/blue_cells.gif)

Ah, right, our engineer fell sick while implementing the second rule before he could finish it. It is called `mostFrequentColor` and its helper function `getMostFrequentColor` is incomplete.
So this is your chance to implement it.
Please go to `/src/game-of-life/rules.js` and look out for _Task WEB-102_.

<br>

### WEB-103: Implement component "Counter" (OPTIONAL)

So, we have a working, coloured version now. Perfect.
What we are still missing is displaying nice statistics about the cell evolution.

Our UI engineer started already on a new component `Counter.js` with missing business logic. The UI part is completly done, the component is already mounted in `GameOfLife.twig` with all needed properties and your task is to give the component proper state now.

Please implement all the needed parts by finishing `Counter.js` as a melody-streams component, similar to how the parent component was built.
Requirements:

-   LivingCells: Compute a real-time counter value for living cells on each generation or drawing of cells
-   DiedOverTimes: Compute a real-time counter value for generation-loss to accumulate cell death over time. For more specific requirements have a look at code comments in `Counter.js`
-   Generation: Show the current generation value in real-time

All of the above values should resepct a `reset` triggered by the parent component that will re-initialize all values.

It should look like these:

![](img/counter_start.png)

![](img/counter_evolution.png)

**NOTE:** Keep in mind that melody-streams will only render the component at all, if **all** of the streaming state-values have emitted at least once. That is exactly, why you can not see the component rendering at the moment.

We hope you had a bit of fun while working on this. If you want to know more about engineering at trivago, have a look at our [TechBlog](https://tech.trivago.com).
