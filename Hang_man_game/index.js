import { Draw } from "./Draw.js";
import { Keyboard } from "./Keyboard.js";
import { Question } from "./Question.js";
import { Timer } from "./timer.js";

const start_screen = document.querySelector("#startGame");
const start_game = document.querySelector("#StartBtn");
const game_screen = document.querySelector("#GameSection");
const time = document.querySelector("#timer");
const question = document.querySelector("#question");
const lines = document.querySelector("#lines");

let correctLetter = 0;

const questionObj = await Question.init("./Question.json");
const timer = new Timer(60);
const draw = new Draw("#hangmanCanvas");
const keyboard = new Keyboard("#alphabets");

const checkAnswer = (letter) => {
  const letters = document.querySelectorAll(".letter");
  const answer = questionObj.answer;
  const isIncludes = questionObj.isAnswerCorrect(letter);

  if (isIncludes) {
    letters.forEach((v, i) => {
      if (answer[i] === letter) {
        v.innerHTML = letter
        correctLetter++;
      };
    });
  }else{
    draw.next();
    game_over();
  }

  if (answer.length == correctLetter) {
    questionObj.next();
    resetAll()
    start()
  }
}

const generateLines = (length) => {
  return Array.from({ length }, () => {
    const span = document.createElement("span");

    span.classList.add("letter");
    return span;
  });
};

const resetAll = () => {
  lines.innerHTML = "";
  keyboard.reset();
  correctLetter = 0;
  timer.stop();
  draw.reset();
}


const start = async () => {

  start_screen.classList.add("hidden");
  game_screen.classList.remove("hidden");


  draw.color = "white";

  draw.base();
  draw.pole();

  timer.start(
    (v) => {
      const { minute, second } = timer.formatted(v);
      const fMinute = minute < 10 ? "0" + minute : minute;
      const fSecond = second < 10 ? "0" + second : second;
      time.innerHTML = `${fMinute} : ${fSecond}`;

    }
  );


  question.innerHTML = questionObj.current

  generateLines(questionObj.answer.length).map(el => {
    lines.appendChild(el)
  });

  keyboard.render();

  keyboard.onPress(checkAnswer);
}


const game_over = () =>{
    if(draw.isDead()){
      timer.stop();
    }
}

start_game.addEventListener("click", start);
