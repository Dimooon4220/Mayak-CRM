const username = localStorage.getItem("username") || "Користувач";

document.getElementById("welcome").innerHTML =
`Вітаємо, ${username}! 👋`;

document.getElementById("userName").innerHTML = username;

// ==========================
// Статистика
// ==========================

const players = JSON.parse(localStorage.getItem("players")) || [];
const trainings = JSON.parse(localStorage.getItem("trainings")) || [];

// У клубі зараз 3 тренери
const coaches = 3;

// Кількість команд
const teams = new Set();

players.forEach(player => {
    if (player.team) {
        teams.add(player.team);
    }
});

// Оновлення карток
const cards = document.querySelectorAll(".card p");

cards[0].textContent = players.length;
cards[1].textContent = coaches;
cards[2].textContent = teams.size;
cards[3].textContent = trainings.length;

// ==========================
// Вихід
// ==========================

document.querySelector(".logout").addEventListener("click", () => {

    localStorage.removeItem("username");

    window.location.href = "index.html";

});
// ===========================
// Новини на головній сторінці
// ===========================

const dashboardNews = document.getElementById("dashboardNews");

if (dashboardNews) {

    const news = JSON.parse(localStorage.getItem("news")) || [];

    // Беремо 3 останні новини
    const latestNews = news.slice(0, 3);

    if (latestNews.length === 0) {

        dashboardNews.innerHTML = `
            <p style="text-align:center;color:#777;font-size:18px;">
                Поки що новин немає.
            </p>
        `;

    } else {

        dashboardNews.innerHTML = "";

        latestNews.forEach(item => {

            dashboardNews.innerHTML += `

                <div class="smallNews">

                    <img src="${item.photo}" alt="Новина">

                    <div class="smallNewsContent">

                        <div class="smallNewsDate">
                            📅 ${item.date}
                        </div>

                        <div class="smallNewsTitle">
                            ${item.title}
                        </div>

                        <div class="smallNewsText">
                            ${item.text.length > 120 ? item.text.substring(0,120) + "..." : item.text}
                        </div>

                    </div>

                </div>

            `;

        });

    }

}

