import React from "react";
import './answerDisplay.css'; // Ensure the correct path to your CSS file

function AnswerDisplay({ answer, isLoading, error }) {
    return (
        <div className="answer-display">
            <h2>Answer:</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: "red" }}>Error: {error}</p>
            ) : (
                <p>{answer || "No answer available."}</p>
            )}
        </div>
    );
}

export default AnswerDisplay;
