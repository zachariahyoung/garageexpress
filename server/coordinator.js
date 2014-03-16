var EventEmitter = require('events').EventEmitter;
var handler = new EventEmitter();

var util = require('util');
var SerialPort = require('serialport').SerialPort;
var xbee_api = require('xbee-api');

var C = xbee_api.constants;

var xbeeAPI = new xbee_api.XBeeAPI({
    api_mode: 1,
    raw_frames: false
});


module.exports.boot = function(emitter) {
    var handler = emitter;
    var serialport = new SerialPort("/dev/ttyAMA0", {
        baudrate: 9600,
        parser: xbeeAPI.rawParser()
    });

    serialport.on("open", function() {
        console.log("open");
        var frame_obj = {
// AT Request to be sent to
            type: C.FRAME_TYPE.AT_COMMAND,
            command: "D0",
            commandParameter: [0x05]
        };

        serialport.write(xbeeAPI.buildFrame(frame_obj));
    });

// All frames parsed by the XBee will be emitted here
    xbeeAPI.on("frame_object", function(frame) {
        handler.emit('sensor_reading', frame);
    });
};