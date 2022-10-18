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
   2. 

## Serving HTML

- res.send()
  - passing a string of HTML
  - the code would look bery confusing if we just placed our entire application's HTML.
    - so we use sendFile instead

## Integrating Socket.IO

- What is Socket.IO what is it composed from?
  - A server that integrates with (or mounts on) the Node.js HTTP Server socket.io
  - A client library that loads in the browser side socket.io-client
- How to install socket.io
  - ```npm install socket.io```
- Load client-side JS file
  - ```node_modules/socket.io/client-dist/socket.io.js```
- What can it do?
  - you(user?) can send and receive any events you want, with any data you want
- Data type which socket.io can handle
  - any objects that can be encoded as JSON will do
  - binary data

## Emitting events
- Event
  - disconnect
  - 