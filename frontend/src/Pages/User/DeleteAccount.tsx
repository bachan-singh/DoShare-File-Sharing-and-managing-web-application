import React, { useState, ChangeEvent } from 'react';
import '../Form.css';
import FormInput, { FormInputProps } from '../../Components/FormInput';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  email: string;
  password: string;
}

interface DeleteAccountProps {}

const DeleteAccount: React.FC<DeleteAccountProps> = () => {
  const [values, setValues] = useState<FormValues>({
    email: "",
    password: "",
  });
   const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        alert('Account deleted successfully');
        navigate("/register")
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete account');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete account');
    }
  };


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const inputs: FormInputProps[] = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "John@gmail.com",
      errorMessage: "Please Enter Correct Email",
      label: "Email",
      required: true,
      value: values.email,
      onChange: handleChange,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "John@123",
      errorMessage: "Password must be 6-8 characters long",
      label: "Password",
      pattern: "^[a-zA-Z0-9]{6,8}$",
      required: true,
      value: values.password,
      onChange: handleChange,
    },
  ];

  return (
    <div className='layout'>
      <h2>Delete Account Permanently</h2>
      <form action="" method="post" onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
          />
        ))}
        <button type="submit" className="deleteBtn">
          Delete
        </button>
      </form>
    </div>
  );
};

export default DeleteAccount;
