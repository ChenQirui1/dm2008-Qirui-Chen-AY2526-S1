let sideTextGraphics;
let topBottomTextGraphics;
let streams = [];
let verticalStreams = [];
let symbolSize = 24;
let myFont;
let floorStreams = [];
let footstone;

// top graphics variables
let backgroundWords = [];
let textPositions = [];
let allImageObjects = [];
let displayStack = [];
let currentImageIndex = 0;
let hereLies;
let fontSize = 72;
let padding = 20;
let maxStackSize = 5;

// helper function to create CORS proxy url
function createProxyUrl(originalUrl) {
  return (
    "https://api.codetabs.com/v1/proxy?quest=" + encodeURIComponent(originalUrl)
  );
}

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

// initial text content
let textContent = [
  {
    title:
      "\n04/09: SPECIAL SCREENING of XIME with FILMMAKER SANA NA N\u2019HADA\u00a0 | Center for Place, Culture and Politics\t",
    paragraphs: [
      "",
      "To take advantage of pioneering Bissau-Guinean filmmaker Sana Na N\u2019Hada\u2019s presence in NYC, we will be hosting him for a screening of his first feature film, XIME. This strikingly beautiful work depicts the traditional region of Xime as it at first slowly, and then suddenly, is overcome by the necessity to participate in the anti-colonialist struggle for independence in Guinea-Bissau.",
      "Educated at the Cuban Film Institute (ICAIC), N\u2019Hada returned to Guinea-Bissau in time to co-direct the celebrated short film, THE RETURN OF CABRAL (1976). He wrote the screenplay for Filipa Cesar\u2019s feature SPILL REEL (2017), which cleverly documents the digitization of the fragile revolutionary cinematic archive of Guinea-Bissau, and also collaborated with Chris Marker on SANS SOLEIL.",
      "The semi-autobiographical XIME focuses on two brothers: Raul, a revolutionary on the run, and the younger Bedan, subject to a host of patriarchal/spiritually quietist influences, including his father, a Catholic priest, and the village elders. Alternating between the momentum of a manhunt and the rhythms of everyday existence in a rural village, the film includes a funny and yet haunting initiation rite in which the young men (including Bedan) must don female clothing, in an apparent attempt to \u2018tame\u2019 their youthful, sometimes violent spirits. The film\u2019s climax hinges on another transformation: will the villagers renounce their deeply ingrained non-violent traditions in favor of revolutionary militancy?",
      "",
      "This screening and Sana Na N\u2019Hada\u2019s appearance have been made possible thanks to the good graces of the Center for Place, Culture and Politics, Graduate Center, CUNY. N\u2019Hada is a featured speaker at theMobilizations and Migrations Conference(April 12-13) at the Graduate Center and The People\u2019s Forum.",
      "This entry is licensed under a Creative CommonsAttribution-NonCommercial-ShareAlike 4.0 Internationallicense.",
      "Email us atcommonshelpsite@gmail.comso we can respond to your questions and requests. Please email from your CUNY email address if possible. Or visit our help site for more information:",
    ],
    tables: [],
    images: [
      "https://web.archive.org/web/20240709082302im_/https://cpcp.commons.gc.cuny.edu/wp-content/blogs.dir/1109/files/2018/11/cropped-logo_CPCP6.jpg",
      "https://web.archive.org/web/20240709082302im_/https://cpcp.commons.gc.cuny.edu/wp-content/blogs.dir/1109/files/2019/03/xime2.jpg",
      "https://web.archive.org/web/20240709082302im_/https://mail.google.com/mail/u/0?ui=2&ik=86e92cbade&attid=0.1.1&permmsgid=msg-f:1629117429388456381&th=169bc9abac18b1bd&view=fimg&sz=s0-l75-ft&attbid=ANGjdJ_QvMXWnkuppSxyWkLz9_9XVjjS0yZiYuNS4B-ZAk29FaqoFOO3PQ2LVWyob50MzYoXmPcd9VhDIyPpQyhVj627Qf7wZXLMgFzfDxbIk6AYgDi5RVhiQBMG36c&disp=emb",
      "https://web.archive.org/web/20240709082302im_/https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
      "https://web.archive.org/web/20240709082302im_/https://pcp.gc.cuny.edu/wp-content/plugins/cookies-for-comments/css.php?k=56432b1df3e67e3f4dcdbad943087b&o=i&t=1098985747",
      "https://web.archive.org/web/20240709082302im_/https://commons.gc.cuny.edu/wp-content/themes/bp-nelo/assets/img/cac-logo.png",
      "https://web.archive.org/web/20240709082302im_/https://commons.gc.cuny.edu/wp-content/mu-plugins/assets/img/footer-logo-cuny.png",
    ],
  },
];

