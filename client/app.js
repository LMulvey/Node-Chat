const socket = io();

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
       socket.emit('typing');
});

socket.on('message', (msg) => {
    $('<li>').text(msg).appendTo('#history');
});

socket.on('typing', () => {
    $('<span id="typing">').html('<em>Someone is typing....</em>').prependTo('form');
});

socket.on('stop-typing', () => {
   $('#typing').remove();
});

