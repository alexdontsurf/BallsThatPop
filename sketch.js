
let balls = [];
let num = 4;
var bumpSound;
let emojis = [];


function preload(){
	bumpSound = loadSound("assets/Tab 2.m4a");
	for (let i = 0; i < 73; i++) {
		emojis[i] = loadImage('assets/emojis/emoji' + i + '.png');
	}

}


function setup() {
	var myCanvas = createCanvas(windowWidth, windowHeight-80);
	//Debe ser un id!!
	// myCanvas.parent("canvasDiv");

	colorMode(HSB, 360, 100, 100);
	for (let i = 0; i < num; i++){
		let x = random(100, windowWidth - 100);
		let y = random(100, windowHeight - 100);
		let diam = random(60, 300);
		let xspeed = random(-2, 2);
		let yspeed = random(-2, 2);
		let brightness = 100;
		let emoji = random(emojis);
		balls[i] = new Ball( x, y, diam, xspeed, yspeed, brightness, emoji);
	}


}

function mousePressed() {
	for (let i = 0; i < balls.length; i++){
		if (balls[i].contains(mouseX, mouseY)){
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
		if (balls[i].diam <= 0){
			balls.splice(i, 1);
		}

		//Boolean is false till..
		let overlapping = false;

		for (let j = 0; j < balls.length; j++){
			//... one of these occurs
			// If they are not the same object AND the objecti intersects objectj o objecti contains mouse
			if(balls[i] !== balls[j] && balls[i].intersects(balls[j]) || balls[i].contains(mouseX, mouseY)){
			//... while it lasts boolean (overlapping) will be true
			overlapping = true
			}
		}

		if (overlapping){
			balls[i].changeEmoji();

		} else {

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

	constructor(x, y, diam, xspeed, yspeed, brightness, img) {
		this.x = x;
		this.y = y;
		this.diam = diam;
		this.xspeed = xspeed;
		this.yspeed = yspeed;
		this.brightness = brightness;
		this.emoji = img
	}

	 display() {
		// var h = map(this.x, 0, windowWidth-this.diam, 160, 310);
 		// var s = map(this.y, 0, windowHeight, 10, 90);
		//
		// fill(h, s, this.brightness, this.alpha);
		// noStroke(0);
		// ellipse(this.x, this.y, this.diam, this.diam);
		image(this.emoji, this.x, this.y, this.diam, this.diam);
	}

	 move(){
		this.x += this.xspeed;
		this.y += this.yspeed;
	}

	changeEmoji() {
		this.emoji = random(emojis);
	}
	//To take one object. and check if it is intersects with an (other)

	bumb(){
		this.xspeed *= -1;
		bumpSound.play();
		this.diam = this.diam - random(30);
		this.yspeed *= -1;
		bumpSound.play();
		this.diam = this.diam - random(30);
		//Idiotic alternative
	}

	intersects(other){
		let d = dist(this.x, this.y, other.x, other.y);

		// Return the truth of these statement instead of the larger alternative.

		return (d < this.diam/2 + other.diam/2);

		// if ( d < this.diam/2 + other.diam/2){
		// 	return true;
		// } else {
		// 	return false;
		// }
	}

	//To take one mouse (px, py) and check it are inside an this.object
	contains(px,py){
		let d = dist(px, py, this.x, this.y)
		//circle
		if (d < this.diam/2){
		// rectangle
		// if (px > this.x && px < this.x + this.diam && py < this.y && py < this.y + this.diam){
			return true;
		} else {
			return false;
		}
	}

	 checkBorders(){
		if (this.x >= (windowWidth - this.diam/2)){
			this.xspeed *= -1;
			bumpSound.play();
			// this.diam = this.diam - random(10, 30);
		} if ( this.x <= (0 + this.diam/2)){
			this.xspeed *= -1;
			bumpSound.play();
			// this.diam = this.diam - random(10, 30);
		}

		if (this.y >= (windowHeight - this.diam/2)){
			this.yspeed *= -1;
			bumpSound.play();
			// this.diam = this.diam - random(10, 30);
		} if (this.y <= (0 + this.diam/2)){
			this.yspeed *= -1;
			bumpSound.play();
			// this.diam = this.diam - random(10, 30);
		}
	}
}
