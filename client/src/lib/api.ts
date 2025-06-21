import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/user", 
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
