import apiClient from '../utils/apiClient';



export const login = async (formData) => {
  return apiClient.post(`/login`, {
    email: formData.email,
    password: formData.password,
  });
};

export const isLoggedin = ()=>{
    return localStorage.getItem('access_token') !== null;
}

export const logout = async()=>{
    alert('Logout successful');
    await apiClient.post('/logout');

    localStorage.removeItem('access_token');
    return ('Logout successful');
}