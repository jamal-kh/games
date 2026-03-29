export class Draw {
    #canvas;
    #context;
    #step = 0;
    #steps = [
        () => this.head(),
        () => this.body(),
        () => this.leftHand(),
        () => this.rightHand(),
        () => this.leftLeg(),
        () => this.rightLeg()
    ];

    constructor(canvasName) {
        this.#canvas = document.querySelector(canvasName);
        this.#context = this.#canvas.getContext("2d");

        this.#context.lineWidth = 2;
        this.#context.lineCap = "round";
    }

    set color(color) {
        this.#context.strokeStyle = color;
        this.#context.fillStyle = color;
    }

    // 🧱 Gallows
    base() {
        this.#context.beginPath();
        this.#context.moveTo(10, 290);
        this.#context.lineTo(190, 290);
        this.#context.stroke();
    }

    pole() {
        this.#context.beginPath();
        this.#context.moveTo(50, 290);
        this.#context.lineTo(50, 20);
        this.#context.lineTo(150, 20);
        this.#context.lineTo(150, 50);
        this.#context.stroke();
    }

    // 🧍 Body parts
    head() {
        this.#context.beginPath();
        this.#context.arc(150, 70, 20, 0, Math.PI * 2);
        this.#context.stroke();
    }

    body() {
        this.#context.beginPath();
        this.#context.moveTo(150, 90);
        this.#context.lineTo(150, 150);
        this.#context.stroke();
    }

    leftHand() {
        this.#context.beginPath();
        this.#context.moveTo(150, 110);
        this.#context.lineTo(120, 130);
        this.#context.stroke();
    }

    rightHand() {
        this.#context.beginPath();
        this.#context.moveTo(150, 110);
        this.#context.lineTo(180, 130);
        this.#context.stroke();
    }

    leftLeg() {
        this.#context.beginPath();
        this.#context.moveTo(150, 150);
        this.#context.lineTo(120, 180);
        this.#context.stroke();
    }

    rightLeg() {
        this.#context.beginPath();
        this.#context.moveTo(150, 150);
        this.#context.lineTo(180, 180);
        this.#context.stroke();
    }

    next() {
        if (this.#step >= this.#steps.length) return;

        this.#steps[this.#step++]();
    }

    reset() {
        this.#step = 0;
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    }

    isDead() {
        if (this.#step == this.#steps.length) {
            this.#context.save();

            const x = this.#canvas.width / 2;
            const y = this.#canvas.height / 2;

            const width = 220;
            const height = 80;

            // move to center
            this.#context.translate(x, y);

            // rotate 45 degrees
            this.#context.rotate((-45 * Math.PI) / 180);

            // draw box
            this.#context.fillStyle = "transparent";
            this.#context.strokeStyle = "red";
            this.#context.lineWidth = 4;

            this.#context.fillRect(-width / 2, -height / 2, width, height);
            this.#context.strokeRect(-width / 2, -height / 2, width, height);

            // text inside box
            this.#context.fillStyle = "red";
            this.#context.font = "bold 30px Arial";
            this.#context.textAlign = "center";
            this.#context.textBaseline = "middle";

            this.#context.fillText("GAME OVER", 0, 0);

            this.#context.restore();
            return true;
        }

        return false;
    }
}