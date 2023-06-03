const messageInput = document.getElementById('messageInput');
const chatBody = document.getElementById('chatBody');

function sendMessage() {
    const messageText = messageInput.value.trim();

    if (messageText !== '') {
        addMessage('sender', messageText);
        messageInput.value = '';
        scrollToBottom();
        setTimeout(() => {
            receiveMessage(messageText);
        }, 1000);
    }
}

function receiveMessage(userMessage) {
    let replyText;

    if (userMessage.includes('hola') || userMessage.includes('buenos días') || userMessage.includes('buenas tardes')) {
        replyText = '¡Hola! ¿En qué puedo ayudarte?';
    } else if (userMessage.includes('sobre el equipo') || userMessage.includes('jugadores')) {
        replyText = 'El equipo de Municipal es uno de los equipos más reconocidos de Guatemala. Ha tenido una exitosa historia en el fútbol guatemalteco. ¿Deseas conocer más detalles sobre algún jugador en particular?';
    } else if (userMessage.includes('titulos') || userMessage.includes('campeonatos')) {
        replyText = 'Municipal ha ganado numerosos títulos a lo largo de su historia, incluyendo campeonatos de liga y copas nacionales. ¿Te gustaría saber más sobre sus logros?';
    } else {
        replyText = 'Lo siento, no entiendo tu mensaje. ¿Puedes ser más específico?';
    }

    setTimeout(() => {
        addMessage('receiver', replyText);
        scrollToBottom();
    }, 1000);
}

function addMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(sender);

    const messageText = document.createElement('span');
    messageText.textContent = text;

    messageDiv.appendChild(messageText);
    chatBody.appendChild(messageDiv);
}

function scrollToBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
}
