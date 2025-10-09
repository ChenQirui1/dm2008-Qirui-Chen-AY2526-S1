// DDM2008 — Activity 2a
// (Mode Switch, 20 min)

let x = 0;        // ellipse x-position
let size = 50;    // ellipse size (you can change this in your if/else)
let bgColor;      // background color set by switch(key)

function setup() {
  createCanvas(400, 400);
  bgColor = color(220);
  rectMode(CENTER);
  frameRate(120);
}

function draw() {
  background(bgColor);
  
  fill(0);
  if (mouseX < width/2) {
    text('This is not a circle.', height/ 2, 50);
    textAlign(CENTER);
    textSize(20);
    ellipse(x, height / 2, size);
  }
  else if (mouseX > width/2) {
    text('This is not a square.', height/ 2, 50);
    textAlign(CENTER);
    rect(x,height / 2,size,size)
  }
  
  x += 2;
  // Wrap around when it exits the right edge
  if (x > width + size / 2) {
    x = 0;
  }
  
  
  
}


// --- Mode switching with number keys: 1, 2, 3 ---
function keyPressed() {
  switch (key) {
    case '1':
      bgColor = color(200, 100, 100); // red
      size = 100;
      break;
    case '2':
      bgColor = color(100, 200, 100); // green
       size = 150;
      break;
    case '3':
      bgColor = color(100, 100, 200); // blue
      size = 200;
      break;
    default:
      bgColor = color(220);           // grey
    
  }
  
  if (key == 's') {
    //recording gif
    console.log('record gif');
    saveGif('mySketch', 5);
  }
  
}


