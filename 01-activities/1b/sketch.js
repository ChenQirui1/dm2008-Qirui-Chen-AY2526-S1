// DM2008
// Activity 1b (Ryoji Ikeda)

let x;
let w;

let xCircle;
let widthCircle

function setup() {
  createCanvas(800, 800);
  // colorMode(HSB);

  background(0);
  frameRate(30);
  noStroke();
  fill(0);
}

function draw() {
  background(0, 25);
  
  x = random(width);
  w = random(0.5, 1);
  fill(255)
  rect(x,0, w, random(height));
 
  
  x = random(width);
  w = random(5,50);
  // rect(x, height/2, w, random(height/2));
  
  
  fill(random(255),random(255),random(255));
  if (frameCount % 7 == 0) {
      ellipse(x, random(0, height), w, w);
  }

}

function keyPressed() {
  saveCanvas("activity1b-image", "jpg");
  
}

function mousePressed() {
  // ellipse(mouseX,mouseY, 100, 100);
  fill(255)
  rect(0, mouseY, width, random(50))
  
  rect(mouseX,0 , random(50), height)
}