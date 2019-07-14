let isFetching = false,
    apiURL = "https://api.noopschallenge.com/wordbot?count=";

export function fetchWords(amount = 100) {
    if (isFetching) return;
    isFetching = true;

    return fetch(apiURL + amount)
        .then(res => res.json())
        .then(res => {
            isFetching = false;
            return res.words;
        });
}
