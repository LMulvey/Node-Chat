const express = require('express');
const app = express();

const http = require('http');
const server = http.Server(app);

app.use(express.static('client'));

const io = require('socket.io')(server);
const messages = [];

io.on('connection', (socket) => {

    messages.forEach((msg) => {
        io.emit('message', msg);
        console.log('New User connected. Sending chat history.');
    });

    socket.on('message', (msg) => {
        io.emit('message', msg);
        messages.push(msg);
        console.log(messages);
    });
});

server.listen(8080, () => {
    console.log('Your chat server is live now.');
});