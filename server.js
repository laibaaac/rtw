// const port = process.env.PORT || 4242
const express = require('express');
//express ophalen 
const app = express();
const port = 6000;

app.use(express.static('public', options));
app.use('/public', express.static(__dirname + '/public/'));

app.set('view engine', 'ejs');

