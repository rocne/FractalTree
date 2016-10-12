
var DELTA_ANGLE = 0.5235983333; // pi / 6
var LEN_DECAY = 0.66667;

function Branch(angle, len, tStart, tEnd) {
	this.angle = angle;
	this.len = len;
	this.tStart = tStart;
	this.tEnd = tEnd;

	this.branches = [];

	this.show = function() {
		if (frameCount > this.tStart) {
			push();
			stroke(255);
			rotate(this.angle);
			var lenFrac = (frameCount - this.tStart) / (1.0 * this.tEnd - this.tStart);
			if (lenFrac > 1) lenFrac = 1;
			if (lenFrac < 0) lenFrac = 0;

			line(0,0, 0, -lenFrac * this.len);
			if (frameCount > this.tEnd) {
				translate(0, -len);
				for (var i = 0; i < this.branches.length; i++)
					this.branches[i].show();
			}
			pop();
		}
	}
	
	this.grow = function() {
		if (this.branches.length == 0) {
			var nextAngle = this.angle == 0 ? DELTA_ANGLE : this.angle;
			var nextStart = this.tEnd > frameCount ? this.tEnd : frameCount;
			this.branches.push(new Branch(nextAngle, this.len * LEN_DECAY, nextStart, nextStart + GROW_TIME));
			this.branches.push(new Branch(-nextAngle, this.len * LEN_DECAY, nextStart, nextStart + GROW_TIME));
		} else {
			for (var i = 0; i < this.branches.length; i++) {
				this.branches[i].grow();
			}
		}
	}
}
