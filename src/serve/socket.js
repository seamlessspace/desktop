import io from 'socket.io-client';
import BASE_URL from './config';

export default function () {
    const socket = io(BASE_URL);
    socket.emit('updateInfo', {
        desc: 'My MacBook Pro',
        nickname: 'Laptop',
        device_type: 2,
    });
    return socket;
}
