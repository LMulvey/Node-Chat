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
        $('#message').val('');
        return false;
    }
});

socket.on('message', (msg) => {
    $('<li>').text(msg).appendTo('#history');
});
