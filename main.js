// Elementos de tempo
let config = -1
const timers = document.querySelectorAll('#timer span i');
const minEl = timers[0];
const secEl = timers[1];

// Botões
const [btnStart, btnReset, btnGear] = document.querySelectorAll("button");

let interval = null;

// ===== AJUSTE MANUAL (clicando no número) =====
timers.forEach(t => {
    t.addEventListener("click", (event) => {
        // Se estiver rodando, não permitir ajustar
        if (interval !== null) return;

        const rect = t.getBoundingClientRect();
        const posY = event.clientY - rect.top;

        const isUp = posY < rect.height / 2;
        alterarValor(t, isUp);
        ajustarOverflow();
    });
});

function alterarValor(div, isUp) {
    let num = Number(div.textContent);

    if (isUp) {
        num += 5;
    } else {
        num -= 5;
    }

    div.textContent = String(num).padStart(2, '0');
}

function ajustarOverflow() {
    let min = Number(minEl.textContent);
    let sec = Number(secEl.textContent);

    while (sec >= 60) {
        sec -= 60;
        min++;
    }

    while (sec < 0) {
        sec += 60;
        min--;
    }

    if (min < 0) min = 0;

    minEl.textContent = String(min).padStart(2, '0');
    secEl.textContent = String(sec).padStart(2, '0');
}

// ===== TIMER =====

// Retorna total de segundos das labels
function getTotalSeconds() {
    let min = Number(minEl.textContent);
    let sec = Number(secEl.textContent);
    return min * 60 + sec;
}

// Atualiza os números na tela
function updateDisplay(total) {
    let m = Math.floor(total / 60);
    let s = total % 60;

    minEl.textContent = String(m).padStart(2, '0');
    secEl.textContent = String(s).padStart(2, '0');
}

// START / PAUSE
btnStart.addEventListener("click", () => {
    if (interval !== null) {
        // Pausa
        clearInterval(interval);
        interval = null;
        return;
    }

    let total = getTotalSeconds();

    interval = setInterval(() => {
        total--;

        // Impedir valores negativos
        if (total <= 0) {
            total = 0;
            updateDisplay(total);
            clearInterval(interval);
            interval = null;
            return;
        }

        updateDisplay(total);
    }, 1000);
});

// RESET
btnReset.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;

    minEl.textContent = "00";
    secEl.textContent = "00";
});