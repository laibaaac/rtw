import express from "express";
import http from 'http';

import path from "path";

import alex from 'alex';
import { allow, noBinary, profanitySureness } from "./.alexrc.js";
const historySize = 50

let history = []

const app = express();
const server = http.createServer(app);

import { Server } from "socket.io";
import { fileURLToPath } from "url";
const io = new Server(server);

const port = process.env.PORT || 4545;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve('public')));

app.get('/', (req, res) => {
    res.render('index');
});


io.on("connection", (socket) => {
    console.log('user is connected')
    

    if(socket.connected){
        console.log("lala",history);
        socket.emit('history', history)
        // io -> everyone including sender
        // socket -> only sender
    }
  
    
    socket.on('message', (message) => {
        
        const result = alex(message.message, {
            allow: allow,
            noBinary: noBinary,
            profanitySureness: profanitySureness
        }).messages;
        
        if (result.length > 0) {
            console.log('failed!');
            socket.emit('error', 'Please watch your language.');
        } else {
            console.log('success!: ' + message.message);
            socket.emit('success', { message: 'Thank you for your message.' });
            io.emit('message', message)
            // Check de maximum lengte van de historie
            while (history.length > historySize) {
              history.shift()
            }
            // Voeg het toe aan de historie
            history.push(message)
            // Verstuur het bericht naar alle clients
        }

    });
    
        socket.on('disconnect', () => {
            console.log('user is disconnected')
        });
});


server.listen(port, () => {
    console.log(`Example app listening on  http://localhost:${port}`)
});



 