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
 
 var ankit = 2;
 var ankittwo = 0;
io.on('connection', (socket) => {
  console.log('a user connected');
    socket.on('chat message', (room) => {  
        io.to(room.link).emit('message', room);
    });
    socket.on('chat link',(link)=>{
            if(linkArray.includes(link)){
              if(ankittwo<ankit){
                ankittwo++;
                socket.join(link);
                socket.emit("room found");
              }else{
                socket.emit("limit exceed");
              }
            }
            else{
              socket.emit("room does not exist");
            }
    });
    socket.on('link',(chatRoomLink)=>{
      socket.join(chatRoomLink);
      linkArray.push(chatRoomLink);
      console.log("*",linkArray);
    });
    socket.on('disconnect', function () {
      console.log('Client disconnected');
      ankittwo--;
    });
  });
 
server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});