import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3005/',
  timeout: 4000,
});

export default instance;
