import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import FormInput, { FormInputProps } from './FormInput'
import './Form.css';
import './Login.css';
import LoginImg from '../Pages/photos/signin-image.jpg';
import { Link, useNavigate } from 'react-router-dom';

interface FormValues {
    email: string;
    password: string;
    role: string;
}

const Login: React.FC = () => {
    const [values, setValues] = useState<FormValues>({
        email: "",
        password: "",
        role:"",
    });
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
            navigate("/home");
        }
    },[])
    const inputs: FormInputProps[]= [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "John@gmail.com",
            errorMessage: "Please Enter Correct Email",
            label: "Email",
            value: values.email,
            required: true,
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "John@123",
            errorMessage: "Password must contain 6 to 8 letters including characters and numbers only.",
            label: "Password",
            pattern: "^[a-zA-Z0-9]{6,8}$",
            required: true,
            value: values.password,
        },
        {
            id: 3,
            name: "role",
            type: "text",
            placeholder: "Enter : user",
            errorMessage: "Please enter role only",
            label: "Role",
            value: values.role,
            required: true,
        },
    ];

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password, role} = values;
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password, role }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let data = await result.json();
        if (data && data.email === email && data.role === role) {
            localStorage.setItem('user', JSON.stringify(data));
            navigate("/")
        } else {
            alert("Please enter connect details")
            console.log(data);
        }
    };
      

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
    };

    return (
        <div className="container">
            <div className="content">
                <div className="form-side">
                    <h2>Sign In</h2>
                    <form action="" method="post" onSubmit={handleSubmit}>
                        {inputs.map((input, key) => (
                            <FormInput
                            key={input.id}
                            {...input}
                            onChange={onChange}
                          />
                        ))}
                        <button type="submit">Submit</button>
                        <p>Don't have an Account?
                            <Link to="/register">Click here</Link>
                        </p>
                    </form>
                </div>
                <div className="image-side">
                    <img src={LoginImg} alt="Login Img" />
                </div>
            </div>
        </div>
    );
};

export default Login;
