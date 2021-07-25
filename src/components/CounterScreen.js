import React from "react";
import { useGameDispatch } from "../context/GameContext";
import CountDown from "./CountDown";
import Header from "./Header";
import { startGame, useGameContext } from "../context/GameContext";

function CounterScreen(props) {
    const [{selectedRoundTypeId}, dispatch] = useGameContext();

    // console.log("CounterScreen", {selectedRoundTypeId});

    const onComplete = () => {
        startGame(dispatch);
    }

    return (
        <>
            <Header>
                <h1>Math Sprint Game</h1>
            </Header>
            <div className="main">
                <CountDown onComplete={onComplete} />                
            </div>
        </>
    )
}

export default React.memo(CounterScreen);