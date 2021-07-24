import React from "react";
import { resetGame, useGameDispatch, useScore } from "../context/GameContext";
import Footer from "./Footer";
import Header from "./Header";

function ScoreScreen(props) {
    const { baseTime, penaltyTime, finalTime, incorrectCount } = useScore();
    const dispatch = useGameDispatch();

    const handleReset = () => resetGame(dispatch);

    return (
        <>
            <Header>
                <h1>Math Sprint Game</h1>
            </Header>
            <div className="main">
                <div className="score-container">
                    <h1 className="title">Your Time</h1>
                    <h1 className="final-time">{finalTime}s</h1>
                    <h1 className="base-time">Base Time: {baseTime}s</h1>
                    {
                        incorrectCount > 0 && (
                            <div className="penalty-container">
                                <h1 className="penalty-time">Penalty: +{penaltyTime}s</h1>
                                <span>(for {incorrectCount} wrong answers)</span>
                            </div>
                        )
                    }

                </div>
            </div>
            <Footer score>
                <button className="play-again" onClick={handleReset} >Play Again</button>
            </Footer>
        </>
    )
}

export default React.memo(ScoreScreen);