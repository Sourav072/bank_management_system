// src/PdfUploader.js

import React, { useState } from 'react';
import axios from 'axios';
import './PdfUploader.css';

const PdfUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setSelectedFile(file);
            setUploadStatus("");  // Reset status message
        } else {
            setUploadStatus("Please upload a valid PDF file.");
            setSelectedFile(null); // Reset file selection
        }
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            setUploadStatus("No file selected.");
            return;
        }

        setIsLoading(true); // Set loading state
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await axios.post("http://localhost:8000/upload/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setUploadStatus(`Upload successful! File ID: ${response.data.document_id}`);
        } catch (error) {
            console.error("Upload error:", error);  // Log the error for debugging
            setUploadStatus("File upload failed.");
            if (error.response) {
                console.error("Error response:", error.response.data);  // Log the error response if available
            }
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        <div className="pdf-uploader">
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button onClick={handleFileUpload} disabled={isLoading}>
                {isLoading ? "Uploading..." : "Upload PDF"}
            </button>
            <p>{uploadStatus}</p>
        </div>
    );
};

export default PdfUploader;
