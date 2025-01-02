import { io } from 'socket.io-client'

const socket = io('http://localhost:8888', {
  withCredentials: true
})

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
})

export default socket