import axios from 'axios';

const api = axios.create({
    baseURL: 'http://agrogest-embrapa.ddns.net:11037'
    // Onto    // baseURL: 'http://192.168.31.15:3334' // Postgres
});

export default api;