function preload() {
  myFont = loadFont("assets/FragmentMono-Regular.ttf");

  for (let item of textContent) {
    for (let imgUrl of item.images) {
      let proxiedUrl = createProxyUrl(imgUrl);
      let x = random(0, windowWidth - 200);
      let y = random(0, windowHeight - 200);
      let size = random(80, 250);
      let imgObj = new ImageObject(proxiedUrl, x, y, size, size);
      imgObj.preloadImage();
      allImageObjects.push(imgObj);
    }
  }
}

function setup() {
  socket = new WebSocket("ws://localhost:6789");

  // Define event handlers
  socket.onopen = function (event) {
    console.log("Connected to server");
    socket.send("Hello from p5.js!");
  };

  socket.onmessage = function (event) {
    console.log("Received:", event.data);
    // Handle incoming data
    let data = JSON.parse(event.data);
    textContent = [data];
    console.log("textContent:", textContent);

    // extract words and recalculate positions
    extractWords();
    calculateTextPositions();

    reloadImages();
  };

  socket.onerror = function (error) {
    console.error("WebSocket Error:", error);
  };

  frameRate(30);
  setAttributes("alpha", true);
  createCanvas(windowWidth, windowHeight, WEBGL);

  textFont(myFont);

  sideTextGraphics = createGraphics(2400, 200);

  // Side horizontal streams
  let numRows = floor(200 / symbolSize);
  for (let i = 0; i < numRows; i++) {
    streams.push(new Line(i, 2400));
  }

  // text floor of the textsymbols
  textSize(symbolSize);
  textAlign(LEFT, TOP);

  //top graphics
  topBottomTextGraphics = createGraphics(1600, 1200);

  extractWords();
  calculateTextPositions();
  initializeDisplayStack();

  hereLies = new HereLies();

  let numFloorRows = floor(2 * (height / symbolSize));
  for (let i = 0; i < numFloorRows; i++) {
    floorStreams.push(new Line(i, windowWidth)); // Pass windowWidth
  }

  cube = new Footstone(400, 50, 200, sideTextGraphics, topBottomTextGraphics);
}

function draw() {
  background(0);

  updateImageStack();

  displayImages();
  displayStaticText();
  hereLies.show();

  updateSideTexture();

  updateTopBottomTexture();

  orbitControl();

  rotateX(-0.9);

  fill(0, 0, 0, 0);

  textureMode(NORMAL);
  textureWrap(REPEAT);

  cube.update();
  cube.display();

  push();
  rotateX(1.6);
  translate(-width / 2, -1200, -100);

  for (let stream of floorStreams) {
    stream.showDirect();
    stream.updateDirect(windowWidth);
  }

  pop();
}

function updateSideTexture() {
  sideTextGraphics.clear();
  sideTextGraphics.background(0);

  //check font
  if (myFont) {
    sideTextGraphics.textFont(myFont);
  }

  sideTextGraphics.textSize(symbolSize);
  sideTextGraphics.textAlign(LEFT, TOP);

  for (let stream of streams) {
    renderStreamToGraphics(stream, sideTextGraphics, 2400);
    updateStream(stream, 2400);
  }
}

function updateTopBottomTexture() {
  topBottomTextGraphics.clear();
  topBottomTextGraphics.background(0);

  displayImages();
  displayStaticText();
  hereLies.show();
}

