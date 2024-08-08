import React from "react";
import "./index.css";

const Score = (props) => {
    return(
        <div className="score-parent">
           <button className="btn btn-sm btn-success" >Your Score : {props.score >= 0 ? props.score : 0}</button>
        </div>
    );
}
export default Score;