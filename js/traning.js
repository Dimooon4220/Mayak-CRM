document.addEventListener("DOMContentLoaded", () => {

const modal = document.getElementById("trainingModal");
const addTraining = document.getElementById("addTraining");
const closeModal = document.getElementById("closeModal");
const saveTraining = document.getElementById("saveTraining");
const table = document.getElementById("trainingTable");

let trainings = JSON.parse(localStorage.getItem("trainings")) || [];

renderTrainings();

// Відкрити модальне вікно
addTraining.onclick = () => {
    modal.style.display = "flex";
};

// Закрити
closeModal.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (e) => {
    if(e.target === modal){
        modal.style.display = "none";
    }
};

// Зберегти тренування
saveTraining.onclick = () => {

    const file = document.getElementById("document").files[0];

    const training = {

        date: document.getElementById("date").value,
        team: document.getElementById("team").value,
        coach: document.getElementById("coach").value,
        topic: document.getElementById("topic").value,

        documentName: file ? file.name : "Немає документа"

    };

    trainings.push(training);

    localStorage.setItem("trainings", JSON.stringify(trainings));

    renderTrainings();

    modal.style.display = "none";

};

// Вивести таблицю
function renderTrainings(){

    table.innerHTML = "";

    trainings.forEach((training,index)=>{

        table.innerHTML += `
        <tr>

            <td>${training.date}</td>

            <td>${training.team}</td>

            <td>${training.coach}</td>

            <td>${training.topic}</td>

            <td>${training.documentName}</td>

                <td>

                    <button class="deleteTraining" data-index="${index}">
                        🗑️
                    </button>

                </td>

        </tr>
        `;

    });

}

document.querySelectorAll(".deleteTraining").forEach(button => {

    button.onclick = function(){

        const index = Number(this.dataset.index);

        if(confirm("Видалити це тренування?")){

            trainings.splice(index, 1);

            localStorage.setItem("trainings", JSON.stringify(trainings));

            renderTrainings();

        }

    };

});

});