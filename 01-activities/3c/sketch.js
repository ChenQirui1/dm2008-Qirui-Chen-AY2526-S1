// DM2008 — Activity 3b
// (Painting App, 50 min)

// 1) Palette + size
const palette = ["#f06449", "#009988", "#3c78d8", "#eeeeee"];
let colorIndex = 0;
let sizeVal = 20;

// 2) Brush registry (array of functions)
const brushes = [brushCircle, brushRandom, brushText];
let currentBrush = 0; // 0, 1, or 2

function setup() {
  createCanvas(600, 600);
  background(240);
  rectMode(CENTER);

  // button1 = createButton('normal');
  // button1.position (0, 0)
  // button1.mousePressed(setBrush(0));
  // button2 = createButton('pulsating');
  // button2.position (100, 0)
  // button2.mousePressed(setBrush(1));
  // button3 = createButton('random');
  // button3.position (200, 0)
}

function draw() {
  // paint only while mouse is held
  if (mouseIsPressed) {
    const col = palette[colorIndex];
    // call the selected brush function
    brushes[currentBrush](mouseX, mouseY, col, sizeVal);
  }

  // if (pulseBrushPalette) {
  //   console.log(pulseBrushPalette);
  //   pulseBrushPalette.splice(0,1);
  //   pulseBrushPalette.push(color(random(255),random(255),random(255)));
  // }
}

// 3) Brush functions (students can customize/extend)
function brushCircle(x, y, c, s) {
  noStroke();
  fill(c);
  ellipse(x, y, s);
}

function brushPulse(x, y, c, s) {
  noStroke();
  ellipse(x, y, s);
  let col = color(random(255), random(255), random(255));
  fill(col);

  pulseBrushPalette.push(c);
}

function brushRandom(x, y, c, s) {
  noStroke();
  fill(color(random(255), random(255), random(255)));

  ellipse(x, y, s);
}

function brushSquare(x, y, c, s) {
  push();
  translate(x, y);
  noStroke();
  fill(c);
  rect(0, 0, s, s);
  pop();
}

let textList = ["hello", "world", "diu", "why"];
let textCount = 0;

function brushText(x, y, c, s) {
  text(textList[textCount], x, y);

  if (textCount < textList.length) {
    textCount += 1;
  } else {
    textCount = 0;
  }

  stroke(c);
}

function brushStreak(x, y, c, s) {
  stroke(c);
  strokeWeight(max(2, s / 8));
  point(x, y);
}

// 4) Brush UI: select brush, cycle color, change size, clear
function keyPressed() {
  switch (key) {
    case "1":
      currentBrush = 0; // circle
      break;
    case "2":
      currentBrush = 1; // square
      break;
    case "3":
      currentBrush = 2; // streak
      break;
  }
  if (key == "C" || key == "c") {
    colorIndex = (colorIndex + 1) % palette.length; // cycle color
  }
  if (key == "+" || key == "=") {
    sizeVal += 4;
  }
  if (key == "-" || key == "_") {
    sizeVal = max(4, sizeVal - 4);
  }
  if (key == "X" || key == "x") {
    background(240); // clear canvas
  }
  if (key == "E" || key == "e") {
    noStroke();
    fill(240);
    rect(mouseX, mouseY, 200, 200); // clear canvas
  }

  // TODO: add an 'E' (eraser) mode by painting with background color
  // e.g., if eraserMode, use color(240) instead of palette[colorIndex]
}
