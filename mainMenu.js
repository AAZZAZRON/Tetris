var body = document.getElementById("body");
window.onload = function() {
    mainMenu();
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

