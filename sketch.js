
let balls = [];
let num = 10;
var bumpSound;


function preload(){
	bumpSound = loadSound("assets/Tab 2.m4a");
}


function setup() {
	var myCanvas = createCanvas(windowWidth, windowHeight-80);
	//Debe ser un id!!
	// myCanvas.parent("canvasDiv");

	colorMode(HSB, 360, 100, 100);
	for (let i = 0; i < num; i++){
		let x = random(200, width - 200);
		let y = random(200, height - 200);
		let diam = random(50, 400);
		let xspeed = random(-2, 2);
		let yspeed = random(-2, 2);
		let brightness = 100;
		balls[i] = new Ball( x, y, diam, xspeed, yspeed, brightness, 1);
	}


}

function mousePressed() {
	for (let i = 0; i < balls.length; i++){
		if (balls[i].inside(mouseX, mouseY)){
			balls.splice(i, 1);
		}
	}
}


function draw() {
	var hueBg = map(mouseX, 0, windowWidth, 10, 160);
	var satBg = map(mouseY, 0, windowHeight, 10, 90);
	background(hueBg, satBg, 100);


	// COUNT throught the whole array ...
	for (let i = 0; i < balls.length; i++){
		// ... to ACT on everything in the array
		balls[i].display();
		balls[i].move();
		balls[i].checkBorders();
		// balls[i].popBall();
		if (balls[i].diam <= 0){
			balls.splice(i, 1);
		}

		if (balls[i].inside(mouseX, mouseY)) {
			balls[i].changeColor(40);
		} else {
			balls[i].changeColor(100);
		}

	}
}

// If you need add/remove things or just take the half from the array you need to COUNT the array

// // not COUNT just give me everything in order to ...
// for (let ball of balls) {
// 	// ... do these things
// 	ball.display();
// 	ball.move();
// 	ball.checkBorders();
// }
// }


class Ball{

	constructor(x, y, diam, xspeed, yspeed, brightness) {
		this.x = x;
		this.y = y;
		this.diam = diam;
		this.xspeed = xspeed;
		this.yspeed = yspeed;
		this.brightness = brightness;
	}

	 display() {
		var h = map(this.x, 0, width-this.diam, 160, 310);
 		var s = map(this.y, 0, height, 10, 90);

		fill(h, s, this.brightness, this.alpha);
		noStroke(0);
		ellipse(this.x, this.y, this.diam, this.diam);
	}

	 move(){
		this.x += this.xspeed;
		this.y += this.yspeed;
	}

	changeColor(b) {
		this.brightness = b;
	}

	popBall() {
		for (let i = 0; i < balls.length; i++){
			if (this.diam < 0){
				balls.splice(i, 1);
			}
		}
	}

	inside(px,py){
		// distance between center and mouse
		let d = dist(px, py, this.x, this.y)

		if (d < this.diam/2){
			return true;
		} else {
			return false;
		}
	}

	 checkBorders(){
		if (this.x >= (width - this.diam/2)){
			this.xspeed *= -1;
			bumpSound.play();
			this.diam = this.diam - random(50, 100);
		} if ( this.x <= (0 + this.diam/2)){
			this.xspeed *= -1;
			bumpSound.play();
			this.diam = this.diam - random(50, 100);
		}

		if (this.y >= (height - this.diam/2)){
			this.yspeed *= -1;
			bumpSound.play();
			this.diam = this.diam - random(50, 100);
		} if (this.y <= (0 + this.diam/2)){
			this.yspeed *= -1;
			bumpSound.play();
			this.diam = this.diam - random(50, 100);
		}
	}
}
