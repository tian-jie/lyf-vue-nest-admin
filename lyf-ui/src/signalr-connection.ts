import { io } from 'socket.io-client'
import { API_BASE } from './api/common'

const socket = io(API_BASE, {
  withCredentials: true
})

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
})

export default socket