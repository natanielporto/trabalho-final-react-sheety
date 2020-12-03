import axios from 'axios';

const Database = axios.create({
  baseURL:
    'https://api.sheety.co/3f0a02a8040b1d01f8f7534cf7360a8f/lojaDeMusica/',
});

export default Database;
