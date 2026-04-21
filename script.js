var juego = document.getElementById("juego");
var body = document.body;
var cube = document.getElementById("cube");
var gravity = -1;
var velocity = 0;
var y = 0;
var lastime = 0;
var skipetime = 1;
var seconds = 0;

var imgpincho = document.createElement("img");
imgpincho.src = "pincho.png";
imgpincho.style.width = "50px";

cube.style.position = "absolute";
cube.style.bottom = "0px";
window.addEventListener("click", function() {
    velocity = 15;
});

function gameLoop() {
    var deltaTime = (Date.now() - lastime) / 1000;
    lastime = Date.now();

    velocity += gravity;
    y += velocity;
    cube.style.bottom = y + "px";
    if (parseInt(y) <= 0) {
        y = 0;
        velocity = 0;
    }
    console.log("Velocity: " + velocity + " | Bottom: " + cube.style.bottom + " | Y: " + y + " | DeltaTime: " + deltaTime + " | Seconds: " + seconds);
    requestAnimationFrame(gameLoop);
    //pinchos
    seconds += deltaTime;
    if (seconds >= skipetime) {
        seconds = 0;
        createPincho();
    }
}

gameLoop();

function createPincho() {
    console.log("Pincho creado");
    var pincho = document.createElement("div");
    pincho.style.position = "absolute";
    pincho.appendChild(imgpincho);
    document.body.appendChild(pincho);
    pincho.style.left = "90%";
    pincho.style.bottom = "0px";
}