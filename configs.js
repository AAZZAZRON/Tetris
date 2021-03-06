var defaultConfig = ["ArrowDown", "Space", "ArrowLeft", "ArrowRight", "ArrowUp", "KeyE", "KeyQ", "ShiftLeft"];
var idNames = ["SoftDrop", "HardDrop", "Left", "Right", "Clockwise", "CClockwise", "OneEighty", "Hold"];
var defaultCC = [40, 32, 37, 39, 38, 69, 81, 16];
var configCodes;
var areRed = [];
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
            body.style.opacity = 1;
            clearInterval(interval);
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
    var config = getCookie("configName").split(":monkey:");
    if (config.length == 1) {
        addCookie("configName", defaultConfig.join(":monkey:"));
        return defaultConfig;
    }
    return config;
}

function changeInputSetting(id) {
    document.getElementById(id).addEventListener("keydown", function(event) {
        console.log(event);
        document.getElementById(id).value = event.code;
        configCodes[idNames.indexOf(id)] = event.keyCode;
        allConfirmed = false;
        if (document.getElementById(id).classList.contains("red")) { // check if red
            // remove red
            document.getElementById(areRed[0]).classList.remove("red");
            document.getElementById(areRed[1]).classList.remove("red");
            areRed = [];
        }
    })
}

function confirmChanges() {
    var used = new Set();
    var newConfig = [];
    for (let i = 0; i < 8; i += 1) {
        if (used.has(document.getElementById(idNames[i]).value)) { // there is a dupe
            for (let j = 0; j < 8; j += 1) {
                if (document.getElementById(idNames[j]).value == document.getElementById(idNames[i]).value) {
                    // make it obvious they are dupes
                    document.getElementById(idNames[i]).classList.add("red");
                    document.getElementById(idNames[j]).classList.add("red");
                    areRed = [idNames[i], idNames[j]]
                    // return
                    return;
                }
            }
        }
        newConfig.push(document.getElementById(idNames[i]).value);
        used.add(document.getElementById(idNames[i]).value);
    }
    console.log(configCodes)
    addCookie("configName", newConfig.join(":monkey:"));
    addCookie("configCodes", configCodes.join(":monkey:"));
    allConfirmed = true;
}
