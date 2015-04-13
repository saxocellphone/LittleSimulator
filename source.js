var canvas = document.getElementById('graphCanvas');
var timeCounter = 0;
var prePosXVal, prePosYVal, preVelXVal, preVelYVal;
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
	prePosXVal = 0;
	prePosYVal = parseInt(document.getElementById('sliderOutput3').innerHTML)+250;
	document.addEventListener('keydown', function(event) {
	    if(event.keyCode == 37 || event.keyCode == 40) {
			speed=0;
			speed -= acc;
	    }
	    else if(event.keyCode == 39 || event.keyCode == 38) {
			speed=0;
			speed += acc;
		}
	});
	document.addEventListener('keyup', function(event){
		speed = 0;
	});
}

function toggleTimer(){
	timer = setInterval(function(){myTimer()}, 20);
}

function myTimer() {
	moving += speed;
	$('#sliderOutput3').text(parseInt(document.getElementById('sliderOutput3').innerHTML)+moving);
	var sliderPos = parseInt(document.getElementById('sliderOutput3').innerHTML)/50;
	//Drawing position
	drawPos(sliderPos);
	timeCounter+=1;
	if(timeCounter>1000){
		drawVel();
		window.clearInterval(timer);
	}
}

function drawPos(sliderPos){
	var contex = canvas.getContext('2d');
	contex.beginPath();
	draw(contex,prePosXVal,prePosYVal,timeCounter,-sliderPos*50+250);
	if(posArray[prePosXVal] == null){
		posArray[prePosXVal] = prePosYVal;
	}
	posArray[prePosXVal+1] = (-sliderPos*50)+250;
	console.log(speed);
	prePosXVal=timeCounter;
	prePosYVal=-sliderPos*50+250;
}

function drawVel(){
	var contexVel = canvas.getContext('2d');
	contexVel.beginPath();
	velArray[0]=250;
	for(var i = 1; i < posArray.length; i++){
		velArray[i] = (posArray[i+1]-posArray[i])*50+250;
	}
	for(var j = 0; j < velArray.length; j+=1){
		draw(contexVel, j, velArray[j], j+10, velArray[j+10]);
	}

}

function draw(contex, begX, begY, endX, endY){
	contex.moveTo(begX, begY);
	contex.lineTo(endX, endY);
	contex.stroke();
}
