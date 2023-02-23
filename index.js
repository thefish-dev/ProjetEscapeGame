
// Fonction python time.sleep() version JS
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// menu game over
export async function gameOver() {
    var gameover = document.getElementById("game-over");
    var overlay = document.getElementById("overlay");
    overlay.style.display = "block";
    for (let i = 0; i < 1; i += .1) {
        await sleep(50);
        overlay.style.opacity = i;
    }
    await sleep(50);
    gameover.style.display = "block";
}


// nouveau dialogue ou détruit le dialogue
export function Dialogue( state, type ) { // état du dialogue, type d'affichage du dialogue
    if (state) { // créer un dialogue
        const dialogbox = document.createElement("div");
        dialogbox.id = `dialog-${type}`;
        document.body.appendChild(dialogbox);
        return dialogbox;
    } else type.remove(); // détruire le dialogue, type va être la dialogbox
}
export function resetDialogue(dialogbox, type) {
    Dialogue(false, dialogbox); return Dialogue( true, type);
}

// nouvelle image ou détruit l'image
export function Image(state, type, image) {
    if (state) {
        const img = document.createElement("img");
        img.id = `img-${type}`;
        img.src = `images/${image}.png`
        document.body.appendChild(img);
        return img
    } else type.remove(); // même chose
}
export function resetImg(img, type) {
    Image(false, img); return Image( true, type );
}
// créé un paragraphe dans le dialogue
export async function newText(dialogbox, textContent) {
    let text
    if (document.getElementById("dialog-text")) { // si élément éxistant, le réutiliser
        text = document.getElementById("dialog-text");
    } else { // sinon en créer un
        text = document.createElement("p");
        text.id = "dialog-text";
        dialogbox.appendChild(text);
    }

    let clicked = false;
    dialogbox.addEventListener("click", () => { clicked = true; });

    text.innerHTML = "> ";
    for (let i = 0; i < textContent.length; i++) { // boucle pour afficher le texte lettre par lettre
        await sleep(25);
        if (clicked) break; // si bulle de dialogue clickée, afficher le texte en entier et sans délai
        text.innerHTML += textContent[i];
    }
    text.innerHTML = `> ${textContent}`;
    clicked = false;
    await sleep(250); // attendre 0.25 sec avant la fin de la fonction
    return new Promise(resolve => resolve());
}
// créé un input dans le dialogue et retourne l'élément
export function newInput(dialogbox, placeHolder) {
    var input = document.createElement("input");
    input.placeholder = placeHolder;
    input.id = "dialog-input";
    dialogbox.appendChild(input);
    return input
}

// créé un boutton dans le dialogue et retourne l'élément
export function newButton(dialogbox, textContent) {
    var button = document.createElement("button");
    button.classList.add("dialog-button");
    button.classList.add("enabled");
    button.innerHTML = textContent;
    dialogbox.appendChild(button);
    return button
}

// désactive les bouttons de la liste donnée comme argument
export function disableButtons(buttons) {
    buttons.forEach(button => {
        button.disabled = true;
        button.classList.replace("enabled", "disabled");
    });
}
