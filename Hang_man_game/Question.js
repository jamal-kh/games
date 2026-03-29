export class Question {
    #path;
    #questions = [];
    #index = 0;

    constructor(questions, path = "") {
        if (typeof path !== "string") {
            throw new Error("The path argument must be string");
        }

        this.#path = path;
        this.#questions = questions;
    }

    get length() {
        return this.#questions.length;
    }

    get index() {
        return this.#index;
    }

    get current() {
        if (!this.#questions.length) {
            throw new Error("Questions not loaded. Call init() first.");
        }
        return this.#questions[this.#index].hint;
    }

    get answer() {
        return this.#questions[this.#index].answer;
    }

    static async init(path) {
        const fetching = await fetch(path);

        if (!fetching.ok) {
            throw new Error("Error when fetching questions");
        }

        const toObject = await fetching.json();



        return new Question(toObject, path);
    }
    next() {
        if (this.#index < this.#questions.length - 1) {
            this.#index++;
            return true;
        }
        console.warn("You are already in last question")
        return false;
    }

    previous() {
        if (this.#index > 0) {
            this.#index--;
            return true;
        }
        console.warn("You are already in first question");
        return false;

    }

    isAnswerCorrect(alphabet) {
        return this.#questions[this.#index].answer.includes(alphabet);
    }
}