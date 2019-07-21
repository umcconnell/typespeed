import { fetchWords } from "./api.js";
import { canvasEnv, gameEnv, config, callbacks } from "./config.js";
import { draw } from "./gameLogic.js";

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

    fetchWords();
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
