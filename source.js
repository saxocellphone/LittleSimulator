var canvas = document.getElementById('graphCanvas');
var timeCounter = 0;
var prePosYVal;
var posArray = [];
var velArray = [];
var timer;
var moving = 0;
init();

function init(){
	var context = canvas.getContext('2d');
	context.beginPath();
	context.moveTo(0,canvas.height/2);
	context.lineTo(canvas.width, canvas.height/2);
	context.stroke();
	prePosYVal = (parseInt(document.getElementById('slider').innerHTML))+250;
	document.addEventListener('keydown', function(event) {
	    if(event.keyCode == 37 || event.keyCode == 40) {  //Left arrow, down arrow
			moving = -1;
	    }
	    else if(event.keyCode == 39 || event.keyCode == 38) {  //Right arrow, up arrow
	    	moving = 1;
		}
	});

	document.addEventListener('keyup', function(event){
		moving = 0;
	});
}

function toggleTimer(){  //Called from HTML
	timer = setInterval(myTimer, 10);
}

function myTimer(){
	var sliderPosition = parseInt(document.getElementById('slider').innerHTML);
	$('#slider').text(parseInt(document.getElementById('slider').innerHTML)+moving);
	//Drawing position
	drawPos(-sliderPosition+250, 1);  //Invert the position so that it displays properly then add 250 because that's the center of the graph
	timeCounter+=1;
	if(timeCounter>1000){
		window.clearInterval(timer);
		drawVel();
	}
}

function drawPos(graphPosition, speed){
	var context = canvas.getContext('2d');
	context.beginPath();
	context.moveTo(timeCounter-1, prePosYVal);
	context.lineTo(timeCounter, graphPosition);
	context.stroke();
	if(posArray[timeCounter-1] === null){
		posArray[timeCounter-1] = prePosYVal;
	}
	posArray[timeCounter] = graphPosition;

	prePosYVal=graphPosition;
}

function drawVel(){
	var contextVel = canvas.getContext('2d');
	velArray[0]=250;
	for(var i = 1; i < posArray.length; i++){
		velArray[i] = (posArray[i+1]-posArray[i]);
	}

	contextVel.beginPath();
	for(var i = 0; i < velArray.length; i++){
		if(velArray[i] == 250){
			for(var j = i; j < 10; j++){
				if(velArray[j] != 250){
					velArray[j] = velArray[j-1];
					break;
				}
			}
		}
		draw(contextVel, i, velArray[i], i+1, velArray[i+1]);
	}
}

function draw(context, begX, begY, endX, endY){
	context.moveTo(begX, begY);
	context.lineTo(endX, endY);
	context.stroke();
}