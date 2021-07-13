import axios from 'axios';

const api = axios.create({
    baseURL: 'http://200.131.52.32:3001'
});

export default api;
