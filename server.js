import express from "express";
import http from 'http';

import path from "path";
// import axios from "axios";
import alex from 'alex';
import { allow, noBinary, profanitySureness } from "./.alexrc.js";

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
    console.log('user is connected');

    socket.on('message', (message) => {
        

        io.emit('message', message)
    })


    socket.on('disconnect', () => {
        console.log('user is disconnected')
    });

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
            console.log('success!');
            socket.emit('success', { message: 'Thank you for your message.' });
        }
    
    });
    
});

  
server.listen(port, () => {
    console.log(`Example app listening on  http://localhost:${port}`)
});



