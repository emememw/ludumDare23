function MapGenerator() {

	this.generate = function(width, height) {

		var map = new Array();

		for(var x = 0; x < width; x++) {
			map[x] = new Array();
			for(var y = 0; y < height; y++) {

				map[x][y] = new Tile("concrete");

			}
		}

		var maxBlockSize = 4;
		var maxBlockXCount = width / maxBlockSize;
		var maxBlockYCount = height / maxBlockSize;

		var globalUtil = new GlobalUtil();

		for(var i = 0; i < maxBlockXCount; i++) {
			for(var n = 0; n < maxBlockYCount; n++) {

		
					for(var x = maxBlockSize * i; x < maxBlockSize * i + maxBlockSize; x++) {
						for(var y = maxBlockSize * n; y < maxBlockSize * n + maxBlockSize; y++) {

							var rnd = globalUtil.getRandomInt(0, 7);
							var rnd2 = globalUtil.getRandomInt(0, 100);

							if(x == maxBlockSize * i && y == maxBlockSize * n) {
								map[x][y] = new Tile("streetSquare");
							} else if(y == maxBlockSize * n) {
								map[x][y] = new Tile("streetHorizontal")
							} else if(x == maxBlockSize * i) {
								map[x][y] = new Tile("streetVertical");
							} else {
								if(rnd2 < 75) {
									if(rnd == 0) {
										map[x][y] = new Tile("skyscraper");
									} else if(rnd == 1) {
										map[x][y] = new Tile("house1");
									} else if(rnd == 2) {
										map[x][y] = new Tile("mansion");
									} else if(rnd == 3) {
										map[x][y] = new Tile("trees");
									} else if(rnd == 4) {
										map[x][y] = new Tile("soccer");
									} else if(rnd == 5) {
										map[x][y] = new Tile("lake");
									} else if(rnd == 6) {
										map[x][y] = new Tile("house2");
									} else if(rnd == 7) {
										map[x][y] = new Tile("house3");
									}
								} else {
									map[x][y] = new Tile("grass");

								}
							}
						}
					}
				
			}
		}

		return map;
	}
}