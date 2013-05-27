function GlobalUtil() {

	this.getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	this.removeFromArray = function(array, index) {

		result = new Array();
		var counter = 0;
		for(var i = 0; i < array.length; i++) {
			if(i != index) {
				result[counter] = array[i];
				counter++;
			}
		}
		return result;
	}
}