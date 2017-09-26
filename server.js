const express = require('express');
const app = express();

const http = require('http');
const server = http.Server(app);

app.use(express.static('client'));

const io = require('socket.io')(server);
const messages = [
    'CK says: How\'s it going?',
    'LM says: Pretty good, hanging out at school.',
    'RP says: Dank.',
    'CK says: How about you?',
    'RP says: Ayyyy'
];

io.on('connection', (socket) => {

    console.log('New User connected. Sending chat history.');
    messages.forEach((msg) => {
        io.emit('message', msg);
    });

    socket.on('message', (msg) => {
        io.emit('message', msg);
        messages.push(msg);
        console.log(messages);
    });
});

server.listen(process.env.PORT, () => {
    console.log('Your chat server is live now.');
});