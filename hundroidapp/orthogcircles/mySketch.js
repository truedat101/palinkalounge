"use strict"
let theta0 = 0;


function setup() {
    createCanvas(800, 800);
    colorMode(HSB,360,100,100,100);
   
    background(255);	

    noFill();
    stroke(0,0,100,70);
  
	//ellipse(0.5*width,0.5*height,width-1,height-1); 
	//frameRate(10);
}


 

function draw() {
  fill(0,0,100,1);
  rect(0,0,width,height);
  	let dTheta =  random(0,PI);
  	
  
  let c = new  OrthoganalCircle(random(TWO_PI),random(TWO_PI));
 	// noStroke
  	//stroke(240+random(60),70,100 + 40*c.r,50 - 15*c.r);
  	fill(240+random(60),80 - 40*c.r ,100 + 70*c.r,35 - 20*c.r);
  
  	c.draw();
  	
  	
  
    if (mouseIsPressed){
        let x = xx(mouseX);
        let y = yy(mouseY);
      	
    }
  
  	
  
 
	

  
}


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
  
  	this.invert = function(p){ 
      	
      
       	let op = this.center.dist(p);
      
      	let oq = this.r*this.r/op;
      	
      	let dq = p5.Vector.sub(p,this.center).normalize().mult(oq);
      	
      	return p5.Vector.add(this.center,dq);
    };
  
  this.draw = function() {
      
      
    
      let i = ii(this.center.x);
      let j = jj(this.center.y);
     
      ellipse(i,j, this.r*width,this.r*height)
    }
  
  	this.drawArc = function() {
      
      let v1 = p5.Vector.sub(this.p1,this.center);
      let v2 = p5.Vector.sub(this.p2,this.center);
      
      let theta1 = v1.heading();
      let theta2 = v2.heading();
    
      let i = ii(this.center.x);
      let j = jj(this.center.y);
     
      arc(i,j, this.r*width,this.r*height ,theta2,theta1)
    }
    
    this.drawAnchors = function() {
       ellipse(ii(this.p1.x),jj(this.p1.y),4,4); 
      ellipse(ii(this.p2.x),jj(this.p2.y),4,4); 
    }
}



function trackedIterativeInversion(x,y,circles) {
  
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