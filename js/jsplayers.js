document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("playerModal");
    const addPlayer = document.getElementById("addPlayer");
    const closeModal = document.getElementById("closeModal");
    const savePlayer = document.getElementById("savePlayer");
    const table = document.getElementById("playersTable");

    let players = JSON.parse(localStorage.getItem("players")) || [];

    renderPlayers();

    // -----------------------------
    // Відкрити модальне вікно
    // -----------------------------
    addPlayer.onclick = () => {
        modal.style.display = "flex";
    };

    // -----------------------------
    // Закрити модальне вікно
    // -----------------------------
    closeModal.onclick = () => {
        modal.style.display = "none";
    };

    window.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    };

    // -----------------------------
    // Зберегти гравця
    // -----------------------------
    savePlayer.onclick = () => {

        const player = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            birthDate: document.getElementById("birthDate").value,
            team: document.getElementById("team").value,
            number: document.getElementById("number").value,
            phone: document.getElementById("phone").value,
            parentPhone: document.getElementById("parentPhone").value,
            email: document.getElementById("email").value,
            position: document.getElementById("position").value,
            photo: ""
        };

        const file = document.getElementById("photo").files[0];

        if (file) {

            const reader = new FileReader();

            reader.onload = function () {

                player.photo = reader.result;

                players.push(player);

                savePlayers();

                renderPlayers();

                clearForm();

                modal.style.display = "none";

            };

            reader.readAsDataURL(file);

        } else {

            players.push(player);

            savePlayers();

            renderPlayers();

            clearForm();

            modal.style.display = "none";

        }

    };

    // -----------------------------
    // Вивести гравців
    // -----------------------------
    function renderPlayers() {

        table.innerHTML = "";

        players.forEach((player, index) => {

            table.innerHTML += `
            <tr>

                <td>
                    <img
                        src="${player.photo || "../images/default-user.png"}"
                        class="playerPhoto">
                </td>

                <td>${player.firstName} ${player.lastName}</td>

                <td>${calculateAge(player.birthDate)}</td>

                <td>${player.team}</td>

                <td>${player.number}</td>

                <td>${player.phone}</td>

                <td>${player.position}</td>

                <td>

                    <button class="deleteBtn" data-index="${index}">
                        🗑️
                    </button>

                </td>

            </tr>
            `;

        });

        // Підключаємо кнопки видалення
        document.querySelectorAll(".deleteBtn").forEach(button => {

            button.onclick = function () {

                const index = Number(this.dataset.index);

                if (confirm("Видалити цього гравця?")) {

                    players.splice(index, 1);

                    savePlayers();

                    renderPlayers();

                }

            };

        });

    }

    // -----------------------------
    // Вік
    // -----------------------------
    function calculateAge(date) {

        if (!date) return "-";

        const today = new Date();

        const birth = new Date(date);

        let age = today.getFullYear() - birth.getFullYear();

        const m = today.getMonth() - birth.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;

    }

    // -----------------------------
    // Зберегти LocalStorage
    // -----------------------------
    function savePlayers() {

        localStorage.setItem("players", JSON.stringify(players));

    }

    // -----------------------------
    // Очистити форму
    // -----------------------------
    function clearForm() {

        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("birthDate").value = "";
        document.getElementById("team").value = "";
        document.getElementById("number").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("parentPhone").value = "";
        document.getElementById("email").value = "";
        document.getElementById("position").value = "";
        document.getElementById("photo").value = "";

    }

});