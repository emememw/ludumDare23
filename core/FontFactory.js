function FontFactory() {
	
	this.getFont = function(value) {
		
		text = String(value);
		
		var spritesheetCoords = new Array();
		
		for(var i = 0; i < text.length; i++) {
			
			if(text[i] == "0") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(0,3);
				
			} else if(text[i] == "1") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(1,3);
				
			} else if(text[i] == "2") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(2,3);
				
			} else if(text[i] == "3") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(3,3);
				
			} else if(text[i] == "4") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(4,3);
				
			} else if(text[i] == "5") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(5,3);
				
			} else if(text[i] == "6") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(6,3);
				
			} else if(text[i] == "7") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(7,3);
				
			} else if(text[i] == "8") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(8,3);
				
			} else if(text[i] == "9") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(9,3);
				
			} else if(text[i] == ":") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(8,2);
				
			} else if(text[i] == "a") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(0,4);
				
			} else if(text[i] == "b") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(1,4);
				
			} else if(text[i] == "c") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(2,4);
				
			} else if(text[i] == "d") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(3,4);
				
			} else if(text[i] == "e") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(4,4);
				
			} else if(text[i] == "f") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(5,4);
				
			} else if(text[i] == "g") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(6,4);
				
			} else if(text[i] == "h") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(7,4);
				
			} else if(text[i] == "i") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(8,4);
				
			} else if(text[i] == "j") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(9,4);
				
			} else if(text[i] == "k") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(0,5);
				
			} else if(text[i] == "l") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(1,5);
				
			} else if(text[i] == "m") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(2,5);
				
			} else if(text[i] == "n") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(3,5);
				
			} else if(text[i] == "o") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(4,5);
				
			} else if(text[i] == "p") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(5,5);
				
			} else if(text[i] == "q") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(6,5);
				
			} else if(text[i] == "r") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(7,5);
				
			} else if(text[i] == "s") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(8,5);
				
			} else if(text[i] == "t") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(9,5);
				
			}  else if(text[i] == "u") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(0,6);
				
			}  else if(text[i] == "v") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(1,6);
				
			}  else if(text[i] == "w") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(2,6);
				
			}  else if(text[i] == "x") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(3,6);
				
			}  else if(text[i] == "y") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(4,6);
				
			}  else if(text[i] == "z") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(5,6);
				
			}  else if(text[i] == " ") {
				
				spritesheetCoords[spritesheetCoords.length] = new Coord(6,6);
				
			}
		}
		
		return spritesheetCoords;
		
	}
	
	
	
}
