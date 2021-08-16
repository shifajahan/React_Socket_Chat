const express = require('express');
const socket = require('socket.io');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const server=app.listen("3001", () => {
    console.log("Server listening on port 3001..");
});

const io = socket(server, {
    cors: {
      origin: "http://localhost:3000"
    }
  });
  

io.on('connection', (socket)=>{
    console.log(socket.id);
    socket.on('join_room', (data)=>{
        socket.join(data);
        console.log("User joined the room: " + data);
    })

    socket.on('send_message', (data)=>{
        socket.to(data.room).emit('receive_msg', data.content);
        console.log("message sent")
    })

    socket.on('disconnect', ()=>{
        console.log("User Disconnected")
    })
})