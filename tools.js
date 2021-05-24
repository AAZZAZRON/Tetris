var interval;
// fade in
function fadeIn() {
    body.style.opacity = 0;
    var opacity = 0;
    interval = setInterval(show, 10);
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
    document.getElementById("holdSpot").style.top = h / 2 - 403;
    document.getElementById("holdSpot").style.left = w / 2 - 386;
    document.getElementById("holdtext").style.top = h / 2 - 403;
    document.getElementById("holdtext").style.left = w / 2 - 386;
    document.getElementById("queue").style.top = h / 2 - 403;
    document.getElementById("queue").style.left = w / 2 + 223;
    document.getElementById("queuetext").style.top = h / 2 - 403;
    document.getElementById("queuetext").style.left = w / 2 + 223;
    document.getElementById("score").style.top = h / 2 + 440;
    document.getElementById("score").style.left = w / 2;
}


function rotate(letter) {
    for (let q = 0; q < 3; q += 1) {
        var arr = gamePieces[letter][q];
        var tmp = [];
        for (let j = 0; j < arr.length; j += 1) {
            tmp.push([]);
        }
        for (let i = arr.length - 1; i >= 0; i -= 1) {
            for (let j = 0; j < arr.length; j += 1) {
                tmp[j].push(arr[i][j]);
            }
        }
        console.log(tmp);
        gamePieces[letter].push(tmp);
    }
}