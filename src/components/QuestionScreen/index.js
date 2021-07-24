import React, { useEffect, useRef, useState } from "react";
import { endGame, saveBestScore, useGameContext } from "../../context/GameContext";
import RoundTypesModel from "../../models/RoundTypesModel";
import { generateQuestions } from "../../utils/questionFactory";
import Footer from "../Footer";
import Header from "../Header";
import QuestionList from "./QuestionList";

function QuestionScreen(props) {
    const [{selectedRoundTypeId}, dispatch] = useGameContext();
    const roundType = RoundTypesModel.findById(selectedRoundTypeId);
    const [questions] = useState(generateQuestions(roundType.questionCount));
    const LAST_QUESTION_ID = questions[questions.length - 1].id;
    const [currentId, setCurrentId] = useState(1);
    const timestampsRef = useRef({});

    // capture startTime when component mounts
    useEffect(() => {
        timestampsRef.current.startTime = Date.now();
    }, [])

    const captureAnswer = (userAnswer) => {
        const question = questions.find(item => item.id === currentId);
        question.userAnswer = userAnswer; // we don't want to trigger re-render here, hence mutating directly
        setCurrentId(id => id + 1);
    }

    useEffect(() => {
        if (currentId > LAST_QUESTION_ID) {
            // capture endTime & calculate diff (baseTime)
            const score = calculateScore();
            const {finalTime, incorrectCount} = score;
            saveBestScore(dispatch, {finalTime, incorrectCount}, selectedRoundTypeId);
            // setCurrentScreen(SCREENS.SCORE);
            endGame(dispatch, score)
        }
    }, [currentId])

    function calculateScore() {
        timestampsRef.current.endTime = Date.now();

        const { startTime, endTime } = timestampsRef.current;

        console.log({ questions, startTime, endTime });
        const baseTime = +((endTime - startTime) / 1000).toFixed(2);
        
        // count of incorrect answers 
        const incorrectCount = questions.reduce((sum, item) => {
            if (item.isCorrect !== item.userAnswer) {
                sum++;
            }
            return sum;
        },0);
        
        const penaltyTime = 0.5 * incorrectCount;
        const finalTime = baseTime + penaltyTime;
        
        const score = { baseTime, penaltyTime, finalTime, incorrectCount};
        console.log(score);

        return score;
    }

    return (
        <>
            <Header>
                <h1>Math Sprint Game</h1>
            </Header>
            <div className="main">
                <QuestionList questions={questions} currentId={currentId} />
            </div>
            <Footer>
                <button className="wrong" onClick={() => captureAnswer(false)}>Wrong</button>
                <button className="right" onClick={() => captureAnswer(true)}>Right</button>
            </Footer>
        </>
    )
}

export default QuestionScreen;