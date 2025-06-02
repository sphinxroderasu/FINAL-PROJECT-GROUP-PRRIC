import axios from 'axios';
const API = 'http://localhost:62423/api/Auth';


export const login = async (email, password) => {
  const res = await axios.post(`${API}/login`, { email, password });
  localStorage.setItem('token', res.data.token);
  return res.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => localStorage.getItem('token');