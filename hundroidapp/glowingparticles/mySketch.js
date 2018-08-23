var Particle = function(x, y, vx, vy) {
  this.mass = 1.0;
  this.friction = 0.02;
  //this.location = createVector(random(width), random(height));
  this.location = createVector(x, y);
  this.velocity = createVector(0.0, 0.0);
  this.accelaration = createVector(vx, vy);
  this.img;
}

Particle.prototype.update = function() {
  this.velocity.add(this.accelaration);
  this.velocity.mult(1.0 - this.friction);
  this.location.add(this.velocity);
  this.accelaration.set(0.0, 0.0);
}

Particle.prototype.display = function() {
  image(this.img, this.location.x, this.location.y);
}

Particle.prototype.attract = function(particle) {
  var force = p5.Vector.sub(particle.location, this.location);
  var distance = force.mag();
  distance = constrain(distance, 4.0, 1000.0);
  force.normalize();
  var strength = (g*this.mass*particle.mass)/pow(distance, 2.0);
  force.mult(strength);
  return force;
}

Particle.prototype.applyForce = function(force) {
  var f = p5.Vector.div(force, this.mass);
  this.accelaration.add(f);
}

Particle.prototype.wallThrough = function() {
  if (this.location.x > width) {
    this.location.x = 0;
  }
  if (this.location.x < 0) {
    this.location.x = width;
  }
  if (this.location.y > height) {
    this.location.y = 0;
  }
  if (this.location.y < 0) {
    this.location.y = height;
  }
}

Particle.prototype.createParticleImage = function() {

  var side = 400;
  var center = 200;

  this.img = createImage(side, side);

  var num = pow(10, 1.8);

  var Cr =random(100, 255);
  var Cg =random(100, 255);
  var Cb =random(100, 255);

  //while ((Cr/Cg > 0.8 && Cr/Cg < 1.2) && (Cr/Cb > 0.8 && Cr/Cb < 1.2)) {
  //  var Cr =random(50, 255);
  //  var Cg =random(50, 255);
  //  var Cb =random(50, 255);
  //}

  this.img.loadPixels();
	for (var y = 0; y < side; y++) {
    for (var x = 0; x < side; x++) {
      var d = (sq(center - x) + sq(center - y))/num;
      //var d = (sq(center - x) + sq(center - y))/num;
      var col = color(Cr/d, Cg/d, Cb/d);
      this.img.set(x, y, col);
    }
  }
	this.img.updatePixels();
  return this.img;
}

infoDisplay = function() {
  if (frameCount % 10 == 0) {
    fr = frameRate();
  }
  textFont('Monospace');
  textSize(24);
  fill("white");
  textAlign(RIGHT, BOTTOM);
  text(str(int(fr))+" fps", width - 20, height);
  textAlign(LEFT, BOTTOM);
  text("Particle Count: "+str(n), 0, height);
}

//var n = int(pow(10, random(3)));
var n = 0;
var particles = [];

var g = 30.0;

var fr;

function setup() {
  createCanvas(windowWidth, windowHeight);
  blendMode(ADD);
  imageMode(CENTER);
  frameRate(60);
  background(0);
  //for (var i = 0; i < n; i++) {
  //  particles[i] = new Particle();
  //  particles[i].createParticleImage();
  //}

}

function draw() {
  clear();
  background(0);
  //mousePressed();
  //noStroke();
  //fill(20);
  //rect(0, 0, width, height);
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if (i != j) {
        var force = particles[i].attract(particles[j]);
        particles[i].applyForce(force);
      }
    }
  }
  for (var i = 0; i < n; i++) {
    particles[i].update();
    particles[i].wallThrough();
    particles[i].display();
  }
  infoDisplay();
}

function mousePressed() {
  particles.push(new Particle(mouseX, mouseY, 0, 0));
  particles[n].createParticleImage();
  n++;
}

//function mousePressed() {
//  if (mouseIsPressed) {
//    particles.push(new Particle(mouseX, mouseY, random(-20, 20), random(-20, 20)));
//    particles[n].createParticleImage();
//    n++;
//  }
//}

function mouseMoved() {
  particles = [];
  n = 0;
}

function keyTyped() {
  if (key === 'a') {
    particles.push(new Particle(mouseX, mouseY, 0, 0));
    particles[n].createParticleImage();
    n++;
  }
  else if (key === 'r') {
    particles = [];
    n = 0;
  }
  else if (key === 'p') {
    for (var particle of particles) {
      particle.velocity.x = random(-20, 20);
      particle.velocity.y = random(-20, 20);
    }
  }
}