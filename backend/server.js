const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')));

// Client connects
io.on('connection', socket => {
  console.log('Socket connection', socket.id);
  
  socket.on('disconnect', () => {
    console.log("A user disconnected");
  });
  socket.emit('note', 'works')

  socket.on('msg', data => {
    console.log('User said:' + data.a)
  })
})



app.get('/', (req, res) => {
  res.send('hello');
  })

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server runs on port ${PORT}`));
