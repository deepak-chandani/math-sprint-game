import React from "react";
import { displayCountDown, startGame, useGameContext } from "../context/GameContext";
import Footer from "./Footer";
import Header from "./Header";
import RoundTypeList from "./RoundTypeList";

function StartScreen(props){
    const [selectedRoundTypeId, setSelectedRoundTypeId] = React.useState(1);
    const [, dispatch] = useGameContext();

    const handleSelectedRoundType = (id) => {
        setSelectedRoundTypeId(id);
    }

    const handleStart = () => {
        displayCountDown(dispatch, selectedRoundTypeId)        
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