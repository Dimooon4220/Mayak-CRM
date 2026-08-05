const modal = document.getElementById("newsModal");
const addNews = document.getElementById("addNews");
const closeModal = document.getElementById("closeModal");
const saveNews = document.getElementById("saveNews");
const newsContainer = document.getElementById("newsContainer");

let news = JSON.parse(localStorage.getItem("news")) || [];

// Відкрити модальне вікно
addNews.onclick = () => {
    modal.style.display = "flex";
};

// Закрити модальне вікно
closeModal.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
};

// Відобразити всі новини
function renderNews() {

    newsContainer.innerHTML = "";

    news.forEach((item, index) => {

        newsContainer.innerHTML += `
            <div class="newsCard">

                <img src="${item.photo}" alt="Новина">

                <div class="newsContent">

                    <div class="newsDate">${item.date}</div>

                    <div class="newsTitle">${item.title}</div>

                    <div class="newsText">${item.text}</div>

                    <div class="newsButtons">

                        <button class="edit">✏️</button>

                        <button class="delete" onclick="deleteNews(${index})">🗑️</button>

                    </div>

                </div>

            </div>
        `;

    });

}

renderNews();

// Додати новину
saveNews.onclick = () => {

    const file = document.getElementById("photo").files[0];

    const item = {

        title: document.getElementById("title").value,

        text: document.getElementById("text").value,

        date: document.getElementById("date").value,

        photo: "../images/default-news.jpg"

    };

    if(file){

        const reader = new FileReader();

        reader.onload = function(){

            item.photo = reader.result;

            news.unshift(item);

            localStorage.setItem("news", JSON.stringify(news));

            renderNews();

        }

        reader.readAsDataURL(file);

    }else{

        news.unshift(item);

        localStorage.setItem("news", JSON.stringify(news));

        renderNews();

    }

    modal.style.display = "none";

    document.getElementById("title").value = "";
    document.getElementById("text").value = "";
    document.getElementById("date").value = "";
    document.getElementById("photo").value = "";

};

// Видалити новину
function deleteNews(index){

    if(confirm("Видалити новину?")){

        news.splice(index,1);

        localStorage.setItem("news", JSON.stringify(news));

        renderNews();

    }

}

window.deleteNews = deleteNews;