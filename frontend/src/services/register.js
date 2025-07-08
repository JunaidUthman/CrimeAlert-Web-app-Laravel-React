import apiClient from '../utils/apiClient';

const API_URL = 'http://localhost:8000/api'; // Change this to your Laravel API base URL

export const register = async (formData) => {
  // formData: { fullName, email, password, confirmPassword }
  return apiClient.post(`/register`, {
    fullName: formData.fullName,
    email: formData.email,
    password: formData.password,
  });
};