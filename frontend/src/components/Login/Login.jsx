import LoginView from "./LoginView";
import React, { useState } from 'react';
import {login} from '../../services/login';
import { useNavigate } from 'react-router-dom';





function Login(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
    
      const [errors, setErrors] = useState({});
      const [emailFound, setEmailNotFound] = useState(true);
    
      const validate = () => {
        const newErrors = {};
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        return newErrors;
      };
    
      const  handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
        setErrors({
          ...errors,
          [e.target.name]: undefined 
        });
      };
    
    const handleSubmit = async (e) => {
      setLoading(true);
    
    
        const validationErrors = validate();
        
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
        try {
        
        const response = await login(formData);


          localStorage.setItem('access_token', response.data.access_token); 

          console.log('response', response.data.access_token);

          console.log('login successful:', response.data);
          setLoading(false);
          
          navigate('/home');
          window.location.reload();

        } catch (error) {
            setLoading(false);
            if(error.status === 404 || error.status === 401){
              setEmailNotFound(false);
              alert('Your email or password is incorrect. Please try again.');
            }

        }
    };
    
      return (
        <main>
          <LoginView
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            formData={formData}
            errors={errors}
            emailFound={emailFound}
            loading = {loading}
          />
        </main>
      );
}

export default Login;