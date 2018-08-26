var posX = 300;
var posY = 300;

var angle = 0;
var radius = .5;
var clarity = 0;
var n = 300;
var z = 300;
var pastX = 280;
var pastY = 280;
function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0,0,0);
}

function draw() {
  if (mouseIsPressed) {
  clarity +=.9;
  angle -=.01;

  posX=posX + radius * cos(angle);
  posY=posY + radius * sin(angle);
  pastX = n;
  pastY = z;
  n = mouseX;
  z =  mouseY;
  strokeWeight(2);
    strokeCap(ROUND);
  stroke(253,253,150,clarity%76);
  

  
  line(n,z,posX,posY);

 
  //ellipse(pastX,pastY,pmouseX,pmouseY);
  //ellipse(pmouseX,pmouseY,n,z);
 }
  
  
}
function mousePressed(){ 
  
  //line(posX,posY,mouseX,mouseY); 
  
  
  posX= pmouseX;
  posY = pmouseY;
  
}

function mouseWheel() {
	radius +=.1;
	radius%=2;
	
	return false;
}
function mouseMoved() {
	n = pmouseX;
	z = pmouseY;
  	
}