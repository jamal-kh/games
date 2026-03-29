export class Canvas {
    constructor(parent, contextId = "2d", width = 300, height = 300) {
        const canvas = document.createElement("canvas");

        if (!canvas) {
            throw new Error("Canvas element not created");
        }

        canvas.width = width;
        canvas.height = height;

        document.querySelector(parent).appendChild(canvas);

        this.canvas = canvas;
        this.board = canvas.getContext(contextId);
    }


    set background(color) {
        this.board.fillStyle = color;
        this.board.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }


    border(width = 1, color = "white") {

        this.board.lineWidth = parseInt(width);
        this.board.strokeStyle = color;

        this.board.strokeRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }

    line([startX, startY, endX, endY], width, color = "white") {
        this.board.beginPath();
        this.board.lineWidth = width
        this.board.strokeStyle = color;
        this.board.moveTo(startX, startY);
        this.board.lineTo(endX, endY);
        this.board.stroke();

    }

    circle(start, end, r, startAangle = 0, endAangle = 2 * Math.PI, width, color) {
        this.board.beginPath();
        this.board.lineWidth = width
        this.board.strokeStyle = color;
        this.board.arc(start, end, r, startAangle, endAangle);
        this.board.stroke();
    }


    endDraw() {
        this.board.closePath();
    }
}