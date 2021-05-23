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
