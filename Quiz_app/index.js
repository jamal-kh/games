import { Timer } from "./timer.js";
import { Question } from "./questions.js";

const app = document.querySelector(".app")
const start_screen = document.querySelector("#start-screen")
const start_btn = document.querySelector('.start_btn');
const timer = document.querySelector('.timer');
const question_index = document.querySelector('.question-index');
const question_box = document.querySelector(".question-box");
const answers_container = document.querySelector(".options-grid");
const restart = document.querySelector('.restart-btn');
const resultState = document.getElementById('result-state');
const scoreNum = document.getElementById('score-num');
const msg = document.getElementById('result-msg');


const time = new Timer(90);
const questions = await Question.init("./questionFile.json");
let score = 0;

const updateQuestion = () => {
    question_index.innerHTML = "";

    const text1 = document.createTextNode("Question ");
    const bold = document.createElement("b");
    bold.textContent = questions.index + 1;
    const text2 = document.createTextNode(` of ${questions.length}`);

    question_index.append(text1, bold, text2);
};

const finish_game = () => {
    app.classList.add("hidden");
    resultState.classList.remove("hidden");
    scoreNum.textContent = score;

    if (score === 10) {
        msg.innerText = "Perfect Score! 🌟";
    } else if (score >= 7) {
        msg.innerText = "Great Job! 👍";
    } else {
        msg.innerText = "Keep practicing! 💪";
    }
}

const checkAnswer = (btn) => {
    const selected = btn.textContent;

    const allButtons = answers_container.querySelectorAll("button");
    allButtons.forEach(b => b.disabled = true);

    if (!questions.isAnswerCorrect(selected)) {
        btn.style.borderColor = "red";
    } else {
        btn.style.borderColor = "green";
        score++;
    }

    allButtons.forEach(b => {
        if (questions.isAnswerCorrect(b.textContent)) {
            b.style.borderColor = "green";
        }
    });

    setTimeout(() => {
        if (questions.index === questions.length - 1) {
            finish_game();
            return; // stop further execution
        }


        questions.next();


        updateQuestion();
        showCurrentQuestion();

    }, 1000);
};

const showCurrentQuestion = () => {

    question_box.innerHTML = "";
    answers_container.innerHTML = "";

    const createH2 = document.createElement("h2");
    createH2.textContent = questions.current;
    question_box.appendChild(createH2);

    questions.answers.forEach((v, i) => {
        const btn = document.createElement("button");

        btn.classList.add("btn-option");
        btn.textContent = v;
        btn.setAttribute("data-alpha", String.fromCharCode(97 + i));

        btn.addEventListener("click", (e) => {
            const selectedAanswer = e.target

            checkAnswer(selectedAanswer);
        });

        answers_container.appendChild(btn);
    });
};

let start_game = () => {
    time.start(
        (v) => {
            const { minute, second } = time.formatted(v);
            const fminute = minute < 10 ? "0" + minute : minute;
            const fsecond = second < 10 ? "0" + second : second;
            timer.innerHTML = `${fminute} : ${fsecond}`;
        }
    )

    // hide start sceen and show questions screen
    resultState.classList.add("hidden");
    start_screen.classList.add("hidden");
    app.classList.remove("hidden");


    updateQuestion();
    showCurrentQuestion()
}


restart.addEventListener('click', start_game);
start_btn.addEventListener("click", start_game);