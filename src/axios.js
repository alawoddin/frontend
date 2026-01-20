import axios from './../node_modules/axios/lib/axios';

const api = axios.create({
  baseURL: 'https://laravel-react.khedmat.website/api',

});

export default api;