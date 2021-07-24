const DEFAULT_STORAGE_KEY = "__DC_GAMES_MATH__";

function serialize(data){
    return JSON.stringify(data);
}

function set(key, data=null){
    if(!Boolean(data)){
        return;
    }

    localStorage.setItem(key, serialize(data));
}

function get(key){
    if(!key){
        key=DEFAULT_STORAGE_KEY;
    }

   const data = localStorage.getItem(key);
   return JSON.parse(data); // we can create deserialize, but right it feels like overkill
}

function saveBestScore(currentScoreResult, roundTypeId){
    // fetch data from localStorage
    const storedData = get();

    let isBestScore = false;

    if(!storedData){ // nothing was saved earlier hence its best score (first play)
        isBestScore = true;
    } else {
        if(!storedData[roundTypeId]){
            isBestScore = true;
        } else {
            if(storedData[roundTypeId].incorrectCount > currentScoreResult.incorrectCount){
                isBestScore = true;
            } else if (storedData[roundTypeId].incorrectCount == currentScoreResult.incorrectCount){
                // if incorrectCount is same then check finalScore timings
                isBestScore = storedData[roundTypeId].finalTime > currentScoreResult.finalTime;
            }
        }
    }

    if(isBestScore){
        let newData={};
        if(!storedData){
            newData = {[roundTypeId]: currentScoreResult};
        }else {
            newData = {...storedData, [roundTypeId]: currentScoreResult};
        }

        set(DEFAULT_STORAGE_KEY, newData);
    }

    return isBestScore;
}

export default {set, get, saveBestScore};
