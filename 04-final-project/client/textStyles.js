let message = "highlight text";

let textContent = [
  {
    title:
      "Polyostotic fibrous dysplasia definition - Medical Dictionary definitions of popular medical terms easily defined on MedTerms",
    paragraphs: [
      "Sexual Health",
      "Surprising Health Benefits of Sex",
      "View Slideshow»",
      "Picture of Psoriasis",
      "A reddish, scaly rash often located over the surfaces of the elbows, knees, scalp, and around or in the ears, navel, genitals or buttocks...",
      "View Image Gallery»",
      "Take the Sex & Love Quiz!",
      "The brain. The body. The bedroom. What do you know?",
      "View Quiz»",
      "Weight Loss",
      "The No-Diet Approach",
      "Learn More»",
      "home>medtermsmedical dictionary a-z list>polyostotic fibrous dysplasia definition",
      "Definition of Polyostotic fibrous dysplasiaPolyostotic fibrous dysplasia:A disorder that features the replacement of multiple areas of bone by fibrous tissue, which may cause fractures and deformity of the legs, arms, and skull. A genetic disorder that is characterized by polyostotic fibrous dysplasia along with skin pigmentation and hormonal problems, with prematuresexualdevelopment, is known as McCune-Albright's syndrome. The flat areas of increased skin pigment are called caf' au lait spots. The hormonal problems that can be related to polyostotic fibrous dysplasia include earlypuberty(with premature menstrual bleeding and development of breasts and pubic hair), thyroid abnormalities, and an increased rate of growth. Also known as McCune-Albright syndrome.Last Editorial Review: 3/19/2012Search All of MedicineNet For:Back toMedTermsonline medical dictionary A-Z ListNeed help identifying pills and medications?Use thepill finder toolon RxList.",
      "Polyostotic fibrous dysplasia:A disorder that features the replacement of multiple areas of bone by fibrous tissue, which may cause fractures and deformity of the legs, arms, and skull. A genetic disorder that is characterized by polyostotic fibrous dysplasia along with skin pigmentation and hormonal problems, with prematuresexualdevelopment, is known as McCune-Albright's syndrome. The flat areas of increased skin pigment are called caf' au lait spots. The hormonal problems that can be related to polyostotic fibrous dysplasia include earlypuberty(with premature menstrual bleeding and development of breasts and pubic hair), thyroid abnormalities, and an increased rate of growth. Also known as McCune-Albright syndrome.",
      "Search All of MedicineNet For:Back toMedTermsonline medical dictionary A-Z ListNeed help identifying pills and medications?Use thepill finder toolon RxList.",
      "Search All of MedicineNet For:Back toMedTermsonline medical dictionary A-Z ListNeed help identifying pills and medications?Use thepill finder toolon RxList.",
      "Need help identifying pills and medications?Use thepill finder toolon RxList.",
      "Find out what women really need.",
      "Webster's New WorldMedical DictionaryLearn more»",
      "MedTerms Medical Wordof the Day",
    ],
    tables: [],
    images: [
      "https://web.archive.org/web/20120801182144im_/http://images.medicinenet.com/images/medicinenet/header/medicinenet_logo.png",
      "https://web.archive.org/web/20120801182144im_/http://images.medicinenet.com/images/slideshow/thumb-10-surprising-health-benefits-of-sex.jpg",
      "https://web.archive.org/web/20120801182144im_/http://images.medicinenet.com/images/slideshow/thumb_psoriasis.jpg",
      "https://web.archive.org/web/20120801182144im_/http://images.medicinenet.com/images/quiz/sex_and_love/thumb-sex-and-love.jpg",
      "https://web.archive.org/web/20120801182144im_/http://images.medicinenet.com/images/main_nav/health_living/hl_nav_weight_loss_2_feat.png",
      "https://web.archive.org/web/20120801182144im_/http://images.medicinenet.com/images/clearpixel.gif",
      "https://web.archive.org/web/20120801182144im_/http://images.medicinenet.com/images/clearpixel.gif",
      "https://web.archive.org/web/20120801182144im_/http://images.medicinenet.com/images/rxlist/pill_identifier/pill-finder-icon-2.jpg",
      "https://web.archive.org/web/20120801182144im_/http://images.medicinenet.com/images/dict_cover100x151.jpg",
      "https://web.archive.org/web/20120801182144im_/http://images.medicinenet.com/images/RSSfeed-icon-16x16.gif",
      "https://web.archive.org/web/20120801182144im_/http://images.medicinenet.com/images/ltnav-promo-adult-skin-problems.jpg",
      "https://web.archive.org/web/20120801182144im_/http://images.medicinenet.com/images/rightrailpromos/rr-ss-adult-skin-mni-2.png",
      "https://web.archive.org/web/20120801182144im_/http://images.medicinenet.com/images/signssymptoms/symptom-checker.jpg",
      "https://web.archive.org/web/20120801182144im_/http://images.medicinenet.com/images/facebook/ads/fb-ad-mn.jpg",
      "https://web.archive.org/web/20120801182144im_/http://images.medicinenet.com/images/webmd/mobileApp/WebMDApps_module_mednet.jpg",
      "https://web.archive.org/web/20120801182144im_/http://privacy-policy.truste.com/privacy-seal/WebMD,-LLC/seal?rid=e803a0f5-c5db-4410-a160-aad40a5b35dc",
      "https://web.archive.org/web/20120801182144im_/http://www.honcode.ch/HONcode/Seal/HONConduct594277_s1.gif",
    ],
  },
];

