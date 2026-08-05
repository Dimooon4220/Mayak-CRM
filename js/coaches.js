const coaches = [
    {
        id: 1,
        firstName: "Віталій",
        lastName: "Крищук",
        role: "Головний тренер",
        teams: "Men, U14",
        phone: "+380 98 67 28 995",
        email: "Vitaliy.Krischyk@gmail.com",
        photo: "../imeges/Vitaliy.jpg"
    },
    {
        id: 2,
        firstName: "Дмитро",
        lastName: "Буравлев",
        role: "Тренер",
        teams: "U12",
        phone: "+380 68 935 81 48",
        email: "dimaburavlov@gmail.com",
        photo: "../imeges/Dima.png"
    },
    {
        id: 3,
        firstName: "Святослав",
        lastName: "Юр",
        role: "Тренер",
        teams: "U10",
        phone: "+380 66 705 52 46",
        email: "coach3@mayak.com",
        photo: "../imeges/Svatik.jpg"
    }
];


window.onclick = (e) => {

    if(e.target === modal){

        modal.style.display = "none";

    }

}

const coachGrid = document.getElementById("coachGrid");

function renderCoaches() {

    coachGrid.innerHTML = "";

    coaches.forEach(coach => {

        coachGrid.innerHTML += `
        <div class="card">

            <img src="${coach.photo}" alt="Фото тренера">

            <h2>${coach.firstName} ${coach.lastName}</h2>

            <div class="role">${coach.role}</div>

            <p>🏑 ${coach.teams}</p>

            <p>📞 ${coach.phone}</p>

            <p>✉️ ${coach.email}</p>

        </div>
        `;

    });

}

renderCoaches();

const saveCoach = document.getElementById("saveCoach");

saveCoach.onclick = () => {

    const file = document.getElementById("photo").files[0];

    const coach = {

        id: Date.now(),

        firstName: document.getElementById("firstName").value,

        lastName: document.getElementById("lastName").value,

        role: document.getElementById("role").value,

        teams: document.getElementById("teams").value,

        phone: document.getElementById("phone").value,

        email: document.getElementById("email").value,

        photo: "../images/default-user.png"

    };

    if(file){

        const reader = new FileReader();

        reader.onload = function(){

            coach.photo = reader.result;

            coaches.push(coach);

            renderCoaches();

        }

        reader.readAsDataURL(file);

    }else{

        coaches.push(coach);

        renderCoaches();

    }

    modal.style.display = "none";

}