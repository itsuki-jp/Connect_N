let playMode = undefined;
const tileX = 30;
const tileY = 30;

class Board {
    constructor(x, y, n, board, turn) {
        this.x = x;
        this.y = y;
        this.white = 0;
        this.black = 1;
        this.blank = 9;
        this.currentTurn = turn;
        this.n = n;
        this.board = board;
    }

    copy(board) {
        const tmp_board = []
        for (const line of board) tmp_board.push(line.concat());
        return new Board(this.y, this.x, this.n, tmp_board, this.currentTurn);
    }

    getStone(x, y) {
        return this.board[y][x];
    }

    putStone(x, y) {
        this.board[y][x] = this.currentTurn;
    }

    /** return [(x,y),..] */
    getPlaceablePosArr() {
        const res = []
        for (let i = 0; i < this.y; i++) {
            for (let j = 0; j < this.x; j++) {
                if (this.board[i][j] === this.blank) {
                    res.push([j, i]);
                }
            }
        }
        return res;
    }

    checkBoardLine(x, y, dx, dy) {
        const mxX = this.x;
        const mxY = this.y;
        let count = 0
        for (let i = 0; i < this.n; i++) {
            if (x < 0 || mxX <= x || y < 0 || mxY <= y) return false;
            count += this.currentTurn === this.board[y][x];
            x += dx;
            y += dy;
        }
        return count === this.n;
    }

    checkGameEnd() {
        let isGameEnd = false;
        // Better: 全探索でも良いが、尺取法の方が計算量落ちる
        for (let i = 0; i < this.y; i++) {
            for (let j = 0; j < this.x; j++) {
                isGameEnd |= this.checkBoardLine(j, i, 0, 1);
                isGameEnd |= this.checkBoardLine(j, i, 1, 0);
                isGameEnd |= this.checkBoardLine(j, i, 1, 1);
                isGameEnd |= this.checkBoardLine(j, i, -1, 1);
            }
        }
        console.log(isGameEnd);
        return isGameEnd;
    }

    checkPlaceable(x, y) {
        if (this.getStone(x, y) !== this.blank) return false;
        return true;
    }

    changeTurn() {
        this.currentTurn ^= 1;
    }
}

document.getElementById('lv1').addEventListener('click', () => {
    playMode = 1;
    askGameInfo();
})
document.getElementById('lv2').addEventListener('click', () => {
    playMode = 2;
    askGameInfo();
})
document.getElementById('lv3').addEventListener('click', () => {
    playMode = 3;
    askGameInfo();
})

function askGameInfo() {
    document.getElementById('main').innerHTML = '';
    const form = document.createElement('form');

    const x = document.createElement('input');
    x.value = 13, x.id = 'x';

    const y = document.createElement('input');
    y.value = 13, y.id = 'y';

    const n = document.createElement('input');
    n.value = 5, n.id = 'n';

    const startBtn = document.createElement('button');
    startBtn.id = 'startBtn'; startBtn.innerText = 'START GAME';
    startBtn.addEventListener('click', () => {
        initGame(parseInt(x.value), parseInt(y.value), parseInt(n.value));
    })

    form.appendChild(x); form.appendChild(y); form.appendChild(n); form.appendChild(startBtn);
    document.getElementById('main').appendChild(form);
}


function clearBoard(x, y, ctx) {
    ctx.beginPath();
    ctx.fillStyle = "#FFE4B5";
    ctx.fillRect(0, 0, x * tileX, y * tileY);
    ctx.strokeStyle = 'black';
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            ctx.rect(j * tileX, i * tileY, tileX, tileY);
            ctx.lineWidth = 1;
        }
    }
    ctx.stroke();
}

function drawTile(x, y, ctx, turn) {
    ctx.fillStyle = turn === 0 ? 'black' : 'white';
    ctx.fillRect(x * tileX, y * tileY, tileX, tileY);
}

function playMode00(posX, posY, ctx, board) {
    drawTile(posX, posY, ctx, board.currentTurn);
    board.putStone(posX, posY);
    if (board.checkGameEnd()) {
        alert(`The winner is ${board.currentTurn === 0 ? 'black' : 'white'} !!!`)
    }
    board.changeTurn();
}

function playMode01(posX, posY, ctx, board) {
    drawTile(posX, posY, ctx, board.currentTurn);
    board.putStone(posX, posY);
    if (board.checkGameEnd()) {
        alert(`The winner is ${board.currentTurn === 0 ? 'black' : 'white'} !!!`)
    }
    board.changeTurn();

    const placeablePosArr = board.getPlaceablePosArr();
    const placePos = placeablePosArr[Math.floor(Math.random() * placeablePosArr.length)];
    const [x, y] = placePos;
    drawTile(x, y, ctx, board.currentTurn);
    board.putStone(x, y);
    if (board.checkGameEnd()) {
        alert(`The winner is ${board.currentTurn === 0 ? 'black' : 'white'} !!!`)
    }
    board.changeTurn();
}

// MonteCarlo...!!!
function playMode02(posX, posY, ctx, board) {

}

function initGame(x, y, n) {
    const main = document.getElementById('main');
    main.innerHTML = '';

    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'canvas')
    canvas.width = tileX * x;
    canvas.height = tileY * y;
    const ctx = canvas.getContext('2d');
    document.getElementById('main').appendChild(canvas);

    clearBoard(x, y, ctx);

    const tmp_board = []
    for (var i = 0; i < y; i++) tmp_board.push(Array(x).fill(9));


    const board = new Board(x, y, n, tmp_board, 0);

    console.log("playeMode:", playMode)
    document.getElementById('canvas').addEventListener('click', (e) => {
        const rect = e.target.getBoundingClientRect();

        const viewX = e.clientX - rect.left;
        const viewY = e.clientY - rect.top;

        const scaleWidth = canvas.clientWidth / canvas.width;
        const scaleHeight = canvas.clientHeight / canvas.height;

        const canvasX = Math.floor(viewX / scaleWidth);
        const canvasY = Math.floor(viewY / scaleHeight);

        const posX = Math.floor(canvasX / tileX);
        const posY = Math.floor(canvasY / tileY);

        let isPlaceable = board.checkPlaceable(posX, posY);
        if (!isPlaceable) return;

        if (playMode === 0) {
            playMode00(posX, posY, ctx, board);
        }
        else if (playMode === 1) {
            playMode01(posX, posY, ctx, board);
        }
    });
}