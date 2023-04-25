const express = require('express');

const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http);
const port = process.env.PORT || 4242

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

io.on("connection", (socket) => {
    console.log('user connected');

    socket.on('message', (message) => {
        

        io.emit('message', message)
    })


    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
});

http.listen(port, () => {
    console.log(`Example app listening on  http://localhost:${port}`)
});

module.exports = router;


