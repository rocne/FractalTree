
var WIDTH = 400 * 2;
var HEIGHT = 300 * 2;

var GROW_TIME = 100;

var treeRoot;

var treeStartX;
var treeStartY;

var startLenHeightFrac = 1.0 / 3.0;

function setup() {
	createElement("SPAN", "Length decay:");
	var lenDecaySlider = createSlider(0, 1, LEN_DECAY, 0.005).elt;
	lenDecaySlider.readout = createElement("SPAN", LEN_DECAY).elt;
	lenDecaySlider.onchange = lenDecaySliderChange_cb;
	createElement("BR");

	createP("Length decay specifies the ratio of a new branch to its parent branch. If there is a branch with length 100 and length decay is 0.66, then the next branch will have a length of 0.66 * 100 = 66");
	createElement("BR");	

	createElement("SPAN", "Branch angle:");
	var deltaAngleSlider = createSlider(0, PI / 2, DELTA_ANGLE, 0.005).elt;
	deltaAngleSlider.readout = createElement("SPAN", floor(degrees(DELTA_ANGLE)) + " degrees").elt;
	deltaAngleSlider.onchange = deltaAngleSliderChange_cb;
	createElement("BR");
	createP("Branch angle specifies how much the angle of each new banch differs from its parent branch.");
	createElement("BR");
	
	var resetButton = createButton("reset").elt;
	resetButton.onclick = resetButtonClick_cb;
	var growButton = createButton("branch").elt;
	growButton.onclick = growButtonClick_cb;
	createElement("BR");



	createCanvas(WIDTH, HEIGHT);
	
	resetButtonClick_cb();
	treeStartX = WIDTH / 2;
	treeStartY = HEIGHT;

}

function growButtonClick_cb() {
	treeRoot.grow();
}

function resetButtonClick_cb() {
	treeRoot = new Branch(0, HEIGHT * startLenHeightFrac, frameCount, frameCount + GROW_TIME);
}

function lenDecaySliderChange_cb() { 
	LEN_DECAY = this.value;
	this.readout.innerHTML = this.value;
}

function deltaAngleSliderChange_cb() { 
	DELTA_ANGLE = this.value;
	this.readout.innerHTML = Math.floor(degrees(this.value)) + " degrees";
}

function mousePressed() {
	if (mouseButton == LEFT && mouseX < WIDTH && mouseX > 0 && mouseY < HEIGHT && mouseY > 0) {
		treeRoot.grow();
	}
}

function draw() {
	push();
	background(50);	

	fill(255);	
	text("Click  anywhere to branch the tree!", 5, HEIGHT - 5);
	
	translate(treeStartX, treeStartY);

	treeRoot.show();
	pop();	
}
