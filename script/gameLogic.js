import {
    canvasEnv,
    config,
    fontFamilies,
    gameEnv,
    callbacks
} from "./config.js";
import { randomElement, randomInRange } from "./helpers.js";
import { pause } from "./script.js";

export class ActiveWord {
    constructor(word) {
        this.text = word;

        // Font Family
        this.fontFamily =
            config.fontFamily === "auto"
                ? randomElement(fontFamilies)
                : config.fontFamily;

        // Font Size
        this.fontSize =
            config.fontSize === "auto"
                ? randomInRange(12, 40)
                : config.fontSize;

        // Font String, eg "16px sans-serif"
        this.fontString = `${this.fontSize}px ${this.fontFamily}`;

        canvasEnv.ctx.font = this.fontString;
        this.width = canvasEnv.ctx.measureText(word).width;
        canvasEnv.ctx.font = "";

        this.x = -this.width;

        let y = randomInRange(40 + this.fontSize, canvasEnv.height - 10);
        while (
            gameEnv.activeWords.some(
                word => Math.abs(word.y - y) <= 10 && word.x < 100
            )
        ) {
            y = randomRange(40 + this.fontSize, height - 10);
        }
        this.y = y;
    }

    render() {
        canvasEnv.ctx.font = this.fontString;
        canvasEnv.ctx.fillText(this.text, this.x, this.y);
        canvasEnv.ctx.font = "";
    }
}

export function gameOver() {
    pause();
    callbacks.gameOver();
}

export function collisionDetection() {
    let nonColliding = gameEnv.activeWords.filter(
        word => word.x + word.width < canvasEnv.width
    );
    lives -= gameEnv.activeWords.length - nonColliding.length;

    gameEnv.activeWords = nonColliding;

    if (lives <= 0) gameOver();
}

export function populateWord() {
    if (
        gameEnv.currWordAppearDelay >= gameEnv.wordAppearDelay ||
        gameEnv.activeWords.length < 1
    ) {
        gameEnv.currWordAppearDelay = 0;
        gameEnv.activeWords.push(
            new ActiveWord(gameEnv.availableWords.shift())
        );
    }
}

export function updateWordPositions() {
    gameEnv.activeWords.forEach(word => (word.x += gameEnv.verticalSpeed));
}

export function drawWords() {
    return gameEnv.activeWords.forEach(word => word.render());
}

export function drawLives() {
    canvasEnv.ctx.font = "bold 16px sans-serif";
    canvasEnv.ctx.fillText(
        `${Math.max(0, gameEnv.lives)} Lives`,
        canvasEnv.width - 120,
        24
    );
    canvasEnv.ctx.font = "";
}

export function drawScore() {
    canvasEnv.ctx.font = "bold 16px sans-serif";
    canvasEnv.ctx.fillText(`Score: ${gameEnv.score}`, 20, 24);
    canvasEnv.ctx.font = "";
}

export function draw() {
    canvasEnv.ctx.clearRect(0, 0, canvasEnv.width, canvasEnv.height);

    drawWords();
    collisionDetection();
    drawLives();
    drawScore();
    populateWord();
    updateWordPositions();

    canvasEnv.animationFrame = requestAnimationFrame(draw);
}
