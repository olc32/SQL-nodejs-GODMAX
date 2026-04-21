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
cube.style.width = cubeSizeW + "px";
cube.style.height = cubeSizeH + "px";

// Eventos para saltar

window.addEventListener("click", function() {
    if (!gameState.gameOver) {
        velocity = 15;
    }
});

document.addEventListener("keydown", (ev) => {
  if (ev.code === "Space" && !gameState.gameOver) {
    velocity = 15;
  }
});

// Bucle del juego

function gameLoop() {
    if (gameState.gameOver) {
        return;
    }

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
    
    // Actualizar pinchos
    updatePinchos(deltaTime);
    
    // Crear nuevos pinchos
    seconds += deltaTime;
    if (seconds >= skipetime) {
        seconds = 0;
        createPincho();
    }
    
    requestAnimationFrame(gameLoop);
}

gameLoop();

// Función para crear pinchos
function createPincho() {
    console.log("Pincho creado");
    var pincho = document.createElement("div");
    pincho.style.position = "absolute";
    
    // Crear nueva imagen para cada pincho
    var imgpincho = document.createElement("img");
    imgpincho.src = "pincho.png";
    imgpincho.style.width = "50px";
    imgpincho.style.height = "50px";
    
    pincho.appendChild(imgpincho);
    document.body.appendChild(pincho);
    pincho.style.left = "90%";
    pincho.style.bottom = "0px";
    
    // Agregar pincho al array con propiedades
    var pinchoObj = {
        element: pincho,
        x: window.innerWidth * 0.9,
        y: 0,
        width: 50,
        height: 50,
        velocity: -pinchoSpeed
    };
    
    pinchos.push(pinchoObj);
}

// Función para actualizar posición de todos los pinchos
function updatePinchos(deltaTime) {
    for (var i = pinchos.length - 1; i >= 0; i--) {
        var pincho = pinchos[i];
        
        // Mover pincho hacia la izquierda
        pincho.x += pincho.velocity * deltaTime;
        pincho.element.style.left = pincho.x + "px";
        
        // Detectar colisión
        if (checkCollision(pincho)) {
            console.log("¡Colisión con pincho!");
            gameState.vidas--;
            document.getElementById("vidas").innerText = gameState.vidas;
            
            // Eliminar pincho
            pincho.element.remove();
            pinchos.splice(i, 1);
            
            // Verificar Game Over
            if (gameState.vidas <= 0) {
                endGame();
            }
        } 
        // Eliminar pinchos que salieron de pantalla (izquierda)
        else if (pincho.x < -100) {
            pincho.element.remove();
            pinchos.splice(i, 1);
            console.log("Pincho eliminado de memoria");
        }
    }
}

// Función para detectar colisión AABB (Axis-Aligned Bounding Box)
function checkCollision(pincho) {
    var cubeX = parseInt(cube.style.left) || 0;
    var cubeY = parseInt(cube.style.bottom);
    
    // AABB collision detection
    if (cubeX < pincho.x + pincho.width &&
        cubeX + cubeSizeW > pincho.x &&
        cubeY < pincho.y + pincho.height &&
        cubeY + cubeSizeH > pincho.y) {
        return true;
    }
    return false;
}

// Función para terminar el juego
function endGame() {
    gameState.gameOver = true;
    console.log("¡GAME OVER! Vidas: " + gameState.vidas);
    
    var gameOverDiv = document.getElementById("gameOverScreen");
    gameOverDiv.style.display = "flex";
    
    // Limpiar todos los pinchos
    pinchos.forEach(function(pincho) {
        pincho.element.remove();
    });
    pinchos = [];
}

// Función para reiniciar el juego
function restartGame() {
    gameState.vidas = 3;
    gameState.gameOver = false;
    gameState.puntaje = 0;
    y = 0;
    velocity = 0;
    seconds = 0;
    lastime = Date.now();
    
    cube.style.bottom = "0px";
    document.getElementById("vidas").innerText = gameState.vidas;
    
    var gameOverDiv = document.getElementById("gameOverScreen");
    gameOverDiv.style.display = "none";
    
    // Limpiar pinchos
    pinchos.forEach(function(pincho) {
        pincho.element.remove();
    });
    pinchos = [];
    
    requestAnimationFrame(gameLoop);
}