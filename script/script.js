import { fetchWords, changeFetchWordStatus } from "./api.js";
import { canvasEnv } from "./config.js";

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
