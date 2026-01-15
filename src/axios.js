import axios from './../node_modules/axios/lib/axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',

});

export default api;