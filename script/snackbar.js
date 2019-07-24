import { wait } from "./helpers.js";

let snackbarCount = 0;

export default function showSnackbar(snackbar, text, duration = 3000) {
    if (!(snackbar instanceof Element))
        snackbar = document.querySelector(snackbar);

    let clonedSnackbar = snackbar.cloneNode(true);
    snackbar.insertAdjacentElement("afterend", clonedSnackbar);
    snackbarCount++;

    let content =
        [...clonedSnackbar.childNodes].find(
            n => n.classList && n.classList.contains("snackbar__content")
        ) || clonedSnackbar;

    content.innerHTML = text;
    clonedSnackbar.style.zIndex = 100 + snackbarCount;
    clonedSnackbar.classList.add("show");

    return wait(duration).then(() => {
        clonedSnackbar.classList.remove("show");
        return wait(250).then(
            () =>
                clonedSnackbar.parentElement.removeChild(clonedSnackbar) &&
                (content.innerHTML = "")
        );
    });
}
