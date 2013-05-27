function Player() {

	var x = 0;
	var y = 0;
	var collisionDetector = new CollisionDetector();
	var currentDirection = "down";

	var fireChargeLevel = 0;
	var firering = 0;
	var maxFireChargeLevel = 20;

	var animArrayDown = new Array();
	animArrayDown[0] = new Coord(0, 0);
	animArrayDown[1] = new Coord(1, 0);

	var animArrayRight = new Array();
	animArrayRight[0] = new Coord(2, 0);
	animArrayRight[1] = new Coord(3, 0);

	var animArrayUp = new Array();
	animArrayUp[0] = new Coord(4, 0);
	animArrayUp[1] = new Coord(5, 0);

	var animArrayLeft = new Array();
	animArrayLeft[0] = new Coord(6, 0);
	animArrayLeft[1] = new Coord(7, 0);

	var animArray = animArrayDown;

	var explosion3 = new Audio("res/explosion3.wav");

	var globalUtil = new GlobalUtil();

	var score = 0;

	this.getScore = function() {
		return score;
	}

	this.setScore = function(value) {
		score = value;
	}

	this.getFirering = function() {
		return firering;
	}

	this.setFirering = function(value) {
		firering = value;
	}

	this.setFireChargeLevel = function(level) {
		if(level <= maxFireChargeLevel) {
			fireChargeLevel = level;
		}
	}

	this.getFireChargeLevel = function() {
		return fireChargeLevel;
	}

	this.getCurrentDirection = function() {
		return currentDirection;
	}

	this.getAnimArray = function() {
		return animArray;
	}

	this.setX = function(newX) {
		x = newX;
	}

	this.setY = function(newY) {
		y = newY;
	}

	this.getX = function() {
		return x;
	}

	this.getY = function() {
		return y;
	}

	this.fire = function(currentMap, tilesize, canvas, entityManager, game) {

		//range
		var maxRange = 4;
		var max = parseInt(maxRange * (this.getFireChargeLevel() * 100 / maxFireChargeLevel * 0.01));

		//array
		var fireArray = new Array();
		var collidingArray = new Array();

		for(var i = 0; i <= max; i++) {

			var tileX = 0;
			var tileY = 0;

			if(currentDirection == "right") {
				fireArray[i] = new Coord((i + 1) * tilesize + canvas.width / 2, canvas.height / 2);
				tileX = parseInt(x / tilesize) + (i + 1);
				tileY = parseInt(y / tilesize);
				var result = collisionDetector.getCollidingTiles(x + (i + 1) * tilesize, y, tilesize, currentMap, currentDirection, false);
				for(var n = 0; n < result.length; n++) {
					collidingArray[collidingArray.length] = result[n];
				}
			} else if(currentDirection == "left") {
				fireArray[i] = new Coord(canvas.width / 2 - (i + 1) * tilesize, canvas.height / 2);
				tileX = parseInt(x / tilesize) - (i + 1);
				tileY = parseInt(y / tilesize);
				var result = collisionDetector.getCollidingTiles(x - (i + 1) * tilesize, y, tilesize, currentMap, currentDirection, false);
				for(var n = 0; n < result.length; n++) {
					collidingArray[collidingArray.length] = result[n];
				}

			} else if(currentDirection == "down") {
				fireArray[i] = new Coord(canvas.width / 2, (i + 1) * tilesize + canvas.height / 2);
				tileX = parseInt(x / tilesize);
				tileY = parseInt(y / tilesize) + (i + 1);
				var result = collisionDetector.getCollidingTiles(x, y + (i + 1) * tilesize, tilesize, currentMap, currentDirection, false);
				for(var n = 0; n < result.length; n++) {
					collidingArray[collidingArray.length] = result[n];
				}

			} else if(currentDirection == "up") {
				fireArray[i] = new Coord(canvas.width / 2, canvas.height / 2 - (i + 1) * tilesize);
				tileX = parseInt(x / tilesize);
				tileY = parseInt(y / tilesize) - (i + 1);
				var result = collisionDetector.getCollidingTiles(x, y - (i + 1) * tilesize, tilesize, currentMap, currentDirection, false);
				for(var n = 0; n < result.length; n++) {
					collidingArray[collidingArray.length] = result[n];
				}

			}

			/*for(var n = 0; n < entityManager.getEntityArray().length;n++) {
			 if(parseInt(entityManager.getEntityArray()[n].getX()/tilesize) == tileX && parseInt(entityManager.getEntityArray()[n].getY()/tilesize) == tileY) {
			 entityManager.setEntityArray(globalUtil.removeFromArray(entityManager.getEntityArray(),n));
			 }
			 }

			 if(tileX >= 0 && tileX < currentMap.length && tileY >= 0 && tileY < currentMap.length) {

			 if(!currentMap[tileX][tileY].isAccessible()) {
			 currentMap[tileX][tileY].setTileType("destroyed");
			 }
			 }*/

		}

		var result = collisionDetector.getCollidingTiles(x, y, tilesize, currentMap, currentDirection, false);
		for(var n = 0; n < result.length; n++) {
			collidingArray[collidingArray.length] = result[n];
		}

		var count = 0;
		var destroyed = false;
		for(var i = 0; i < collidingArray.length; i++) {

			if(!currentMap[collidingArray[i].getX()][collidingArray[i].getY()].isAccessible()) {
				if(game.getCombo() > 0) {
					score += game.getCombo() * currentMap[collidingArray[i].getX()][collidingArray[i].getY()].getScore();
				} else {
					score += currentMap[collidingArray[i].getX()][collidingArray[i].getY()].getScore();
				}
				currentMap[collidingArray[i].getX()][collidingArray[i].getY()].setTileType("destroyed");
				destroyed = true;
				count++;
			}

		}

		if(destroyed) {

			var snd = new Audio("res/explosion3.wav");
			snd.play();

		}

		if(count > 0) {
			game.setCombo(count);
		}
		return fireArray;
	}

	this.move = function(keys, currentMap, tilesize) {
		if(firering == 0) {
			var newX = x;
			var newY = y;

			var moveAmount = 6;

			var xDirection = "";
			var yDirection = "";

			if(keys["right"]) {
				newX += moveAmount;
				xDirection = "right";
				animArray = animArrayRight;
				currentDirection = "right";
			} else if(keys["left"]) {
				newX -= moveAmount;
				xDirection = "left";
				animArray = animArrayLeft;
				currentDirection = "left";
			}

			if(keys["down"]) {
				newY += moveAmount;
				yDirection = "down";
				animArray = animArrayDown;
				currentDirection = "down";
			} else if(keys["up"]) {
				newY -= moveAmount;
				yDirection = "up";
				animArray = animArrayUp;
				currentDirection = "up";
			}

			var tileX = parseInt(newX / tilesize);
			var tileY = parseInt(newY / tilesize);

			if(newX != x || newY != y) {

				if(newX != x && collisionDetector.detectCollision(newX, y, tilesize, currentMap, xDirection)) {
					x = newX;
				}
				if(newY != y && collisionDetector.detectCollision(x, newY, tilesize, currentMap, yDirection)) {
					y = newY;
				}

			}
		}
	}
}