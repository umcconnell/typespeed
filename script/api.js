let isFetching = false,
    apiURL = "https://api.noopschallenge.com/wordbot?count=";

export function changeFetchWordStatus() {
    return (isFetching = !isFetching);
}

export function fetchWords(amount = 100) {
    if (isFetching) return;
    changeFetchWordStatus();

    return fetch(apiURL + amount)
        .then(res => res.json())
        .then(res => res.words);
}
