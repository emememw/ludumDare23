function CollisionDetector() {

	this.detectCollision = function(x, y, tilesize, currentMap, direction) {

		var accessible = true;

		if(x < 0 || parseInt((x + tilesize) / tilesize) >= currentMap.length || y < 0 || parseInt((y + tilesize) / tilesize) >= currentMap[0].length) {
			accessible = false;
		} else {
		
			var collisionTolerance = tilesize/4;
		
			if(direction == "right") {
				
				var x1 = parseInt((x+tilesize-collisionTolerance)/tilesize);
				var y1 = parseInt((y+collisionTolerance)/tilesize);
				
				if(!currentMap[x1][y1].isAccessible()) {
					accessible = false;
				}
				
				var x2 = parseInt((x+tilesize-collisionTolerance)/tilesize);
				var y2 = parseInt((y+tilesize-collisionTolerance)/tilesize);
				
				if(!currentMap[x2][y2].isAccessible()) {
					accessible = false;
				}
				
			} else if(direction == "left") {
				var x1 = parseInt((x+collisionTolerance)/tilesize);
				var y1 = parseInt((y+collisionTolerance)/tilesize);
				if(!currentMap[x1][y1].isAccessible()) {
					accessible = false;
				}
				
				var x2 = parseInt((x+collisionTolerance)/tilesize);
				var y2 = parseInt((y+tilesize-collisionTolerance)/tilesize);
				if(!currentMap[x2][y2].isAccessible()) {
					accessible = false;
				}
				
			} else if(direction == "down") {
				
				var x1 = parseInt((x+collisionTolerance)/tilesize);
				var y1 = parseInt((y+tilesize-collisionTolerance)/tilesize);
				if(!currentMap[x1][y1].isAccessible()) {
					accessible = false;
				}
				
				var x2 = parseInt((x+tilesize-collisionTolerance)/tilesize);
				var y2 = parseInt((y+tilesize-collisionTolerance)/tilesize);
				if(!currentMap[x2][y2].isAccessible()) {
					accessible = false;
				}
			} else if(direction == "up") {
				
				var x1 = parseInt((x+collisionTolerance)/tilesize);
				var y1 = parseInt((y+collisionTolerance)/tilesize);
				if(!currentMap[x1][y1].isAccessible()) {
					accessible = false;
				}
				
				var x2 = parseInt((x+tilesize-collisionTolerance)/tilesize);
				var y2 = parseInt((y+collisionTolerance)/tilesize);
				if(!currentMap[x2][y2].isAccessible()) {
					accessible = false;
				}
				
			}
			
		}

		return accessible;
	}
	
	this.getCollidingTiles = function(x, y, tilesize, currentMap, direction, nonColliding) {
		var tileArray = new Array();
		var tileArrayIndex = 0;

		accessible = false;
		if(x >= 0 && parseInt((x + tilesize) / tilesize) < currentMap.length && y >= 0 && parseInt((y + tilesize) / tilesize) < currentMap[0].length) {

			if(direction == "right") {

				var x1 = parseInt((x + tilesize - 1) / tilesize);
				var y1 = parseInt((y + 1) / tilesize);

				if(!currentMap[x1][y1].isAccessible() || nonColliding) {
					tileArray[tileArrayIndex] = new Coord(x1,y1);
					tileArrayIndex++;
				}

				var x2 = parseInt((x + tilesize - 1) / tilesize);
				var y2 = parseInt((y + tilesize - 1) / tilesize);

				if(!currentMap[x2][y2].isAccessible() || nonColliding) {
					accessible = false;
					tileArray[tileArrayIndex] = new Coord(x2,y2);
					tileArrayIndex++;
				}

			} else if(direction == "left") {
				var x1 = parseInt((x + 1) / tilesize);
				var y1 = parseInt((y + 1) / tilesize);
				if(!currentMap[x1][y1].isAccessible() || nonColliding) {
					accessible = false;
					tileArray[tileArrayIndex] = new Coord(x1,y1);
					tileArrayIndex++;
				}

				var x2 = parseInt((x + 1) / tilesize);
				var y2 = parseInt((y + tilesize - 1) / tilesize);
				if(!currentMap[x2][y2].isAccessible() || nonColliding) {
					accessible = false;
					tileArray[tileArrayIndex] = new Coord(x2,y2);
					tileArrayIndex++;
				}

			} else if(direction == "down") {

				var x1 = parseInt((x + 1) / tilesize);
				var y1 = parseInt((y + tilesize - 1) / tilesize);
				if(!currentMap[x1][y1].isAccessible() || nonColliding) {
					accessible = false;
					tileArray[tileArrayIndex] = new Coord(x1,y1);
					tileArrayIndex++;
				}

				var x2 = parseInt((x + tilesize - 1) / tilesize);
				var y2 = parseInt((y + tilesize - 1) / tilesize);
				if(!currentMap[x2][y2].isAccessible() || nonColliding) {
					accessible = false;
					tileArray[tileArrayIndex] = new Coord(x2,y2);
					tileArrayIndex++;
				}
			} else if(direction == "up") {

				var x1 = parseInt((x + 1) / tilesize);
				var y1 = parseInt((y + 1) / tilesize);
				if(!currentMap[x1][y1].isAccessible() || nonColliding) {
					accessible = false;
					tileArray[tileArrayIndex] = new Coord(x1,y1);
					tileArrayIndex++;
				}

				var x2 = parseInt((x + tilesize - 1) / tilesize);
				var y2 = parseInt((y + 1) / tilesize);
				if(!currentMap[x2][y2].isAccessible() || nonColliding) {
					accessible = false;
					tileArray[tileArrayIndex] = new Coord(x2,y2);
					tileArrayIndex++;
				}

			}

		}

		return tileArray;
	}
	
	this.getAffectedTiles = function(x, y, tilesize, currentMap) {
		var coordArray = new Array();
		var coordArrayIndex = 0;

		//if(x >= 0 && parseInt((x + tilesize) / tilesize) < currentMap.length && y >= 0 && parseInt((y + tilesize) / tilesize) < currentMap[0].length) {
		if(x >= 0 && y >= 0 && x < currentMap.length && y < currentMap[0].length) {
			coordArray[coordArrayIndex] = new Coord(parseInt(x/tilesize), parseInt(y/tilesize));
			coordArrayIndex++;
			coordArray[coordArrayIndex] = new Coord(parseInt((x+tilesize)/tilesize),parseInt(y/tilesize));
			coordArrayIndex++;
			coordArray[coordArrayIndex] = new Coord(parseInt(x/tilesize),parseInt((y+tilesize)/tilesize));
			coordArrayIndex++;
			coordArray[coordArrayIndex] = new Coord(parseInt((x+tilesize)/tilesize),parseInt((y+tilesize)*tilesize));
		}
		//}

		return coordArray;
	}
}
