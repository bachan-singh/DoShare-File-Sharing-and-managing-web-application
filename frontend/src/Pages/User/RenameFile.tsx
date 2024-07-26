import React, { useState, ChangeEvent } from 'react';
import '../Form.css';
import './Models.css';
import FormInput, { FormInputProps } from '../../Components/FormInput';
import { useNavigate, useParams } from 'react-router-dom';

const RenameFile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [values, setValues] = useState<{ [key: string]: string }>({
    newFilename: '',
  });

 

  const inputs: FormInputProps[] = [
    {
      id: 1,
      name: 'newFilename',
      type: 'text',
      placeholder: 'Enter new filename',
      errorMessage: 'Only strings and numbers are valid',
      label: 'New File Name',
      pattern: '^[a-zA-Z0-9]{3,10}$',
      required: true,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { newFilename } = values;
    try {
      const response = await fetch(`http://localhost:5000/files/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: newFilename }),
      });
      if (!response.ok) {
        throw new Error('Failed to update filename');
      }
      alert('File name updated successfully');
      navigate('/');
    } catch (error) {
      console.error('Error updating filename:', error);
      alert('Failed to update filename');
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="modelContainer">
      <div className="model">
        <h2>Rename File</h2>
        <form onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
          ))}
          <button type="submit" className="updateBtn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default RenameFile;
