var canvas = document.getElementById('graphCanvas');
var timeCounter = 0;
var prePosXVal, prePosYVal, preVelXVal, preVelYVal;
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
	prePosXVal = 0;
	prePosYVal = (parseInt(document.getElementById('sliderOutput3').innerHTML));
	document.addEventListener('keydown', function(event) {
	    if(event.keyCode == 37 || event.keyCode == 40) {
			moving = -1;
	    }
	    else if(event.keyCode == 39 || event.keyCode == 38) {
	    	moving = 1;
		}
	});
	document.addEventListener('keyup', function(event){
		moving = 0;
	});
}

function toggleTimer(){
	timer = setInterval(function(){myTimer()}, 10);
}

function myTimer() {
	var sliderPos = parseInt(document.getElementById('sliderOutput3').innerHTML);
	$('#sliderOutput3').text(parseInt(document.getElementById('sliderOutput3').innerHTML)+moving);
	//Drawing position
<<<<<<< HEAD

	if(Math.round(prePosYVal) > sliderPos){
		drawPos(sliderPos, speed);
		speed+=0.01;
	} else if(Math.round(prePosYVal) < sliderPos){
		drawPos(sliderPos, -speed);
		speed+=0.01;
	} else {
		drawPos(sliderPos, 0);
		speed = 0;
	}
=======
	drawPos(sliderPos);
>>>>>>> parent of ebd8186... UGG
	timeCounter+=1;
	if(timeCounter>1000){
		window.clearInterval(timer);
		drawVel();
	}
}

function drawPos(sliderPos){
	var contex = canvas.getContext('2d');
	contex.beginPath();
	contex.moveTo(prePosXVal, prePosYVal);
	contex.lineTo(timeCounter,-sliderPos*50+250);
	contex.stroke();
	if(posArray[prePosXVal] == null){
		posArray[prePosXVal] = prePosYVal;
	}
	posArray[prePosXVal+1] = (-sliderPos*50)+250;

	prePosXVal=timeCounter;
	prePosYVal=-sliderPos*50+250;
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
