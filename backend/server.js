const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io')
const app = express();
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')));

// Load Files
const lobby = require('./init/manage-lobby')
const game = require('./init/create-game')
const move = require('./game-logic/moving')

// Set Properties

// Client connects
io.on('connection', socket => {
  let id = socket.id
  console.log('Socket joined: ' + id);

  socket.on('pushName', name => {
    console.log('New Name: ', name);
    let player = {name: name, id: id}
    let allPlayers = lobby.addPlayer(player)
    io.emit('pullName', allPlayers)
  })

  socket.on('pushInvitation', players => {
    console.log('Invite player:', players.invitee.name); 
    // Invite opponent
    io.to(players.invitee.id).emit('pullInvite', players.inviter);
    // Join room
    socket.join(players.inviter.id)
  })

  socket.on('pushAccept', data => {
    console.log('Accepted ', data.room);
    // Create a new game
    let gameState = game.init(data)
    // Join room
    socket.join(data.room)
    //Invite opponent
    io.to(data.room).emit('pullGame', gameState)  
  })

  socket.on('pushDecline', msg => {
    console.log(msg);   
  })

  socket.on('pushMove', move => {
    console.log(move);
  })

  // socket.on('pushMove')
  socket.on('disconnect', () => {
    console.log("A user disconnected " + id);
    let allPlayers = lobby.removePlayer(id);
    io.emit('pullName', allPlayers)
  });

  // socket.on('setMove', data => {
  //   console.log('User move:' + data.x)
  //   startProcess(data)
  // })
})

const PORT = 5555 || process.env.PORT;

server.listen(PORT, () => console.log(`Server runs on port ${PORT}`));
