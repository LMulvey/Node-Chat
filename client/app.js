const socket = io();
const typing = false;

$('form').submit(() => {
    if($('#message').val() == '') {
        alert('Message cannot be blank.');
        return false;
    } else if($('#initials').val() == '') {
        alert('We need your initials!');
        return false;
    } else {
        let text = $('#initials').val() + " says: " + $('#message').val();
        socket.emit('message', text);
        socket.emit('stop-typing');
        $('#message').val('');
        return false;
    }
});

$('#message').keydown(() => {
   if($('#message').val().length > 0 && !typing) {
       socket.emit('typing');
       typing = true;
       setTimeout(socket.emit('stop-typing'), 5000)
   }
});

socket.on('message', (msg) => {
    $('<li>').text(msg).appendTo('#history');
});

socket.on('typing', () => {
    $('<span id="typing">').text('<em>Someone is typing....</em>').prependTo('form');
});

socket.on('stop-typing', () => {
   $('#typing').remove();
    typing = false;
});

