import { fetchWords, changeFetchWordStatus } from "./api.js";
import { canvasEnv, gameEnv } from "./config.js";
import { draw } from "./gameLogic.js";

export function setupCanvas(canvas) {
    let [width, height] = [window.innerWidth, window.innerHeight - 100];

    canvas.width = width;
    canvas.height = height;

    canvasEnv.canvas = canvas;
    canvasEnv.ctx = canvas.getContext("2d");
    canvasEnv.width = width;
    canvasEnv.height = height;

    return [width, height];
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
