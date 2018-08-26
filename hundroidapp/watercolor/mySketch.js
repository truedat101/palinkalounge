var np = 300;
var startcol;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	noFill();
	noiseSeed(random(100));
	startcol = random(255);
}

function draw() {
	//background(51);
	beginShape();
	var sx, sy;
	for(var i = 0; i < np; i++) {
		var angle = map(i, 0, np, 0, TWO_PI);
		var cx = frameCount * 2 - 200;
		var cy = height / 3 + 150 * sin(frameCount / 50);
		//var cy = height / 3 + 150 * sin(frameCount / 50);
		var xx = 100 * cos(angle + cx / 10);
		var yy = 100 * sin(angle + cx / 10);
		var v = createVector(xx, yy);
		xx = (xx + cx) / 150; yy = (yy + cy) / 150;
		v.mult(1 + 1.5 * noise(xx, yy));
		vertex(cx + v.x, cy + v.y);
		if(i == 0) {
			sx = cx + v.x;
			sy = cy + v.y;
		}
	}
	colorMode(HSB);
	var hue = cx / 10 - startcol;
	if(hue < 0) hue += 255;
	stroke(hue, 50, 200);
	strokeWeight(0.5);
	vertex(sx, sy);
	endShape();
	if(frameCount > width + 500) {
	noLoop();
	}
}