const socket = io();

var messages = document.getElementById('messages');
const form = document.getElementById("form");
const input = document.getElementById("joinRoomInput");

document.getElementById('joinRoomForm').addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("joinRoomInput");
    // Todo: numeric check(input.value)
    if (input.value) {
        socket.emit("join room", input.value);
        input.value = "";
    }
});

document.getElementById('createRoomForm').addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("click");
    const sizeX = document.getElementById("sizeX").value;
    const sizeY = document.getElementById("sizeY").value;
    const n = document.getElementById("n").value;
    // Todo: numeric check(sizeX.value, sizeY.value)
    socket.emit("create room", parseInt(sizeX), parseInt(sizeY), parseInt(n));
});

socket.on("start game", () => {
    console.log("start game");
    document.write("<h1>GAME</h1>");
})