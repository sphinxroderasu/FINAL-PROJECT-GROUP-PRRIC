import axios from 'axios';
import { getToken } from './AuthService';

const API = 'http://localhost:62423/api/Tickets';


export const fetchTickets = async () => {
  const res = await axios.get(API, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};

export const fetchTicketById = async (id) => {
  const res = await axios.get(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};