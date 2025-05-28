import axios from 'axios';

export const axiosPublic = axios.create({
  baseURL: 'https://stu.globalknowledgetech.com:445',
  headers: {
    'Content-Type': 'application/json',
  },
});
