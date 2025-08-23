import apiClient from '../utils/apiClient';


export const register = async (formData) => {
  // formData: { fullName, email, password, confirmPassword }
  return apiClient.post(`/register`, {
    fullName: formData.fullName,
    email: formData.email,
    password: formData.password,
  });
};