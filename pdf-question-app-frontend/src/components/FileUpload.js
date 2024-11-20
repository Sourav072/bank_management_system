import React, { useState } from 'react';
import axios from 'axios';

function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null); // Reset error when file changes
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    
    const formData = new FormData();
    formData.append('file', file);
    
    setIsLoading(true); // Set loading state
    setError(null); // Reset error before upload

    try {
      const response = await axios.post('http://localhost:8000/upload/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onUploadSuccess(response.data.document_id);  // Call parent on success
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Error uploading file. Please try again."); // Set error message
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="file-upload">
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isLoading}>Upload PDF</button>
      {isLoading && <p>Uploading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default FileUpload;
