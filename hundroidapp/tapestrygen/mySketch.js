let number_of_bubbles = 53;

let bubbles;
let movedist = 1;
let bubble_size = 2;

let keepOn = true;

function setup() {
	background(255);
	createCanvas(windowWidth, windowHeight);
	bubbles = [];
	
	//bubbles[0] = new Bubble(200, 200, 40);
	//bubbles[1] = new Bubble(400, 200, 20);
	
	
	for (let i = 0; i < number_of_bubbles; i++){
		bubbles[i] = new Bubble(random(0,width),
														random(0,height),
														bubble_size,
														movedist,
														i);
	}
}

function draw() {
	//background(222,222,222,2);
	if (keepOn) {
		for (let i =0; i < number_of_bubbles; i++){
			bubbles[i].move();
			bubbles[i].show();
		}
	}
}

function mouseClicked(){
	background(0);
	if (keepOn){
		keepOn = false;
	} else {
		keepOn = true;
	}
}

class Bubble{
	constructor(x, y, r, speed, index){
		this.x = x;
		this.y = y;
		this.radius = r;
		this.color = random(111,205);
		this.speed = speed;
		this.angle = noise(this.x+this.y/1234);
			this.r = map(random(),0,1,0,255);
			this.g = map(random(),0,1,0,255);
			this.b = map(random(),0,1,0,255);		
	}
	move(){
		
		this.angle = this.angle + 0.5 - noise((this.y + this.x)/30);

		
		this.x = this.x + sin(this.angle)*this.speed;
		this.y = this.y + cos(this.angle)*this.speed;
		
		if (this.x < 0){
			this.x = width;
		}
		if (this.x > width){
			this.x = 0;
		}
		if (this.y < 0){
			this.y = height;
		}
		if (this.y > height){			
			this.y = 0;
		}

	}
	show(){
		//stroke(this.color, 44);
		noStroke();
		fill(this.r, this.g, this.b);

		ellipse(this.x, this.y, this.radius);
	
	}
}