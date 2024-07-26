import React, { useState, useEffect } from 'react';
import AddressBar from '../../Components/AddressBar';
import '../Form.css'
import './UploadFile.css'
import { useNavigate } from 'react-router-dom';

const UploadFile: React.FC = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('user');
    let userId = "";
    if (userIdFromStorage) {
      const userData = JSON.parse(userIdFromStorage);
      userId = userData._id;
    }
    setUserId(userId); // Set only the user ID
  }, []);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !file) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', file);
    formData.append('created_by', userId);

    try {
      let result = await fetch('http://localhost:5000/upload', {
        method: "POST",
        body: formData,
      });
      let data = await result.json();
      alert("Submitted");
      console.log(data);
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      setFile(fileList[0]);
    }
  };

  return (
    <div className='layout upload'>
    <AddressBar page="Add New File" />
      <h2>Upload File</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">File Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter file name' required/>
        </div>
        <div className="form-group">
          <label htmlFor="file">Select File:</label>
          <input type="file" id="file" onChange={handleFileChange} required/>
        </div>
        {errorMessage && <span className="error-message">{errorMessage}</span>}
        <button type="submit" className="uploadBtn">Upload</button>
      </form>
    </div>
  );
};

export default UploadFile;
