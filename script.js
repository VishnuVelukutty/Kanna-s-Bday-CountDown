const birthday = new Date("August 2, 2026 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const diff = birthday - now;

    if (diff <= 0) {
        document.getElementById("countdown").innerHTML = "🎉 HAPPY BIRTHDAY MY KANNA KUTTY 🎉";
        startConfetti();
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById("countdown").innerHTML =
        `${d} Days ${h} Hours ${m} Minutes ${s} Seconds 💛`;
}

setInterval(updateCountdown, 1000);

function startConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");

        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDuration = (Math.random() * 3 + 2) + "s";

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}

window.onload = function () {
    if (new Date().getTime() >= birthday) {
        startConfetti();
    }
};

function toggleMusic() {
    const music = document.getElementById("bgm");
    if (music.paused) music.play();
    else music.pause();
}

async function loadQuote() {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem("quoteDate");
    const savedQuote = localStorage.getItem("dailyQuote");

    // If quote already saved today, use it
    if (savedDate === today && savedQuote) {
        document.getElementById("quote").innerText = savedQuote;
        return;
    }

    try {
        const res = await fetch(
            "https://api.quotable.io/random"
        );
        const data = await res.json();

        const quoteText = `"${data.content}" — ${data.author || "Unknown"} ❤️`;

        document.getElementById("quote").innerText = quoteText;

        // Save today's quote
        localStorage.setItem("dailyQuote", quoteText);
        localStorage.setItem("quoteDate", today);

    } catch {
        const fallback = "I love you more than words can ever say ❤️";
        document.getElementById("quote").innerText = fallback;
    }
}

loadQuote();

async function loadWeather() {
    try {
        const res = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=19.0728&longitude=72.8826&current_weather=true"
        );


        const data = await res.json();
        const temp = data.current_weather.temperature;

        let cuddle;

        if (temp < 20) cuddle = "Perfect weather for cozy cuddles 🥰";
        else if (temp < 30) cuddle = "Lovely weather for holding hands 💞";
        else cuddle = "Too hot! Ice-cream cuddles 🍦❤️";

        document.getElementById("weather").innerHTML =
            `Temperature: ${temp}°C <br> ${cuddle}`;

    } catch {
        document.getElementById("weather").innerText =
            "What Weather ??? — Let us cuddle ❤️";
    }
}

loadWeather();


function checkBirthday() {

    const now = new Date().getTime();
    const btn = document.getElementById("musicBtn");

    if (now >= birthday) {
        btn.style.display = "inline-block"; // show button
    }
}

function toggleMusic() {
    const music = document.getElementById("bgm");

    if (music.paused) {
        music.play();
        document.getElementById("musicBtn").innerText = "⏸ Pause Music";
    } else {
        music.pause();
        document.getElementById("musicBtn").innerText = "🎵 Play Music";
    }
}

checkBirthday();