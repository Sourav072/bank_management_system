// src/App.js

import React, { useState } from 'react';
import PdfUploader from './PdfUploader';
import QuestionInput from './components/QuestionInput';  // Import the QuestionInput component
import './App.css';
import { AiOutlineFileText, AiOutlinePlus } from 'react-icons/ai';

const App = () => {
    const [documentId, setDocumentId] = useState(null);  // State to hold the uploaded document ID
    const [answer, setAnswer] = useState('');  // State to hold the answer from the backend

    const handleUploadSuccess = (id) => {
        setDocumentId(id);  // Update document ID after successful upload
    };

    const handleAnswer = (newAnswer) => {
        setAnswer(newAnswer);  // Update answer when received from the backend
    };

    return (
        <div className="app-container">
            {/* Header Section */}
            <header className="header">
                <div className="logo">
                    <span>SK</span>
                </div>
                <div className="header-icons">
                    <AiOutlineFileText className="icon" />
                    <AiOutlinePlus className="icon" />
                </div>
            </header>

            {/* PDF Upload Section */}
            <div className="upload-section">
                <h1>PDF Upload</h1>
                <PdfUploader onUploadSuccess={handleUploadSuccess} />
            </div>

            {/* Question Input Section */}
            {documentId && (
                <div className="question-section">
                    <h2>Ask a Question about the PDF</h2>
                    <QuestionInput documentId={documentId} onAnswer={handleAnswer} />
                </div>
            )}

            {/* Answer Display Section */}
            {answer && (
                <div className="answer-display">
                    <h2>Answer:</h2>
                    <p>{answer}</p>
                </div>
            )}

            {/* Chat Interface (Optional, can be removed) */}
            <div className="chat-container">
                <div className="user-message">
                    <span className="user-icon">S</span>
                    <p>explain like im 5</p>
                </div>
                <div className="ai-message">
                    <span className="ai-icon">ai</span>
                    <p>
                        Our own Large Language Model (LLM) is a type of AI that can learn from data. We have trained it on 7 billion parameters which makes it better than other LLMs. We are featured on aiplanet.com and work with leading enterprises to help them use AI securely and privately. We have a Generative AI Stack which helps reduce the hallucinations in LLMs and allows enterprises to use AI in their applications.
                    </p>
                </div>
            </div>

            {/* Message Input (Optional, can be removed) */}
            <footer className="input-container">
                <input type="text" placeholder="Send a message..." />
                <button type="submit">Send</button>
            </footer>
        </div>
    );
};

export default App;
