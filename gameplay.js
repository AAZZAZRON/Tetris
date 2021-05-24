var softDrop, hardDrop, left, right, cw, ccw, oneEighty, hold;

var gamePieces = {
    "Z": [[[1, 1, 0], [0, 1, 1], [0, 0, 0]]], 
    "T": [[[0, 1, 0], [1, 1, 1], [0, 0, 0]]], 
    "S": [[[0, 1, 1], [1, 1, 0], [0, 0, 0]]], 
    "O": [[[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]], 
    "L": [[[0, 0, 1], [1, 1, 1], [0, 0, 0]]], 
    "J": [[[1, 0, 0], [1, 1, 1], [0, 0, 0]]], 
    "I": [[[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]]]
}
var colours = {"Z": "red", "T": "purple", "S": "green", "O": "yellow", "L": "orange", "J": "blue", "I": "turquoise"}
var pieceNames = ["Z", "T", "S", "O", "L", "J", "I"];
var queue;
var numbers = [0, 1, 2, 3, 4, 5, 6];
var piece, end, localEnd, pInterval, time;
const mainCanvas = document.getElementById("canvas");
var mainCtx = mainCanvas.getContext('2d');
var board;

function gamePlaySetup() {
    fadeIn();
    document.getElementById("MainMenu").hidden = true;
    document.getElementById("GamePlay").hidden = false;
    document.getElementById("Configurations").hidden = true;
    configureGameBoard(); // set size
    let variables = setConfig();
    softDrop = variables[0];
    hardDrop = variables[1];
    left = variables[1];
    right = variables[2];
    cw = variables[3];
    ccw = variables[4];
    oneEighty = variables[5];
    hold = variables[6];
    console.log(softDrop, hardDrop, left, right, cw, ccw, oneEighty, hold);

    // reset
    document.getElementById("score").innerText = "000000";
    queue = [];
    generatePieces();
    counter = 0;
    time = 2000;
    board = [];

    // reset board
    for (let i = 0; i < 22; i += 1) {
        board.push([]);
        for (let j = 0; j < 10; j += 1) {
            board[i].push("transparent");
        }
    }

    // set up rotations
    for (let i = 0; i < 7; i += 1) {
        rotate(pieceNames[i]);
    }
    let tmp = queue.shift();
    piece = new Piece(tmp, 0, colours[tmp]);
    console.log(piece);
    piece.redraw();
    piece.draw();
    //startGame();
}


function generatePieces() {
    numbers.sort(randomize);
    for (let i = 0; i < 7; i += 1) {
        queue.push(pieceNames[numbers[i]]);
    }
    console.log(queue);
}
function randomize(a, b) {
    return 0.5 - Math.random();
}

function startGame() {
    end = false;
    while (!end) {
        localEnd = false;
        piece = new Piece(queue.shift(), 0);
        if (queue.length < 4) {
            generatePieces();
        }
        pInterval = setInterval(function() {
            if (localEnd) {
                clearInterval(pInterval);
            }
            // piece.down;
        }, time)
    }
}

// CLASS

class Piece {
    constructor(name, orient, colour) {
        this.name = name;
        this.orient = orient;
        this.colour = colour;
        if (name == "O" || name == "I") {
            this.x = -1;
            this.y = 3;
        } else {
            this.x = 0;
            this.y = 3;
        }
    }

    remove() {
        var arr = gamePieces[this.name][this.orient];
        for (let i = 0; i < arr.length; i += 1) {
            for (let j = 0; j < arr.length; j += 1) {
                if (arr[i][j] == 1) board[this.x + i][this.y + j] = "transparent";
            }
        }
    }

    redraw() {
        var arr = gamePieces[this.name][this.orient];
        for (let i = 0; i < arr.length; i += 1) {
            for (let j = 0; j < arr.length; j += 1) {
                if (arr[i][j] == 1) board[this.x + i][this.y + j] = this.colour;
            }
        }
    }

    draw() {
        mainCtx.clearRect(0, 0, mainCanvas.clientWidth, mainCanvas.clientHeight)
        for (let i = 0; i < 22; i += 1) {
            for (let j = 0; j < 10; j += 1) {
                if (i < 2 && board[i][j] === "transparent") mainCtx.fillStyle = "black";
                else mainCtx.fillStyle = board[i][j];
                mainCtx.fillRect(j * 40, i * 40, 40, 40);
                mainCtx.fillStyle = "black";
                mainCtx.strokeRect(j * 40, i * 40, 40, 40);
            }
        }
    }
}
