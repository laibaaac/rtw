const socket = io()
const messages = document.querySelector('section ul')
const input = document.querySelector('#message-input')
const submit = document.querySelector('#message-button');
const usernameForm = document.querySelector('main section:nth-of-type(2)')
const usernameInput = document.querySelector('#username-input');
const time = document.querySelector('#time');
const chatScreen = document.querySelector('main section:nth-of-type(3)');
const createUserbutton = document.querySelector('.create-user-btn');
const goBackButton = document.querySelector('.back-btn');
chatScreen.classList.add('hidden');
console.log('user button', createUserbutton, usernameForm)
let date = new Date();

insertDate();

createUserbutton.addEventListener('click', e =>{
    e.preventDefault()
    chatScreen.classList.remove('hidden');
    usernameForm.classList.add('hidden');
});

goBackButton.addEventListener('click', e =>{
    e.preventDefault()
    usernameForm.classList.remove('hidden');
    chatScreen.classList.add('hidden');
});

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
    event.preventDefault();

    const allListElements = messages.querySelectorAll('li');

    // TODO: get length of all li elements -> for example 5 li in ul, length will be 4
    // your message id should be 5
    // message_id = (allListElements.length + 1)
    
    if (input.value) {

        const chat = {
            username: usernameInput.value,
            message: input.value,
            message_id: `message_${allListElements.length+1}`
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
    li_element.id = message.message_id;
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

    if (history.length > 0) {

        const allListElements = messages.querySelectorAll('li');
        let allMessageIds = [];
        
        if (allListElements.length > 0 ) {
            allMessageIds = Array.from(allListElements).map((listItem) => {
                return listItem.id.replace('message_', '');
            });       
        }

        for (let i = 0; i < history.length; i++) {
        

            const toCheckId = history[i].message_id.replace('message_', '');

            if (allMessageIds.includes(toCheckId)) {
                console.log('dont show this item!');
            } else {

                const li_element = document.createElement('li');
                li_element.textContent = ` ${history[i].username} : ${history[i].message} `;
                // li_element.classList.add('talk-bubble',' tri-right' ,'border' ,'round btm-left-in');
                li_element.setAttribute('class', 'talk-bubble tri-right border round btm-left-in');
                messages.appendChild(li_element);
                messages.scrollTop = messages.scrollHeight;    

            }
        }
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