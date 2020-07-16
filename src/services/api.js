import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://192.168.31.15:3334' // Postgres
    baseURL: 'http://192.168.31.15:5000' // Onto
});

export default api;