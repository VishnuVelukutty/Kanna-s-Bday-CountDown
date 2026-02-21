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
    try {
        const res = await fetch(
            "https://api.api-ninjas.com/v2/quotes?category=love",
            {
                headers: {
                    "X-Api-Key": "bYnQmTYqWcI5Z71noTsCyAZm03T6giOsrZLBibem"
                }
            }
        );
        const data = await res.json();

        document.getElementById("quote").innerText =
            `"${data[0].quote}" — ${data[0].author || "Unknown"} ❤️`;
    } catch {
        document.getElementById("quote").innerText =
            "I love you more than words can ever say ❤️";
    }
}

loadQuote();

async function loadWeather() {
    const apiKey = "54ef89471b96009721018a7142484c9a";
    const city = "Borivali, IN";

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        const data = await res.json();

        const temp = data.main.temp;
        let cuddle;

        if (temp < 20) cuddle = "Perfect weather for cozy cuddles 🥰";
        else if (temp < 30) cuddle = "Lovely weather for holding hands 💞";
        else cuddle = "Too hot! Ice-cream cuddles 🍦❤️";

        document.getElementById("weather").innerHTML =
            `${(data.weather[0].description).toUpperCase()}, ${temp}°C <br> ${cuddle}`;
    } catch {
        document.getElementById("weather").innerText =
            "Weather unavailable — but cuddles always recommended ❤️";
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