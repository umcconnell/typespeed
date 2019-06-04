export function setupCanvas(canvas) {
    let [width, height] = [window.innerWidth, window.innerHeight - 100];
    
    canvas.width = width;
    canvas.height = height;

    return [width, height];
}