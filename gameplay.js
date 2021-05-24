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

var pieceNames = ["Z", "T", "S", "O", "L", "J", "I"];


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

    // reset score
    document.getElementById("score").innerText = "000000";

    // set up rotations
    for (let i = 0; i < 7; i += 1) {
        rotate(pieceNames[i]);
    }
}
