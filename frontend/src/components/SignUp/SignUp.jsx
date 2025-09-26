import SignUpView from "./SignUpView";
import React, { useState } from 'react';
import { register } from '../../services/register';
import { login } from '../../services/login';
import { useNavigate } from "react-router-dom";



function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const  handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({
      ...errors,
      [e.target.name]: undefined // clear error on change
    });
  };

const handleSubmit = async (e) => {
  setLoading(true);
  e.preventDefault();

  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    setLoading(false);
    return;
  }
  try {
    const response = await register(formData);

    console.log('You have registered successfully. You are going to be logged in automatically');
    try {
      const loginResponse = await login(formData);
      localStorage.setItem('access_token', loginResponse.data.access_token);
      console.log('login successful');
      setLoading(false);
      navigate('/home');
      window.location.reload();
    } catch (err) {
      console.log('Login after registration failed, try and login manually', err);
      setLoading(false);
    }
  } catch (error) {
    setLoading(false);
    if (error.response?.status === 409) {
      setErrors({ email: error.response.data.message || 'Email already in use' });
      alert(error.response.data.message || 'Email already in use'); 
    } else {
      setErrors({ api: error.response?.data?.message || 'Registration failed' });
      alert(error.response?.data?.message || 'Registration failed');
    }
  }
};

  return (
    <main>
      <SignUpView
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        errors={errors}
        loading= {loading}
      />
    </main>
  );
}

export default SignUp;