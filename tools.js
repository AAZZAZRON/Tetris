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