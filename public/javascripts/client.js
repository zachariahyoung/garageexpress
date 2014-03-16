// open a connection to the serial server:
var socket = io.connect('http://192.168.1.2:3000');

// when you get a serialdata event, do this:
socket.on('serialEvent', function (data) {
    // set the stuff inside the element's HTML tags to
    // whatever the 'value' property of the received data is:
    if(data == 0){
        textDisplay.innerHTML = "Door is Closed";
    }
    else{
        textDisplay.innerHTML = "Door is Opened";
    }
});