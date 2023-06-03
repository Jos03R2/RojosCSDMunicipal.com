const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const BOT_IMG = "bots.jpg";
const PERSON_IMG = "Usuario.jpg";
const BOT_NAME = "BOT";
const PERSON_NAME = "Usuario";


const prompts = [
    ["Hi", "hey", "Hello", "good morning","good afternoon"],
    ["How are you", "how is life", "how are things"],
    ["What are you doing", "what is going on", "what is up"],
    ["how ol are you"],
    ["who are you","are you human", "are you bot", "are you human or bot"],
    ["who created you","who made you"],
    [
        "you name please",
        "your name",
        "may i know your name",
        "what is your name",
        "what call yourself"
    ],
    ["i love you",],
    ["happy","good","fun", "wonderful", "fantastic", "cool"],
    ["bad","bored", "tired"],
    ["help me","tell me story", "tell me joke"],
    ["Ah","yes", "ok", "okay", "nice"],
    ["Bye","Good bye", "goodbye", "see you later"],
    ["what sould i eat today",],
    ["bro",],
    ["what","why", "how", "where", "when"],
    ["no","not sure", "maybe","no thanks"],
    ["",],
    ["haha","ha", "lol", "hehe", "funny", "joke"]
 ]

 const replies = [
    ["¡Hello!","Hi","hey!", "hi there!","howdy"],
    [
    "fine... how are you?",
    "pretty well, how are you?",
    "Fantastiic, how are you?"
    ],
    [
     "nothing much",
     "about to go to sleep",
     "can you guess?",
     "i dont know actually"
    ],
    ["i am infinite"],
    ["i am just a bot", "i am a bot. what are you" ],
    ["the one true developer, code mo"],
    ["i am nameless", "i dont have a name"],
    ["i love you too", "me too"],
    ["have you ever felt bad?", "Glad to hear it"],
    ["why?", "why? you shouldnit ", "try whatching tv"],
    ["what about?", "once upon a time..."],
    ["tell me a story", "tell me a joke", "tell me about yourself"],
    ["Bye","Goodbye", "see you later"],
    ["Pizza","Hamburguesa"],
    ["bro!"],
    ["great question"],
    ["thats ok", "i understand", "what do you want to talk about?"],
    ["please say something"],
    ["haha", "Good one!"],
 ];
 const alternative = [
     "same" ,
     "Go on...",
     "Bro...",
     "Try again",
     "im listening",
     "i dont understand :/",
 ]

 const robot = ["How do you do, fello human", "i am not a bot"];
 msgerForm.addEventListener("submit", event => {
    event.preventDefault();
    const msgText = msgerInput.value;
    if(!msgText)return;
    msgerInput.value="";
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
        product = "you're welcome";
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

 function compare(promptsArray, repliesArray, string){
    let reply;
    let replyFound = false;
    for (let x = 0; x < promptsArray.length; x++){
        for(let y = 0; y <promptsArray[x].length; y++){
            if (promptsArray[x][y] === string){
                let replies = repliesArray[x];
                reply = replies[Math.floor(Math.random() * replies.length)];
                replyFound = true;
                break;
            }
        }
        if (replyFound){
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
    return Math.floor(Math.random() * (max - min) + min);
}