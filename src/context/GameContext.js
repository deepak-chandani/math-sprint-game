import React from "react";
import { SCREENS } from "../components/types";
import Storage from "../utils/Storage";

const GameContext = React.createContext();

function gameReducer(state, action){
    switch(action.type){
        case ACTION_TYPES.START: {
            return {
                ...state,
                currentScreen: SCREENS.QUESTION,
                score: null,
                selectedRoundTypeId: action.selectedRoundTypeId,
            }
        }
        case ACTION_TYPES.END: {
            return {
                ...state,
                currentScreen: SCREENS.SCORE,
                score: action.score,
            }
        }
        case ACTION_TYPES.RESET: {
            return {...initialState}
        }
        default:
            return state;

    }
}

/**
 * @type {GameState}
 */
const initialState = {
    currentScreen: SCREENS.START,
    difficulty: 0,
    selectedRoundTypeId: null,
    score: null,
};

function GameProvider({children}){
    const [state, dispatch] = React.useReducer(gameReducer, initialState)

    // const value = React.useMemo(() => {
    //     return [state, dispatch]
    // }, [state, dispatch]);
    const value = [state, dispatch];


    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    )
}

/** ----- Utility custom hooks to get pieces of info from game-context value-------------- */
function useScore(){
    const context = React.useContext(GameContext);
    if (context === undefined) {
        throw new Error('useScore must be used within a GameProvider')
    }
    return context[0].score;
}

function useGameContext(){
    const context = React.useContext(GameContext);

    if (context === undefined) {
        throw new Error('useGameState must be used within a GameProvider')
    }

    return context;
}

function useGameDispatch(){
    const context = React.useContext(GameContext);
    if (context === undefined) {
        throw new Error('useScore must be used within a GameProvider')
    }
    return context[1];
}

/** ------------------------- Actions ------------------------- */
const ACTION_TYPES = {
    START: "START", // start & show first screen
    END: "END", // set score & show score-screen
    RESET: "RESET",
}

function startGame(dispatch, selectedRoundTypeId){
    dispatch({type: ACTION_TYPES.START, selectedRoundTypeId})
}

function endGame(dispatch, score){
    dispatch({type: ACTION_TYPES.END, score})
}

function resetGame(dispatch){
    dispatch({type: ACTION_TYPES.RESET})
}

function saveBestScore(dispatch, finalScore, roundTypeId){
   return Storage.saveBestScore(finalScore, roundTypeId);
}


export {GameProvider, useScore, useGameContext, useGameDispatch, startGame, endGame, resetGame, saveBestScore}

/**
 * @typedef GameState
 * @property {"START" | "QUESTION" | "SCORE" } currentScreen
 * @property {Number} selectedRoundTypeId
 * @property {Score} score  
 */

/**
 * @typedef Score
 * @property {Number} baseTime
 * @property {Number} penaltyTime
 * @property {Number} finalTime  
 */

