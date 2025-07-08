import SignUpView from "./SignUpView";
import React, { useState } from 'react';
import { register } from '../../services/register';


function SignUp() {
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

    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await register(formData);
      // Handle success (e.g., show a message, redirect, etc.)
      console.log('Registration successful:', response.data);
    } catch (error) {
      // Handle error (e.g., show error message)
      if (error.response && error.response.data) {
        setErrors({ api: error.response.data.message || 'Registration failed' });
      } else {
        setErrors({ api: 'Registration failed' });
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
      />
    </main>
  );
}

export default SignUp;