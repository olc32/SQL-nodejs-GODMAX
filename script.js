var juego = document.getElementById("juego");
var body = document.body;
var cube = document.getElementById("cube");
var gravity = -1;
var velocity = 0;
var y = 0;
var lastime = 0;
var skipetime = 1;
var seconds = 0;
var pinchos = [];
var en_tierra = true;
const url = "lacanciondelsiglo.mp3";
const url2 = "laotracancion.mp3";
const music = new Audio(url2);
music.play();

cube.style.position = "absolute";
cube.style.bottom = "0px";
window.addEventListener("click", function() {
    if (en_tierra) {
    velocity = 25;
    en_tierra = false;
    }
});

window.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        if (en_tierra) {
        velocity = 25;
        en_tierra = false;
        }
    }
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
        en_tierra = true;
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
    pincho.style.position = "fixed";
    var img = document.createElement("img");
    img.src = "pincho.png";
    img.style.width = "50px";
    pincho.appendChild(img);
    document.body.appendChild(pincho);
    pincho.style.right = "0px";
    pincho.style.bottom = "0px";
    pinchos.push(pincho);
    moverPincho(pincho);
}

function moverPincho(pincho) {
    var right = parseInt(pincho.style.right);
    right += 5;
    pincho.style.right = right + "px";
    if (right < window.innerWidth) {
        requestAnimationFrame(function() {
            moverPincho(pincho);
        });
    } else {
        document.body.removeChild(pincho);
        pinchos.splice(pinchos.indexOf(pincho), 1);
    }
    if (checkCollision(cube, pincho)) {
        //alert("¡Has perdido!");
        location.reload();
    }
}


function rotarGradiente() {
    angulo = (angulo + 1) % 360; // Mantener entre 0 y 359
    body.style.background = `linear-gradient(${angulo}deg, red, blue)`;
    requestAnimationFrame(rotarGradiente); // Animación fluida
}

function checkCollision(cube, pincho) {
    var cubeRect = cube.getBoundingClientRect();
    var pinchoRect = pincho.getBoundingClientRect();
    return !(
        cubeRect.right < pinchoRect.left ||
        cubeRect.left > pinchoRect.right ||
        cubeRect.bottom < pinchoRect.top ||
        cubeRect.top > pinchoRect.bottom
    );
}
