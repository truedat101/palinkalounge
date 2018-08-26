function Bezier() {
	var x1;
	var y1;
	var x2;
	var y2;
	var x3;
	var y3;
	var x4;
	var y4;
	var angle1;
	var angle2;
	
	this.create = function(X1, Y1, X2, Y2, X3, Y3, X4, Y4, ANGLE1, ANGLE2){
		x1 = X1;
		y1 = Y1;
		x2 = X2;
		y2 = Y2;
		x3 = X3;
		y3 = Y3;
		x4 = X4;
		y4 = Y4;
		angle1 = ANGLE1;
		angle2 = ANGLE2;
	};
	
	this.update = function(size){
		bezier(x1, y1, x2, y2, x3, y3, x4, y4);
		arc(0, 0, size*2, size*2, angle1, angle2, OPEN);
	};
}