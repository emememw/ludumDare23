function Citizen(x, y) {
	
	this.x = x;
	this.y = y;
	var globalUtil = new GlobalUtil();
	
	this.getY = function() {
		return this.y;
	}
	
	this.setY = function(value) {
		this.y = value;
	}
	
	this.getX = function() {
		return this.x;
	}
	
	this.setX = function(value) {
		this.x = value;
	}
	
	this.tick = function(currentMap) {
		
		var rnd = globalUtil.getRandomInt(0,4);
		var newX = this.x;
		var newY = this.y;
		if(rnd == 0) {
			newX++;
		} else if(rnd == 1) {
			newX--;
		} else if(rnd == 2) {
			newY++;
		} else if(rnd == 3) {
			newY--;
		}
		
		if(x != newX || y != newY) {
			
			if(newX >= 0 && newX < currentMap.length && newY >= 0 && newY < currentMap[0].length) {
				this.x = newX;
				this.y = newY;
			}
			
		}
		
	}
	
	
}
