export class Board {
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