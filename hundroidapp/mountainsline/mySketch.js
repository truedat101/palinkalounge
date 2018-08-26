var rows;
var columns;
var itemHeight;
var itemWidth;
var rowScale; 
var columnScale; 
var timeScale;

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);
	itemHeight = 10;// 竖直方向行的间隔 Vert Line Spacing
  itemWidth = 10;// 水平方向点间距 Horiz Lin Spacing
	rowScale = 0.1;// 行与行之间波动幅度
	columnScale = 0.15;// 水平方向点与点之间波动幅度
	timeScale = 0.01; //随时间变化的快慢
	
  rows = windowHeight/itemHeight+1;
  columns = windowWidth/itemWidth+1;
}

function draw() {
 background(0);
	
 for (var row =0; row < rows; row++) {

  beginShape();
	// 可以改变线的颜色。RGBA
  stroke(255,255,255,100);
  // stroke(0,0,0,100);
  noFill();
  strokeWeight(2);
  for(var column = 0;column < columns;column++) {
		
		var minAmplitude = 10;//最小的变化幅度。
		var maxAmplitude = itemHeight*1.5;//最大的变化幅度。
		// 竖直方向从上到下，最大幅度逐渐变大。
    var amplitude = map(row,0,rows-1,10,itemHeight*1.5);
    var nValue = 100*map(noise(row * rowScale,column *columnScale,frameCount*timeScale),0,1,-1,1);
    if (nValue > 0) {
      nValue = 0;
    }
    vertex(column*itemWidth,nValue+row*itemHeight+itemHeight);
  }
  endShape();
}

}