/* FROM GPT */
// Render a stream to a graphics buffer
function renderStreamToGraphics(stream, graphics, maxWidth) {
  for (let symbol of stream.symbols) {
    if (symbol.first) {
      graphics.fill(200, 255, 255);
    } else {
      graphics.fill(0, 255, 200, 200);
    }
    graphics.noStroke();
    graphics.text(String(symbol.value), symbol.x, symbol.y);
    symbol.first = false;
  }
}

// Update stream symbols
function updateStream(stream, maxWidth) {
  for (let symbol of stream.symbols) {
    symbol.x += symbol.speed;

    if (symbol.x > maxWidth) {
      symbol.x = -100;
    }

    if (frameCount % symbol.switchInterval === 0) {
      symbol.value = symbol.getRandomCode();
    }
  }
}
/* END */

function initializeDisplayStack() {
  for (let i = 0; i < min(maxStackSize, allImageObjects.length); i++) {
    if (allImageObjects[i].loaded) {
      displayStack.push(allImageObjects[i]);
    }
  }
  currentImageIndex = displayStack.length;
}

function updateImageStack() {
  if (allImageObjects.length > maxStackSize) {
    if (displayStack.length >= maxStackSize) {
      displayStack.shift();
    }

    let nextImage = allImageObjects[currentImageIndex % allImageObjects.length];
    nextImage.x = random(0, topBottomTextGraphics.width - nextImage.w);
    nextImage.y = random(0, topBottomTextGraphics.height - nextImage.h);
    displayStack.push(nextImage);
    currentImageIndex++;
  }
}

function extractWords() {
  backgroundWords = [];

  for (let item of textContent) {
    for (let paragraph of item.paragraphs) {
      let words = paragraph.split(/\s+/).filter((w) => w.length > 0);
      backgroundWords.push(...words);
    }
  }
}

function calculateTextPositions() {
  textPositions = [];
  topBottomTextGraphics.textSize(fontSize);
  topBottomTextGraphics.textAlign(LEFT, TOP);

  let x = padding;
  let y = padding;
  let lineHeight = fontSize * 1.5;
  let maxWidth = topBottomTextGraphics.width - padding * 2;
  let wordIndex = 0;

  while (
    y + lineHeight < topBottomTextGraphics.height - padding &&
    wordIndex < backgroundWords.length * 3
  ) {
    let word = backgroundWords[wordIndex % backgroundWords.length];
    let wordWidth = topBottomTextGraphics.textWidth(word + " ");

    if (x + wordWidth > maxWidth + padding) {
      x = padding;
      y += lineHeight;
      if (y + lineHeight >= topBottomTextGraphics.height - padding) {
        break;
      }
    }

    textPositions.push({
      word: word,
      x: x,
      y: y,
      width: wordWidth,
      height: lineHeight,
    });

    x += wordWidth;
    wordIndex++;
  }
}

function displayImages() {
  for (let imgObj of displayStack) {
    imgObj.show(topBottomTextGraphics); // Pass graphics buffer
  }
}

function displayStaticText() {
  topBottomTextGraphics.textSize(fontSize);
  topBottomTextGraphics.textAlign(LEFT, TOP);

  for (let item of textPositions) {
    if (random() < 0.15) {
      topBottomTextGraphics.fill(0, 255, 200, 200);
      topBottomTextGraphics.noStroke();
      topBottomTextGraphics.rect(
        item.x,
        item.y,
        item.width - 5,
        item.height * 0.8
      );
      topBottomTextGraphics.fill(0);
      topBottomTextGraphics.text(item.word, item.x, item.y);
    } else {
      topBottomTextGraphics.fill(0, 255, 200, 200);
      topBottomTextGraphics.text(item.word, item.x, item.y);
    }
  }
}

function setFontSize(newSize) {
  fontSize = newSize;
  calculateTextPositions();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // Recreate graphics buffer with new size
  topBottomTextGraphics = createGraphics(windowWidth, windowHeight);

  calculateTextPositions();

  for (let imgObj of displayStack) {
    imgObj.x = random(0, topBottomTextGraphics.width - imgObj.w);
    imgObj.y = random(0, topBottomTextGraphics.height - imgObj.h);
  }

  hereLies = new HereLies();
}

