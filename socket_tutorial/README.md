<a href="https://socket.io/get-started/chat">やってるやつ</a>

## The web framework

1. package.jsonを書く
```json
{
  "name": "socket-chat-example",
  "version": "0.0.1",
  "description": "my first socket.io app",
  "dependencies": {}
}
```
2. npm install express@4
3. node index.js でサーバーを立ち上げる。
   1. <a hred="http://localhost:3000">http://localhost:3000</a>

## Serving HTML

- res.send()
  - passing a string of HTML
  - the code would look bery confusing if we just placed our entire application's HTML.
    - so we use sendFile instead

## Integrating Socket.IO

- What is Socket.IO, what is it composed from?
  - A server that integrates with (or mounts on) the Node.js HTTP Server socket.io
  - A client library that loads in the browser side socket.io-client
- How to install socket.io
  - ```npm install socket.io```
- Load local client-side JS file
  - ```node_modules/socket.io/client-dist/socket.io.js```

## Emitting events
- What can it do?
  - you(user?) can send and receive any events you want, with any data you want
- Data type which socket.io can handle
  - any objects that can be encoded as JSON will do
  - binary data
- Event
  - index.html
    - fire event by writing ```socket.emit('some event')```
  - index.js
    - handle event by writing ```socket.on('some event',(arg)=>{});``` inside ```io.on('connection',(socket)=>{});```

## Broadcasting

- what is broadcasting?
  - emit the event from the server to the rest of the users.
- How to broadcast to all connected sockets
  - ```io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });```
- boradcast flag
  - send message to everyone except for certain emitting socket
```js
io.on('connection', (socket) => {
  socket.broadcast.emit('hi');
});
```
    - 