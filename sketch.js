
let balls = [];
let num = 8;
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
		let x = random(100, width - 100);
		let y = random(100, height - 100);
		let diam = random(50, 200);
		let xspeed = random(-2, 2);
		let yspeed = random(-2, 2);
		let brightness = 100;
		balls[i] = new Ball( x, y, diam, xspeed, yspeed, brightness);
	}


}

function mousePressed() {
	for (let i = 0; i < balls.length; i++){
		if (balls[i].contains(mouseX, mouseY)){
			balls.splice(i, 1);
		}
	}


	let diam = random(50, 200);
	let xspeed = random(-2, 2);
	let yspeed = random(-2, 2);
	let brightness = 100;
	var a = new Ball( mouseX, mouseY, diam, xspeed, yspeed, brightness);

	balls.push(a);
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
		if (balls[i].diam <= 0){
			balls.splice(i, 1);
		}

		let overlapping = false;
		var newBalls = [];

			for (let j = 0; j < balls.length; j++){
				if(balls[i] !== balls[j] && balls[i].intersects(balls[j])|| balls[i].contains(mouseX, mouseY)){
					overlapping = true
				}

				if(balls[i] !== balls[j] && balls[i].intersects(balls[j])){
					balls[i].bump();
					balls[j].bump();
				}
			}

			if (balls[i].isDead() == true){
				balls.splice(i, 1);
			}

			if (overlapping){
				balls[i].changeColor(60);
			} else {
				balls[i].changeColor(100);
			}

			if(balls.length <= (num)) {
				let x = random(100, width - 100);
				let y = random(100, height - 100);
				let diam = random(50, 200);
				let xspeed = random(-2, 2);
				let yspeed = random(-2, 2);
				let brightness = 100;
				var a = new Ball( x, y, diam, xspeed, yspeed, brightness);
				balls.push(a);
			}
	}

	// If you need add/remove things or just take the half from the array you need to COUNT the array

	// // not COUNT just give me everything in order to ...
	// for (let ball of balls) {
	// 	// ... do these things
	// 	ball.display();
	// 	ball.move();
	// 	ball.checkBorders();
	// for ( other of balls) {
	// 	if ( ball !== other && ball.intersects(other)){
	// 		overlapping = true;
	// 	}
	// }
	// }

}


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

		fill(h, s, this.brightness);
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

	intersects(other){
		let d = dist(this.x, this.y, other.x, other.y);

		// Return the truth of these statement
		return (d < (this.diam/2) + (other.diam/2));

		// if ( d < this.diam + other.diam){
		// 	return true;
		// } else {
		// 	return false;
		// }
	}

	contains(px,py){
		// distance between center and mouse
		let d = dist(px, py, this.x, this.y)

		if (d < this.diam/2){
			return true;
		} else {
			return false;
		}
	}

	isDead() {
    if (this.diam < 0.0) {
      return true;
    } else {
      return false;
    }
  }

	bump(){
		this.xspeed *= -1;
		this.yspeed *= -1;
		bumpSound.play();
		this.diam = this.diam - random(10, 30);
	}

	 checkBorders(){
		if (this.x >= (width - this.diam/2)){
			this.xspeed *= -1;
			bumpSound.play();
			this.diam = this.diam - random(10, 30);
		} if ( this.x <= (0 + this.diam/2)){
			this.xspeed *= -1;
			bumpSound.play();
			this.diam = this.diam - random(10, 30);
		}

		if (this.y >= (height - this.diam/2)){
			this.yspeed *= -1;
			bumpSound.play();
			this.diam = this.diam - random(10, 30);
		} if (this.y <= (0 + this.diam/2)){
			this.yspeed *= -1;
			bumpSound.play();
			this.diam = this.diam - random(10, 30);
		}
	}
}
