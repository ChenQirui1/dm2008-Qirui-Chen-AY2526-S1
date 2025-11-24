let streams = [];
let symbolSize = 14;
let textLayer; // 2D buffer - no font loading needed
let myFont;

const codeSnippets = [
  "<html>",
  "</html>",
  "<body>",
  "</body>",
  "<div>",
  "</div>",
  '<a href="">',
  '<img src="">',
  "<table>",
  "</table>",
  "function()",
  "const",
  "let",
  "var",
  "return",
  "cellspacing=0",
  "width=100%",
  "bgcolor=#",
  "<td>",
  "</td>",
  "<tr>",
  "</tr>",
  "<p>",
  "</p>",
  'onclick=""',
  'class=""',
  'id=""',
  'style=""',
  "margin:0",
  "padding:0",
  "font-size:",
  "color:#",
  "http://",
  "www.",
  ".com",
  ".html",
  "&nbsp;",
  "border=0",
  "align=",
  "valign=",
  "colspan=",
  "javascript:",
  "document.",
  "window.",
  "console.log",
  "{}",
  "[]",
  "()",
  "!=",
  "==",
  "===",
  "&&",
  "||",
];
function preload() {
  myFont = loadFont("assets/FragmentMono-Regular.ttf");
}

function setup() {
  console.log("Setup started");
  createCanvas(windowWidth, windowHeight, WEBGL);

  textFont(myFont);

  textLayer = createGraphics(windowWidth, windowHeight);
  textLayer.textSize(symbolSize);
  textLayer.textAlign(LEFT, TOP);

  let numRows = floor(windowHeight / symbolSize);
  numRows = min(numRows, 50); // 50 rows test

  for (let i = 0; i < numRows; i++) {
    streams.push(new Line(i));
  }
}

function draw() {
  background(0);

  updateTextLayer();

  push();
  translate(0, 0, -200);
  rotateX(0.4);
  texture(textLayer);
  plane(windowWidth, windowHeight);
  pop();
}

// offscreen buffer
function updateTextLayer() {
  textLayer.clear();
  textLayer.background(0);

  // batching
  for (let stream of streams) {
    stream.update();
    stream.show(textLayer);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  textLayer = createGraphics(windowWidth, windowHeight);
  textLayer.textSize(symbolSize);
  textLayer.textAlign(LEFT, TOP);

  streams = [];
  let numRows = floor(windowHeight / symbolSize);
  numRows = min(numRows, 50);

  for (let i = 0; i < numRows; i++) {
    streams.push(new Line(i));
  }
}
