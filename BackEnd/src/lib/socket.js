import express from 'express';
import http from 'http';  
import { Server } from 'socket.io';  

const app = express();  
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin:['http://localhost:5173']
    }
} 
);
const users = {};

export const getRecieiverSocketId = (recieverId) => {
    return users[recieverId];
}
io.on('connection', (socket) => {
    console.log('a user connected',socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) users[userId] = socket.id;

  io.emit('onlineUsers', Object.keys(users));
    socket.on('disconnect', () => {
        console.log('user disconnected',socket.id);
        delete users[userId];

        io.emit('onlineUsers', Object.keys(users));
    });
});

export { io, server ,app};