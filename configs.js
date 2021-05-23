var defaultConfig = ["ArrowDown", "Space", "ArrowLeft", "ArrowRight", "ArrowUp", "KeyE", "KeyQ", "ShiftLeft"];
var idNames = ["SoftDrop", "HardDrop", "Left", "Right", "Clockwise", "CClockwise", "OneEighty", "Hold"];
var allConfirmed;

function configSetup() {
    fadeIn();
    document.getElementById("MainMenu").hidden = true;
    document.getElementById("GamePlay").hidden = true;
    document.getElementById("Configurations").hidden = false;
    document.getElementById("bb1").onclick = () => {
        if (!allConfirmed) {
            alert("Please confirm your keybind before exiting.");
        } else {
            mainMenu();
        }
    };
    document.getElementById("confirm").onclick = () => confirmChanges();

    allConfirmed = true;
    var values = setConfig();
    for (let i = 0; i < 8; i += 1) {
        document.getElementById(idNames[i]).value = values[i];
        changeInputSetting(idNames[i]);
    }
}

// set configuration for the game
function setConfig() {
    var config = getCookie("configs").split(":monkey:");
    if (config.length == 1) {
        addCookie("configs", defaultConfig.join(":monkey:"));
        return defaultConfig;
    }
    return config;
}

function changeInputSetting(id) {
    document.getElementById(id).addEventListener("keydown", function(event) {
        document.getElementById(id).value = event["code"];
        allConfirmed = false;
    })
}

function confirmChanges() {
    var used = new Set();
    var newConfig = [];
    for (let i = 0; i < 8; i += 1) {
        if (used.has(document.getElementById(idNames[i]).value)) {
            alert("You have duplicates! Please try again.")
            return;
        }
        newConfig.push(document.getElementById(idNames[i]).value);
        used.add(document.getElementById(idNames[i]).value);
    }
    addCookie("configs", newConfig.join(":monkey:"));
    allConfirmed = true;
}
