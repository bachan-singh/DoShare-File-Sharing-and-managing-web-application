import React, { useState, ChangeEvent, FormEvent } from 'react';
import './Contact.css';
import { IoCallOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5";
import { IconType } from 'react-icons/lib';

interface Feature {
  id: number;
  icon: IconType;
  heading: string;
  content: string;
}

const Contact: React.FC = () => {
  
  const contactList: Feature[] = [
    {
      id: 1,
      icon: IoLocationOutline,
      heading: "Address",
      content: "Bhai Online he hai, bo bhe Localhost pe",
    },
    {
      id: 2,
      icon: IoCallOutline,
      heading: "Lets Talk",
      content: "+91 85012 12453",
    },
    {
      id: 3,
      icon: IoMailOutline,
      heading: "General support",
      content: "john@doshare.com",
    },
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    feedback:''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); 
  };

  const handleValidation = () => {
    let valid = true;
    let errorsCopy = { ...errors }; 
  
    // Name validation
    if (!formData.name) {
      errorsCopy.name = 'Please enter your name';
      valid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(formData.name) || formData.name.length > 30) {
      errorsCopy.name = 'Name must contain only letters and spaces, and be less than 30 characters';
      valid = false;
    } else {
      errorsCopy.name = '';
    }
  
    // Email validation
    if (!formData.email) {
      errorsCopy.email = 'Please enter your email';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errorsCopy.email = 'Please enter a valid email address';
      valid = false;
    } else {
      errorsCopy.email = '';
    }
  
    // Message validation
    if (!formData.feedback || formData.feedback.length < 3 || formData.feedback.length > 300) {
      errorsCopy.feedback = 'Message must be between 3 and 300 characters long';
      valid = false;
    } else {
      errorsCopy.feedback = '';
    }
  
    setErrors(errorsCopy);
  
    return valid;
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Perform form validation
    if (!handleValidation()) {
      return; // Exit if validation fails
    }
    
    try {
        let result = await fetch('http://localhost:5000/feedback',{
            method:"post",
            body:JSON.stringify(formData),
            headers:{
                'Content-Type':'application/json'
            },
        });
        result = await result.json();
        alert("Feedback submitted successfully: " + JSON.stringify(result));
    } catch (error) {
        console.error('Error:', error);
        alert("Error submitting feedback. Please try again.");
    }
};





  return (
    <div className="contact">
      <div className="content">
        <div className="left-side">
          <ul>
            {contactList.map((contact) => (
              <li key={contact.id}>
                <h3>
                  <contact.icon /> {contact.heading}
                </h3>
                <p>{contact.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="contact-form">
        <h2>Get in Touch</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder='Enter Name'
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
          <br/><br/>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='Enter Email'
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <br/><br/>
          <label htmlFor="feedback">Feedback:</label>
          <textarea
            id="feedback"
            name="feedback"
            placeholder='write a message'
            value={formData.feedback}
            onChange={handleChange}
            required
          ></textarea>
          {errors.feedback && <span className="error">{errors.feedback}</span>}
          <br/><br/>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
