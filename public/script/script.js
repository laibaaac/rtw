// Maak een socket verbinding
const socket = io()

// ------------------- HTML Elementen -------------------
// haalt html elementen vanuit index.ejs 
const messages = document.querySelector('section ul')
const input = document.querySelector('#message-input')
const submit = document.querySelector('#message-button');
const usernameForm = document.querySelector('main section:nth-of-type(2)')
const usernameInput = document.querySelector('#username-input');
const time = document.querySelector('#time');
const chatScreen = document.querySelector('main section:nth-of-type(3)');
const createUserbutton = document.querySelector('.create-user-btn');
const goBackButton = document.querySelector('.back-btn');

// Verberg het chatscherm totdat de gebruiker een naam heeft ingevoerd
chatScreen.classList.add('hidden');

// ------------------- Datum  -------------------
// Maak een nieuwe datum en voeg deze toe aan het chatscherm
let date = new Date();
insertDate();

// ------------------- Username en Chatscreen zichtbaar -------------------
// Verbergt het chatscherm totdat de gebruiker een naam heeft ingevoerd
createUserbutton.addEventListener('click', e =>{
    e.preventDefault()
    chatScreen.classList.remove('hidden');
    usernameForm.classList.add('hidden');
});

// Verbergt het chatscherm totdat de gebruiker een naam heeft ingevoerd
goBackButton.addEventListener('click', e =>{
    e.preventDefault()
    usernameForm.classList.remove('hidden');
    chatScreen.classList.add('hidden');
});

  
  
// ------------------- Connectie checken -------------------
// Controleert of er een verbinding is om de 5 seconden
function checkSocketConnection() {
    if (socket.connected) {
        console.log('Socket is connected');
        chatScreen.classList.remove('socket-disconnected');
    } else {
        // als mijn server niet meer connectie heeft, krijg ik de offline #error functie te zien
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
};

// De'connect' event wordt hier gebruikt om te controleren of de socket verbinding actief is
socket.on('connect', () => {
    checkSocketConnection();
    setInterval(checkSocketConnection, 1000);
});


// ------------------- Username en Message -------------------
// hier kan ik zo mijn berichten versturen en er komt ook een username erbij
submit.addEventListener('click', event => {
    event.preventDefault();

    const allListElements = messages.querySelectorAll('li');
    
    if (input.value) {

        const chat = {
            username: usernameInput.value,
            message: input.value,
            message_id: `message_${allListElements.length+1}`
        }
        // Emit een 'message' event om het bericht te verzenden naar de server
        socket.emit('message', chat)
        input.value = '';
    }
});



// ------------------- Messages sturen naar andere -------------------
// De 'message' event wordt hier geroepen om een bericht te ontvangen van de server en voeg deze toe aan het chatscherm
socket.on('message', message => {
    console.log('message', message)
    const li_element = document.createElement('li');

    li_element.textContent = ` ${message.username} : ${message.message} `;
    li_element.id = message.message_id;
    li_element.dataset.mymessage="berichtje"

    li_element.setAttribute('class', 'talk-bubble tri-right border round btm-left-in');
    messages.appendChild(li_element);
    messages.scrollTop = messages.scrollHeight;
});


// ------------------- Localstorage & Chathistory-------------------
// De'history' event wordt hier gebruikt om een lijst van berichten te ontvangen van de server en voeg deze toe
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
            }  else {
                const li_element = document.createElement('li');
                li_element.textContent = ` ${history[i].username} : ${history[i].message} `;
                li_element.setAttribute('class', 'talk-bubble tri-right border round btm-left-in');
                messages.appendChild(li_element);
                messages.scrollTop = messages.scrollHeight;   
                 
            }
        }
    }
  });


// ------------------- Datum-------------------
// hier geef ik een functie mee, waar ik de huidige datum  mee geef 
function insertDate() {
   let currentDate = 'Today ' + date.toUTCString().slice(5, 16);
    time.textContent = currentDate;
};

// ------------------- New messages in de chat-------------------
// Voeg een nieuwe boodschap toe aan de lijst van berichten
// function addMessage(message) {
//     messages.appendChild(Object.assign(document.createElement('li'), { textContent: message }))
//     messages.scrollTop = messages.scrollHeight
//   };

socket.on('fail', errorMessage => {
    console.log('fail', errorMessage);
    error.textContent = errorMessage;
    error.classList.add('show');
  });