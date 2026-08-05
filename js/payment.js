document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("paymentModal");
    const addPayment = document.getElementById("addPayment");
    const closeModal = document.getElementById("closeModal");
    const savePayment = document.getElementById("savePayment");
    const table = document.getElementById("paymentsTable");
    const search = document.getElementById("searchPayment");

    let payments = JSON.parse(localStorage.getItem("payments")) || [];

    renderPayments();

    // -----------------------------
    // Відкрити модальне вікно
    // -----------------------------

    addPayment.onclick = () => {
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
    // Додати оплату
    // -----------------------------

    savePayment.onclick = () => {

        const payment = {

            player: document.getElementById("player").value,
            team: document.getElementById("team").value,
            month: document.getElementById("month").value,
            amount: document.getElementById("amount").value,
            status: document.getElementById("status").value

        };

        payments.push(payment);

        savePayments();

        renderPayments();

        clearForm();

        modal.style.display = "none";

    };

    // -----------------------------
    // Вивести таблицю
    // -----------------------------

    function renderPayments(list = payments) {

        table.innerHTML = "";

        list.forEach((payment, index) => {

            table.innerHTML += `

            <tr>

                <td>${payment.player}</td>

                <td>${payment.team}</td>

                <td>${payment.month}</td>

                <td>${payment.amount} грн</td>

                <td class="${payment.status === "Сплачено" ? "status-paid" : "status-unpaid"}">

                    ${payment.status}

                </td>

                <td>

                    <button class="actionBtn deletePayment" data-index="${index}">
                        🗑️
                    </button>

                </td>

            </tr>

            `;

        });

        document.querySelectorAll(".deletePayment").forEach(button => {

            button.onclick = function () {

                const index = Number(this.dataset.index);

                if (confirm("Видалити оплату?")) {

                    payments.splice(index, 1);

                    savePayments();

                    renderPayments();

                }

            };

        });

    }

    // -----------------------------
    // Пошук
    // -----------------------------

    search.addEventListener("input", () => {

        const value = search.value.toLowerCase();

        const filtered = payments.filter(payment =>

            payment.player.toLowerCase().includes(value) ||
            payment.team.toLowerCase().includes(value) ||
            payment.month.toLowerCase().includes(value)

        );

        renderPayments(filtered);

    });

    // -----------------------------
    // LocalStorage
    // -----------------------------

    function savePayments() {

        localStorage.setItem("payments", JSON.stringify(payments));

    }

    // -----------------------------
    // Очистити форму
    // -----------------------------

    function clearForm() {

        document.getElementById("player").value = "";
        document.getElementById("team").value = "";
        document.getElementById("month").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("status").value = "Сплачено";

    }

});