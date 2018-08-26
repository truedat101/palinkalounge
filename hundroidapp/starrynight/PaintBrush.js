function PaintBrush(l, ms, mf, w) {

  // The usual stuff
  this.location = l;
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.r = 3.0;
  this.maxforce = mf || 0.1;    // Maximum steering force
  this.maxspeed = ms || 4;    // Maximum speed
  this.dead = false;
  this.col = color('#000000');
  this.wnd = w;
  
  this.maxspeed *= constrain(this.wnd/10, 0.1, 2);
  this.maxspeed = constrain(this.maxspeed, 0.2, 8);
  
  var rand = Math.random();
    if (rand < 0.2) {
      this.col = color('#0d1337');
    } else if (rand >= 0.2 && rand < 0.4) {
      this.col = color('#8cafd9');
    } else if (rand >= 0.4 && rand < 0.6) {
      this.col = color('#2e48b6');
    } else if (rand >= 0.6 && rand < 0.8) {
      this.col = color('#486dd5');
    } else {
      this.col = color('#c8e4f2');
    }

  this.run = function() {
    this.update();
    this.borders();
    this.display();
  }


  // Implementing Reynolds' flow field following algorithm
  // http://www.red3d.com/cwr/steer/FlowFollow.html
  this.follow = function(flow) {
    // What is the vector at that spot in the flow field?
    var desired = flow.lookup(this.location);
    // Scale it up by maxspeed
    desired.mult(this.maxspeed);
    // Steering is desired minus velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);  // Limit to maximum steering force
    this.applyForce(steer);
  }

  this.applyForce = function(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // Method to update location
  this.update = function() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  this.display = function() {
    stroke(this.col, 175);
    strokeWeight(10);
    point(this.location.x, this.location.y);
  }

  // Wraparound
  this.borders = function() {
    if (this.location.x < 0-200 || this.location.x > width+200 || this.location.y < 0-200 || this.location.y > height+200) {
      this.dead = true;
    } else {
     this.dead = false;
    }
  }
}