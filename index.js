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
        this.map = level.map;
        this.colors = level.colors;
        this.cats = level.cats;
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
        // this.board[0][2] = this.actions.CAT;
        // this.board[1][0] = this.actions.X;
    }

    getColor(cell) {
        return this.colors[cell];
    }

    draw() {
        // this.drawBoard()
        this.drawCats()
    }

    drawCats() {
        ctx.strokeStyle = 'black'
        this.cats.forEach((row, i) => {
            row.forEach((cell, j) => {
                ctx.fillStyle = cell == 0 ? 'blue' : 'red';
                const x = (this.x + (j * this.size))
                const y = (this.y + (i * this.size))
                ctx.fillRect(x, y, this.size, this.size)
                ctx.strokeRect(x, y, this.size, this.size)
            })
        });
    }

    drawBoard() {
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
                    ctx.fillStyle = 'lightgreen'
                    ctx.beginPath()
                    ctx.arc(cx, cy, this.size / 2, 0, Math.PI * 2)
                    ctx.fill()
                }
            })
        });
    }
}

const level = {
    map: [
        [0, 0, 1, 0],
        [0, 0, 0, 0],
        [2, 2, 2, 2],
        [2, 3, 2, 2],
    ],
    colors: [
        'blue', 'green', 'yellow', 'purple'
    ],
    cats: [
        [0, 0, 1, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 1],
        [0, 1, 0, 0],
    ],

    uni: [
        [{ color: 0, cat: false }, { color: 0, cat: false }, { color: 1, cat: true }, { color: 0, cat: false }],
        [{ color: 0, cat: true }, { color: 0, cat: false }, { color: 0, cat: false }, { color: 0, cat: false }],
        [{ color: 2, cat: false }, { color: 2, cat: false }, { color: 2, cat: false }, { color: 2, cat: true }],
        [{ color: 2, cat: false }, { color: 3, cat: true }, { color: 2, cat: false }, { color: 2, cat: false }]
    ]
}

const createColor = () => {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    return `rgb(${r},${g},${b})`
}

const colunasProximas = (ultimaLinha) => {
    const indexUltimo = ultimaLinha.findIndex(x => x == 1);
    return [indexUltimo - 1, indexUltimo, indexUltimo + 1]
}

const createLevel = (n) => {

    const cats = []//, colors = [];

    const colunasAdicionadas = [];
    for (let i = 0; i < n; i++) {
        const row = Array.from({ length: n }, (_) => 0);
        const colunasProximasUltimaLinha = i > 0 ? colunasProximas(cats[i - 1]) : [];
        const possiveisColunas = [];
        for (let j = 0; j < n; j++)
            if (!colunasAdicionadas.includes(j) && !colunasProximasUltimaLinha.includes(j))
                possiveisColunas.push(j);

        if (possiveisColunas.length == 0) {
            console.log("Erro na criacao!")
            return null;
        }

        const escolhida = Math.floor(Math.random() * possiveisColunas.length)
        const indexCol = possiveisColunas[escolhida];
        row[indexCol] = 1;
        colunasAdicionadas.push(indexCol);
        cats.push(row)
        // colors.push(createColor())
    }

    const map = [];
    for (let i = 0; i < n; i++) {
        const row = Array.from({ length: n }, (_) => 0);
        map.push(row)
    }

    return {
        map,
        colors: [
            'red', 'blue', 'green', 'gray', 'purple', 'yellow', 'brown', 'white', 'lightblue', 'darkgreen'
        ],
        cats
    }
}

let newLevel = null
while (newLevel == null) {
    newLevel = createLevel(30);
    console.log(newLevel)
}
const b = new Game(0, 0, newLevel);
b.draw();

