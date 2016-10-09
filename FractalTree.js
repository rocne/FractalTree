
var WIDTH = 400;
var HEIGHT = 300;

var treeRoot;

var treeStartX;
var treeStartY;

function setup() {
	var lenDecaySlider = createSlider(0, 1, LEN_DECAY, 0.005).elt;
	lenDecaySlider.readout = createElement("SPAN", LEN_DECAY).elt;
	lenDecaySlider.onchange = lenDecaySliderChange_cb;
	createElement("BR");

	var deltaAngleSlider = createSlider(0, PI / 3, DELTA_ANGLE, 0.005).elt;
	deltaAngleSlider.readout = createElement("SPAN", DELTA_ANGLE / PI + " pi").elt;
	deltaAngleSlider.onchange = deltaAngleSliderChange_cb;
	createElement("BR");

	var resetButton = createButton("reset").elt;
	resetButton.onclick = resetButtonClick_cb;
	createElement("BR");



	createCanvas(WIDTH, HEIGHT);
	
	treeRoot = new Branch(0, 50, 0, 0);
	treeStartX = WIDTH / 2;
	treeStartY = HEIGHT;

}

function resetButtonClick_cb() {
	treeRoot = new Branch(0, 50, 0);
}

function lenDecaySliderChange_cb() { 
	LEN_DECAY = this.value;
	this.readout.innerHTML = this.value;
}

function deltaAngleSliderChange_cb() { 
	DELTA_ANGLE = this.value;
	this.readout.innerHTML = this.value / PI + " pi";
}

function mousePressed() {
	if (mouseButton == LEFT && mouseX < WIDTH && mouseX > 0 && mouseY < HEIGHT && mouseY > 0) {
		treeRoot.grow();
	}
}

function draw() {
	push();
	background(50);	
	translate(treeStartX, treeStartY);

	treeRoot.show();
	pop();	
}
