const display = document.getElementById("display");

function appendValue(value) {
    if (display.value === "0") {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = "0";
}

function deleteNumber() {
    display.value = display.value.slice(0, -1);

    if (display.value === "") {
        display.value = "0";
    }
}

function calculate() {
    try {
        const expression = display.value;

        if (!/^[0-9+\-*/. ]+$/.test(expression)) {
            display.value = "Error";
            return;
        }

        const result = Function('"use strict"; return (' + expression + ')')();

        display.value = Number.isFinite(result)
            ? String(Number(result.toFixed(10)))
            : "Error";

    } catch {
        display.value = "Error";
    }
}document.querySelectorAll(".buttons button").forEach(button => {
    button.addEventListener("click", function(event) {

        const x = event.clientX;
        const y = event.clientY;

        for (let i = 0; i < 12; i++) {
            const star = document.createElement("span");

            star.className = "star-particle";

            const angle = Math.random() * Math.PI * 2;
            const distance = 30 + Math.random() * 65;

            star.style.left = x + "px";
            star.style.top = y + "px";

            star.style.setProperty("--x",
                Math.cos(angle) * distance + "px");

            star.style.setProperty("--y",
                Math.sin(angle) * distance + "px");

            document.body.appendChild(star);

            setTimeout(() => star.remove(), 700);
        }
    });
});// Calculator button click sound

// Real sound effects
const clickSound = new Audio("sounds/click.mp3");
const rocketSound = new Audio("sounds/rocket.mp3");

// Calculator button sounds
document.querySelectorAll(".calculator button").forEach(button => {
    button.addEventListener("click", () => {
        clickSound.currentTime = 0;
        clickSound.play();
    });
});

const enterBtn = document.getElementById("enterBtn");
const introScreen = document.querySelector(".intro-screen");
const calculator = document.querySelector(".calculator");

enterBtn.addEventListener("click", () => {

    rocketSound.currentTime = 0;
    rocketSound.volume = 0.5;

    rocketSound.play().catch(error => {
        console.log("Sound playback failed:", error);
    });

    introScreen.classList.add("exit");

    setTimeout(() => {
        introScreen.style.display = "none";
        calculator.style.visibility = "visible";
        calculator.style.opacity = "1";
    }, 800);

});