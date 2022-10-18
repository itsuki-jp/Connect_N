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

// listen on the connection event for incoming sockets
io.on('connection', (socket) => {
    console.log('a user connected');

    // when special event "disconnect event" fired
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// We make the http server listen on port 3000
server.listen(3000, () => {
    console.log('listening on *:3000');
});