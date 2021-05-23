// fade in
function fadeIn() {
    body.style.opacity = 0;
    var opacity = 0;
    var interval = setInterval(show, 10);
    function show() {
        if (opacity < 1) {
            opacity += 0.01;
            body.style.opacity = opacity;
        } else {
            clearInterval(interval);
        }
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