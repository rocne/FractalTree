
var DELTA_ANGLE = 0.5235983333; // pi / 6
var LEN_DECAY = 0.66667;

function Branch(angle, len, tStart, tEnd) {
	this.angle = angle;
	this.len = len;
	this.tStart = tStart;
	this.tEnd = tEnd;

	this.branches = [];

	this.show = function() {
		push();
		stroke(255);
		rotate(this.angle);
		line(0,0, 0, -this.len);
		translate(0, -this.len);
		for (var i = 0; i < this.branches.length; i++)
			this.branches[i].show();

		pop();
	}
	
	this.grow = function() {
		if (this.branches.length == 0) {
			var nextAngle = this.angle == 0 ? DELTA_ANGLE : this.angle;
			this.branches.push(new Branch(nextAngle, this.len * LEN_DECAY, this.tStart, this.tEnd));
			this.branches.push(new Branch(-nextAngle, this.len * LEN_DECAY, this.tStart, this.tEnd));
		} else {
			for (var i = 0; i < this.branches.length; i++) {
				this.branches[i].grow();
			}
		}
	}
}
