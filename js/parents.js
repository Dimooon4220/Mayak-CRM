const players = JSON.parse(localStorage.getItem("players")) || [];

const table = document.getElementById("parentsTable");

const search = document.getElementById("searchParent");

function renderParents() {

    table.innerHTML = "";

    players.forEach(player => {

        table.innerHTML += `
        <tr>

            <td>${player.firstName} ${player.lastName}</td>

            <td>Батьки</td>

            <td>${player.parentPhone || "-"}</td>

            <td>${player.email || "-"}</td>

            <td>${player.team}</td>

            <td>✅</td>

        </tr>
        `;

    });

}

function renderParents(filter = "") {

    table.innerHTML = "";

    players.forEach(player => {

        const fullName = `${player.firstName} ${player.lastName}`;

        if (!fullName.toLowerCase().includes(filter.toLowerCase())) return;

        table.innerHTML += `
        <tr>

            <td>${fullName}</td>

            <td>Батьки</td>

            <td>${player.parentPhone || "-"}</td>

            <td>${player.email || "-"}</td>

            <td>${player.team}</td>

            <td>✅</td>

        </tr>
        `;

    });

}

search.addEventListener("input", () => {

    renderParents(search.value);

});