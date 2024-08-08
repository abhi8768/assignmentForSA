import React from "react";
import "./index.css";

const FinalScore = (props) => {
    return (
        <div className="final-score">
            <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">
                    <p>Thank you !</p>
                    <p>Your final score is : {props.score >= 0 && props.score != null ? props.score : 0}</p>
                </h4>
            </div>
        </div>
    );
}
export default FinalScore;