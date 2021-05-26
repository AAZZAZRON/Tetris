const holdCanvas = document.getElementById("holdSpot");
var holdCtx = holdCanvas.getContext('2d');
var holding;
var currentlyHolding;

function resetHolding() {
    holding = [
        ["transparent", "transparent", "transparent", "transparent"],
        ["transparent", "transparent", "transparent", "transparent"],
        ["transparent", "transparent", "transparent", "transparent"],
        ["transparent", "transparent", "transparent", "transparent"]
    ];
}

function holdPiece(name, colour) {
    resetHolding();
    drawToHold(name, colour);
    if (currentlyHolding != -1) queue.unshift(currentlyHolding); // push to front of queue
    currentlyHolding = name;
    console.log(currentlyHolding);
    return;
}

function drawToHold(name, colour) {

}
