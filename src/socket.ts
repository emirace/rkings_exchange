import { io } from 'socket.io-client';
import { baseURL } from './services/api';

const socket = io(`${baseURL}`);
export const socketBinance = io(`${baseURL}/binance`);

export const socketNotification = io(`${baseURL}/notification`);

export default socket;
