const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const app = express();
// const server = http.createServer(app);


app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5555;
const INDEX = '/index.html';

const server = express()
// .use((req, res) => res.send('Hallo'))
.listen(PORT, () => console.log(`Server runs on port ${PORT}`));

const io = socketio(server);

// Load Files
const lobby = require("./init/manage-lobby");
const game = require("./init/create-game");
const move = require("./game-logic/moving");

// Set Properties
let allGames = {};

// Client connects
io.on("connection", (socket) => {
  let id = socket.id;
  console.log("Socket joined: " + id);

  socket.on("getGame", (data) => {
    let gameState = game.init(data);
    allGames[socket.id] = gameState;
    socket.emit("pullRoom", gameState.room)
    socket.emit("pullGame", gameState);
  });

  socket.on("pushName", (name) => {
    console.log("New Name: ", name);
    let player = { name: name, id: id };
    let allPlayers = lobby.addPlayer(player);
    io.emit("pullName", allPlayers);
  });

  socket.on("pushInvite", (players) => {
    io.to(players.invitee.id).emit("pullInvite", players.inviter);
    socket.join(players.inviter.id);
  });

  socket.on("pushAccept", (room) => {
    socket.join(room);
    let gameState = game.init(room);
    allGames[room] = gameState;
    socket.broadcast.emit('pullAccept')

    socket.emit("pullColors", { 
      player: gameState.playerColors[0], 
      opponent: gameState.playerColors[1] }
    );

    socket.broadcast.emit("pullColors", { 
      player: gameState.playerColors[1], 
      opponent: gameState.playerColors[0] }
    );

    io.to(room).emit("pullRoom", room);
    io.to(room).emit("pullGame", gameState);
  });

  socket.on("pushDecline", (msg) => {
    socket.broadcast.emit('pullDecline')
    console.log(msg);
  });

  socket.on("pushMove", (moveInfo) => {
    console.log('playing in room: ' + moveInfo.room);
    let submittedMove = move.submitMove(moveInfo.targetedChip, allGames[moveInfo.room]);
    
    if (submittedMove.isValid) {
      allGames[moveInfo.room] = submittedMove.gameState;
      io.to(moveInfo.room).emit("pullGame", submittedMove.gameState);
    } else {
      console.log("invalid", submittedMove.msg);
      socket.emit("pullInvalidMove", submittedMove.msg);
    }
  });

  socket.on("pushDeselectChip", (moveInfo) => {
    let submittedMove = move.deselectChip(moveInfo.chip, allGames[moveInfo.room])
    io.to(moveInfo.room).emit("pullGame", submittedMove.gameState);
  })

  socket.on("pushPassTurn", (moveInfo) => {
    let submittedMove = move.passTurn(allGames[moveInfo.room])
    io.to(moveInfo.room).emit("pullGame", submittedMove.gameState);
  })

  socket.on("disconnect", () => {
    console.log("A user disconnected " + id);
    let allPlayers = lobby.removePlayer(id);
    io.emit("pullName", allPlayers);
  });
});


