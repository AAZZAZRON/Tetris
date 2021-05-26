const holdCanvas = document.getElementById("holdSpot");
var holdCtx = holdCanvas.getContext('2d');
var holding;
var currentlyHolding;

function resetHolding() {
    holding = [
        ["transparent", "transparent", "transparent", "transparent", "transparent", "transparent"],
        ["transparent", "transparent", "transparent", "transparent", "transparent", "transparent"],
        ["transparent", "transparent", "transparent", "transparent", "transparent", "transparent"],
        ["transparent", "transparent", "transparent", "transparent", "transparent", "transparent"]
    ];
}

function holdPiece(name) {
    resetHolding();
    drawToHold(name, "gray");
    if (currentlyHolding != -1) queue.unshift(currentlyHolding); // push to front of queue
    currentlyHolding = name;
    return;
}

function drawToHold(name, colour) {
    var adjust = 0;
    // draw to holdPiece
    var arr = gamePieces[name][0];
    if (arr.length == 3) adjust = 1;
    for (let i = 0; i < arr.length; i += 1) {
        for (let j = 0; j < arr.length; j += 1) {
            if (arr[i][j] == 1) holding[i + adjust][j] = colour;
        }
    }
    if (adjust == 1) adjust = 20;
    var iAd = 0;
    if (name == "I") iAd = 20;

    // draw
    holdCtx.clearRect(0, 0, holdCanvas.clientWidth, holdCanvas.clientHeight)
    for (let i = 0; i < 4; i += 1) {
        for (let j = 0; j < 6; j += 1) {
            holdCtx.fillStyle = holding[i][j];
            holdCtx.fillRect(j * 40 + 20 + adjust, i * 40 + iAd, 40, 40);
            if (holding[i][j] != "transparent") {
            holdCtx.fillStyle = "black";
            holdCtx.strokeRect(j * 40 + 20 + adjust, i * 40 + iAd, 40, 40);
            }
        }
    }
}
