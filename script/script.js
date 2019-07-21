import { fetchWords } from "./api.js";
import { canvasEnv, gameEnv, config, callbacks } from "./config.js";
import { draw, populateWord } from "./gameLogic.js";

function setupCanvas(canvas) {
    let [width, height] = [window.innerWidth, window.innerHeight - 100];

    canvas.width = width;
    canvas.height = height;

    canvasEnv.canvas = canvas;
    canvasEnv.ctx = canvas.getContext("2d");
    canvasEnv.width = width;
    canvasEnv.height = height;

    return [width, height];
}

export function setup(canvas, settings = {}, cbs = {}) {
    Object.assign(config, settings);
    Object.assign(callbacks, cbs);

    gameEnv.verticalSpeed = config.initialVerticalSpeed;
    gameEnv.wordAppearDelay = config.initialWordAppearDelay;

    setupCanvas(
        canvas instanceof Element ? canvas : document.querySelector(canvas)
    );

    fetchWords().then(populateWord);
}

export function play() {
    if (!gameEnv.isPaused) return;

    canvasEnv.animationFrame = requestAnimationFrame(draw);
    gameEnv.isPaused = false;
}

export function pause() {
    if (gameEnv.isPaused) return;

    canvasEnv.animationFrame = cancelAnimationFrame(canvasEnv.animationFrame);
    gameEnv.isPaused = true;
}

export function guessWord(guess) {
    if (gameEnv.paused) return false;
    let guessResults = gameEnv.activeWords.filter(word => word.text === guess);
    // Remove right guesses from activeWords
    if (guessResults.length > 0) {
        gameEnv.activeWords = gameEnv.activeWords.filter(
            word => word.text !== guess
        );
    }

    gameEnv.score += guessResults
        .map(({ x }) => Math.round(((width / x) * guess.length) / 2))
        .reduce((acc, curr) => acc + curr, 0);

    // Was a word correctly guessed
    return guessResults.length > 0;
}