let pg; // graphics buffer
let backgroundWords = [];
let textPositions = [];
let allImageObjects = [];
let displayStack = [];
let currentImageIndex = 0;
let hereLies;
let fontSize = 32;
let padding = 20;
let maxStackSize = 5;

// helper function to create CORS proxy url in order to load images as the wayback machine blocks loading
function createProxyUrl(originalUrl) {
  return (
    "https://api.codetabs.com/v1/proxy?quest=" + encodeURIComponent(originalUrl)
  );
}

function preload() {
  // Load all images from textContent with CORS proxy
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
  createCanvas(windowWidth, windowHeight);

  pg = createGraphics(windowWidth, windowHeight);

  extractWords();
  calculateTextPositions();
  initializeDisplayStack();
  hereLies = new HereLies();
  frameRate(2);
}

function draw() {
  background(0);

  // Clear graphics buffer
  pg.clear();
  pg.background(0);

  updateImageStack();

  displayImages();
  displayStaticText();
  hereLies.show();

  image(pg, 0, 0);
}

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
    nextImage.x = random(0, pg.width - nextImage.w);
    nextImage.y = random(0, pg.height - nextImage.h);
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
  pg.textSize(fontSize);
  pg.textAlign(LEFT, TOP);

  let x = padding;
  let y = padding;
  let lineHeight = fontSize * 1.5;
  let maxWidth = pg.width - padding * 2;
  let wordIndex = 0;

  while (
    y + lineHeight < pg.height - padding &&
    wordIndex < backgroundWords.length * 3
  ) {
    let word = backgroundWords[wordIndex % backgroundWords.length];
    let wordWidth = pg.textWidth(word + " ");

    if (x + wordWidth > maxWidth + padding) {
      x = padding;
      y += lineHeight;
      if (y + lineHeight >= pg.height - padding) {
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
    imgObj.show(pg); // Pass graphics buffer
  }
}

function displayStaticText() {
  pg.textSize(fontSize);
  pg.textAlign(LEFT, TOP);

  for (let item of textPositions) {
    if (random() < 0.15) {
      pg.fill(0, 255, 200, 200);
      pg.noStroke();
      pg.rect(item.x, item.y, item.width - 5, item.height * 0.8);
      pg.fill(0);
      pg.text(item.word, item.x, item.y);
    } else {
      pg.fill(0, 255, 200, 200);
      pg.text(item.word, item.x, item.y);
    }
  }
}

function setFontSize(newSize) {
  fontSize = newSize;
  calculateTextPositions();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  pg = createGraphics(windowWidth, windowHeight);

  calculateTextPositions();

  for (let imgObj of displayStack) {
    imgObj.x = random(0, pg.width - imgObj.w);
    imgObj.y = random(0, pg.height - imgObj.h);
  }

  hereLies = new HereLies();
}

class HereLies {
  constructor() {
    this.phrases = ["HERE", "LIES"];
    this.hereX = random(0, pg.width / 2);
    this.hereY = random(0, pg.height / 2);
    this.liesX = random(pg.width / 2, pg.width);
    this.liesY = random(pg.height / 2, pg.height);
  }

  show() {
    pg.push();
    pg.textStyle(BOLD);
    pg.textSize(120);

    // Draw "HERE"
    pg.textAlign(LEFT, CENTER);
    pg.fill(0, 255, 200, 255);
    pg.text(this.phrases[0], this.hereX, this.hereY);

    // Draw "LIES"
    pg.textAlign(RIGHT, CENTER);
    pg.text(this.phrases[1], this.liesX, this.liesY);
    pg.pop();
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
