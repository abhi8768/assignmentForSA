import React, { useState, useEffect } from 'react';
import { QUESTIONS } from "./questions";
import "./index.css";

const NewApp: React.FC = () => {
    const totalQuestion = Object.keys(QUESTIONS).length;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(1);
    const [responses, setResponses] = useState<boolean[]>(Array(totalQuestion).fill(false));
    const [currentScore, setCurrentScore] = useState<number | null>(0);
    const [averageScore, setAverageScore] = useState<number>(0);
    const [finalScore, setFinalScore] = useState<number>(0);
    const [error, setError] = useState<string>("");
    const [value, setValue] = useState<string>("");

    // check scores from localStorage. If present then load the final score
    useEffect(() => {
        const previousScores = JSON.parse(localStorage.getItem('scores') || '[]') as number[];
        if (previousScores.length > 0) {
            const fnlScore = previousScores.reduce((acc, score) => acc + score, 0);
            setFinalScore(fnlScore);
        }

    }, []);

    const handleResponseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value === 'Yes';
        const newResponses = [...responses];
        newResponses[currentQuestionIndex - 1] = value;
        setValue(event.target.value);
        setResponses(newResponses);
    };

    const handleNext = () => {
        if (value == "") {
            //validate field
            setError("Please select any option.");
        } else {
            if (currentQuestionIndex < totalQuestion) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                calculateScore();
            } else {
                calculateScore();
            }
            const dropdown = document.getElementById("answer") as HTMLSelectElement;
            // Deselect any selected option
            dropdown.selectedIndex = 0;
            // remove prev value from state
            setValue("");
        }
    };

    const calculateScore = () => {
        const yesCount = responses.filter(response => response).length;
        const score = (100 * yesCount) / totalQuestion;
        setCurrentScore(score);

        // Save score to localStorage
        if (currentQuestionIndex == totalQuestion) {
            const previousScores = JSON.parse(localStorage.getItem('scores') || '[]') as number[];
            previousScores.push(score);
            localStorage.setItem('scores', JSON.stringify(previousScores));
            setFinalScore(score);
        }
    };

    return (
        <div className="main__wrap">
            <main className="container">
                {finalScore > 0 ? (
                    <div className="final-score">
                        <div className="alert alert-success" role="alert">
                            <h4 className="alert-heading">
                                <p>Thank you !</p>
                                <p>Your final score is : {finalScore >= 0 && finalScore != null ? finalScore.toFixed(2) : 0}</p>
                            </h4>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="score-parent">
                            <button className="btn btn-sm btn-success" >Your Score : {currentScore !== null && currentScore.toFixed(2)}</button>
                        </div>
                        <h1>Questionnaire</h1>
                        <div className="mb-3">
                            <p>{QUESTIONS[currentQuestionIndex]}</p>
                            <select id="answer" className="form-control" onChange={handleResponseChange} >
                                <option value={0}>--Select--</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            <span className="error">{error}</span>
                            <div className="mt-3 next-btn">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-primary"
                                    onClick={handleNext}>
                                    {currentQuestionIndex < totalQuestion ? 'Next' : 'Submit'}
                                </button>
                            </div>

                        </div>
                    </div>
                )}

            </main >
        </div >
    );
};

export default NewApp;
