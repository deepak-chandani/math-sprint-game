import React from "react";

function Footer({children, score=false}){
    const scoreCss = score ? "score" : "";
    return (
        <div className={`footer ${scoreCss}`}>
            {children}
        </div>
    )
}

export default React.memo(Footer);