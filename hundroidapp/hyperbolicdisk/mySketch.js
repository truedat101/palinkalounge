"use strict"


/*  
    Poincare Hyperbolic Disk Tilng Algorithm Demo

    This sketch illustrates an algorithm for drawing checkered patterns on the the Poincare disk.
    The Poincare disk is a model of hyperbolic geometry (see wikipedia). 

    Circles orthogonal to the boundary of the disk represent strait line in hyperbolic space. 
    Reflections are represented by circle inversion: swapping all the points outside 
    a circle with all the points on the inside. 

    Each of the triangle in this checkers pattern should be thought of as the same size. 
    The pattern is defined by reflections in the the circles shown. Its drawn pixel by pixel,
    so it takes a little while to render. For each point we check weather it is inside any of 
    the circles. If not, it must be in that triangular space in the middle,  the only bit thats
    not inside any of the circles. So we draw that pixel white. Otherwise we repeatedly “reflect” 
    the point until it finds its way to the middle triangle. We then colour it depending on weather 
    it took an even or odd number of reflections.

    For more about this algorithm see this paper:
    http://archive.bridgesmathart.org/2016/bridges2016-367.pdf
    
    other refs:
	https://en.wikipedia.org/wiki/Poincar%C3%A9_disk_model
	https://en.wikipedia.org/wiki/Hyperbolic_geometry
    http://mathworld.wolfram.com/PoincareHyperbolicDisk.html
*/


let orbitPoints = [];
let circles;
let pg;

function setup() {
    createCanvas(400, 400);
    createCircles();
    pg = createGraphics(width, height);
    background(255);	


    pg.pixelDensity(1);
    pg.loadPixels();

    for(var j =0; j<height;j++) {

          let y = yy(j); 

          for(var i =0; i<width;i++){

              let index = indexx(i,j);
              let x = xx(i);
            
              let points = iterativeInversion(x,y,circles);
              let odd = points.length % 2 ;
            
              
				let h = 255 - 100*odd;
              pg.pixels[index] = h;
              pg.pixels[index + 1] = h;
              pg.pixels[index + 2] = 255;
              pg.pixels[index + 3] = 255;

          }
    }
    
  	pg.updatePixels();
  
  	pg.strokeWeight(2);
    pg.noFill();
    pg.stroke(0,0,150);
  
	pg.ellipse(0.5*width,0.5*height,width-1,height-1); 
  	
	for (let c in circles ) {
    	
        let circle = circles[c];
      
      	pg.noFill();
        circle.draw(pg);
      
      	pg.fill(0,0,150);
      	circle.drawAnchors(pg);
      
    }

  	//pick a nice start point 
	orbitPoints = iterativeInversion(-0.545,-0.515,circles);
}

 

function draw() {
  
  	image(pg,0,0,width,height);
  
 
    if (mouseIsPressed){
        let x = xx(mouseX);
        let y = yy(mouseY);
      	console.log( x + "," + y );
		if(sqrt(x*x + y*y) < 1.0) {
      		orbitPoints = iterativeInversion(x,y,circles);
        }
    }
 
	strokeWeight(3);
  	noFill();
    stroke(0);
  
    for(let k = 0; k < orbitPoints.length-1; k++) {
      
        let p =  orbitPoints[k];
        let q =  orbitPoints[k+1];

        let i = 0.5*(p.x +1)*width;
        let j = 0.5*(p.y +1)*height;
        let i2 = 0.5*(q.x +1)*width;
        let j2 = 0.5*(q.y +1)*height;

        line(i,j,i2,j2);

    }
  
  	for(let k = 0; k < orbitPoints.length; k++) {
    	let p =  orbitPoints[k];
      	
      	stroke(0);
      	
		let i = ii(p.x);
        let j = jj(p.y);
      
      	let even = (orbitPoints.length - k)%2==0;
      
      	if(even){
          	fill(0);
        }
        else {
  			fill(255);
        }
      	
      	ellipse(i,j,10,10); 	
    }
}

/*
	A circle orthogonal to the border of the disk
*/
function OrthoganalCircle(theta,dTheta) {
  
  	let R = 1.0/cos(dTheta);
    this.r = abs(tan(dTheta));
   // this.x = R*cos(theta);
   // this.y = R*sin(theta);
  	//endpoints
  	this.p1 = createVector(cos(theta-dTheta),sin(theta-dTheta));
    this.p2 = createVector(cos(theta+dTheta),sin(theta+dTheta));
  
  	this.center = createVector(R*cos(theta),R*sin(theta));
  	this.containsPoint = function(p){
      	
      	return this.center.dist(p) < this.r;
    };
  	
  
  	/*
    	Circle inversion. Swaps points inside the circle with points outside the circle. Like a refection in a line in hyperbolic space.
    */
  	this.invert = function(p){ 
      	
      
       	let op = this.center.dist(p);
      
      	let oq = this.r*this.r/op;
      	
      	let dq = p5.Vector.sub(p,this.center).normalize().mult(oq);
      	
      	return p5.Vector.add(this.center,dq);
    };
  
  	this.draw = function(graphics) {
      //Draw the arc
      let v1 = p5.Vector.sub(this.p1,this.center);
      let v2 = p5.Vector.sub(this.p2,this.center);
      
      let theta1 = v1.heading();
      let theta2 = v2.heading();
    
      let i = ii(this.center.x);
      let j = jj(this.center.y);
     
      graphics.arc(i,j, this.r*width,this.r*height ,theta2,theta1)
    }
    
    this.drawAnchors = function(graphics) {
       graphics.ellipse(ii(this.p1.x),jj(this.p1.y),4,4); 
      graphics.ellipse(ii(this.p2.x),jj(this.p2.y),4,4); 
    }
}

/*
	creates the initial set of circles (lines in hyperbolic space) that generate the pattern.
*/
function createCircles() {
  
  	const dTheta = 0.5*2.43;
  
  	let c1 = new OrthoganalCircle(0,dTheta);
  	let c2 = new OrthoganalCircle(TWO_PI/3,dTheta);
  	let c3 = new OrthoganalCircle(2*TWO_PI/3,dTheta);

  	circles =  [c1,c2,c3]; 
  
}

/*
	This function performs the iterated inversion algorithm on the point (x,y) and returns an array of points.
*/
function iterativeInversion(x,y,circles) {
  	if(sqrt(x*x + y*y) > 1.0) {
      return [];
    }
    let flag = true ;
 
  	let points = [createVector(x,y)]; 
  	const iterations = 10;
  
  	for(let i = 0; i<iterations; i++) {
      	var k;
        flag = true;
        for ( k in circles ) {
        	
          	let circle = circles[k];
          	let p = points[points.length-1];
          	if (circle.containsPoint(p)){
                points.push(circle.invert(p));
                flag = false;
            }
    	}
        if (flag) {
          	break;
        }
    }
  
  	return points;
  
}



/*----------Some little helpers to convert from pixel indecies to disk coordinates ---------------*/

function xx(i){
 	return  2*i/width - 1;
}

function yy(i){
 	return   2*i/height -1;
}

function ii(x){
 	return  0.5*(x +1)*width;
}

function jj(y){
 	return   0.5*(y +1)*height;
}

function indexx(i,j){
 	return   4*(i + j*width);
}