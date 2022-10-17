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
- 