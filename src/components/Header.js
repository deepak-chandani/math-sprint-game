import React from "react";

function Header({children}){
    return (
        <div className="header">
            {children}
        </div>
    )
}

export default React.memo(Header);