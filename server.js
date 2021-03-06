const express = require('express');
const app = express();

const http = require('http');
const server = http.Server(app);

const PORT = process.env.PORT || 8080;

app.use(express.static('client'));

const io = require('socket.io')(server);
const messages = [
    'CK says: How\'s it going?',
    'LM says: Pretty good, hanging out at school.',
    'RP says: Dank.',
    'CK says: How about you?',
    'RP says: Ayyyy'
];

let typing = false;

io.on('connection', (socket) => {

    //io == server
    //socket == new socket/client
    
    console.log('New User connected. Sending chat history.');
    messages.forEach((msg) => {
        socket.emit('message', msg);
    });

    socket.on('typing', () => {
        if(!typing) {
            io.emit('typing');
            typing = true;
        }
    });
    
    socket.on('stop-typing', () => {
       io.emit('stop-typing'); 
        typing = false;
    });
    
    socket.on('message', (msg) => {
        io.emit('message', msg);
        messages.push(msg);
        console.log(messages);
    });
});

server.listen(PORT, () => {
    console.log('Your chat server is live now.');
});