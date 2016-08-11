
function Racing() {
	var self = this;
	var ctx;
	var screenHeight = 1000;
	var screenWidth = 400;
	var movingState = true;

	const RIGHT_CAR_POSITION = 230;
	const LEFT_CAR_POSITION = 70;
	var playerCarPosition = LEFT_CAR_POSITION;

	var playerCarImg = new Image();
		playerCarImg.src = 'pl-car.png';
	this.init = function(containerId) {
		var container = document.getElementById(containerId);
		var gameView = document.createElement('canvas');
		gameView.setAttribute('id', 'gameRacing');
		container.appendChild(gameView);
		gameView.width = screenWidth;
		gameView.height = screenHeight;
		ctx = gameView.getContext('2d');
		readyToPlay();
	}

	function readyToPlay() {
		ctx.font = "40px Arial";
		ctx.fillStyle = 'red';
		ctx.fillText('Press Space', 100, 100);
		window.addEventListener('keyup',function(event) {
			if (event.keyCode == 32) {
				playRace();
			}
		})
		window.addEventListener('keydown', moveCar);
	}

	function playRace(lose) {
		var playing = setInterval(updateFrames, 50);
		var obstacleGenerator = setInterval(generateObstacle, 500);
	}

	function updateFrames(direction) {
		drawRoad();
		setPlayerCar();

	}

	function drawRoad() {
		// offRoad;
		ctx.fillStyle = '#FAE7B5';
		ctx.fillRect(0, 0, screenWidth, screenHeight);
		// Asphalt;
		ctx.fillStyle = '#7D7F7D';
		ctx.fillRect(40, 0, 320, screenHeight);
		var state = Number(movingState);
		movingState = !movingState;
		// Bariers
		ctx.fillStyle = '#fff';
		ctx.fillRect(40, 0, 10, screenHeight);
		ctx.fillRect(350, 0, 10, screenHeight);
		ctx.fillStyle = '#000';
		var barierLength = 30;
		for (var i = state; i < screenHeight/barierLength + state; i += 2) {
			ctx.fillRect(40, barierLength*i, 10, barierLength);
			ctx.fillRect(350, barierLength*i, 10, barierLength);
		}
		// RoadMarks
		ctx.fillStyle = '#fff';
		for (var i = state; i < screenHeight + state; i += 2) {
			ctx.fillRect(195, barierLength/2*i, 10, barierLength/2);
		}
	}
	

	function setPlayerCar() {
		ctx.drawImage(playerCarImg, playerCarPosition, 750, 100, 200);
	}

	function moveCar(event) {
		if(event.keyCode == 37) {
			changeCarPosition(false);// toLeft
		} else if (event.keyCode == 39) {
			changeCarPosition(true);// toRight
		}
	}
	

	function changeCarPosition(direction) {
		if(direction) {
			if (playerCarPosition == LEFT_CAR_POSITION) {
				var carMoving = setInterval(function() {
					if(playerCarPosition == RIGHT_CAR_POSITION) {
						clearInterval(carMoving);
						return;
					}
					playerCarPosition += 4;
				}, 10);
			}
		} else {
			if (playerCarPosition >= RIGHT_CAR_POSITION) {
				var carMoving = setInterval(function() {
					if(playerCarPosition == LEFT_CAR_POSITION) {
						clearInterval(carMoving);
						return;
					}
					playerCarPosition -= 4;
				}, 10);
			}
		}
	}
	
	function createObstacle(position) {
		var yPosition = 0;
		var moveObstacle = setInterval(function(){
			ctx.fillStyle = '#fa1';
			ctx.fillRect(position, yPosition, 100, 50);
			yPosition +=10
		}, 10);
		setTimeout(function(){
			clearInterval(moveObstacle);
		}, 3000);
	}

	function generateObstacle () {
		var randSide = Math.round(0 + Math.random() * (1 - 0));
		switch (randSide) {
			case 0:
				createObstacle(LEFT_CAR_POSITION);
				break;
			case 1:
				createObstacle(RIGHT_CAR_POSITION);
				break;
		}

	}

	this.test = function() {
		var state = true;
		setInterval(updateFrames, 50);
	}

}