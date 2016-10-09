
var WIDTH = 400;
var HEIGHT = 300;

var treeRoot;

var treeStartX;
var treeStartY;

function setup() {
	createCanvas(WIDTH, HEIGHT);
	
	treeRoot = new Branch(0, 50, 0, 0);
	treeStartX = WIDTH / 2;
	treeStartY = HEIGHT;
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
