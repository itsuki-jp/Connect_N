// Express initializes app to be a function handler that you can supply to an HTTP server(as seen in line4)
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

// Initialize a new instaince of socket.io by passing the server(the HTTP server) object
const { Server } = require('socket.io');
const io = new Server(server);

// We define a route handler `/` that gets called when we hit out website home.
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('game.html', (req, res) => {
    res.sendFile(__dirname + '/game.html');
})

// Room Info
/*
    {roomId:{
        clients:[ID_A, ID_B],
        boardSize:{x:, y:},
        board:[[],[]],
        currentTurn:index of clients(0/1),
        
    }}
*/
const roomObj = {}

// listen on the connection event for incoming sockets
io.on('connection', (socket) => {
    console.log('a user connected');

    // when special event "disconnect event" fired
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    // join room event
    socket.on('join room', (roomId) => {
        console.log('user ID:', socket.id);
        console.log('Try: Enter Room Id: ' + roomId);
        console.log(roomObj);
        if (!(roomId in roomObj)) {
            console.log('Room not found');
            return;
        }
        if (roomObj[roomId].clients.length !== 1) {
            console.log('The room is full');
            return;
        }
        socket.join(roomId);
        roomObj[roomId].clients.push(socket.id);
        console.log(roomObj);
    });

    // create room event
    socket.on('create room', (sizeX, sizeY) => {
        console.log('user ID:', socket.id);
        let roomId = undefined;
        for (; ;) {
            roomId = ("0000" + Math.random() * 1000).slice(-4);
            if (roomId in roomObj) { continue; }
            break;
        }
        console.log('created roomId: ' + roomId);
        socket.join(roomId);
        roomObj[roomId] = {
            clients: [socket.id],
            boardSize: { x: sizeX, y: sizeY },
        };
        // Todo: Init board using the size given
    });
});

// We make the http server listen on port 3000
server.listen(3000, () => {
    console.log('listening on *:3000');
});