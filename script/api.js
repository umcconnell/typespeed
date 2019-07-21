import { gameEnv, callbacks } from "./config.js";

let apiURL = "https://api.noopschallenge.com/wordbot?count=";

function changeFetchWordStatus() {
    return (gameEnv.isFetching = !gameEnv.isFetching);
}

export function fetchWords(amount = 100) {
    if (gameEnv.isFetching) return;
    changeFetchWordStatus();

    return fetch(apiURL + amount)
        .then(res => res.json())
        .then(res => res.words)
        .then(words => gameEnv.availableWords.push(...words))
        .then(changeFetchWordStatus)
        .catch(callbacks.error);
}
