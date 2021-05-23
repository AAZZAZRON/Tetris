var softDrop, hardDrop, left, right, cw, ccw, oneEighty, hold;
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
}
