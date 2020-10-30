import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.31.106:3001'
});

export default api;
