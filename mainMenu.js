var body = document.getElementById("body");
window.onload = function() {
    mainMenu();
    configureGameBoard();
};

function mainMenu() {
    fadeIn();
    document.getElementById("start").onclick = () => gamePlaySetup();
    document.getElementById("config").onclick = () => configSetup();
    document.getElementById("MainMenu").hidden = false;
    document.getElementById("GamePlay").hidden = true;
    document.getElementById("Configurations").hidden = true;
}

function configureGameBoard() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    document.getElementById("holdSpot").style.top = h / 2 - 503;
    document.getElementById("holdSpot").style.left = w / 2 - 466;
    document.getElementById("holdtext").style.top = h / 2 - 503;
    document.getElementById("holdtext").style.left = w / 2 - 466;
    document.getElementById("queue").style.top = h / 2 - 503;
    document.getElementById("queue").style.left = w / 2 + 263;
    document.getElementById("queuetext").style.top = h / 2 - 503;
    document.getElementById("queuetext").style.left = w / 2 + 263;
}