class HereLies {
  constructor() {
    this.phrases = ["HERE", "LIES"];
    this.hereX = random(0, topBottomTextGraphics.width / 2);
    this.hereY = random(0, topBottomTextGraphics.height / 2);
    this.liesX = random(
      topBottomTextGraphics.width / 2,
      topBottomTextGraphics.width
    );
    this.liesY = random(
      topBottomTextGraphics.height / 2,
      topBottomTextGraphics.height
    );

    //fixed positions
    this.hereX = 200;
    this.hereY = 200;
    this.liesX = 1400;
    this.liesY = 800;
  }

  show() {
    topBottomTextGraphics.push();
    topBottomTextGraphics.textStyle(BOLD);
    topBottomTextGraphics.textSize(150);

    topBottomTextGraphics.textAlign(LEFT, CENTER);
    topBottomTextGraphics.fill(0, 255, 200, 255);
    topBottomTextGraphics.text(this.phrases[0], this.hereX, this.hereY);

    topBottomTextGraphics.textAlign(RIGHT, CENTER);
    topBottomTextGraphics.text(this.phrases[1], this.liesX, this.liesY);
    topBottomTextGraphics.pop();
  }
}
class Text {
  constructor(content, x, y) {
    this.content = content;
    this.x = x;
    this.y = y;
  }

  show(graphics) {
    graphics.textAlign(CENTER, CENTER);
    graphics.fill(200, 255, 255);
    graphics.text(this.content, this.x, this.y);
  }
}

class Highlight extends Text {
  constructor(content, x, y) {
    super(content, x, y);
  }

  show(graphics) {
    graphics.push();
    let w = graphics.textWidth(this.content);
    let h = graphics.textAscent() + graphics.textDescent();

    graphics.fill(255, 255, 0, 150);
    graphics.noStroke();
    graphics.rectMode(CENTER);
    graphics.rect(this.x, this.y, w + 10, h + 5);

    graphics.fill(0);
    graphics.textAlign(CENTER, CENTER);
    graphics.text(this.content, this.x, this.y);
    graphics.pop();
  }
}

class Normal extends Text {
  constructor(content, x, y) {
    super(content, x, y);
  }

  show(graphics) {
    graphics.fill(0, 255, 200);
    graphics.textStyle(NORMAL);
    super.show(graphics);
  }
}

class Bold extends Text {
  constructor(content, x, y) {
    super(content, x, y);
  }

  show(graphics) {
    graphics.fill(0, 255, 200);
    graphics.textStyle(BOLD);
    super.show(graphics);
  }
}

class ImageObject {
  constructor(img_url, x, y, w, h) {
    this.img_url = img_url;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = null;
    this.alpha = random(50, 150);
    this.loaded = false;
  }

  preloadImage() {
    this.img = loadImage(
      this.img_url,
      () => {
        this.loaded = true;
        console.log("Image loaded successfully");
      },
      () => {
        console.log("Failed to load image");
        this.loaded = false;
      }
    );
  }

  show(graphics) {
    if (this.img && this.loaded && this.img.width > 0) {
      graphics.push();
      graphics.tint(200, 255, 255, this.alpha);
      graphics.image(this.img, this.x, this.y, this.w, this.h);
      graphics.pop();
    }
  }
}
function reloadImages() {
  // clear images
  allImageObjects = [];
  displayStack = [];
  currentImageIndex = 0;

  //get new ones
  for (let item of textContent) {
    if (item.images) {
      for (let imgUrl of item.images) {
        let proxiedUrl = createProxyUrl(imgUrl);
        let x = random(0, topBottomTextGraphics.width - 200);
        let y = random(0, topBottomTextGraphics.height - 200);
        let size = random(80, 250);
        let imgObj = new ImageObject(proxiedUrl, x, y, size, size);
        imgObj.preloadImage();
        allImageObjects.push(imgObj);
      }
    }
  }

  initializeDisplayStack();
}
