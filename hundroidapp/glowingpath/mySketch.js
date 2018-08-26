//Original Java code at the bottom

//The path to render (created under setup())
var path = [];
//The diagonal length of the screen. Used to draw lines that never end
//on-screen
var maxD;

//The canvas that will hold the resulting image
var out;

//The size of the image to create
var renderWidth = 1280;
var renderHeight = 720;

//The opacity of each line. If the effect looks too sharp,
//try lowering this
var opacity = 14;
var iterations = 400;

//The function to use to initialize our path

var func = sine;

//Path functions taking a fractional percentage (0 to 1)
//and returning a vector based on that. You could make
//your own too.
function sine(f) {
	return createVector(f * width, sin(f * TWO_PI * 2) * renderHeight/2 + renderHeight/2);
}

function circle(f) {
  var r = p5.Vector.fromAngle(f * TWO_PI);
  r.mult(200);
  r.add(renderWidth/2, renderHeight/2);
  return r;
}

function setup() {
  createCanvas(1280, 720);
  
  maxD = sqrt(sq(renderWidth) + sq(renderHeight));
  
  //Create our path using the 'func' variable
  //(although you don't have to use 'func')
  for(var i = 0; i<iterations; i++) {
    path.push(func(i/iterations));
  }

  //Create our graphics buffer
  out = createGraphics(renderWidth, renderHeight, P2D);
  out.smooth(8);
  out.background(0);
  out.strokeWeight(20);
  out.blendMode(ADD);
  out.colorMode(HSB, 360, 100, 100, 255);
  renderPath(path, out);
  background(0);
  imageMode(CENTER);
  var w, h;
  
  //Fit the image to the screen.
  if (renderWidth > width || renderHeight > height) {
    if (renderWidth >= renderHeight) {
      w = width;
      h = width/renderWidth * renderHeight;
    } else {
      w = height/renderHeight * renderWidth;
      h = height;
    }
  } else {
    w = renderWidth;
    h = renderHeight;
  }
  
  //Render the scaled image to the screen (the full image is
  //still in memory, so you can save it at full resolution)
  image(out, width/2, height/2, w, h);
}

function keyReleased() {
  if(key == ' ') {
    save(out, "Glowing-Sine-" + year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + ".png");
  }
}

function lineR(output, x, y, a) {
  //Draw a line running through the point (x, y) at an angle
  output.line(x + cos(a) * maxD, y + sin(a) * maxD, x - cos(a) * maxD, y - sin(a) * maxD);
}

function renderPath(path, output) {
  for(var i = 0, j = 1; j < path.length; i++, j++) {
    var p1 = path[i];
    var p2 = path[j];
    output.stroke(i/path.length * 360, 80, 100, opacity);
    //Draw a line along the path at the angle from p1 to p2
    lineR(output, p1.x, p1.y, atan2(p2.y - p1.y, p2.x - p1.x));
  }
}

/* JAVA CODE

ArrayList<PVector> path = new ArrayList<PVector>();
float maxD;

PGraphics out;

int renderWidth = 1920;
int renderHeight = 1080;
int opacity = 14;

void setup() {
  size(1280, 720, P2D);
  
  maxD = sqrt(sq(renderWidth) + sq(renderHeight));
  for(float x = 0; x<renderWidth; x += 6) {
    path.add(new PVector(x, sin(x/renderWidth * TWO_PI * 2) * renderHeight/2 + renderHeight/2));
  }

  out = createGraphics(renderWidth, renderHeight, P2D);
  out.smooth(8);
  out.beginDraw();
  out.background(0);
  out.strokeWeight(20);
  out.blendMode(ADD);
  out.colorMode(HSB, 360, 100, 100);
  renderPath(path, out);
  out.endDraw();
  background(0);
}

void draw() {
  image(out, 0, 0, width, height);
}

void keyReleased() {
  if(key == ' ') {
    out.save("Glowing-Sine-" + year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + ".png");
  }
}

void lineR(PGraphics canvas, float x, float y, float a) {
  canvas.line(x + cos(a) * maxD, y + sin(a) * maxD, x - cos(a) * maxD, y - sin(a) * maxD);
}

void renderPath(ArrayList<PVector> path, PGraphics canvas) {
  for(int i = 0, j = 1; j < path.size(); i++, j++) {
    PVector p1 = path.get(i);
    PVector p2 = path.get(j);
    canvas.stroke((float)i/path.size() * 360, 80, 100, opacity);
    lineR(canvas, p1.x, p1.y, atan2(p2.y - p1.y, p2.x - p1.x));
  }
}
*/