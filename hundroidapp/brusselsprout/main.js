const power = 1.5; //Default 1.5: Larger number increases the chance of each bezier/leaf being close to the last. Try experimenting with negative numbers.
const maxIterations = 100; //Default 100: The number of iterations/leaves
const variation = 0.7; //Default 0.7: I'm still not entirely sure what this one does
const minSize = 100; //Default 100: The maximum size of the brussel
const maxSize = 320; //Default 320: The minimum size of the brussel
const r = 10; //Default 10: The red value of the strokes
const g = 150; //Default 150: The green value of the strokes 
const b = 5; //Default 5: The blue value of the strokes
const randomMode = false; //Default false: Whether the side the leaves generate on are randomly selected (true) or alternate each frame (false)
const bias = 0.5; //Default 0.5: The likelyhood of the next leaf being on a specific side. 1 or 0: always one side; 0.5: 50/50 chance

var beziers = [];
var rotation;
var size;
var angle1;
var angle2;
var start1;
var end1;
var start2;
var end;
var iteration = 0;
var side = false;

function setup(){
  start1 = PI;
	end1 = PI* 1.5;
	start2 = PI* 1.5;
	end2 = 0;
	
	rotation = random(TAU);
	size = random(minSize, maxSize);
	
	createCanvas(windowWidth, windowHeight);
	stroke(r, g, b);
	background(255);
	strokeWeight(random(1.5,6));
	
	ellipse(width/2, height/2, size*2, size*2);
	fill(203,255,100);
}


function draw(){
	translate(width/2, height/2);
	rotate(rotation);
	
	if(iteration < maxIterations){
		if(randomMode && random() > 0.5){
			side = true;
		}else if (randomMode){
			side = false;
		}else{
			side = !side;
		}
		
		if(side){
			angle1 = pick(start1, PI*0.5);
			angle2 = pick(end1, TAU);

			start1 = angle1;
			end1 = angle2;
		}else{
			angle1 = pick(start2, PI);
			angle2 = pick(end2, PI*0.5);

			start2 = angle1;
			end2 = angle2;
		}
		
		x1 = size * cos(angle1);
		y1 = size * sin(angle1);
		x4 = size * cos(angle2);
		y4 = size * sin(angle2);
		v = (-variation);//random(-variation, variation);
		x2 = (size + 1) * cos(angle1 + v);
		y2 = (size + 1) * sin(angle1 + v);
		if(v>0){v = random(-variation);}else{v = random(variation);}
		x3 = (size + 1) * cos(angle2 + variation);
		y3 = (size + 1) * sin(angle2 + variation);

		beziers.push(new Bezier());
		beziers[beziers.length-1].create(x1, y1, x2, y2, x3, y3, x4, y4, angle1, angle2);
		
		iteration++;
	}
	
	for(var i = beziers.length-1; i >= 0; i--) {
    beziers[i].update(size);
  }
	
}


function pick(number1, number2){ //number 1 is more likely
	return pow(random(), power) * (number2 - number1) + number1;
}


function mousePressed(){
	
		beziers = [];
		iteration = 0;
		setup();

}