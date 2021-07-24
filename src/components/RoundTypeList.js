import React from "react";
import RoundTypesModel from "../models/RoundTypesModel";
import Storage from "../utils/Storage";

function RoundTypeList({ selectedId, onSelect }) {
    const roundTypes = RoundTypesModel.getAll();
    const bestScores = Storage.get();
    console.log(bestScores);

    return (
        <div className="round-type-list-container">
            {roundTypes.map(type => {
                const selectedCss = selectedId === type.id ? "selected" : "";
                const best = bestScores && bestScores[type.id] ? bestScores[type.id].finalTime : false;
                return (
                    <div key={type.id} onClick={() => onSelect(type.id)} className={`round-type-item ${selectedCss}`}>
                        <p>{type.text}</p>
                        {best && (
                            <span className="best-score">
                                <span>Best Score</span> <br />
                                <span className="best-score-value">{best}s</span>
                            </span>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default RoundTypeList;