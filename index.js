document.getElementById(`start`).addEventListener(`click`, () => { init() })

const BOARD = document.getElementById(`board`);

function init() {
    let height = document.getElementById(`height`);
    if (!numCheck(height) && Number(height) % 2 !== 0) { return; }
    let width = document.getElementById(`width`);
    if (!numCheck(width) && Number(width) % 2 !== 0) { return; }
    let row_num = document.getElementById(`row_num`);
    if (!numCheck(row_num) && Number(row_num) >= 3) { return; }
}

function numCheck(input_num) {
    let pattern = /^\d*$/
    return pattern.test(input_num);
}

class GAME {
    constructor(height, width, row_num) {
        this.HEIGHT = height;
        this.WIDTH = width;
        this.ROW_NUM = row_num;
    }
}