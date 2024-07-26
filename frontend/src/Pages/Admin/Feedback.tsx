import React, { useState, useEffect } from 'react';
import { FaReply } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './Feedback.css';
import { Link } from 'react-router-dom';

import { TbEdit } from "react-icons/tb";

interface FeedbackItem {
  _id: string;
  fletter: string;
  name: string;
  email: string;
  feedback: string;
}

const Feedback: React.FC = () => {
  const [totalFeedbacks, setTotalFeedbacks] = useState<FeedbackItem[]>([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('http://localhost:5000/all-feedbacks');
      if (!response.ok) {
        throw new Error('Failed to fetch feedbacks');
      }
      const data: FeedbackItem[] = await response.json();
      setTotalFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const deleteFeedback = async (id:string) => {
    try {
      const response = await fetch(`http://localhost:5000/feedbacks/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete feedback');
      }
      alert("This feedback is deleted");
      setTotalFeedbacks(prevFeedback => prevFeedback.filter(feed => feed._id !== id));
    } catch (error) {
      console.error('Error:'+ error);
    }
  };

  return (
    <div className='feedback'>
      <h2>Feedback & Reviews</h2>
      <ul>
        {totalFeedbacks.map((review) => (
          <li key={review._id}>
            <div className='heading'>
              <div className="username">
                <span>F</span>
                <div className="info">
                  <h3>{review.name}</h3>
                  <p>{review.email}</p>
                </div>
              </div>
              <div className="operation">
              <Link to={`/feedback-reply/${review._id}`} title="rename">
                                <TbEdit />
                            </Link>
                <span className="delete" onClick={()=>deleteFeedback(review._id)}><MdDelete /></span>
              </div>
            </div>
            <div className="content">
              <p>{review.feedback}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feedback;
