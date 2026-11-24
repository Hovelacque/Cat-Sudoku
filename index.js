const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 600;

ctx.fillStyle = 'black'
ctx.fillRect(0, 0, canvas.width, canvas.height);

class Game {

    constructor(x, y, level) {
        this.x = x;
        this.y = y;
        this.board = level.board;
        this.colors = level.colors;
        this.size = canvas.width / this.board[0].length
    }

    getColor(cell) {
        return this.colors[cell];
    }

    draw() {
        ctx.strokeStyle = 'black'
        this.board.forEach((row, i) => {
            row.forEach((cell, j) => {
                ctx.fillStyle = this.getColor(cell);
                const x = (this.x + (j * this.size))
                const y = (this.y + (i * this.size))
                ctx.fillRect(x, y, this.size, this.size)
                ctx.strokeRect(x, y, this.size, this.size)
            })
        });
    }
}

const level = {
    board: [
        [0, 0, 1, 0],
        [0, 0, 0, 0],
        [2, 2, 2, 2],
        [2, 2, 2, 2],
    ],
    colors: [
        'blue', 'green', 'yellow'
    ]
}
const b = new Game(0, 0, level);
b.draw();
