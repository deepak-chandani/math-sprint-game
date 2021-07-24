// import "../components/types";

/**
 * @typedef Question
 * @property {Number} id
 * @property {string} text
 * @property {boolean} isCorrect 
 * @property {boolean | null} userAnswer
 */

/**
 * generate random questions
 * @param {number} count
 * @return {Question[]} array of questions
 */
export function generateQuestions(count=10){
    /**
     * @type Question[]
     */
    const questions = [];
    const questionCorrectnessFlag = generateRandomCorrectness(count);

    for(let i=0; i<count; i++){
        /**
         * @type Question
         */
        let item = {
            id: i+1,
            userAnswer: null,
        };
        const [a ,b] = getOperands();
        const operator = getOperator();
        
        const expression = `${a} ${operator} ${b}`;
        let correctResult = eval(expression);
        if(questionCorrectnessFlag[i]){
            item.text = `${expression} = ${correctResult}`;
            item.isCorrect = true;		
        } else {
            const incorrectResult = correctResult - getRandomInt(1,4);
            item.text = `${expression} = ${incorrectResult}`;
            item.isCorrect = false;	
        }
        
        questions.push(item);
    }

    return questions;
}

window.generateQuestions = generateQuestions;

function getOperands(){

    // IDEA: we can change range (start, end) when game-difficulty level is increased
    const a = getRandomInt(0, 15);
    const b = getRandomInt(4, 15);

    return [a, b];
}


// IDEA: we can divide when game-difficulty level is increased
const OPERATORS = ['+', '*', '-'];
function getOperator(){
    const idx = getRandomInt(0, OPERATORS.length);
    return OPERATORS[idx];
}

function generateRandomCorrectness(questionCount=10, percentageCorrect=0.6){

    // eg: 7:3  (correct:incorrect ratio) 
    // eg: 6:4  (correct:incorrect ratio)
     
    const output = new Array(questionCount).fill(true);
    let incorrectCount = questionCount - Math.round(questionCount * percentageCorrect);
    const indices = new Set();
    
    while(incorrectCount>0){
        const idx = getRandomInt(0, questionCount); // find random Index from 0 to questionCount-1
        if(!indices.has(idx)){
            indices.add(idx);
            output[idx] = false;
            incorrectCount--;
        }
    }

    return output;
}

/**
 * 
 * @param {number} min 
 * @param {number} max 
 * @returns {Number} random number between min to max-1 range (The maximum is exclusive and the minimum is inclusive)
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
