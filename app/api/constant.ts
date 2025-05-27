import axios from 'axios';

   export const axiosPublic = axios.create({
        baseURL: "http://stu.globalknowledgetech.com:5003",
        headers: {
          "Content-Type": "application/json",
        },
      });
  

