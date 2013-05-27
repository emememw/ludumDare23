function Tile(tileType) {

	var tileSheetX = 0;
	var tileSheetY = 0;
	var accessible;
	var savedTileType = tileType;
	var score = 0;

	determineTileTexture(tileType);

	this.getTileSheetX = function() {
		return tileSheetX;
	}

	this.getTileSheetY = function() {
		return tileSheetY;
	}

	this.isAccessible = function() {
		return accessible;
	}

	this.getTileType = function() {
		return savedTileType;
	}

	this.setTileType = function(newTileType) {
		determineTileTexture(newTileType);
		savedTileType = newTileType;
	}
	
	this.getScore = function() {
		return score;
	}
	
	function determineTileTexture(newTileType) {
		if(newTileType == "concrete") {
			tileSheetX = 0;
			tileSheetY = 0;
			accessible = true;
		} else if(newTileType == "streetVertical") {
			tileSheetX = 1;
			tileSheetY = 0;
			accessible = true;
		} else if(newTileType == "streetHorizontal") {
			tileSheetX = 2;
			tileSheetY = 0;
			accessible = true;
		} else if(newTileType == "streetSquare") {
			tileSheetX = 3;
			tileSheetY = 0;
			accessible = true;
		} else if(newTileType == "skyscraper") {
			tileSheetX = 4;
			tileSheetY = 0;
			accessible = false;
			score = 10;
		} else if(newTileType == "house1") {
			tileSheetX = 5;
			tileSheetY = 0;
			accessible = false;
			score = 5;
		} else if(newTileType == "mansion") {
			tileSheetX = 6;
			tileSheetY = 0;
			accessible = false;
			score = 20;
		} else if(newTileType == "trees") {
			tileSheetX = 7;
			tileSheetY = 0;
			accessible = false;
			score = 2;
		} else if(newTileType == "soccer") {
			tileSheetX = 8;
			tileSheetY = 0;
			accessible = false;
			score = 7;
		} else if(newTileType == "lake") {
			tileSheetX = 9;
			tileSheetY = 0;
			accessible = false;
			score = 2;
		} else if(newTileType == "house2") {
			tileSheetX = 0;
			tileSheetY = 1;
			accessible = false;
			score = 5;
		} else if(newTileType == "house3") {
			tileSheetX = 1;
			tileSheetY = 1;
			accessible = false;
			score = 5;
		} else if(newTileType == "destroyed") {
			tileSheetX = 2;
			tileSheetY = 1;
			accessible = true;
		} else if(newTileType == "grass") {
			tileSheetX = 3;
			tileSheetY = 1;
			accessible = true;
		}
	}
	
}
