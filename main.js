let timers = document.querySelectorAll('#timer span i')

timers.forEach(t => {
    t.addEventListener("click", (event) => {
        const rect = t.getBoundingClientRect();

        const posYRelativa = event.clientY - rect.top;

        const alturaDiv = rect.height;

        // 4. Comparar a posição relativa com a metade da altura
        if (posYRelativa < alturaDiv / 2) {
            alter(t, true)
        } else {
            alter(t, false)
        }

        if(Number(timers[1].textContent) === 60){
            timers[1].textContent = '00'
            var num = timers[0].textContent
            num = Number(num)
            num ++

            num = String(num).padStart(2, '0');
            timers[0]. textContent = num
        }
    })
});

function alter(div, flag){
    tempNum = Number(div.textContent)

    if(flag === true){
        tempNum += 5
    }
    else{
        tempNum -= 5
    }
    tempNum = String(tempNum).padStart(2, '0');
    div.textContent = tempNum
}