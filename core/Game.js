function Game() {

	var canvas;
	var context;

	var tileSheet = new Image();
	var spriteSheet = new Image();

	var currentMap;
	var mapGenerator;

	var tilesize = 64;

	var tickCounter = 0;
	var animFlag = false;

	var player;

	var keys;

	var inputDelay = 0;
	var xOffset = 0;
	var yOffset = 0;

	var viewRadius = 7;

	var fireArray;

	var entityManager;

	var maxSeconds = 70;
	var runningSeconds = 70;

	var scoreArray;

	var timeArray;

	var titleArray;

	var titleArray2;

	var titleArray3;

	var titleArray4;
	
	var menuSound = new Audio("res/menu.wav");
	var fireload = new Audio("res/fireload.wav");
	var breath = new Audio("res/breath2.wav");
	var lastSeconds = new Audio("res/lastSeconds.wav");
	var end = new Audio("res/end.wav");

	var fontFactory;

	var mainMenu = true;

	var scoreMenu = false;

	var scoreMenuArray;
	var scoreMenuArray2;
	var scoreMenuArray3;
	var scoreMenuArray4;

	var comboCount;
	var comboTime;
	var comboArray;
	var maxCombo = 0;

	var fireCooldown = false;

	var game = this;
	
	var mute = false;

	var myAudio;

	this.setCombo = function(count) {
		if(comboTime > 0) {
			comboCount += count;
		} else {
			comboCount = count;
		}
		if(comboCount > maxCombo) {
			maxCombo = comboCount;
			if(comboCount > 1) {
				scoreMenuArray4 = fontFactory.getFont("x" + maxCombo);
			}
		}

		var snd = new Audio("res/fireload.wav");
		snd.play();
		comboTime = 40;
	}

	this.getCombo = function() {
		return comboCount;
	}
	function render() {

		context.fillStyle = "rgb(0,0,0)";
		context.fillRect(0, 0, canvas.width, canvas.height);

		if(!mainMenu && !scoreMenu) {
			var xMin = parseInt(player.getX() / tilesize) - viewRadius;
			if(xMin < 0) {
				xMin = 0;
			}
			var xMax = parseInt(player.getX() / tilesize) + viewRadius;
			if(xMax > currentMap.length - 1) {
				xMax = currentMap.length - 1;
			}

			var yMin = parseInt(player.getY() / tilesize) - viewRadius;
			if(yMin < 0) {
				yMin = 0;
			}
			var yMax = parseInt(player.getY() / tilesize) + viewRadius;
			if(yMax > currentMap[0].length - 1) {
				yMax = currentMap[0].length - 1;
			}

			if(currentMap != null) {
				for(var x = xMin; x <= xMax; x++) {
					for(var y = yMin; y <= yMax; y++) {
						//context.drawImage(tileSheet, currentMap[x][y].getTileSheetX() * 16, currentMap[x][y].getTileSheetY() * 16, 16, 16, parseInt((x * tilesize + canvas.width / 2) - player.getX(), (y * tilesize + canvas.height / 2) - player.getY()), tilesize, tilesize);
						context.drawImage(tileSheet, currentMap[x][y].getTileSheetX() * 64, currentMap[x][y].getTileSheetY() * 64, 64, 64, (x * tilesize + canvas.width / 2) - player.getX(), (y * tilesize + canvas.height / 2) - player.getY(), tilesize, tilesize);
					}
				}
			}

			/*for(var n = 0; n < entityManager.getEntityArray().length; n++) {
			 if(entityManager.getEntityArray()[n].getX() > xMin * tilesize && entityManager.getEntityArray()[n].getX() < xMax * tilesize && entityManager.getEntityArray()[n].getY() > yMin * tilesize && entityManager.getEntityArray()[n].getY() < yMax * tilesize) {
			 context.drawImage(spriteSheet, 0 * 64, 0 * 64, 64, 64, (entityManager.getEntityArray()[n].getX()*tilesize + canvas.width / 2) - player.getX(), (entityManager.getEntityArray()[n].getY()*tilesize + canvas.height / 2) - player.getY(), tilesize, tilesize);
			 }
			 }*/

			if(animFlag) {
				context.drawImage(spriteSheet, player.getAnimArray()[0].getX() * 64, player.getAnimArray()[0].getY() * 64, 64, 64, canvas.width / 2, canvas.height / 2, tilesize, tilesize);
				if(player.getFirering() > 0) {
					if(player.getCurrentDirection() == "right") {
						context.drawImage(spriteSheet, 8 * 64, 0, 64, 64, canvas.width / 2 + tilesize / 2, canvas.height / 2, tilesize, tilesize);
					} else if(player.getCurrentDirection() == "left") {
						context.drawImage(spriteSheet, 0, 1 * 64, 64, 64, canvas.width / 2 - tilesize / 2, canvas.height / 2, tilesize, tilesize);
					} else if(player.getCurrentDirection() == "up") {
						context.drawImage(spriteSheet, 2 * 64, 1 * 64, 64, 64, canvas.width / 2, canvas.height / 2 - tilesize / 2, tilesize, tilesize);
					} else if(player.getCurrentDirection() == "down") {
						context.drawImage(spriteSheet, 4 * 64, 1 * 64, 64, 64, canvas.width / 2, canvas.height / 2 + tilesize / 2, tilesize, tilesize);
					}
					for(var i = 0; i < fireArray.length; i++) {
						context.drawImage(spriteSheet, 6 * 64, 1 * 64, 64, 64, fireArray[i].getX(), fireArray[i].getY(), tilesize, tilesize);
					}
				}

			} else {
				context.drawImage(spriteSheet, player.getAnimArray()[1].getX() * 64, player.getAnimArray()[1].getY() * 64, 64, 64, canvas.width / 2, canvas.height / 2, tilesize, tilesize);
				if(player.getFirering() > 0) {
					if(player.getCurrentDirection() == "right") {
						context.drawImage(spriteSheet, 9 * 64, 0, 64, 64, canvas.width / 2 + tilesize / 2, canvas.height / 2, tilesize, tilesize);
					} else if(player.getCurrentDirection() == "left") {
						context.drawImage(spriteSheet, 1 * 64, 1 * 64, 64, 64, canvas.width / 2 - tilesize / 2, canvas.height / 2, tilesize, tilesize);
					} else if(player.getCurrentDirection() == "up") {
						context.drawImage(spriteSheet, 3 * 64, 1 * 64, 64, 64, canvas.width / 2, canvas.height / 2 - tilesize / 2, tilesize, tilesize);
					} else if(player.getCurrentDirection() == "down") {
						context.drawImage(spriteSheet, 5 * 64, 1 * 64, 64, 64, canvas.width / 2, canvas.height / 2 + tilesize / 2, tilesize, tilesize);
					}
					for(var i = 0; i < fireArray.length; i++) {
						context.drawImage(spriteSheet, 7 * 64, 1 * 64, 64, 64, fireArray[i].getX(), fireArray[i].getY(), tilesize, tilesize);
					}

				}
			}

			//UI
			context.drawImage(spriteSheet, 1 * 64, 2 * 64, 64, 64, 10, 10, tilesize, tilesize);

			//Bar Fill
			context.drawImage(spriteSheet, 6 * 64, 2 * 64, 64, 64, 12 + tilesize, 10, tilesize * 4 * ((player.getFireChargeLevel() * 100 / 20) * 0.01), tilesize);

			context.drawImage(spriteSheet, 2 * 64, 2 * 64, 64, 64, 12 + tilesize, 10, tilesize, tilesize);
			context.drawImage(spriteSheet, 3 * 64, 2 * 64, 64, 64, 12 + tilesize * 2, 10, tilesize, tilesize);
			context.drawImage(spriteSheet, 3 * 64, 2 * 64, 64, 64, 12 + tilesize * 3, 10, tilesize, tilesize);
			context.drawImage(spriteSheet, 4 * 64, 2 * 64, 64, 64, 12 + tilesize * 4, 10, tilesize, tilesize);

			//SCORE
			for(var i = 0; i < scoreArray.length; i++) {

				context.drawImage(spriteSheet, scoreArray[i].getX() * 64, scoreArray[i].getY() * 64, 64, 64, (62 * i) + 350, 10, tilesize, tilesize);

			}

			//TIME
			for(var i = 0; i < timeArray.length; i++) {

				context.drawImage(spriteSheet, timeArray[i].getX() * 64, timeArray[i].getY() * 64, 64, 64, (62 * i) + 350, 69, tilesize, tilesize);

			}

			//COMBO
			if(comboTime > 0 && comboCount > 0 && comboArray != null) {

				for(var i = 0; i < comboArray.length; i++) {

					context.drawImage(spriteSheet, comboArray[i].getX() * 64, comboArray[i].getY() * 64, 64, 64, 80 + (i * 64), 530, tilesize, tilesize);

				}

			}

		} else if(mainMenu) {

			for(var i = 0; i < titleArray.length; i++) {

				context.drawImage(spriteSheet, titleArray[i].getX() * 64, titleArray[i].getY() * 64, 64, 64, (32 * i) + 50, 69, 32, 32);

			}

			for(var i = 0; i < titleArray2.length; i++) {

				context.drawImage(spriteSheet, titleArray2[i].getX() * 64, titleArray2[i].getY() * 64, 64, 64, (tilesize * i) + 250, 300, tilesize, tilesize);

			}

			for(var i = 0; i < titleArray3.length; i++) {

				context.drawImage(spriteSheet, titleArray3[i].getX() * 64, titleArray3[i].getY() * 64, 64, 64, (62 * i) + 250, 400, tilesize, tilesize);

			}

			for(var i = 0; i < titleArray4.length; i++) {

				context.drawImage(spriteSheet, titleArray4[i].getX() * 64, titleArray4[i].getY() * 64, 64, 64, (24 * i) + 120, 120, 24, 24);

			}

		} else if(scoreMenu) {

			for(var i = 0; i < scoreMenuArray.length; i++) {

				context.drawImage(spriteSheet, scoreMenuArray[i].getX() * 64, scoreMenuArray[i].getY() * 64, 64, 64, (62 * i) + 80, 69, tilesize, tilesize);

			}

			for(var i = 0; i < scoreArray.length; i++) {

				context.drawImage(spriteSheet, scoreArray[i].getX() * 64, scoreArray[i].getY() * 64, 64, 64, (62 * i) + 250, 200, tilesize, tilesize);

			}

			for(var i = 0; i < scoreMenuArray3.length; i++) {

				context.drawImage(spriteSheet, scoreMenuArray3[i].getX() * 64, scoreMenuArray3[i].getY() * 64, 64, 64, (62 * i) + 80, 300, tilesize, tilesize);

			}

			for(var i = 0; i < scoreMenuArray4.length; i++) {

				context.drawImage(spriteSheet, scoreMenuArray4[i].getX() * 64, scoreMenuArray4[i].getY() * 64, 64, 64, (62 * i) + 250, 380, tilesize, tilesize);

			}

			for(var i = 0; i < scoreMenuArray2.length; i++) {

				context.drawImage(spriteSheet, scoreMenuArray2[i].getX() * 64, scoreMenuArray2[i].getY() * 64, 64, 64, (28 * i) + 70, 500, 28, 28);

			}

		}
	}

	function tick() {

		if(tickCounter % 15 == 2) {
			animFlag = !animFlag;
		}
		//if(tickCounter % 80 == 2) {
		//entityManager.generateEntities(5);
		//	}

		if(comboTime > 0) {
			comboArray = fontFactory.getFont("combo x " + comboCount);
			comboTime--;
		} else if(comboTime == 0) {
			comboCount = 0;
		}

		for(var i = 0; i < entityManager.getEntityArray().length; i++) {

			//entityManager.getEntityArray()[i].tick(currentMap);

		}
		scoreArray = fontFactory.getFont(player.getScore());
		timeArray = fontFactory.getFont(runningSeconds);

		var direction = "";
		if(keys["right"]) {
			direction = "right";
		} else if(keys["left"]) {
			direction = "left";
		} else if(keys["down"]) {
			direction = "down";
		} else if(keys["up"]) {
			direction = "up";
		}
		if(direction != "") {
			player.move(keys, currentMap, tilesize);
		}
		
		if(mute) {
			myAudio.pause();
		}

		if(keys["fire"] && !fireCooldown) {
			player.setFireChargeLevel(player.getFireChargeLevel() + 1);

		} else if(player.getFireChargeLevel() > 0) {
			player.setFirering(player.getFirering() + 1);
			if(player.getFirering() == 1) {
				fireArray = player.fire(currentMap, tilesize, canvas, entityManager, game);
				var snd = new Audio("res/breath2.wav");
				snd.play();
			}
			player.setFireChargeLevel(player.getFireChargeLevel() - 1);
			fireCooldown = true;
		} else if(player.getFireChargeLevel() == 0) {
			player.setFirering(0);
			fireCooldown = false;
		}
		tickCounter++;
	}

	function loop() {
		if(!mainMenu && !scoreMenu) {
			tick();
		}
		render();
	}


	this.keyDownEvent = function(evt) {
		if(evt.keyCode == 39) {
			keys["right"] = true;
		} else if(evt.keyCode == 37) {
			keys["left"] = true;
		} else if(evt.keyCode == 40) {
			keys["down"] = true;
		} else if(evt.keyCode == 38) {
			keys["up"] = true;
		} else if(evt.keyCode == 88) {
			keys["fire"] = true;
		} 
		
		if(evt.keyCode == 77) {
			mute = !mute;
		}

		if(mainMenu && evt.keyCode == 13) {
			mainMenu = false;
			var snd = new Audio("res/menu.wav");
			snd.play();
			myAudio = new Audio('res/ost.ogg');
			myAudio.addEventListener('ended', function() {
				this.currentTime = 0;
				this.play();
			}, false);
			myAudio.play();

		} else if(scoreMenu && evt.keyCode == 13) {
			scoreMenu = false;
			var snd = new Audio("res/menu.wav");
			snd.play();
		}
	}

	this.keyUpEvent = function(evt) {
		if(evt.keyCode == 39) {
			keys["right"] = false;
		} else if(evt.keyCode == 37) {
			keys["left"] = false;
		} else if(evt.keyCode == 40) {
			keys["down"] = false;
		} else if(evt.keyCode == 38) {
			keys["up"] = false;
		} else if(evt.keyCode == 88) {
			keys["fire"] = false;
		}
	}
	function time() {
		if(!mainMenu && !scoreMenu) {
			runningSeconds--;

			if(runningSeconds <= 5) {
				var snd = new Audio("res/lastSeconds.wav");
				snd.play();
			}

			if(runningSeconds == 0) {
				var snd = new Audio("res/end.wav");
				snd.play();
				scoreMenu = true;
				runningSeconds = maxSeconds;
				player.setX(1);
				player.setY(1);
				player.setScore(0);
				mapGenerator = new MapGenerator();
				currentMap = mapGenerator.generate(100, 100);

			}
		}
	}


	this.init = function() {
		canvas = document.getElementById("canvas");
		context = canvas.getContext("2d");
		fontFactory = new FontFactory();
		titleArray = fontFactory.getFont("70 seconds left");
		titleArray2 = fontFactory.getFont("press");
		titleArray3 = fontFactory.getFont("enter");
		titleArray4 = fontFactory.getFont("by emveyh");
		scoreMenuArray = fontFactory.getFont("your score");
		scoreMenuArray2 = fontFactory.getFont("play agaign: press enter");
		scoreMenuArray3 = fontFactory.getFont("max combo");
		scoreMenuArray4 = fontFactory.getFont(maxCombo);

		tileSheet.src = "res/tilesheet.png";
		spriteSheet.src = "res/spritesheet.png";
		mapGenerator = new MapGenerator();
		currentMap = mapGenerator.generate(100, 100);
		player = new Player();
		entityManager = new EntityManager(currentMap, player, tilesize);
		keys = new Array();
		new InputManager().init(this);

		setInterval(loop, 1000 / 60);
		setInterval(time, 1000);
	}
}