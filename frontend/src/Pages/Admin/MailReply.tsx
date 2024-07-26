import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './MailReply.css'

const MailReply: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/mail/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, subject, body }),
      });

      if (!response.ok) {
        throw new Error('Failed to send reply');
      }

      alert('Reply sent successfully');
      navigate('/');
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Failed to send reply');
    }
  };

  return (
    <div className="modelContainer">
      <div className="model">
        <h2>Reply To</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter receiver email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Subject:</label>
            <input
              type="text"
              placeholder="Enter Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              pattern="^[a-zA-Z0-9 ]{3,40}$"
            />
          </div>
          <div className="form-group">
            <label>Message:</label>
            <textarea
              placeholder="Enter reply..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">Send Reply</button>
        </form>
      </div>
    </div>
  );
};

export default MailReply;
