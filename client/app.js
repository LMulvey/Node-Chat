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
    $('form').before('<div id="typing"><em>Someone is typing....</em></div>');
});

socket.on('stop-typing', () => {
   $('#typing').remove();
});

