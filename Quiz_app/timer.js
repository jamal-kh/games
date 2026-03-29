export class Timer {
    #duration = 0;
    #interval = null;
    #isRunning = false;

    constructor(second) {
        this.#duration = second;
    }

    get isStarted() {
        return this.#isRunning;
    }

    start(onTick = () => {}) {
        if (this.#isRunning) return;

        if (this.#duration <= 0) {
            console.error("The duration must be greater than 0");
            return;
        }

        this.#isRunning = true;

        let currentTime = this.#duration;

        onTick(currentTime);

        this.#interval = setInterval(() => {
            currentTime--;

            onTick(currentTime);

            if (currentTime === 0) {
                this.stop();
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.#interval);
        this.#interval = null;
        this.#isRunning = false;
    }

    formatted(time) {
        return {
            hour: Math.floor(time / 3600),
            minute: Math.floor((time % 3600) / 60),
            second: time % 60
        };
    }
}