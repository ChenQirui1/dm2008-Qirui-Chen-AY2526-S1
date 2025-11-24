class Line {
  constructor(index, maxWidth) {
    this.y = index * symbolSize;
    this.symbols = [];
    this.totalSymbols = floor(random(15, 30));
    this.speed = random(1, 5);
    this.maxWidth = maxWidth || windowWidth;

    for (let i = 0; i < this.totalSymbols; i++) {
      this.symbols.push(
        new TextSymbol(
          random(-this.maxWidth, 0),
          this.y,
          this.speed,
          i === 0,
          this.maxWidth
        )
      );
    }
  }

  // For rendering to graphics buffer (side textures)
  show(graphics) {
    for (let symbol of this.symbols) {
      symbol.showToGraphics(graphics);
    }
  }

  // For rendering directly to WEBGL (floor)
  showDirect() {
    for (let symbol of this.symbols) {
      symbol.showDirect();
    }
  }

  // For updating with graphics buffer
  update() {
    for (let symbol of this.symbols) {
      symbol.update();
    }
  }

  // For updating floor symbols
  updateDirect(maxWidth) {
    for (let symbol of this.symbols) {
      symbol.x += symbol.speed;

      if (symbol.x > maxWidth) {
        symbol.x = -100;
      }

      if (frameCount % symbol.switchInterval === 0) {
        symbol.value = symbol.getRandomCode();
      }
    }
  }
}

class TextSymbol {
  constructor(x, y, speed, isFirst, maxWidth) {
    this.x = x;
    this.y = y;
    this.value = this.getRandomCode();
    this.speed = speed;
    this.first = isFirst;
    this.switchInterval = round(random(100, 300));
    this.maxWidth = maxWidth || windowWidth;
  }

  // Render to graphics buffer
  showToGraphics(graphics) {
    if (this.first) {
      graphics.fill(200, 255, 255);
    } else {
      graphics.fill(0, 255, 200, 200);
    }
    graphics.noStroke();
    graphics.text(String(this.value), this.x, this.y);
    this.first = false;
  }

  // Render directly to WEBGL canvas
  showDirect() {
    if (this.first) {
      fill(200, 255, 255);
    } else {
      fill(0, 255, 200, 200);
    }
    noStroke();
    text(String(this.value), this.x, this.y);
    this.first = false;
  }

  update() {
    this.x += this.speed;

    if (this.x > this.maxWidth) {
      this.x = -100;
    }
  }

  getRandomCode() {
    return codeSnippets[floor(random(codeSnippets.length))];
  }
}
