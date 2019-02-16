import io from 'socket.io-client';
import BASE_URL from './config';

export default function () {
    return io(BASE_URL);
}
