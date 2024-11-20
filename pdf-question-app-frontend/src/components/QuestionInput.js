import React, { useState, useEffect } from 'react';
import axios from 'axios';

function QuestionInput({ documentId, onAnswer }) {
    const [question, setQuestion] = useState('');

    // Log the documentId whenever it changes
    useEffect(() => {
        console.log("Received documentId:", documentId); // Log the received documentId
    }, [documentId]);

    const handleQuestionSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8000/ask/', {
                document_id: documentId,
                question: question
            });
            onAnswer(response.data.answer);  // Call parent on receiving the answer
        } catch (error) {
            console.error("Error fetching answer:", error);
        }
    };

    return (
        <div className="question-input">
            <input
                type="text"
                placeholder="Ask a question about the PDF"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <button onClick={() => { console.log("Button clicked"); handleQuestionSubmit(); }}>Ask</button>
        </div>
    );
}

export default QuestionInput;
