const express = require('express');
//express ophalen 
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http);
const port = process.env.PORT || 4242

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');




