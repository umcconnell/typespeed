export function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatDate(date) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    return `${
        months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
}

export function formatHighscore(highscore) {
    return `${highscore.score} &mdash; <em>${highscore.date}</em>`;
}

export function sortBy(field, ascending = true) {
    return function(array) {
        return array.sort((a, b) =>
            ascending ? a[field] - b[field] : b[field] - a[field]
        );
    };
}
