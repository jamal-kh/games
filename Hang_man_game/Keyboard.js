export class Keyboard {
    #element;
    #onPressCallback;

    constructor(element) {
        this.#element = document.querySelector(element);
        this.#onPressCallback = null;
    }

    render() {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        this.#element.innerHTML = "";

        letters.split("").forEach(letter => {
            const btn = document.createElement("button");
            btn.textContent = letter;
            btn.dataset.key = letter;

            btn.addEventListener("click", () => {
                this.#press(letter, btn);
            });

            this.#element.appendChild(btn);
        });
    }

    #press(letter, btn) {
        btn.disabled = true;
        btn.classList.add("used");

        if (this.#onPressCallback) {
            this.#onPressCallback(letter);
        }
    }

    onPress(callback) {
        this.#onPressCallback = callback;
    }

    reset() {
        this.#element.querySelectorAll("button").forEach(btn => {
            btn.disabled = false;
            btn.classList.remove("used");
        });
    }

    disableAll() {
        this.#element.querySelectorAll("button").forEach(btn => {
            btn.disabled = true;
        });
    }
}