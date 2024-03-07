let cards1 = ["🤫", "🧏", "😈", "🤡", "🛐", "😮", "😅", "🫢", "💀", "🧔‍♂️", "🧠", "🤢"];
let cards2 = ["🤫", "🧏", "😈", "🤡", "🛐", "😮", "😅", "🫢", "💀", "🧔‍♂️", "🧠", "🤢"];
let todaslascartas = cards1.concat(cards2);
let cartasVolteadas = [];
let parejasEncontradas = 0;

function repartirCartas() {
    let tablero = document.querySelector("#root");
    todaslascartas.forEach((cada_carta) => {

        let cart = document.createElement("div");
        cart.className = "carta";
        cart.dataset.valor = cada_carta;
        cart.textContent = "♦️♣️";
        tablero.appendChild(cart);
        cart.addEventListener("click", voltearCarta);

    });
}

function voltearCarta() {
    if (cartasVolteadas.length < 2 && !this.classList.contains("encontrada") && !this.classList.contains("volteada")) {
        this.textContent = this.dataset.valor;
        this.classList.add("volteada");
        cartasVolteadas.push(this);
        
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
            alert("¡Felicidades! Has encontrado todas las parejas.");
        }
    } else {
        carta1.textContent = "♦️♣️";
        carta2.textContent = "♦️♣️";
    }
    cartasVolteadas = [];
}

repartirCartas();