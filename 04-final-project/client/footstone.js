class Footstone {
  constructor(width, height, depth, sideTexture, topBottomTexture) {
    this.w = width;
    this.h = height;
    this.d = depth;
    this.sideTexture = sideTexture;
    this.topBottomTexture = topBottomTexture;
    this.horizontalOffset = 0;
    this.verticalOffset = 0;
    this.scrollSpeed = 0.002;
  }

  update() {
    // Update texture offsets for scrolling animation
    this.horizontalOffset = frameCount * this.scrollSpeed;
    // this.verticalOffset = frameCount * this.scrollSpeed;
  }

  display() {
    push();

    // SIDE FACES - Horizontal scrolling
    texture(this.sideTexture);
    this.drawFrontFace();
    this.drawRightFace();
    this.drawBackFace();
    this.drawLeftFace();

    // TOP AND BOTTOM - Vertical scrolling
    texture(this.topBottomTexture);
    this.drawTopFace();
    this.drawBottomFace();

    pop();
  }

  drawFrontFace() {
    beginShape();
    vertex(-this.w, -this.h, this.d, 0 + this.horizontalOffset, 0);
    vertex(this.w, -this.h, this.d, 0.5 + this.horizontalOffset, 0);
    vertex(this.w, this.h, this.d, 0.5 + this.horizontalOffset, 1);
    vertex(-this.w, this.h, this.d, 0 + this.horizontalOffset, 1);
    endShape(CLOSE);
  }

  drawRightFace() {
    beginShape();
    vertex(this.w, -this.h, this.d, 0 + this.horizontalOffset, 0);
    vertex(this.w, -this.h, -this.d, 0.25 + this.horizontalOffset, 0);
    vertex(this.w, this.h, -this.d, 0.25 + this.horizontalOffset, 1);
    vertex(this.w, this.h, this.d, 0 + this.horizontalOffset, 1);
    endShape(CLOSE);
  }

  drawBackFace() {
    beginShape();
    vertex(this.w, -this.h, -this.d, 0 + this.horizontalOffset, 0);
    vertex(-this.w, -this.h, -this.d, 0.5 + this.horizontalOffset, 0);
    vertex(-this.w, this.h, -this.d, 0.5 + this.horizontalOffset, 1);
    vertex(this.w, this.h, -this.d, 0 + this.horizontalOffset, 1);
    endShape(CLOSE);
  }

  drawLeftFace() {
    beginShape();
    vertex(-this.w, -this.h, -this.d, 0 + this.horizontalOffset, 0);
    vertex(-this.w, -this.h, this.d, 0.25 + this.horizontalOffset, 0);
    vertex(-this.w, this.h, this.d, 0.25 + this.horizontalOffset, 1);
    vertex(-this.w, this.h, -this.d, 0 + this.horizontalOffset, 1);
    endShape(CLOSE);
  }

  drawTopFace() {
    beginShape();
    vertex(-this.w, -this.h, -this.d, 0, 0 + this.verticalOffset);
    vertex(this.w, -this.h, -this.d, 1, 0 + this.verticalOffset);
    vertex(this.w, -this.h, this.d, 1, 1 + this.verticalOffset);
    vertex(-this.w, -this.h, this.d, 0, 1 + this.verticalOffset);
    endShape(CLOSE);
  }

  drawBottomFace() {
    beginShape();
    vertex(-this.w, this.h, this.d, 0, 0 + this.verticalOffset);
    vertex(this.w, this.h, this.d, 1, 0 + this.verticalOffset);
    vertex(this.w, this.h, -this.d, 1, 1 + this.verticalOffset);
    vertex(-this.w, this.h, -this.d, 0, 1 + this.verticalOffset);
    endShape(CLOSE);
  }

  // Method to change dimensions
  setDimensions(width, height, depth) {
    this.w = width;
    this.h = height;
    this.d = depth;
  }

  // Method to change scroll speed
  setScrollSpeed(speed) {
    this.scrollSpeed = speed;
  }
}
