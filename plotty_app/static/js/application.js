
$(document).ready(function(){
    //connect to the socket server.
    if (document.domain == "127.0.0.1"){
        var socket = io.connect('http://localhost:' + location.port + '/test', {rejectUnauthorized: false});
    }
    else{
        var socket = io.connect('https://' + document.domain + ':' + location.port + '/test', {rejectUnauthorized: false});
    }
    var numbers_received = [];

    //receive details from server
    socket.on('newnumber', function(msg) {
        console.log("Received number" + msg.number);
        //maintain a list of ten numbers
        if (numbers_received.length >= 10){
            numbers_received.shift()
        }            
        numbers_received.push(msg.number);
        numbers_string = '';
        for (var i = 0; i < numbers_received.length; i++){
            numbers_string = numbers_string + '<p>' + numbers_received[i].toString() + '</p>';
        }
        $('#log').html(numbers_string);
    });

});
