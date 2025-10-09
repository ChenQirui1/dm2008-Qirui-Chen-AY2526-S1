// DDM2008
// Activity 1a

// Run the sketch, then click on the preview to enable keyboard
// Use the 'Option' ('Alt' on Windows) key to view or hide the grid
// Use the 'Shift' key to change overlays between black & white
// Write the code for your creature in the space provided

let osc;

function setup() {
  createCanvas(400, 400);
  osc = new p5.Oscillator(100,'sine');
  frameRate(10);
}

function draw() {
  background(240);
  
  osc.start();
  
  console.log(osc)
  
  // YOUR CODE HERE
  
  // rect(0,0,25,25)
  // noStroke();
  fill(0);
  
  catEars(40,40);
  catEars(180,30);
  
  fill(0);
  ellipse(180,225,300,200);
  
  
  //eyes
  fill(255, 255, 0);
  ellipse(100,200,100,70);
  ellipse(210,200,100,70);
  
  fill(0,0,0);
  ellipse(100,200,40,68);
  ellipse(210,200,40,68);
  
  fill(212, 95, 87);
  ellipse(170,270,50,30);
  
  
  
  helperGrid(); // do not edit or remove this line
}


function catEars(offsetX, offsetY) {
  rect(offsetX+0,offsetY+50,25,25)
  rect(offsetX+25,offsetY+25,25,25)
  rect(offsetX+50,offsetY+0,25,25)
  
  rect(offsetX+75,offsetY+25,25,25)
  rect(offsetX+100,offsetY+50,25,25)
  
  noStroke()
  fill(0)
}