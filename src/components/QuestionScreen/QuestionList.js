import React, { useEffect } from "react";

function QuestionList({currentId, questions}) {
    const valueYRef = React.useRef(-48);
    const itemContainerRef = React.createRef();

    useEffect(() => {
        valueYRef.current += 48;
        itemContainerRef.current.scroll(0, valueYRef.current);
    }, [currentId])

    return (
        <div className="question-list-container" ref={itemContainerRef}>
            {
                questions.map(item => {
                    const selectedCss = currentId === item.id ? "selected" : "";
                    return (
                        <div key={item.id} className={`question-item ${selectedCss}`}><h1>{item.text}</h1></div>
                    )
                })
            }
            <div className="height-240"><p></p></div>
        </div>
    )
}

export default QuestionList;
// export default React.forwardRef(QuestionList);
