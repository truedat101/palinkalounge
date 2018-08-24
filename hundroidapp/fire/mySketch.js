var dots = [];
var sparks = [];

//
function setup() {
	createCanvas(windowWidth, windowHeight);
	noStroke();
	colorMode(HSB, 360, 100, 100, 100);

	for (let x = 0; x < 10; x++) {
		dots[x] = new Dot();
		sparks[0] = new Spark();
	}
}

function draw() {
	background(10);

	dots.push(new Dot());
	if (frameCount % 5 == 0) {
		sparks.push(new Spark());
	}

	for (let x = 0; x < dots.length; x++) {
		if (dots[x].size <= 0) {
			dots.splice(x, 1);
		}
	}

	for (let x = 0; x < sparks.lenght; x++) {
		if (sparks[x].y <= 0) {
			sparks.splice(x, 1);
		}
	}

	for (let x = 0; x < dots.length; x++) {
		dots[x].display();
		dots[x].move();
	}

	for (let x = 0; x < sparks.length; x++) {
		sparks[x].display();
		sparks[x].move();
	}
}

class Dot {

	constructor() {
		this.start();
	}

	start() {
		this.x = random(width / 2 - 125, width / 2 + 125);
		this.y = height + 50;
		this.size = 100;
		this.velY = random(3, 7);
		this.h = random(0, 50);
		this.a = 80;
	}

	display() {
		fill(this.h, 100, 100, this.a);
		ellipse(this.x, this.y, this.size, this.size);
	}

	move() {
		this.y -= this.velY;
		this.x += cos(this.y) * 2;
		this.size -= 2;
		this.a -= 1.5;
	}
}

class Spark {

	constructor() {
		this.start();
	}

	start() {
		this.x = random(width / 2 - 25, width / 2 + 25);
		this.y = height + 250;
		this.size = 2;
		this.velY = random(5, 40);
	}

	display() {
		fill(0, 100, 100, 100, 10);
		ellipse(this.x, this.y, this.size, this.size);
	}

	move() {
		this.y -= this.velY;
		this.x += cos(this.y) * 0.5;
	}
}