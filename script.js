var juego = document.getElementById("juego");
var body = document.body;
var cube = document.getElementById("Cube");
var gravity = 1;
var velocity = 0;
window.addEventListener("click", function() {
    velocity = -15;
});

function gameLoop() {
    velocity += gravity;
    cube.style.bottom = parseInt(cube.style.bottom) - velocity + "px";
    if (parseInt(cube.style.bottom) <= 0) {
        cube.style.bottom = "0px";
        velocity = 0;
    }
    requestAnimationFrame(gameLoop);
}

gameLoop();