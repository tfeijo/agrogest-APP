import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://192.168.31.15:3334' // Postgres
    // baseURL: 'http://192.168.31.15:3001' // Onto
    baseURL: 'http://agrogest-embrapa.ddns.net:11032' // Onto
});

export default api;