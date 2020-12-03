import axios from 'axios';

const Database = axios.create({
  baseURL:
    'https://api.sheety.co/a5e59e5039d3e822c09cd977663c025c/lojaDeMusica/',
});

export default Database;
