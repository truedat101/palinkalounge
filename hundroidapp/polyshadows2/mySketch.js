var walls = [];
var light = {};
var polygonVerts = [];

function setup() {
  createCanvas(windowHeight, windowHeight);
  
  light = new Light(createVector(100,100));
  
  let margins = 50;
  let num = 100;
  for(let i=0; i<num; i++){
    let pos = createVector(random(margins,width-margins),random(margins,height-margins));
    let nxt = p5.Vector.random2D().mult(70).add(pos);
    walls.push(new Wall(pos.x,pos.y,nxt.x,nxt.y));
  }
}

function draw() {
  background(250,250,150);
  
  light.setPos(mouseX,mouseY);
  
  light.scanWalls(walls);
  light.display(color(255,255,230));
  light.castShadow(color(130,30,30,150));
  
  for(wall of walls){
    wall.display(color(250,250,150),3);
  }
  
  // println(frameRate());
}


/* Wall class */
var Wall = function(x0,y0,x1,y1){
  this.point0 = createVector(x0,y0);
  this.point1 = createVector(x1,y1);
}
Wall.prototype = {
  display: function(col, w=2){
    strokeWeight(w);
    stroke(col);
    line(this.point0.x,this.point0.y,this.point1.x,this.point1.y);
  }
}

/* Light class*/
var Light = function(pos){
  this.pos = pos;
  this.shadows = [[]];
  this.maxDist = sqrt(width*width + height*height);
}
Light.prototype = {
  setPos: function(x,y){
    this.pos.set(x,y);
  },
  scanWalls: function(walls){
    for(let i=0; i<walls.length; i++){
      this.shadows[i] = [];
    
      let relPos0 = p5.Vector.sub(walls[i].point0,this.pos);
      let relPos1 = p5.Vector.sub(walls[i].point1,this.pos);
    
      this.shadows[i][0] = walls[i].point0;
      this.shadows[i][1] = walls[i].point1; 
      this.shadows[i][2] = p5.Vector.mult(relPos1,this.maxDist).add(this.pos);
      this.shadows[i][3] = p5.Vector.mult(relPos0,this.maxDist).add(this.pos);
    }
  },
  display: function(col){
    noStroke();
    fill(col);
    ellipse(this.pos.x,this.pos.y,20,20);
  },
  castShadow: function(col){
    fill(col);
    noStroke();
    for(let i=0; i<this.shadows.length; i++){
      beginShape();
      for(let j=0; j<this.shadows[i].length; j++){
        vertex(this.shadows[i][j].x, this.shadows[i][j].y);
      }
      endShape(CLOSE);
    }
  }
}