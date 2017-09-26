const socket = io();
let timer = null;
let timeoutTime = 5000;

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
    clearTimeout(timer);
});


$('#message').keyup(() => {
    timer = setTimeout(() => socket.emit('stop-typing'), timeoutTime);
});

$('#message').blur(() => {
   timer = setTimeout(() => socket.emit('stop-typing'), timeoutTime); 
});

socket.on('message', (msg) => {
    $('<li>').text(msg).appendTo('#history');
});

socket.on('typing', () => {
    $('form').before('<div id="typing"><em>Someone is typing....</em></div>');
});

socket.on('stop-typing', () => {
   $('#typing').fadeOut(1200, () => remove());
});

