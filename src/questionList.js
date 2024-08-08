import React, { useState } from "react";
import "./index.css";

const QuestionList = (props) => {

    const allQuestion = props.qstnList;
    const totalQuestion = Object.keys(allQuestion).length;
    const [list, setList] = useState(allQuestion[1]);
    const [value, setValue] = useState(0);
    const [error, setError] = useState("");
    const [count, setCount] = useState(1);

    const handleChange = (e) => {
        setValue(e.target.value);
    }
    const handleNext = (e) => {
        if (value === 0) {
            //validate field
            setError("Please select any option.");
        } else {
            setError("");
            setCount((prev) => prev + 1)
            //use callback for score calculation
            props.getAnsProps(value);
            //set next question
            setList(allQuestion[count + 1]);
            const dropdown = document.getElementById("answer");
            // Deselect any selected option
            dropdown.selectedIndex = 0;
            // remove prev value from state
            setValue(0);
        }
    }
    return (
        <div className="create-form">
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Q. {list}</label>
                <select id="answer" className="form-control" onChange={handleChange}>
                    <option value={0}>--Select--</option>
                    <option value={"yes"}>YES</option>
                    <option value={"no"}>NO</option>
                </select>
                <span className="error">{error}</span>
            </div>
            <div className="mb-3 next-btn">
                <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={handleNext}
                >
                    {count === totalQuestion ? "Submit" : "Next"}

                </button>
            </div>
        </div>
    );
}
export default QuestionList;