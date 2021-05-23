var body = document.getElementById("body");
window.onload = function() {
    fadeIn(); // call fade function in tools
    mainMenu();
};

function mainMenu() {
    document.getElementById("start").onclick = () => gamePlaySetup();
    document.getElementById("config").onclick = () => configSetup();
    document.getElementById("MainMenu").hidden = false;
    document.getElementById("GamePlay").hidden = true;
    document.getElementById("Configurations").hidden = true;
}
