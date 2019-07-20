export const fontFamilies = [
    "serif",
    "sans-serif",
    "cursive",
    "fantasy",
    "monospace"
];

export let canvasEnv = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    animationFrame: undefined
};

export let gameEnv = {
    isFetching: false,
    isPaused: true,
    activeWords: [],
    availableWords: [],
    lives: 3,
    score: 0,
    verticalSpeed: undefined,
    wordAppearDelay: undefined,
    currWordAppearDelay: undefined
};

export let config = {
    initialVerticalSpeed: 0.5,
    initialWordAppearDelay: 350,
    wordAppearDelayDecrease: 15,
    mainColor: "#339af0",
    fontFamily: "auto",
    fontSize: "auto"
};

export let callbacks = {
    error: console.error,
    gameOver: () => alert("Game Over")
};
