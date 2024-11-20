import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import axios from 'axios';

// Mock the axios module
jest.mock('axios');

describe('App Component', () => {
  test('renders the PDF uploader', () => {
    render(<App />);
    const uploadButton = screen.getByText(/Upload PDF/i);
    expect(uploadButton).toBeInTheDocument();
  });

  test('handles file upload', async () => {
    render(<App />);
    
    const file = new File(['dummy content'], 'example.pdf', { type: 'application/pdf' });
    const input = screen.getByLabelText(/upload pdf/i);
    
    // Simulate file upload
    fireEvent.change(input, { target: { files: [file] } });
    
    // Mock the response from the backend
    axios.post.mockResolvedValueOnce({ data: { document_id: '12345' } });

    const uploadButton = screen.getByText(/Upload PDF/i);
    fireEvent.click(uploadButton);

    // Check upload success message
    const successMessage = await screen.findByText(/Upload successful! File ID: 12345/i);
    expect(successMessage).toBeInTheDocument();
  });

  test('handles question submission', async () => {
    render(<App />);
    
    // Simulate a PDF upload first
    const file = new File(['dummy content'], 'example.pdf', { type: 'application/pdf' });
    const input = screen.getByLabelText(/upload pdf/i);
    fireEvent.change(input, { target: { files: [file] } });
    axios.post.mockResolvedValueOnce({ data: { document_id: '12345' } });
    
    const uploadButton = screen.getByText(/Upload PDF/i);
    fireEvent.click(uploadButton);

    // Now, simulate asking a question
    const questionInput = screen.getByPlaceholderText(/Ask a question about the PDF/i);
    fireEvent.change(questionInput, { target: { value: 'What is this PDF about?' } });
    
    // Mocking the question answer response
    axios.post.mockResolvedValueOnce({ data: { answer: 'This PDF is about testing.' } });
    
    const askButton = screen.getByText(/Ask/i);
    fireEvent.click(askButton);

    // Check if the answer is displayed
    const answer = await screen.findByText(/This PDF is about testing./i);
    expect(answer).toBeInTheDocument();
  });
});
