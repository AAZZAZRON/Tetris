const nextCanvas = document.getElementById("queue");
var nextCtx = nextCanvas.getContext('2d');

function updateNext() {
    nextCtx.clearRect(0, 0, nextCanvas.clientWidth, nextCanvas.clientHeight)
    console.log(queue)
    for (let i = 0; i < 4; i += 1) {
        drawUpNext(queue[i], colours[queue[i]], i * 160);
    }
}

function drawUpNext(name, colour, n) {
    var adjust = 0;
    var vAdjust = 0;
    // draw to holdPiece
    var arr = gamePieces[name][0];
    if (arr.length == 3) adjust = 20;
    else if (name == "O") vAdjust = -40;
    console.log(arr);

    // draw
    for (let i = 0; i < arr.length; i += 1) {
        for (let j = 0; j < arr.length; j += 1) {
            if (arr[i][j]) {
            nextCtx.fillStyle = colour;
            nextCtx.fillRect(j * 40 + 20 + adjust, vAdjust + 40 + i * 40 + n, 40, 40);
            nextCtx.fillStyle = "black";
            nextCtx.strokeRect(j * 40 + 20 + adjust, vAdjust + 40 + i * 40 + n, 40, 40)
            }
        }
    }
}