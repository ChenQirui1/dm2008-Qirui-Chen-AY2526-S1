// DDM2008 — Activity 2b
// (Pattern Making, 40 min)

let sizeLimit = 40;

let gap = 50;

let shapes;

let toggleColor;

function setup() {
  createCanvas(400, 400);
  frameRate(10);
  rectMode(CENTER);
}

function draw() {
  // background(240);
  background(0, 50);
  noStroke();

  for (let i = 0; i < width; i += gap) {
    for (let j = 0; j < height; j += gap) {
      //offset to ensure that it fits in screen
      let offset = gap / 2;
      let offsettedI = i + gap / 2;
      let offsettedJ = j + gap / 2;
      
      if (toggleColor) {
        fill(random(255), random(255), random(255));
      } else {
        stroke(255);
        strokeWeight(random(4));
        noFill();
      }

      //check if mouse click is in the range of the circle
      if (i % 100 == 0) {
        ellipse(offsettedI, offsettedJ, random(sizeLimit));
      } else {
        rect(offsettedI, offsettedJ, random(sizeLimit));
      }
    }

    // TODO: add an if() condition to alternate shape, size, or color
    // (hint: use % modulo to alternate every other shape)
  }

  // TODO: add one interaction (mouse or key) to change the rule
  // (hint: try changing fill() or size when mouseIsPressed)
}

function keyPressed() {
  switch (key) {
    case '1': 
      console.log("1 pressed");
      toggleColor = false;
      break;
      
    case '2':
      console.log("2 pressed");
      toggleColor = true;
      break;
  }
}
