// Hier haal ik mijn packages en alexjs terug, ik moest de ESmodule  (imports gebruiken), omdat alexjs geen require toe laat
import express from "express";
import http from 'http';

import path from "path";

import alex from 'alex';
import { allow, noBinary, profanitySureness } from "./.alexrc.js";

// Grootte van de chatgeschiedenis
const historySize = 50

// Chatgeschiedenis-array
let history = []

// Maak Express-app en HTTP-server
const app = express();
const server = http.createServer(app);


import { Server } from "socket.io";

import { fileURLToPath } from "url";

// Maak een nieuwe Socket.IO-server en koppel deze aan de HTTP-server
const io = new Server(server);

// een port toeverwijzen (localhost:4545)
const port = process.env.PORT || 4545;

// Bepaal het huidige bestandsnaam en directorypad
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Stel de 'views' directory en de EJS view engine in
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

// Ik kan zo mijn files vanuit de public gebruiken
app.use(express.static(path.resolve('public')));

// mijn routing voor mijn index pagina
app.get('/', (req, res) => {
    res.render('index');
});


// Handel Socket.IO-verbindingen af
io.on("connection", (socket) => {
    console.log('user is connected')
    
  // Stuur de chatgeschiedenis naar de gebruiker die verbinding maakt 
    if(socket.connected){
        console.log("geschiedenis",history);
        socket.emit('history', history)
        // io -> everyone including sender
        // socket -> only sender
    }
  
     // Handel 'message'-events af, zo kan de gberuiker berichten sturen 
    socket.on('message', (message) => {

        // Controleer de berichten met Alex.js, basically hier worden de berichte gefilterd, zie mijn .alexrc.js (config file)
        const result = alex(message.message, {
            allow: allow,
            noBinary: noBinary,
            profanitySureness: profanitySureness
        }).messages;
        // Als het bericht niet aan de criteria voldoet, kan de gebruiker het bericht niet door sturen
        if (result.length > 0) {
            console.log('failed!');
            socket.emit('fail', 'Please watch your language.');
            // Als het bericht wel aan de criteria voldoet, kan de gebruiker het bericht doorsturen naar andere 
        } else {
            console.log('success!: ' + message.message);
            socket.emit('success', { message: 'Thank you for your message.' });
            io.emit('message', message)
            // Kijkt naar de lengte van de history en verwijderd oude bericht als het groter is dan de limiet
            while (history.length > historySize) {
              history.shift()
            }
            // Voeg het toe aan de historie
            history.push(message)
            // Verstuur het bericht naar alle clients
        }

    });
        // Handel 'disconnect'-events af
        socket.on('disconnect', () => {
            console.log('user is disconnected')
        });
});

// is mijn localhost, zo kan je de live site bekijken
server.listen(port, () => {
    console.log(`Example app listening on  http://localhost:${port}`)
});



 