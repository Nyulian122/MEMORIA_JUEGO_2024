import { nivel, repartir_cartas } from "./repartir_cartas.js";
import { Descubir_cartas } from "./descubrir_carta.js";
import { cargar_ventana_modal } from "./Ventana_modal.js";

let div_cronometro = document.querySelector(".cronometro");

let tiempo;
function iniciar_cronometro(minutos, segundos) {
    // Correctly format the initial time display
    if (segundos < 10) {
        div_cronometro.innerHTML = `0${minutos}:0${segundos}`;
    }
    else {
        div_cronometro.innerHTML = `0${minutos}:${segundos}`;
    }
    function actualizar() {
        // Correctly decrement seconds and minutes
        segundos--;
        if (segundos < 0) {
            if (minutos > 0) {
                segundos = 59;
                minutos--;
            } else {
                // Stop the timer and perform actions when time is up
                clearInterval(tiempo);
                console.log("Fin del tiempo");
                repartir_cartas(nivel);
                Descubir_cartas();
                cargar_ventana_modal()

                return; // Exit the function to prevent further decrementing
            }
        }

        // Update the display with the new time
    
        if (segundos < 10) {
            div_cronometro.innerHTML = `0${minutos}:0${segundos}`;
        }
        else {
            div_cronometro.innerHTML = `0${minutos}:${segundos}`;
        }
    }
    tiempo = setInterval(actualizar, 1000);
}

export { iniciar_cronometro }
