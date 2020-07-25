import axios from 'axios';
const api = axios.create({baseURL: 'http://agrogest-embrapa.ddns.net:11032'}); export default api;
