var body = document.getElementById("body");
var holdDownKeys = new Array(300);
window.onload = function() {
    mainMenu();
    configCodes = getCookie("configCodes").split(":monkey:")
    if (configCodes.length == 1) {
        configCodes = defaultCC;
        addCookie("configCodes", configCodes.join(":monkey:"));
    }
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;
};

function mainMenu() {
    fadeIn();
    document.getElementById("start").onclick = () => {
        body.style.opacity = 1;
        clearInterval(interval);
        gamePlaySetup()
    };
    document.getElementById("config").onclick = () => {
        body.style.opacity = 1;
        clearInterval(interval);
        configSetup()
    };
    document.getElementById("MainMenu").hidden = false;
    document.getElementById("GamePlay").hidden = true;
    document.getElementById("Configurations").hidden = true;
}

