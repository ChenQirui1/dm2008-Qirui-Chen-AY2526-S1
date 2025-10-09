// DM2008 — Activity 3b
// (One Function Wonder, 15 min)

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  frameRate(10);
}

function draw() {
  background(220);

  // TODO 1:
  // Define a function that draws something (a shape or group of shapes).
  // It should take at least one parameter (e.g., position, size, or color).
  

  // TODO 2:
  // Call your function multiple times with different parameter values.
  // myShape(100, 200, 50);
  // myShape(300, 200, 80);
  
  rectThing(0, 45, 100)
  rectThing(10, 90, 100)
  

  // TODO 3:
  // (Challenge) Call your function inside a for loop
  // to create a repeating pattern or variation.
  for (j = 0; j < 5 ; j++) {
    for (i = 0;i < random(30,100);i++) {
      rectThing(i*random(-10,10), i*random(-10,10), random(90), i*1.618)
    }
  }

//   for (i = 0;i < random(10,100);i++) {
//     rectThing(i*2, i*3, 30, i*1.618)
//   }
//   for (i = 0;i < random(20,100);i++) {
//     rectThing(i*-1, i*-3, 20, i*1.618)
//   }
  
  // for (i = 0;i < random(20,100);i++) {
  //   rectThing(i*1, i*-3, 64, i*1.618)
  // }
  
//   for (i = 0;i < 20;i++) {
//     pillar(random(-10,10),random(-10,10),20,50,30);
//   }
  
  
}

function rectThing(offsetX, offsetY, rotation, size, c) {
  push();
  translate(width/2,height/2);
  rotate(radians(rotation));
  rect(offsetX,offsetY,size,size);
  pop();
}

function pillar(offsetX, offsetY, sizeSmall, sizeLarge, rotation) {
   for (i = 0;i < random(sizeSmall,sizeLarge);i++) {
    rectThing(i*offsetX, i*offsetX, rotation, i*1.618);
  }
}

// Example starter function:
// function myShape(x, y, s) {
//   ellipse(x, y, s, s);
// }