function FlowField(r) {

  this.resolution = r; // How large is each "cell" of the flow field
  
  this.cols = width/this.resolution;
  this.rows = height/this.resolution; // Columns and Rows
  
  // A flow field is a two dimensional array of p5.Vectors
  // We can't make 2D arrays, but this is sort of faking it
  this.make2Darray = function(n) {
    var array = [];
    for (var i = 0; i < n; i++) {
       array[i] = [];
    }
    return array;
  };
  
  // A flow field is a two dimensional array of PVectors
  this.field = this.make2Darray(this.cols);
  
  this.init = function() {
    // Reseed noise so we get a new flow field every time
    noiseSeed(Math.floor(Math.random()*10000));
    var xoff = 0;
    for (var i = 0; i < this.cols; i++) {
      var yoff = 0;
      for (var j = 0; j < this.rows; j++) {
        var theta = map(noise(xoff,yoff),0,1,0,Math.PI*2);
        // Polar to cartesian coordinate transformation to get x and y components of the vector
        this.field[i][j] = createVector(Math.cos(theta),Math.sin(theta));
        yoff += 0.1;
      }
      xoff += 0.1;
    }
  };
  
  this.init();

  this.lookup = function(lookup) {
    var column = Math.floor(constrain(lookup.x/this.resolution,0,this.cols-1));
    var row = Math.floor(constrain(lookup.y/this.resolution,0,this.rows-1));
    return this.field[column][row].copy();
  }
}