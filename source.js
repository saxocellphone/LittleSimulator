var canvas = document.getElementById('graphCanvas');
var timeCounter = 0;
var prePosYVal;
var posArray = [];
var velArray = [];
var timer;
var moving = 0;
var speed = 0;
var acc = 0.2;
init();

function init(){
	var context = canvas.getContext('2d');
	context.beginPath();
	context.moveTo(0,canvas.height/2);
	context.lineTo(canvas.width, canvas.height/2);
	context.stroke();
	prePosYVal = parseInt(document.getElementById('slider').innerHTML)+250;
	document.addEventListener('keydown', function(event) {
	    if(event.keyCode == 37 || event.keyCode == 40) {  //Left arrow, down arrow
			speed=0;
			speed -= acc;
	    }
	    else if(event.keyCode == 39 || event.keyCode == 38) {  //Right arrow, up arrow
			speed=0;
			speed += acc;
		}
	});
	document.addEventListener('keyup', function(event){
		speed = 0;
	});
}

function toggleTimer(){  //Called from HTML
	timer = setInterval(myTimer, 20);
}

function myTimer() {
	moving += speed;
	$('#slider').text(parseInt(document.getElementById('slider').innerHTML)+moving);
	var sliderPosition = parseInt(document.getElementById('slider').innerHTML);
	//Drawing position
	drawPos(-sliderPosition+250);  //Invert the position so that it displays properly then add 250 because that's the center of the graph
	timeCounter+=1;
	if(timeCounter>1000){
		drawVel();
		window.clearInterval(timer);
	}
}

function drawPos(graphPosition){
	var context = canvas.getContext('2d');
	context.beginPath();
	draw(context, timeCounter-1, prePosYVal, timeCounter, graphPosition);
	if(posArray[timeCounter-1] === null){
		posArray[timeCounter-1] = prePosYVal;
	}
	posArray[timeCounter] = graphPosition;
	console.log(speed);
	prePosYVal=graphPosition;
}

function drawVel(){
	var contextVel = canvas.getContext('2d');
	contextVel.beginPath();
	velArray[0]=250;
	for(var i = 1; i < posArray.length; i++){
		velArray[i] = -(posArray[i+1]-posArray[i])*50+250;
	}
	for(var j = 0; j < velArray.length; j+=1){
		draw(contextVel, j, velArray[j], j+1, velArray[j+1]);
	}

}

function draw(context, begX, begY, endX, endY){
	context.moveTo(begX, begY);
	context.lineTo(endX, endY);
	context.stroke();
}
