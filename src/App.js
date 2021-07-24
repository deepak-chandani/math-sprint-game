import React from "react";
import StartScreen from './components/StartScreen';
import './App.css';
import QuestionScreen from "./components/QuestionScreen";
import { SCREENS } from "./components/types";
import ScoreScreen from "./components/ScoreScreen";
import { useGameContext } from "./context/GameContext";

function App() {
  const [{currentScreen}] = useGameContext();
  console.log("App rendered", Date.now());
  console.log(currentScreen);

  return (
    <div className="container">      
      <div className="game-container">
        {currentScreen === SCREENS.START && <StartScreen  />}
        {currentScreen === SCREENS.QUESTION && <QuestionScreen />}
        {currentScreen === SCREENS.SCORE && <ScoreScreen />}
      </div>
    </div>
  );
}

export default App;
