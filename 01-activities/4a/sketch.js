// DM2008 – Activity 4a
// Bake a Cookie (30 min)

let cookie;

function setup() {
  createCanvas(400, 400);
  noStroke();

  // Step 3: make one cookie object
  cookie = new Cookie("chocolate", 200, width / 2, height / 2);
}

function draw() {
  background(230);

  // Step 4: call the cookie’s show() method
  cookie.show();
  cookie.move();
}

// Step 1: define the Cookie class
class Cookie {
  constructor(flavor, sz, x, y) {
    // set up required properties
    this.flavor = flavor;
    this.sz = sz;
    this.x = x;
    this.y = y;
    this.toppings = [];
  }

  // Step 2: display the cookie
  show() {
    if (this.flavor == "chocolate") {
      fill(196, 146, 96);
    } else {
      fill(220, 180, 120);
    }
    ellipse(this.x, this.y, this.sz);

    if (this.toppings.length) {
      for (let i = 0; i < this.toppings.length; i++) {
        fill(104, 90, 78);
        ellipse(this.toppings[i][0], this.toppings[i][1], 50);
      }
    }
  }

  move() {
    if (keyIsPressed) {
      if (keyCode === UP_ARROW) {
        this.moveCookie(0, -1);
      } else if (keyCode === DOWN_ARROW) {
        this.moveCookie(0, 1);
      } else if (keyCode === LEFT_ARROW) {
        this.moveCookie(-1, 0);
      } else if (keyCode === RIGHT_ARROW) {
        this.moveCookie(1, 0);
      }
    }
  }

  // Steps 5 & 6: Implement additional methods here
  addTopping(x, y) {
    console.log("x-chip", x);
    console.log("y-chip", y);
    console.log("x-lbound", this.x - this.sz / 2);
    console.log("x-rbound", this.x + this.sz / 2);

    if (this.x - this.sz / 2 < x < this.x + this.sz / 2) {
      this.toppings.push([x, y]);
      console.log(this.toppings);
    }
  }

  moveCookie(x, y) {
    this.x += x;
    this.y += y;
    for (let i = 0; i < this.toppings.length; i += 1) {
      this.toppings[i][0] += x;
      this.toppings[i][1] += y;
    }
  }
}

// Step 5: add movement (keyboard arrows)
function keyPressed() {}

// Step 6: add flavor randomizer (mouse click)
function mousePressed() {
  //add choco chips
  cookie.addTopping(mouseX, mouseY);
}
