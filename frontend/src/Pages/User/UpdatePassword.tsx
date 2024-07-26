import React, { useState, ChangeEvent } from 'react';
import '../Form.css';
import FormInput, { FormInputProps } from '../../Components/FormInput';
import UPassword from './UPassword';

interface FormValues {
  email: string;
  currentPassword: string;
  newPassword: string;
}

interface UpdatePasswordProps {}

const UpdatePassword: React.FC<UpdatePasswordProps> = () => {
  const [values, setValues] = useState<FormValues>({
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await UPassword(values.email, values.currentPassword, values.newPassword);
      alert("Password updated successfully!");
    } catch (error) {
      alert('Failed to update password');
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
      errorMessage: "Please enter a valid email address",
      label: "Email",
      required: true,
      value: values.email,
      onChange: handleChange,
    },
    {
      id: 2,
      name: "currentPassword",
      type: "password",
      placeholder: "Enter your current password",
      errorMessage: "Please Enter currect password",
      label: "Current Password",
      pattern: "^[a-zA-Z0-9]{6,8}$",
      required: true,
      value: values.currentPassword,
      onChange: handleChange,
    },
    {
      id: 3,
      name: "newPassword",
      type: "password",
      placeholder: "Enter your new password",
      errorMessage: "New password must be 6-8 characters long ",
      label: "New Password",
      pattern: "^[a-zA-Z0-9]{6,8}$",
      required: true,
      value: values.newPassword,
      onChange: handleChange,
    },
  ];

  return (
    <div className='layout'>
      <h2>Update Account Password</h2>
      <form action="" method="post" onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
          />
        ))}
        <button type="submit" className="updateBtn">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
