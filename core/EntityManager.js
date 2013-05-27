function EntityManager(currentMap, player, tilesize) {

	this.currentMap = currentMap;
	this.player = player;
	this.tilesize = tilesize;

	var entityArray = new Array();

	this.generateEntities = function(range) {

		var xMin = parseInt(player.getX() / tilesize) - range;
		if(xMin < 0) {
			xMin = 0;
		}
		var xMax = parseInt(player.getX() / tilesize) + range;
		if(xMax > currentMap.length - 1) {
			xMax = currentMap.length - 1;
		}

		var yMin = parseInt(player.getY() / tilesize) - range;
		if(yMin < 0) {
			yMin = 0;
		}
		var yMax = parseInt(player.getY() / tilesize) + range;
		if(yMax > currentMap[0].length - 1) {
			yMax = currentMap[0].length - 1;
		}

		var globalUtil = new GlobalUtil();

		var addCounter = 0;
		for(var x = xMin; x <= xMax; x++) {
			for(var y = yMin; y < yMax; y++) {
				if(currentMap[x][y].isAccessible()) {
					entityArray[entityArray.length] = new Citizen(x, y);
					addCounter++;
				}

			}
		}
	}

	this.getEntityArray = function() {
		return entityArray;
	}

	this.setEntityArray = function(array) {
		entityArray = array;
	}
}
