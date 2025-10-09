// DM2008 — Activity 3a
// (Array Sampler, 25 min)

// 1. Create an array of colors (or other values)
//    You can make more than one array if you'd like
let palette = ["#f06449", "#009988", "#3c78d8", "#ffeb3b"];

// 2. A variable to track the current index
// let currentIndex = 0;

let radius = 60;

function setup() {
  createCanvas(400, 400);
  noStroke();
  frameRate(10);
}

function draw() {
  background(220);

  // 3. Use the array value at currentIndex
  // fill(palette[currentIndex]);
  
  if (mouseIsPressed) {
    palette.splice(0,1);
    palette.push(color(random(255),random(255),random(255)));
  }
  
  for (i=0;i < palette.length; i++) {
    fill(palette[i]);
    ellipse(width/2, (radius) + i*40, radius);
    // currentIndex += 1;
  }
  
}

// 4. Change the index when a key is pressed
function keyPressed() {
  // Advance to the next item
  // currentIndex++;
  // Reset to 0 when we reach the end
  // if (currentIndex >= palette.length) {
    // currentIndex = 0;
  // }
  // Log in the console to check
  // console.log("Current index:", currentIndex, "→", palette[currentIndex]);
  
  if (key == '+') {
    // add a new circle
    palette.push(color(random(255),random(255),random(255)));
  }
  else if (key == '-') {
    // remove a circle
    console.log("removed: ", palette[palette.length - 1])
    palette.pop();
  }
  else if (key == '_') {
    // remove first circle
    console.log("removed: ", palette[palette.length - 1])
    palette.splice(0,1);
  }
  
}

// function mousePressed() {
//   palette.splice(0,1);
//   palette.push(color(random(255),random(255),random(255)));
// }

/* 
TODOs for students:
1. Replace colors with your own data (positions, text, sizes, etc).
2. Try mousePressed() instead of keyPressed().
3. Use push() to add new items, or splice() to remove them, then check how the sketch adapts.
4. Try looping through an array to visualize all the items within it instead of accessing one item at a time.
*/