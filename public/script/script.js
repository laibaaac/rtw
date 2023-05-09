const socket = io()
const messages = document.querySelector('section ul')
const input = document.querySelector('#message-input')
const submit = document.querySelector('#message-button');
const usernameInput = document.querySelector('#username-input');
const time = document.querySelector('#time');
const chatScreen = document.querySelector('main section:last-of-type');
let date = new Date();

insertDate();

function checkSocketConnection() {
    if (socket.connected) {
        console.log('Socket is connected');
        chatScreen.classList.remove('socket-disconnected');
    } else {
        console.log('Socket is disconnected');
        chatScreen.classList.add('socket-disconnected');
        setTimeout(() => {
            if (!socket.connected) {
                const error = document.querySelector('#error');
                error.textContent = 'You are disconnected';
                error.classList.add('show');
            }
        }, 5000);
    }
}

submit.addEventListener('click', event => {
    event.preventDefault()
    if (input.value) {
        const chat = {
            username: usernameInput.value,
            message: input.value
        }
        socket.emit('message', chat)
        input.value = ''
    }
})

socket.on('connect', () => {
    checkSocketConnection();
    setInterval(checkSocketConnection, 500);
});

socket.on('message', message => {
    console.log('message', message)
    const li_element = document.createElement('li');
    li_element.textContent = ` ${message.username} : ${message.message} `;
    // li_element.classList.add('talk-bubble',' tri-right' ,'border' ,'round btm-left-in');
    li_element.setAttribute('class', 'talk-bubble tri-right border round btm-left-in');
    messages.appendChild(li_element);
    messages.scrollTop = messages.scrollHeight;
})

socket.on('error', (message) => {
    const error = document.querySelector('#error');
    error.textContent = message;
    error.classList.add('show');
    setTimeout(() => {
        error.classList.remove('show');
    }, 5000);
});


socket.on('history', (history) => {
    console.log('history',history);
   for (let i = 0; i < history.length; i++) {
    const li_element = document.createElement('li');
    li_element.textContent = ` ${history[i].username} : ${history[i].message} `;
    // li_element.classList.add('talk-bubble',' tri-right' ,'border' ,'round btm-left-in');
    li_element.setAttribute('class', 'talk-bubble tri-right border round btm-left-in');
    messages.appendChild(li_element);
    messages.scrollTop = messages.scrollHeight;
   }
  });
  
function insertDate() {
   let currentDate = 'Today ' + date.toUTCString().slice(5, 16);
    time.textContent = currentDate;
}

function addMessage(message) {
    messages.appendChild(Object.assign(document.createElement('li'), { textContent: message }))
    messages.scrollTop = messages.scrollHeight
  }