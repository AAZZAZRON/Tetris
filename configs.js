var defaultConfig = ["ArrowDown", "Space", "ArrowLeft", "ArrowRight", "ArrowUp", "KeyE", "KeyQ", "ShiftLeft"];
var idNames = ["SoftDrop", "HardDrop", "Left", "Right", "Clockwise", "CClockwise", "OneEighty", "Hold"];

function configSetup() {
    fadeIn();
    document.getElementById("MainMenu").hidden = true;
    document.getElementById("GamePlay").hidden = true;
    document.getElementById("Configurations").hidden = false;
    document.getElementById("bb1").onclick = () => {
        if (confirmProper()) { // make sure all input is good
            mainMenu();
        }
    };
    var values = setConfig();
    for (let i = 0; i < 8; i += 1) {
        addText(idNames[i], values[i]);
        changeInputSetting(idNames[i]);
    }
}

function changeInputSetting(id) {
    document.getElementById(id).addEventListener("keydown", function(event) {
        document.getElementById(id).value = event["code"];
    })
}

function confirmChanges() {
    for (let i = 0; i < 8; i += 1) {

    }
}

function confirmProper() {
    return 1;
}

function addText(name, inner) {
    document.getElementById(name).value = inner;
}
