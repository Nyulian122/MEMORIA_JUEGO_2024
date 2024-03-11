let cards1 = ["🤫","🧏","😈","🤡","🛐","😮","😅","🫢","💀","🧔‍♂️","🧠","🤢"];
let cards2 = ["🤫","🧏","😈","🤡","🛐","😮","😅","🫢","💀","🧔‍♂️","🧠","🤢"];
let todaslascartas = cards1.concat(cards2);
let cartasVolteadas = [];
let parejasEncontradas = 0;
let intentos = 0;
let nivelActual = 1;
let tiempoInicio;

function repartirCartas() {
    let tablero = document.querySelector("#root");
    todaslascartas.forEach((cada_carta)=>{
        let cart = document.createElement("div");
        cart.className = "carta";
        cart.dataset.valor = cada_carta;
        cart.textContent = "♦️♠️";
        tablero.appendChild(cart);
        cart.addEventListener("click", voltearCarta);
    });
    iniciarTiempo();
}

function voltearCarta() {
    if (cartasVolteadas.length < 2 && !this.classList.contains("encontrada") && !this.classList.contains("volteada")) {
        this.textContent = this.dataset.valor;
        this.classList.add("volteada");
        cartasVolteadas.push(this);
        intentos++;
        actualizarInfo();
        if (cartasVolteadas.length === 2) {
            setTimeout(verificarPareja, 1000);
        }
    }
}

function verificarPareja() {
    let [carta1, carta2] = cartasVolteadas;
    if (carta1.dataset.valor === carta2.dataset.valor) {
        carta1.classList.add("encontrada");
        carta2.classList.add("encontrada");
        parejasEncontradas++;
        if (parejasEncontradas === todaslascartas.length / 2) {
            avanzarNivel();
        }
    } else {
        carta1.textContent = "♦️♠️";
        carta2.textContent = "♦️♠️";
    }
    cartasVolteadas = [];
}

function iniciarTiempo() {
    tiempoInicio = new Date().getTime();
    actualizarTiempo();
}

function actualizarTiempo() {
    let tiempoActual = new Date().getTime();
    let tiempoTranscurrido = tiempoActual - tiempoInicio;
    let minutos = Math.floor(tiempoTranscurrido / 60000);
    let segundos = Math.floor((tiempoTranscurrido % 60000) / 1000);
    document.getElementById("tiempo").textContent = (minutos < 10 ? '0' : '') + minutos + ':' + (segundos < 10 ? '0' : '') + segundos;
}

function avanzarNivel() {
    nivelActual++;
    intentos = 0;
    parejasEncontradas = 0;
    actualizarInfo();
    repartirCartas();
}

function actualizarInfo() {
    let puntuacion = (nivelActual * 1000) - (intentos * 10);
    document.getElementById("puntuacion").textContent = `Puntuación: ${puntuacion}`;
}

repartirCartas();
