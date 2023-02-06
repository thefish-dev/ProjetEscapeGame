
// Fonction python time.sleep() version JS
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// div dans lequel le dialog se passera
let dialogbox = document.createElement("div");
dialogbox.id = "dialog";
document.body.appendChild(dialogbox);

// nouveau dialogue
function newDialog() {
    dialogbox.remove();
    dialogbox = document.createElement("div");
    dialogbox.id = "dialog";
    document.body.appendChild(dialogbox);
}

// créé un paragraphe dans le dialogue
async function newText(textContent) {
    var text = document.createElement("p");
    text.id = "dialog-text";
    dialogbox.appendChild(text);
    text.innerHTML = "> ";
    for (let i = 0; i < textContent.length; i++) {
        await sleep(25);
        text.innerHTML += textContent[i];
    }
    return new Promise(resolve => resolve());
}

// créé un input dans le dialogue et retourne l'élément
function newInput(placeHolder) {
    var input = document.createElement("input");
    input.placeholder = placeHolder;
    input.id = "dialog-input";
    dialogbox.appendChild(input);
    return input
}

// créé un boutton dans le dialogue et retourne l'élément
function newButton(textContent) {
    var button = document.createElement("button");
    button.classList.add("dialog-button");
    button.classList.add("enabled");
    button.innerHTML = textContent;
    dialogbox.appendChild(button);
    return button
}

// désactive les bouttons de la liste donnée comme argument
function disableButtons(buttons) {
    buttons.forEach(button => {
        button.disabled = true;
        button.classList.replace("enabled", "disabled");
    });
}

// menu game over
async function gameOver() {
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


// Début de l'histoire
async function start() {
    var gameover = document.getElementById("game-over");
    var overlay = document.getElementById("overlay");
    gameover.style.display = "none";
    overlay.style.display = "none";
    newDialog();
    await newText("Bonjour et bienvenue dans votre cellule..uhm..chambre avec des barreaux!");
    await newText("Comment vous sentez vous?");

    var input = newInput("Bien");
    input.focus();

    input.onkeydown = async (event) => {
        if (event.key == "Enter") {

            input.disabled = true;
            if (input.value == "") input.value = input.placeholder;
            await sleep(500);
            await newText("Okay super.");
            await newText("Passons à la suite, d'accord?");

            var bt1 = newButton("Bien sûr!");
            var bt2 = newButton("Uhm non merci");

            bt1.onclick = async () => {
                disableButtons([bt1, bt2]);
                bt1.classList.add("active");

                await newText("Parfait");
                await sleep(1000);
                newDialog();
                await newText("Tout d'abord, choisissez un pseudo!")
                part1();
            };

            bt2.onclick = async () => {
                disableButtons([bt1, bt2]);
                bt2.classList.add("active");

                await newText("Vraiment? Et bien c'est pas comme si vous aviez le choix..");
                await sleep(300);
                gameOver();
            };

        }
    }
}
start();
var nickname = "";

function part1() {
    var input = newInput("François");
    input.focus();
    input.onkeydown = async (event) => {
        if (event.key == "Enter") {
            input.disabled = true;
            if (input.value == "") input.value = input.placeholder;

            await newText(`Enchanté...${input.value}`);
            await sleep(1000);
            await newText("Êtes-vous sûr de vouloir garder ce pseudo?");

            var bt1 = newButton("Affirmatif");
            var bt2 = newButton("Non, pas vraiment");

            bt1.onclick = async () => {
                disableButtons([bt1, bt2]);
                bt1.classList.add("active");
                await newText("D'accord, parfait!");
                await newText("Continuons dans ce cas.");
                nickname = input.value;
                part2();
            };

            bt2.onclick = async () => {
                disableButtons([bt1, bt2]);
                bt2.classList.add("active");
                await newText("Okay, je vous laisse le changer une dernière fois alors!");
                input = newInput("LeHackerDu35");
                input.focus();
                input.onkeydown = async (event) => {
                    if (event.key == "Enter") {
                        input.disabled = true;
                        if (input.value == "") input.value = input.placeholder;
                        await newText(`${input.value} me parraît plutôt bien!`);
                        nickname = input.value;
                        part2();
                    }
                }
            }
        }
    }
}
async function part2() {
    await sleep(500);
    newDialog();
    await newText("Donc...");
    await sleep(1000);
    await newText(`${nickname}, exact!`);
    await newText("Je vais avoir besoin de vos services pour arriver à mes fins >:)");
    await newText(". . .");
}
async function part3() {
    await sleep(1000);
    newDialog();
}