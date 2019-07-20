import { canvasEnv } from "./config.js";

export function draw() {
    canvasEnv.ctx.clearRect(0, 0, canvasEnv.width, canvasEnv.height);

    canvasEnv.animationFrame = requestAnimationFrame(draw);
}
