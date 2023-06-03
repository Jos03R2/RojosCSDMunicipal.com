const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const BOT_IMG = "bots.jpg";
const PERSON_IMG = "Usuario.jpg";
const BOT_NAME = "BOT";
const PERSON_NAME = "Usuario";

const prompts = [
    ["Hola", "Hey", "Hola Municipal", "Buen día", "Buenas tardes"],
    ["¿Cómo estás?", "¿Cómo va todo?", "¿Qué tal?", "¿Cómo te sientes?"],
    ["¿Qué puedes decirme sobre Municipal?", "Cuéntame más sobre Municipal", "Háblame de Municipal"],
    ["¿Cuál es tu jugador favorito de Municipal?", "¿Quién es el goleador de Municipal?", "¿Quién es el capitán de Municipal?"],
    ["¿Cuándo fue fundado Municipal?", "¿Cuántos campeonatos tiene Municipal?", "¿Cuál es el estadio de Municipal?"],
];

const replies = [
    ["¡Hola!", "Hola, ¿en qué puedo ayudarte?", "Saludos", "¡Bienvenido!"],
    ["Estoy bien, gracias. ¿Y tú?", "Todo marcha bien, gracias.", "Me siento genial, ¿y tú?"],
    [
        "Municipal es un equipo de fútbol guatemalteco con una gran historia y tradición.",
        "Municipal es uno de los equipos más populares y exitosos de Guatemala.",
        "Municipal ha ganado numerosos campeonatos a lo largo de su historia.",
    ],
    ["Hay muchos jugadores destacados en Municipal. Algunos de ellos son...", "El goleador de Municipal actualmente es...", "El capitán de Municipal es..."],
    ["Municipal fue fundado en el año...", "Municipal ha ganado X campeonatos en total.", "El estadio de Municipal es..."],
];

const alternative = [
    "No estoy seguro, ¿puedes ser más específico?",
    "No entendí. ¿Puedes reformular tu pregunta?",
    "Lo siento, no puedo responder eso en este momento.",
];

const robot = [
    "Soy un chatbot y mi objetivo es brindar información sobre Municipal.",
    "Estoy aquí para responder tus preguntas sobre Municipal.",
    "¡Vamos Municipal! ¡El equipo de todos los guatemaltecos!",
];

msgerForm.addEventListener("submit", event => {
    event.preventDefault();
    const msgText = msgerInput.value;
    if (!msgText) return;
    msgerInput.value = "";
    addChat(PERSON_NAME, PERSON_IMG, "right", msgText);
    output(msgText);
});

function output(input) {
    let product;
    let text = input.toLowerCase().replace(/[\w\s]/gi, "").replace(/[\d]/gi, "").trim();
    text = text
        .replace(/ a /g, "")
        .replace(/i feel /g, "")
        .replace(/whats /g, "what is")
        .replace(/please /g, "")
        .replace(/ Please/g, "")
        .replace(/r u/g, "are you");

    if (compare(prompts, replies, text)) {
        product = compare(prompts, replies, text);
    } else if (text.match(/thank/gi)) {
        product = "De nada";
    } else if (text.match(/(robot|bot|robo)/gi)) {
        product = robot[Math.floor(Math.random() * robot.length)];
    } else {
        product = alternative[Math.floor(Math.random() * alternative.length)];
    }

    const delay = input.split("").length * 100;
    setTimeout(() => {
        addChat(BOT_NAME, BOT_IMG, "left", product);
    }, delay);
}

function compare(promptsArray, repliesArray, string) {
    let reply;
    let replyFound = false;
    for (let x = 0; x < promptsArray.length; x++) {
        for (let y = 0; y < promptsArray[x].length; y++) {
            if (promptsArray[x][y] === string) {
                let replies = repliesArray[x];
                reply = replies[Math.floor(Math.random() * replies.length)];
                replyFound = true;
                break;
            }
        }
        if (replyFound) {
            break;
        }
    }
    return reply;
}

function addChat(name, img, side, text) {
    const msgHTML = `
    <div class="msg ${side}-msg">
        <div class="msg-img" style="background-image:url(${img})"></div>
        <div class="msg-bubble">
            <div class="msg-info">
                <div class="msg-info-name">${name}</div>
                <div class="msg-info-time">${FormDate(new Date())}</div>
            </div>
            <div class="msg-text">${text}</div>
        </div>
    </div>`;

    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
}

function get(selector, root = document) {
    return root.querySelector(selector);
}

function FormDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}