import React from "react";
import { startGame, useGameContext } from "../context/GameContext";
import Footer from "./Footer";
import Header from "./Header";
import RoundTypeList from "./RoundTypeList";
import { SCREENS } from "./types";

function StartScreen(props){
    const [selectedRoundTypeId, setSelectedRoundTypeId] = React.useState(1);
    const [, dispatch] = useGameContext();

    const handleSelectedRoundType = (id) => {
        setSelectedRoundTypeId(id);
    }

    const handleStart = () => {
        // props.setCurrentScreen(SCREENS.QUESTION);
        startGame(dispatch, selectedRoundTypeId);
    }

    return (
    <> 
        <Header>
            <h1>Math Sprint Game</h1>
        </Header>
        <div className="main">
            <RoundTypeList selectedId={selectedRoundTypeId} onSelect={handleSelectedRoundType} />
        </div>
        <Footer>
            <button className="start" onClick={handleStart}>Start Round</button>
        </Footer>        
    </>
    )

}

export default StartScreen;