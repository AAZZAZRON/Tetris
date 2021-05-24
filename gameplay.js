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
var gameStarted = false;
var dropStart;

function gamePlaySetup() {
    fadeIn();
    document.getElementById("MainMenu").hidden = true;
    document.getElementById("GamePlay").hidden = false;
    document.getElementById("Configurations").hidden = true;
    configureGameBoard(); // set size
    let variables = setConfig();
    softDrop = variables[0];
    hardDrop = variables[1];
    left = variables[2];
    right = variables[3];
    cw = variables[4];
    ccw = variables[5];
    oneEighty = variables[6];
    hold = variables[7];
    console.log(softDrop, hardDrop, left, right, cw, ccw, oneEighty, hold);

    // reset
    document.getElementById("score").innerText = "000000";
    queue = [];
    generatePieces();
    counter = 0;
    time = 1500;
    board = [];
    gameStarted = true;
    dropStart = Date.now();
    localEnd = true;

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
    dropPiece();
}


function generatePieces() {
    numbers.sort(randomize);
    for (let i = 0; i < 7; i += 1) {
        queue.push(pieceNames[numbers[i]]);
    }
}
function randomize(a, b) {
    return 0.5 - Math.random();
}

function userMovement(input) {
    key = input.code;
    if (!gameStarted) return;
    if (key == softDrop) {
        piece.down();
    } else if (key == hardDrop) {
        while (!localEnd) piece.down();
        dropStart -= 1000;
    } else if (key == left) {
        piece.left();
    } else if (key == right) {
        piece.right();
    } else if (key == cw) {
        piece.cw();
    } else if (key == ccw) {
        piece.ccw();
    } else if (key == oneEighty) {
        piece.double();
    } else if (key == hold) {
        // hold
    }
}

function newPiece() {
    localEnd = false;
    let tmp = queue.shift();
    piece = new Piece(tmp, 0, colours[tmp]);
    piece.redraw();
    piece.draw();
    if (queue.length < 4) {
        generatePieces();
    }
}

function dropPiece() {
    let now = Date.now();
    let dif = now - dropStart;
    if (localEnd && dif > 500) {
        newPiece();
        dropStart = Date.now();
    } else if (!localEnd && dif > time) {
        piece.down();
        dropStart = Date.now();
    }
    requestAnimationFrame(dropPiece);
}

// CLASS
class Piece {
    constructor(name, orient, colour) {
        this.name = name;
        this.orient = orient;
        this.colour = colour;
        if (name == "O") {
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

    // movement commands
    down() {
        piece.remove();
        if (piece.detectCollision(this.x + 1, this.y)) {
            this.x += 1;
        } else {
            if (!localEnd) {
                dropStart = Date.now();
            }
            localEnd = true;
            if (this.x < 2) {
                end = true;
            }
        }
        piece.redraw();
        piece.draw();
    }
    left() {
        piece.remove();
        if (piece.detectCollision(this.x, this.y - 1)) {
            this.y -= 1;
            if (localEnd) {
                dropStart = Date.now();
            }
        }
        piece.redraw();
        piece.draw();
    }
    right() {
        piece.remove();
        if (piece.detectCollision(this.x, this.y + 1)) {
            this.y += 1;
            if (localEnd) {
                dropStart = Date.now();
            }
        }
        piece.redraw();
        piece.draw();
    }
    
    cw() {
        piece.remove();
        if (piece.detectCollision(this.x, this.y, (this.orient + 1) % 4)) {
            this.orient = (this.orient + 1) % 4;
            if (localEnd) {
                dropStart = Date.now();
            }
        }
        piece.redraw();
        piece.draw();
    }

    ccw() {
        piece.remove();
        if (piece.detectCollision(this.x, this.y, (this.orient + 3) % 4)) {
            this.orient = (this.orient + 3) % 4;
            if (localEnd) {
                dropStart = Date.now();
            }
        }
        piece.redraw();
        piece.draw();
    }

    double() {
        piece.remove();
        if (piece.detectCollision(this.x, this.y, (this.orient + 2) % 4)) {
            this.orient = (this.orient + 2) % 4;
            if (localEnd) {
                dropStart = Date.now();
            }
        }
        piece.redraw();
        piece.draw();
    }

    // COLLISION DETECTION
    detectCollision(r, c, o=this.orient) {
        var arr = gamePieces[this.name][o];
        for (let i = 0; i < arr.length; i += 1) {
            for (let j = 0; j < arr.length; j += 1) {
                if (0 <= r + i && r + i < 22 && 0 <= c + j && c + j < 10) {
                    
                } else if (arr[i][j] == 0) {

                } else {
                    return false;
                }
                if (arr[i][j] == 1 && board[r + i][c + j] != "transparent") {
                    return false;
                }
            }
        }
        return true;
    }
}
