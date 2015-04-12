var canvas = document.getElementById('graphCanvas');
var timeCounter = 0;
var prePosXVal, prePosYVal, preVelXVal, preVelYVal;
var posArray = [];
var velArray = [];
var timer;
var moving = 0;
var speed = 0;
init();

function init(){
	var context = canvas.getContext('2d');
	context.beginPath();  //Let's begin, shall we?
	context.moveTo(0, canvas.height/2);  //Start the line halfway down
	context.lineTo(canvas.width, canvas.height/2);  //Create a horizontal line that splits the entire canvas in half
	context.stroke();  //And draw :D
	prePosXVal = 0;
	prePosYVal = (parseInt(document.getElementById('sliderOutput3').innerHTML))*50+250;
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

function toggleTimer(){
	timer = setInterval(function(){myTimer();}, 10);
}

function myTimer() {
	var sliderPos = parseInt(document.getElementById('sliderOutput3').innerHTML)/50;
	$('#sliderOutput3').text(parseInt(document.getElementById('sliderOutput3').innerHTML)+moving);
	//Drawing position

	if(Math.round(prePosYVal) > sliderPos*50+250){
		drawPos(sliderPos, speed);
		speed-=0.1;
	} else if(Math.round(prePosYVal) < sliderPos*50+250){
		drawPos(sliderPos, speed);
		speed+=0.1;
	} else {
		drawPos(sliderPos, 0);
		speed = 0;
	}
	timeCounter+=1;
	if(timeCounter>1000){
		window.clearInterval(timer);
		drawVel();
	}
}

function drawPos(sliderPos, speed){
	var context = canvas.getContext('2d');
	context.beginPath();
	context.moveTo(prePosXVal, prePosYVal);
	prePosYVal = prePosYVal + speed;
	context.lineTo(timeCounter, prePosYVal);
	context.stroke();
	prePosXVal = timeCounter;

	// context.moveTo(prePosXVal, prePosYVal);
	// context.lineTo(timeCounter,-sliderPos*50+250);
	// context.stroke();
	// if(posArray[prePosXVal] == null){
	// 	posArray[prePosXVal] = prePosYVal;
	// }
	// posArray[prePosXVal+1] = (-sliderPos*50)+250;
	//
	// prePosXVal=timeCounter;
	// prePosYVal=-sliderPos*50+250;
}

function drawVel(){
	var contexVel = canvas.getContext('2d');
	velArray[0]=250;
	for(var i = 1; i < posArray.length; i++){
		velArray[i] = (posArray[i+1]-posArray[i])*50+250;
	}
	contexVel.beginPath();
	for(var i = 0; i < velArray.length; i++){
		if(velArray[i] == 250){
			for(var j = i; j < 10; j++){
				if(velArray[j] != 250){
					velArray[j] = velArray[j-1];
					break;
				}
			}
		}
		draw(contexVel, i, velArray[i], i+1, velArray[i+1]);
	}
}

function draw(contex, begX, begY, endX, endY){
	contex.moveTo(begX, begY);
	contex.lineTo(endX, endY);
	contex.stroke();
}
