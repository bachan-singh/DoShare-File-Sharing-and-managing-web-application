import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import FormInput, { FormInputProps } from './FormInput';
import './Login.css';
import './Form.css';
import registerImg from '../Pages/photos/signup-image.jpg';
import { Link, useNavigate } from 'react-router-dom';

interface FormValues {
    name: string;
    email: string;
    password: string;
    confirmpassword: string;
}

const Register: React.FC = () => {

    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
            navigate("/home");
        }
    },[])
    
    const [values, setValues] = useState<FormValues>({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
    });

    const inputs: FormInputProps[] = [
        {
            id: 1,
            name: "name",
            type: "text",
            placeholder: "John",
            errorMessage: "Please Enter Characters Only",
            label: "Name",
            pattern: "^[a-zA-Z]{3,20}$",
            required: true,
            value:values.name,
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "John@gmail.com",
            errorMessage: "Please Enter Correct Email",
            label: "Email",
            required: true,
            value:values.email,
        },
        {
            id: 3,
            name: "password",
            type: "password",
            placeholder: "John@123",
            errorMessage: "Password must contain 6 to 8 letters including characters and numbers only.",
            label: "Password",
            pattern: "^[a-zA-Z0-9]{6,8}$",
            required: true,
            value:values.password
        },
        {
            id: 4,
            name: "confirmpassword",
            type: "password",
            placeholder: "John@123",
            errorMessage: "Password did not match",
            label: "Confirm Password",
            pattern: values.password,
            required: true,
            value:values.confirmpassword,
        },
    ];

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        let result =  await fetch('http://localhost:5000/register',{
            method:"post",
            body:JSON.stringify(values),
            headers:{
                'Content-Type':'application/json'
            },
        })
        result = await result.json();
        alert("Submited")
        localStorage.setItem("user",JSON.stringify(result))
        navigate("/");
    };
    

    
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
    };


    return (
        <div className="container">
            <div className="content">
                <div className="form-side">
                    <h2>Create an Account</h2>
                    <form action="" method="post" onSubmit={handleSubmit}>
                        {inputs.map((input, key) => (
                            <FormInput
                                key={key}
                                {...input}
                                onChange={onChange}
                            />
                        ))}
                        <button type="submit">Submit</button>
                        <p>Already have an Account?
                            <Link to="/login">Click here</Link>
                        </p>
                    </form>
                </div>
                <div className="image-side">
                    <img src={registerImg} alt="Register Img" />
                </div>
            </div>
        </div>
    );
};

export default Register;
