import { Canvas } from "./Canvas.js";

export class TicTacToe extends Canvas {
  #lineWidth = 4;

  #winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6], // diagonals
  ];

  #gridLines = [
    [0, 100, 300, 100],
    [0, 200, 300, 200],
    [100, 0, 100, 300],
    [200, 0, 200, 300],
  ];

  constructor(parent) {
    super(parent, "2d", 300, 300);
  }

  // ------------------ BOARD ------------------
  drawBoard() {
    this.#gridLines.forEach(line => this.line(line, 2, "white"));
  }

  // ------------------ X ------------------
  drawX(x, y) {
    const size = 30;
    const color = "yellow";

    const lines = [
      [x - size, y - size, x + size, y + size],
      [x + size, y - size, x - size, y + size],
    ];

    let i = 0;

    const animateLine = (coords) => {
      let progress = 0;

      const step = () => {
        const [sx, sy, ex, ey] = coords;

        const cx = sx + (ex - sx) * (progress / 100);
        const cy = sy + (ey - sy) * (progress / 100);

        this.line([sx, sy, cx, cy], this.#lineWidth, color);

        progress += 5;

        if (progress <= 100) {
          requestAnimationFrame(step);
        } else {
          this.line(coords, this.#lineWidth, color);
          i++;
          if (i < lines.length) animateLine(lines[i]);
        }
      };

      step();
    };

    animateLine(lines[0]);
  }

  // ------------------ O ------------------
  drawO(x, y) {
    const radius = 30;
    const color = "white";

    let angle = 0;

    const animate = () => {
      this.circle(x, y, radius, 0, angle, this.#lineWidth, color);
      angle += 0.1;

      if (angle <= Math.PI * 2) {
        requestAnimationFrame(animate);
      } else {
        this.circle(x, y, radius, 0, Math.PI * 2, this.#lineWidth, color);
      }
    };

    animate();
  }

  // ------------------ WIN CHECK ------------------
  getWinInfo(board) {
    const positions = [50, 150, 250];

    const index = this.#winPatterns.findIndex(([a, b, c]) =>
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    );

    if (index === -1) return null;

    // rows
    if (index <= 2) {
      return {
        direction: "horizontal",
        position: positions[index],
      };
    }

    // columns
    if (index <= 5) {
      return {
        direction: "vertical",
        position: positions[index - 3],
      };
    }

    // diagonals
    if (index === 6) {
      return { direction: "diagonal1" };
    }

    return { direction: "diagonal2" };
  }

  checkWinner(board) {
    return this.getWinInfo(board) !== null;
  }

  // ------------------ WIN LINE ------------------
  drawWinLine(info) {
    if (!info) return;

    const color = "green";
    const width = 6;

    let startX, startY, endX, endY;

    switch (info.direction) {
      case "horizontal":
        startX = 0;
        startY = info.position;
        endX = 300;
        endY = info.position;
        break;

      case "vertical":
        startX = info.position;
        startY = 0;
        endX = info.position;
        endY = 300;
        break;

      case "diagonal1":
        startX = 0;
        startY = 0;
        endX = 300;
        endY = 300;
        break;

      case "diagonal2":
        startX = 300;
        startY = 0;
        endX = 0;
        endY = 300;
        break;
    }

    let progress = 0;

    const animate = () => {
      const cx = startX + (endX - startX) * (progress / 100);
      const cy = startY + (endY - startY) * (progress / 100);

      this.line([startX, startY, cx, cy], width, color);

      progress += 4;

      if (progress <= 100) {
        requestAnimationFrame(animate);
      } else {
        this.line([startX, startY, endX, endY], width, color);
      }
    };

    setTimeout(animate, 700);
  }
}