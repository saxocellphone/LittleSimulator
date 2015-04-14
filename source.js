var canvas = document.getElementById('graphCanvas');
var timeCounter;
var prePosYVal;
var posArray = [];
var velArray = [];
var accArray = [];
var timer;
var moving = 0;
var speed = 0;
var acc = 0.2;
var sliderPosition = 0;
var paused = false;
var stopped = false;
init();

function init(){
	createCanvas();
	$("#toggleTimer").hide();
	document.addEventListener('keydown', function(event) {
	if(event.keyCode == 37 || event.keyCode == 40 || event.keyCode == 65 || event.keyCode == 83) {  //Left arrow, down arrow, A key, S key
		event.preventDefault();
		speed=0;
		speed -= acc;
	}
	else if(event.keyCode == 39 || event.keyCode == 38 || event.keyCode == 68 || event.keyCode == 87) {  //Right arrow, up arrow, D key, W key
		event.preventDefault();
		speed=0;
		speed += acc;
	}
	else if(event.keyCode == 32){  //Spacebar
		event.preventDefault();
		toggleTimer();
	}
	});

	document.addEventListener('keyup', function(event){
		speed = 0;
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

function startTimer(){  //Called from HTML
	if(stopped || document.getElementById("startTimer").innerHTML == "Click to start"){
		timeCounter = 0;
		prePosYVal = 250;
		$('#slider').text(0);
		document.getElementById("startTimer").innerHTML = "Stop";
		posArray.length = 0;
		velArray.length = 0;
		accArray.length = 0;
		sliderPosition = 0;
		speed = 0;
		moving = 0;
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
		drawVel();
		drawAcc();
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
	moving += speed;
	$('#slider').text(parseInt(document.getElementById('slider').innerHTML)+Math.round(moving));  //Update the slider's text

	//Drawing position
	drawPos(-(parseFloat(document.getElementById('slider').innerHTML)+moving)+250);  //Invert the position so that it displays properly then add 250 because that's the center of the graph
	timeCounter++;
	if(timeCounter>1000){
		drawVel();
		drawAcc();
		window.clearInterval(timer);
		$("#toggleTimer").hide();
		document.getElementById("toggleTimer").innerHTML = "Pause";
		document.getElementById("startTimer").innerHTML = "Restart";
		paused = false;
		stopped = true;
	}
}

function drawPos(graphPosition){
	var context = canvas.getContext('2d');
	context.strokeStyle="#000000";
	context.beginPath();
	draw(context, timeCounter-1, prePosYVal, timeCounter, graphPosition);
	if(posArray[timeCounter-1] === null){
		posArray[timeCounter-1] = prePosYVal;
	}
	posArray[timeCounter] = graphPosition;
	prePosYVal=graphPosition;
}

function drawVel(){
	var contextVel = canvas.getContext('2d');
	contextVel.strokeStyle="#FF6600";
	contextVel.beginPath();
	velArray[0]=250;
	for(var i = 0; i < posArray.length+3; i+=4){
		velArray[i] = (posArray[i+4]-posArray[i])+250;
	}

	for(var j = 0; j < velArray.length+3; j+=4){
		draw(contextVel, j, velArray[j], j+4, velArray[j+4]);
	}
}

function drawAcc(){
	var contextAcc = canvas.getContext('2d');
	contextAcc.strokeStyle="#00ff00";
	contextAcc.beginPath();
	accArray[0]=250;
	for(var i = 0; i < velArray.length + 3; i+=4){
		accArray[i] = (velArray[i+4]-velArray[i])+250;
	}

	for(var j = 0; j < accArray.length+3; j+=4){
		draw(contextAcc, j, accArray[j], j+4, accArray[j+4]);
	}
}

function draw(context, begX, begY, endX, endY){
	context.moveTo(begX, begY);
	context.lineTo(endX, endY);
	context.stroke();
}
