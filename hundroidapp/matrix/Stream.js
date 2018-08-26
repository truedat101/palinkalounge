function Stream(posx, posy) {
  this.x = posx;
  this.y = posy;
  this.numOfChars = floor(random(8, height/(1*intervall)));
  
  this.speed = floor(random(1,5));
  
  this.chars = [];
  
  this.toMove = 0;
  this.moved = this.numOfChars-1;
  this.chanceForWhite = 0.1;
  
  this.init = function() {
    for(var i = 0; i < this.numOfChars; i++) {
      var chr = new Sign(this.x, this.y + i*(width/colums), this.speed);
      chr.initialize();
      this.chars.push(chr);
    }
  }
  
  this.render = function() {
    for(var i = this.chars.length-1; i >= 0; i--) {
		N = this.numOfChars - 1
		if (i <= this.moved) {
		  posi = i + (N - this.moved)
		} else {
		  posi = i - this.moved
		}
		// Determine fraction [0,1]
		relFrac = posi / N
		// Set color based on position in stream
		valRed   = -460 + relFrac * 3 * 230;
		valGreen = 0    + relFrac * 1 * 255;
		valBlue  = -460 + relFrac * 3 * 230;
        fill(valRed, valGreen, valBlue);
        //if(i == this.moved) {
        //  fill(230, 0, 0);
        //} 
        this.chars[i].display();
        this.chars[i].update();
    }
  }
  
  this.update = function() {
    if(frameCount % this.speed == 0) {
      if(this.toMove > this.chars.length-1) {
        this.toMove = 0;
      }
      this.chars[this.toMove].y = this.chars[this.moved].y + (width/colums);
      
      if(this.chars[this.toMove].y >= height) {
        this.chars[this.toMove].y -= height;
      }
      
      this.moved = this.toMove;
      this.toMove++;
    }
  }
}