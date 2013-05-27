function InputManager() {

	var game;

	function keyDown(evt) {
		game.keyDownEvent(evt);
	}
	
	function keyUp(evt) {
		game.keyUpEvent(evt);
	}


	this.init = function(gameReference) {
		game = gameReference;
		window.addEventListener("keydown", keyDown, false);
		window.addEventListener("keyup", keyUp, false);
		
	}


}