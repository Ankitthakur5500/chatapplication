import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
 
const app = express();
const server = createServer(app);
const io = new Server(server,{
  cors:{
    origin:"*"
  }
});

 let linkArray = [];

io.on('connection', (socket) => {
  console.log('a user connected');
    socket.on('chat message', (room) => {  
        io.to(room.link).emit('message', room);
    });
    socket.on('chat link',(link)=>{
            socket.join(link);
    });
    socket.on('link',(chatRoomLink)=>{
      socket.join(chatRoomLink);
      linkArray.push(chatRoomLink);
      console.log("aaaa",linkArray);
    });
  });
 
server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});