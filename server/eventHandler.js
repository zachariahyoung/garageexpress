exports.boot = function(handler) {
    handler.on('sensor_reading', function(data) {
        console.log(data.digitalSamples.DIO4);
    });
}
