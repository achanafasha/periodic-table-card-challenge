
let selectedLevel = "";
let student = "";
let cards = [];
let currentCard = 0;
let score = 0;
let answered = false;

const cardCount = {
    mudah: 8,
    sedang: 5,
    sulit: 3
};


function selectLevel(level) {
    selectedLevel = level;

    document.querySelectorAll(".level").forEach(button => {
        button.classList.remove("selected");
    });

    const buttonClasses = {
        mudah: "easy",
        sedang: "medium",
        sulit: "hard"
    };

    document.querySelector("." + buttonClasses[level])
        .classList.add("selected");

    document.getElementById("selectedLevel").textContent =
        "Level " + level.toUpperCase() +
        " dipilih. Kamu akan menjawab " +
        cardCount[level] + " kartu.";

    document.getElementById("startButton").disabled = false;
}

function startGame() {
    student = document.getElementById("studentName").value.trim();

    if (!student) {
        alert("Masukkan nama siswa terlebih dahulu!");
        return;
    }

    const bank = questionBank[selectedLevel];

    if (!bank || bank.length < cardCount[selectedLevel]) {
        alert("Jumlah soal belum mencukupi!");
        return;
    }

    cards = [...bank]
        .sort(() => Math.random() - 0.5)
        .slice(0, cardCount[selectedLevel]);

    currentCard = 0;
    score = 0;

    document.getElementById("home").hidden = true;
    document.getElementById("game").hidden = false;

    document.getElementById("welcome").textContent =
        "Semangat, " + student + "!";

    showCard();
}

function showCard() {
    answered = false;

    const card = cards[currentCard];

    document.getElementById("cardProgress").textContent =
        "Kartu " + (currentCard + 1) + " dari " + cards.length;

    document.getElementById("question").textContent =
        card.question;

    document.getElementById("answer").textContent =
        "Jawaban: " + card.answer;

    document.getElementById("answer").hidden = true;

    document.getElementById("nextButton").hidden = true;

    document.querySelector(".grading").hidden = true;
}

function showAnswer() {
    if (answered) return;

    document.getElementById("answer").hidden = false;
    document.querySelector(".grading").hidden = false;
}

function markAnswer(correct) {
    if (answered) return;

    answered = true;

    if (correct) {
        score++;
    }

    document.getElementById("nextButton").hidden = false;
    document.querySelector(".grading").hidden = true;
}

function nextCard() {
    currentCard++;

    if (currentCard < cards.length) {
        showCard();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("game").hidden = true;
    document.getElementById("result").hidden = false;

    document.getElementById("finalName").textContent =
        "Nama: " + student;

    document.getElementById("finalScore").textContent =
        "Skor: " + score + " dari " + cards.length +
        " (" + Math.round(score / cards.length * 100) + "%)";
}
