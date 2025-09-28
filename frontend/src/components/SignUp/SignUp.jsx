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
    confirmPassword: '',
    lat: '',
    lng: ''
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
    if (!formData.lat) newErrors.lat = "Latitude is required";
    if (!formData.lng) newErrors.lng = "Longitude is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({
      ...errors,
      [e.target.name]: undefined // clear error on change
    });
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setErrors({
            ...errors,
            lat: undefined,
            lng: undefined
          });
        },
        (error) => {
          setErrors({
            ...errors,
            lat: "Could not get location",
            lng: "Could not get location"
          });
        }
      );
    } else {
      setErrors({
        ...errors,
        lat: "Geolocation not supported",
        lng: "Geolocation not supported"
      });
    }
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
        handleGetLocation={handleGetLocation}
        formData={formData}
        errors={errors}
        loading={loading}
      />
    </main>
  );
}

export default SignUp;