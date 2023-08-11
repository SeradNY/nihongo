// Función para cargar el archivo JSON
function cargarJSON() {
    var request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open('GET', "n4.json", true);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            window.localStorage["nihongo"] = request.responseText;
        }
    };
    request.send(null);
    window.localStorage.removeItem('selectOptionsLesson');
    window.localStorage.removeItem('selectOptionsType');
    window.localStorage.removeItem('filtered');
}

// Función para mostrar el contenido del JSON en la consola
function mostrarJSON(data) {
    // console.log(data);
}

function filterJSON() {
    let filtered = JSON.parse(window.localStorage["nihongo"]).data[0];
    const container = document.getElementById("containerNihongo");
    window.localStorage.removeItem('filtered');
    container.innerHTML = ""

    const lesson = window.localStorage["selectOptionsLesson"];
    if (lesson) {
        filtered = filtered.filter(it => it.lesson === parseInt(lesson))
    }
    const type = window.localStorage["selectOptionsType"];
    if (type) {
        filtered = filtered.filter(it => it.type === type)
    }

    window.localStorage["filtered"] = JSON.stringify(filtered);
}

function setFilter(filter) {
    const selectElement = document.getElementById(filter);
    const valorSeleccionado = selectElement.value;
    window.localStorage[filter] = valorSeleccionado;
}

function startGame() {
    filterJSON();
    createQuest();
}

function createQuest() {
    const container = document.getElementById("containerNihongo");
    container.innerHTML = "";
    const dataRequest = window.localStorage["filtered"];
    const dataFiltered = JSON.parse(dataRequest);

    const id = Math.floor(Math.random() * dataFiltered.length);
    const itemSelect = dataFiltered[id];

    const div = document.createElement('div')
    div.className = "cardGame"
    div.id = "cardGame"
    div.dataset.idCard = id
    div.innerHTML = itemSelect.jp;
    container.appendChild(div)
    createAnswers(id)

    console.log("===", itemSelect);
}

function createAnswers(id) {
    const container = document.getElementById("containerNihongo");
    const maxAnswers = 4;
    const randomAnswers = Math.floor(Math.random() * maxAnswers);

    const div = document.createElement('div')
    div.className = "answersGame";
    div.id = "answersGame";
    div.innerHTML = '';
    container.appendChild(div)

    for (let index = 0; index < maxAnswers; index++) {
        if (randomAnswers === index) {
            insertAnswer(id)
        } else {
            insertAnswer()
        }
    }
}

function insertAnswer(id) {
    const dataRequest = window.localStorage["filtered"];
    const dataFiltered = JSON.parse(dataRequest);

    if (id) {
        buttonAnswer(dataFiltered[id], id)
    } else {
        const idAnswer = Math.floor(Math.random() * dataFiltered.length);
        if (idAnswer === id) { insertAnswer(); return }
        buttonAnswer(dataFiltered[idAnswer], idAnswer)
    }
}

function buttonAnswer(itemAnswer, idAnswer) {
    console.log("answers", itemAnswer)
    const container = document.getElementById("answersGame");
    const button = document.createElement('button')
    button.id = "answersGame" + idAnswer;
    button.className = "answers";
    button.onclick = function () { checkAnswer(idAnswer) }
    button.innerHTML = itemAnswer.esp
    button.dataset.idCard = idAnswer
    container.appendChild(button)
}

function checkAnswer(idAnswer) {
    const container = document.getElementById("cardGame");
    const correctAnswer = container.dataset.idCard;
    console.log(idAnswer, correctAnswer)
    if (correctAnswer.toString() === idAnswer.toString()) {
        createQuest()
    }
}

cargarJSON();