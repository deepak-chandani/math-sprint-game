<h3 align="center">Basic Mathematics Game build with React Hooks & Context API - <a href="https://deep-math.surge.sh">Math Game (using hooks) demo</a></h3>

### Info
I learned different react hooks eg: `useState()`, `useEffect()`, `useReducer()` etc.
and build this project to implement those concepts & develop something practical.
- utilized [Context API](https://reactjs.org/docs/context.html) & created custom hooks.
  - Custom Provider [`GameProvider`](https://github.com/deepak-chandani/math-sprint-game/blob/master/src/context/GameContext.js#L51) which holds global state of the application.
  - Custom utility hooks eg: 
    - [`useScore()`](https://github.com/deepak-chandani/math-sprint-game/blob/master/src/context/GameContext.js#L68): to get score stored inside `GameProvider` value
    - `useGameDispatch()`: to get access of `dispatch` method provided by `useReducer()` hook
    - some utility action methods to start, end, reset game ([`startGame()`](https://github.com/deepak-chandani/math-sprint-game/blob/master/src/context/GameContext.js#L106), [`endGame()`](https://github.com/deepak-chandani/math-sprint-game/blob/master/src/context/GameContext.js#L110), `saveBestScore()` etc)
- I also implemented `CSS Grid` and `flexbox` concepts that I recently learned from different sources.