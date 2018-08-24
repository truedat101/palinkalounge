var sigma = 15;
var rho = 28;
var beta = 8/3;

var lx = 1;
var ly = 1;
var lz = 1;
var px, py, pz;
var zoom = 2e1;
var dt = 5e-3;

function setup() {
	createCanvas(windowWidth, windowHeight);
	zoom = zoom/1080 * height;
	background(10,10,20);
}

function draw() {
	// do some math
	px = lx; py = ly; pz = lz;
	lorenz();
	// and draw pretty things
	var dxy = len(lx,ly);
	var dxz = len(lx,lz);
	var dyz = len(ly,lz);
	var x0 = width/2+px*zoom;
	var y0 = pz*zoom;
	var x1 = width/2+lx*zoom;
	var y1 = lz*zoom;
	strokeWeight(dxy/4);
	stroke(dxy*10,dxz*10,dyz*10);
	line(x0,y0,x1,y1);
}

function IX(x,y) {
	return (x + y*width) * 4;
}

function len(x,y) {
	return sqrt(x*x + y*y);
}

function lorenz() {
	var x=lx; var y=ly; var z=lz;
	lx = x + dt * sigma*(y-x);
	ly = y + dt * (rho*x - y - x*z);
	lz = z + dt * (x*y - beta*z);
}