import axios from 'axios';

   export const axiosPublic = axios.create({
        baseURL: "http://stu.globalknowledgetech.com:5003",
        // baseURL:"https://digital.globalknowledgetech.com:8343/stuV3/stu/",
        headers: {
          "Content-Type": "application/json",
        },
      });
  

