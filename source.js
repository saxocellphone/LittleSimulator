"use strict";

var canvas = document.getElementById('graphCanvas');
var timer;
var time;
var previousYValue;
var positionArray = [];
var velocityArray = [];
var accelerationArray = [];
var inertia = 0;  //Not entirely accurate but it gets the meaning across
var velocity = 0;
var acceleration = 0.2;
var sliderPosition = 0;
var paused = false;
var stopped = false;
init();

function init(){
	createCanvas();
	$("#toggleTimer").hide();
	document.addEventListener('keydown', function(event){
		if(event.keyCode === 37 || event.keyCode === 40 || event.keyCode === 65 || event.keyCode === 83){  //Left arrow, down arrow, A key, S key
			event.preventDefault();
			velocity = 0;
			velocity -= acceleration;
		}
		else if(event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 68 || event.keyCode === 87){  //Up arrow, right arrow, D key, W key
			event.preventDefault();
			velocity = 0;
			velocity += acceleration;
		}
		else if(event.keyCode === 32){  //Spacebar
			event.preventDefault();
			toggleTimer();
		}
	});

	document.addEventListener('keyup', function(event){
		if(event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 65 || event.keyCode === 68 || event.keyCode === 83 || event.keyCode === 87){
			velocity = 0;
		}
	});
}

function createCanvas(){
	var context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.strokeStyle = "#000000";
	context.beginPath();
	context.moveTo(0, canvas.height/2);
	context.lineTo(canvas.width, canvas.height/2);
	context.stroke();
}

//Called from the HTML file
function startTimer(){  //jshint ignore:line
	if(stopped || document.getElementById("startTimer").innerHTML === "Click to start"){
		time = 0;
		previousYValue = 250;
		$('#slider').text(0);
		document.getElementById("startTimer").innerHTML = "Stop";
		positionArray.length = 0;
		velocityArray.length = 0;
		accelerationArray.length = 0;
		sliderPosition = 0;
		velocity = 0;
		inertia = 0;
		createCanvas();
		$("#toggleTimer").show();
		if(timer !== null){
			window.clearInterval(timer);
		}
		timer = window.setInterval(updateSliderPosition, 20);
		stopped = false;
	}
	else{
		document.getElementById("startTimer").innerHTML = "Restart";
		drawVelocity();
		drawAcceleration();
		window.clearInterval(timer);
		$("#toggleTimer").hide();
		stopped = true;
	}
}

function toggleTimer(){
	if(paused){
		timer = window.setInterval(updateSliderPosition, 20);
		document.getElementById("toggleTimer").innerHTML = "Pause";
		paused = false;
	}
	else{
		window.clearInterval(timer);
		document.getElementById("toggleTimer").innerHTML = "Resume";
		paused = true;
	}
}

function updateSliderPosition(){
	inertia += velocity;
	$('#slider').text(parseInt(document.getElementById('slider').innerHTML)+Math.round(inertia));  //Update the slider's text

	var position = -(parseFloat(document.getElementById('slider').innerHTML)+inertia)+250;  //Invert the position so that it displays properly then add 250 because that's the center of the graph
	if(position < 0){
		position = 0;
		velocity = 0;
		inertia = 0;
		$('#slider').text(250);
	}
	else if(position > 500){
		position = 500;
		velocity = 0;
		inertia = 0;
		$('#slider').text(-250);  //Update the slider's text
	}

	drawPosition(position);
	time++;
	if(time>1000){
		drawVelocity();
		drawAcceleration();
		window.clearInterval(timer);
		$("#toggleTimer").hide();
		document.getElementById("toggleTimer").innerHTML = "Pause";
		document.getElementById("startTimer").innerHTML = "Restart";
		paused = false;
		stopped = true;
	}
}

function drawPosition(graphPosition){
	var context = canvas.getContext('2d');
	context.strokeStyle="#000000";
	context.beginPath();
	draw(context, time-1, previousYValue, time, graphPosition);
	if(positionArray[time-1] === null){
		positionArray[time-1] = previousYValue;
	}
	positionArray[time] = graphPosition;
	previousYValue=graphPosition;
}

function drawVelocity(){
	var context = canvas.getContext('2d');
	context.strokeStyle="#FF6600";
	context.beginPath();
	velocityArray[0]=250;
	for(var i = 0; i < positionArray.length+3; i+=4){
		velocityArray[i] = positionArray[i+4]-positionArray[i]+250;
	}

	for(var j = 0; j < velocityArray.length+3; j+=4){
		draw(context, j, velocityArray[j], j+4, velocityArray[j+4]);
	}
}

function drawAcceleration(){
	var context = canvas.getContext('2d');
	context.strokeStyle="#00ff00";
	context.beginPath();
	accelerationArray[0]=250;
	for(var i = 0; i < velocityArray.length + 3; i+=4){
		accelerationArray[i] = velocityArray[i+4]-velocityArray[i]+250;
	}

	for(var j = 0; j < accelerationArray.length+3; j+=4){
		draw(context, j, accelerationArray[j], j+4, accelerationArray[j+4]);
	}
}

function draw(context, beginX, beginY, endX, endY){
	context.moveTo(beginX, beginY);
	context.lineTo(endX, endY);
	context.stroke();
}