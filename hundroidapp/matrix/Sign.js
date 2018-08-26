function Sign(posx, posy, sp) {
  this.x = posx;
  this.y = posy;
  this.letter;
  
  this.speed = sp;
  this.charTiming = int(random(15,50));
  
  this.initialize = function() {
    this.letter = this.randomChar();
  }

  this.update = function() {
    if (frameCount%this.charTiming == 0) {
      this.letter = this.randomChar();
	  this.charTiming = int(random(15,50));
    }
  }

  this.display = function() {
    textAlign(CENTER, CENTER);
    text(this.letter, this.x, this.y);
  }

  this.randomChar = function() {
	cat = floor(random(3));
	if (cat == 0) {
      return String.fromCharCode(0x30A0 + floor(random(0,96)));
	}
	if (cat == 1) {
	  return String.fromCharCode(0x3041 + floor(random(0,85)));	
	}
	if (cat == 2) {
	  return String.fromCharCode(0x2F00 + floor(random(0,214)));		
	}
  }
}