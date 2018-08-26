var factor = 6;
var intervall = 16; // width/colums

var backgroundAlpha = 0;

var col;

var streams = [];
var chanceToSpawn = 0.6;

function setup() {
  frameRate(20)
  createCanvas(windowWidth, windowHeight);

  colums = width/16
  
  for (var i = 0; i < colums; i++) {
    if(random() <= chanceToSpawn) {
      var stream = new Stream(intervall*i, random(height));
      stream.init();
      streams.push(stream);
    }
  }

  col = color(0, 0, 255);
  
  fill(0, 0, 255);
  textSize(width/colums);
  background(0);
}

// Every cycle draw black background 
function draw() {
  background(0);
  fill(col);
  for (var i = 0; i < streams.length; i++) {
    streams[i].update();
    streams[i].render();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}