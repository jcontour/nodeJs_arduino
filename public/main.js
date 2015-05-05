//needs path to follow to find socket
var socket = io.connect('http://localhost:3300')

//socket events
socket.on('connected', function(data){
	console.log(data.status)
})

socket.on('sensor', function(sensorData){
	var ard = document.getElementById('sensor')
	ard.innerHTML = sensorData.val
})

//state of button
var state = false

function commands(){
	var button = document.getElementById('ledOnOff')
	state = !state
	if (state){
		socket.emit('coms', {ledState: 'on'})
		button.value = 'ON'
		button.style.background = '#f00'
	} else {
		socket.emit('coms', {ledState: 'off'})
		button.value = 'OFF'
		button.style.background = '#000'
	}

}

