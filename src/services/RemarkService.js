import axios from 'axios';
import { getToken } from './AuthService';

const API = 'https://localhost:62423/api/Remarks';

export const fetchRemarks = async (ticketId) => {
  const res = await axios.get(`${API}/${ticketId}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};

export const addRemark = async (ticketId, content) => {
  const res = await axios.post(API, { ticketId, content }, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};