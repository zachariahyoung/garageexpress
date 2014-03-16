
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server); // this tells socket.io to use our express server


// all environments
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var EventEmitter = require('events').EventEmitter;
var handler = new EventEmitter();

//Start the xbee radio
require('./server/coordinator.js').boot(handler);


// listen for new socket.io connections:
io.sockets.on('connection', function (socket) {
    // if there's a socket client, listen for new serial data:

    handler.on('sensor_reading', function(data){

        socket.emit('serialEvent', data.digitalSamples.DIO4);
    });
});


