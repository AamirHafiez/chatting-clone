import Pusher from 'pusher-js';
export const pusher = new Pusher('29cfa83648e5bb2d21cb', {
    cluster: 'ap2',
    encrypted: true,
    authEndpoint: 'http://localhost:8000/pusher/auth'
});