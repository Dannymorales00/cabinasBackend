import Server from './server';
import dotenv from 'dotenv';

dotenv.config();
// console.log('Variables de entorno cargadas:', process.env);
const server = new Server();
server.listen();

