import React, { useEffect, useRef, useState } from "react";
import { startGame, useGameContext } from "../context/GameContext";

const noop = () => { 
    console.log("onComplete countDown");
 };


function CountDown({ start = 3, onComplete = noop }) {
    const [counter, setCounter] = useState(start);
    const intervalRef = useRef();

    const clearInterval = () => {
        if(!intervalRef.current){
            return;
        }

        window.clearInterval(intervalRef.current);
    }

    useEffect(() => {
        const id = setInterval(() => {
            setCounter(c => c - 1)
        }, 1000);

        intervalRef.current= id;

        return clearInterval;
    }, []);

    if(counter <= -1){
        clearInterval();
        onComplete();
    }

    return (
        <h1 className="countdown">
            {counter === 0 ? "GO!" : counter}
        </h1>
    )
}

export default React.memo(CountDown);