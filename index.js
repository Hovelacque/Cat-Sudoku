const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 600;

ctx.fillStyle = 'black'
ctx.fillRect(0, 0, canvas.width, canvas.height);

class Game {

    actions = {
        EMPTY: 0,
        CAT: 1,
        X: 2
    };

    constructor(x, y, level) {
        this.x = x;
        this.y = y;
        this.map = level.board;
        this.colors = level.colors;
        this.size = canvas.width / this.map[0].length;
        this.initBoard()
    }

    initBoard() {
        this.board = [];
        this.map.forEach((row) => {
            const line = [];
            row.forEach(() => line.push(this.actions.EMPTY))
            this.board.push(line)
        })
        this.board[0][2] = this.actions.CAT;
        this.board[1][0] = this.actions.X;
    }

    getColor(cell) {
        return this.colors[cell];
    }

    draw() {
        ctx.strokeStyle = 'black'
        this.map.forEach((row, i) => {
            row.forEach((cell, j) => {
                ctx.fillStyle = this.getColor(cell);
                const x = (this.x + (j * this.size))
                const y = (this.y + (i * this.size))
                ctx.fillRect(x, y, this.size, this.size)
                ctx.strokeRect(x, y, this.size, this.size)

                if (this.board[i][j] == this.actions.CAT) {
                    const cx = x + this.size / 2
                    const cy = y + this.size / 2
                    ctx.fillStyle = 'black'
                    ctx.beginPath()
                    ctx.arc(cx, cy, this.size / 2, 0, Math.PI * 2)
                    ctx.fill()
                }
                else if (this.board[i][j] == this.actions.X) {
                    const cx = x + this.size / 2
                    const cy = y + this.size / 2
                    ctx.fillStyle = 'red'
                    ctx.beginPath()
                    ctx.arc(cx, cy, this.size / 2, 0, Math.PI * 2)
                    ctx.fill()
                }
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
