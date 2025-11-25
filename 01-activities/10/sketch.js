// DDM2008 — Activity 2b
// (Pattern Making, 40 min)

let sizeLimit = 40;

let gap = 50;

let shapes;

let toggleColor;

// variables for UI controls
let uiSliderBar, uiButton, uiSelectColour, uiSelectShape;

//label for slider
let uiSliderLabel;

let controlPanel;
let uiSlider;

function setup() {
  createCanvas(400, 400);
  frameRate(10);
  rectMode(CENTER);

  // Create a control panel to group UI
  controlPanel = createDiv();
  controlPanel.position(10, 10);
  // use class instead of style
  controlPanel.class("control-panel");

  //create div for the slider and its label
  uiSlider = createDiv();
  uiSlider.parent(controlPanel);
  uiSlider.class("slider-container");

  // Create the UI elements
  uiSliderLabel = createSpan();
  uiSliderLabel.parent(uiSlider);
  uiSliderBar = createSlider(1, 10, 5, 1);
  uiSliderBar.parent(uiSlider);

  uiSelectColour = createSelect();
  uiSelectColour.option("Colour");
  uiSelectColour.option("Monochrome");
  uiSelectColour.class("ui-select");
  uiSelectColour.parent(controlPanel);

  uiSelectShape = createSelect();
  uiSelectShape.option("Circle");
  uiSelectShape.option("Square");
  uiSelectShape.class("ui-select");
  uiSelectShape.parent(controlPanel);
}

function draw() {
  background(0, 50);
  noStroke();

  uiSliderLabel.html("Grid size: " + uiSliderBar.value());

  // color mode from dropdown
  toggleColor = uiSelectColour.value() == "Colour";

  //get shape type from option
  shapeType = uiSelectShape.value();

  let num = uiSliderBar.value();
  let gap = 10; // extra gap between shapes
  let maxSize = (width - gap * (num + 1)) / num; // Adjusted for gaps
  let offset = maxSize / 2; // offset from edges

  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      let x = offset + gap + i * (maxSize + gap);
      let y = offset + gap + j * (maxSize + gap);
      // generate shape but random size
      let shape = new Shape(x, y, random(10, maxSize), shapeType);
      shape.display(toggleColor);
    }
  }
}

// shape to be of two types, circle or square
class Shape {
  constructor(x, y, size, type) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = type;
  }

  display(useColour) {
    if (useColour) {
      fill(random(255), random(255), random(255));
      noStroke();
    } else {
      noFill();
      stroke(255);
      strokeWeight(2);
    }

    if (this.type === "Circle") {
      ellipse(this.x, this.y, this.size);
    } else {
      rect(this.x, this.y, this.size, this.size);
    }
  }
}
// class Shape {
//   constructor(x, y, size, type) {
//     this.x = x;
//     this.y = y;
//     this.size = size;
//     this.type = type;
//   }

//   display() {
//     ellipse(this.x, this.y, this.size);
//   }
// }

// // function keyPressed() {
// //   switch (key) {
// //     case "1":
// //       console.log("1 pressed");
// //       toggleColor = false;
// //       break;

// //     case "2":
// //       console.log("2 pressed");
// //       toggleColor = true;
// //       break;
// //   }
// // }
// let sizeLimit = 40;
// let shapes;
// let toggleColor;
// let uiSlider, uiButton, uiSelect, controlPanel;

// function setup() {
//   createCanvas(400, 400);
//   frameRate(10);
//   rectMode(CENTER);
//   controlPanel = createDiv();
//   controlPanel.position(10, 10);
//   controlPanel.class("control-panel");
//   uiSlider = createSlider(1, 10, 5, 1);
//   uiSlider.class("ui-slider");
//   uiButton = createButton("Button Label");
//   uiButton.class("ui-button");
//   uiSelect = createSelect();
//   uiSelect.option("Colour");
//   uiSelect.option("Monochrome");
//   uiSelect.class("ui-select");
//   uiSlider.parent(controlPanel);
//   uiButton.parent(controlPanel);
//   uiSelect.parent(controlPanel);
// }

// function draw() {
//   background(0, 50);
//   noStroke();

//   // color mode from dropdown
//   toggleColor = uiSelect.value() == "Colour";

//   let num = uiSlider.value();
//   let gap = 10; // extra gap between shapes
//   let size = (width - gap * (num + 1)) / num; // Adjusted for gaps

//   for (let i = 0; i < num; i++) {
//     for (let j = 0; j < num; j++) {
//       let x = gap + i * (size + gap);
//       let y = gap + j * (size + gap);
//       let shapeType = random(1) < 0.5 ? "circle" : "square";
//       let shape = new Shape(x, y, size, shapeType);
//       shape.display(toggleColor);
//     }
//   }
// }

// class Shape {
//   constructor(x, y, size, type) {
//     this.x = x;
//     this.y = y;
//     this.size = size;
//     this.type = type;
//   }

//   display(useColor) {
//     if (useColor) {
//       fill(random(255), random(255), random(255));
//       noStroke();
//     } else {
//       noFill();
//       stroke(255);
//       strokeWeight(2);
//     }

//     if (this.type === "circle") {
//       ellipse(this.x, this.y, this.size);
//     } else {
//       rect(this.x, this.y, this.size, this.size);
//     }
//   }
// }

function keyPressed() {
  if (key === 's' || key === 'S') {
    // Save animated GIF (5 seconds)
    console.log('Recording GIF...');
    saveGif('activity10-grid', 5);
  }
  if (key === 'p' || key === 'P') {
    // Save static image
    saveCanvas('activity10-grid', 'jpg');
  }
}
