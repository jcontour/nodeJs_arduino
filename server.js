//initializing express
var express = require('express')
var app = express()
var io = require('socket.io')
var serv_io = io.listen(3300)
var fs = require('fs')
var SerialPort = require('serialport').SerialPort

var arduino = new SerialPort('/dev/cu.usbmodem1421', {baudrate: 9600})

//when root is called, show static files in the public folder 
//manually make folder using terminal "mkdir public"
app.use('/', express.static(__dirname + '/public'))

//request to route we specify
app.get('/commands', function(req, res){
	res.sendFile(__dirname + '/public/index.html')
	serv_io.on('connection', function(socket){
		console.log('socket sending data...')
		socket.emit('connected', {status: "OK"})

		var buffer = new Buffer(2)
		buffer[0] = 0x00
		buffer[1] = 0x01

		arduino.open(function(error){
			if(error){
				console.log(error)
			} else {
				arduino.on('data', function(data){
					var decoded = arrayBufferToString(data)
					socket.emit('sensor', {val: decoded})
				})

				var on = "on%"
				var off = "off%"

				socket.on('coms', function(data){
					//console.log(data)
					if (data.ledState == 'off'){
						arduino.write(off)
					} else if (data.ledState == 'on'){
						arduino.write(on)
					}
				})

			}

		})
	})

})

function arrayBufferToString(buf){
	return String.fromCharCode.apply(null, new Uint16Array(buf))
}

//callback function, takes port and gives back feedback
app.listen(3000, function(){
	console.log('server running on port 3000')
})

