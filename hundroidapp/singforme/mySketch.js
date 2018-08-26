// AnD as aLWAys, I AlWaYS ForGet thE thIS DOT (this dot, this dot)

/* READ ME

Font courtesy of Dharma Sahestya, retrieved from his 1001 Fonts profile with permission.
The source code was written with the help of a section of Daniel Shiffman's "Coding Challenge: Fireworks" and modified in the process.
The most heavily similar sections (Particle and Firework objects) have been thoroughly commented to demonstrate understanding.

*/


// ALL the variables!
var mic;
var voice;
var backdrop;
var fireworks = [];
var gravity;
var whistle;
var bang;
var font;

/////////// PRELOAD /////////////

/*(^ these things exist because I keep losing my spot, 
bear with me(I should really use multiple files to 
separate out the classes, but why do things the easy way
when you can suffer instead?))
*/

// Guarantees all assets are loaded before the sketch is run

function preload() {
	
	// For whatever reason, low frequencies sound horrendous in OpenProcessing, 
	// sounding like something out of Nier:Automata or an 8 bit game.
	// I recommend playing the sketch through a locally hosted page.
	
	bang = loadSound("bang.mp3");
	whistle = loadSound("Whistle.mp3");
	font = loadFont("Rhesmanisa.otf");
}

/////////// SETUP /////////////
function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(RGB);
	background(0);
	strokeWeight(4);
	gravity = createVector(0, 0.2);
	
	// Begin listening to the microphone input
	mic = new p5.AudioIn();
	mic.start();

}

/////////// DRAW /////////////
// Called every frame

function draw() {
	
	// Get current amplitude
	voice = mic.getLevel();
	
	// Clear away the past frame's contents and set up text style
	background(0, 0, 0, 25);
	fill("#BDF9F9")
	stroke(0)
	textFont(font);
  textSize(100);
	
	//Display Text
  text("Sing, for to me, you are a star.", windowWidth/2 - 300, windowHeight/2);
	
	// The higher the amplitude, the higher the chance of spawning a firework
	if (random(1) < voice * 3) {
		fireworks.push(new Firework());
		whistle.setVolume(0.1);
		whistle.play();
	}
	
	//Update the position of all particles and delete the decayed particles
	for (var i = fireworks.length - 1; i >= 0; i--) {
		fireworks[i].update();
		fireworks[i].show();
		if (fireworks[i].done()) {
			fireworks.splice(i, 1);
		}
	}
}

////////// PARTICLE CLASS ////////////

function Particle(x, y, hue, firework) {
	
	this.position = createVector(x, y);
	this.firework = firework;
	this.lifespan = 225;
	this.hue = hue;
	
	// Creates a random vector to account for the speed of the seed particle, resulting in fireworks reaching different heights
	// for a more organic look.
	if (this.firework) {
		this.velocity = createVector(0, random(-18, -15));
	} 
	else
	// Creates a random vector in any direction that gives the post-explosion particles a "scatter effect"
	// Also adds a random velocity multiplier to send them outwards at a different rate, creating a 3D illusion
	{
		this.velocity = p5.Vector.random2D();
		this.velocity.mult(random(2, 10));
	}
	this.acceleration = createVector(0, 0);
	this.applyForce = function(force) {
		this.acceleration.add(force);
	}
	
	//Updates the position of the particlein accordance with gravity, and adds a decreasing alpha to the particle to simulate decay
	this.update = function() {
		if (!this.firework) {
			this.velocity.mult(0.95);
			this.lifespan -= 4;
		}
		
		//Adjusts coordinates of the particle accrding to movement speed and direction
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		this.acceleration.mult(0);
	}
	
	// A flag to track the decay status of the particle
	this.done = function() {
		if (this.lifespan < 0) {
			return true;
		} else {
			return false;	
		}
	}
	
	// Draws the particle as a point on the canvas.
	// If it is a seed particle, simply draws it in stroke colour. 
	// If it is a post explosion particle, modifies the alpha to correspond with the state of decay
	this.show = function() {
		if (!this.firework) {
			strokeWeight(5);
			stroke(hue, 255, 255, this.lifespan);
		} else {
			strokeWeight(7);
			stroke(hue, 255, 255);
		}
		point(this.position.x, this.position.y);
	}
	
}


////////// FIREWORK CLASS ////////////

function Firework(){

	// An overarching class that controls the firework as a whole (I call it the bourgeoisie)
	
	this.hue = random(225);
	this.firework = new Particle(random(windowWidth - 200, 200), windowHeight, this.hue, true);
	this.exploded = false;
	this.particles = [];
	
	// A flag to track the decay status of the firework
	this.done = function() {
		if (this.exploded && this.particles.length === 0) {
			return true;
		} else {
		  return false;
		}
	}

	// If the firework has reached the top of it's movement, and it's velocity is zero, trigger the explosion sequence
	// Apply all vectors to the particles and update their position
	this.update = function() {
			if (!this.exploded) {
			this.firework.applyForce(gravity);
			this.firework.update();
			if (this.firework.velocity.y >= 0) {
			this.exploded = true;
				this.explode();
			}
		}
		for (var i = this.particles.length - 1; i >= 0; i--){
			this.particles[i].applyForce(gravity);
			this.particles[i].update();
			if (this.particles[i].done()) {
				this.particles.splice(i, 1);
			}
		}
		
	}
	
	// Creates 100 particles to visualise the explosion of the firework
	this.explode = function(){
		for (var i = 0; i < 100; i++){
			var p = new Particle(this.firework.position.x, this.firework.position.y, this.hue, false);
			bang.setVolume(0.001);
			bang.play();
			this.particles.push(p);
		}
	}
	
	// Draws the firework explosion as a set of 100 points on the canvas.
	this.show = function() {
		if (!this.exploded) {
			this.firework.show()
		}
		for (var i = 0; i < this.particles.length; i++){
			this.particles[i].show();
		}
	}
}


// Thank you for your hard work in marking these assignments, and your dedication to helping us throughout the tutorials. This subject has been a ray of sunshine for me this semester.
// Keep up the good work!