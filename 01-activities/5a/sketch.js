// DM2008 – Activity 5a
// Colliding Circles (30 min)

let balls = [];

function setup() {
  createCanvas(400, 400);

  // Step 1: create two Ball objects
  balls.push(new Ball(width/2, height/2));
  balls.push(new Ball(width/2, height/2));
  balls.push(new Ball(width/2, height/2));
  balls.push(new Ball(width/2, height/2));
  balls.push(new Ball(width/2, height/2));
  
}

function draw() {
  background(230);
  


  // Step 2: update and display each ball
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.move();
    b.show();
    b.checkCollision(balls);
    
    
  // Step 3: check collisions
  // Use dist() between ball centers
  // Trigger feedback (color, bounce, etc.)
    
    
    // let ballDist = dist(balls[0].pos.x, balls[0].pos.y, balls[1].pos.x, balls[1].pos.y)
    
    // console.log(ballDist)
  }
}

class Ball {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.r = 30;
    this.vel = createVector(random(-2, 2), random(-2, 2));
    this.c = color(100, 180, 220)
  }

  move() {
    this.pos.add(this.vel);
    // TODO: wrap around OR bounce off edges
    
    if (this.pos.x > width - this.r || this.pos.x < this.r) {
      this.vel.x = this.vel.x * -1
    }
        
    if (this.pos.y > height - this.r || this.pos.y < this.r) {
      this.vel.y = this.vel.y * -1
    }
  }

  show() {
    fill(this.c);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }

  // Step 4: Add a method to checkCollision(other)
  checkCollision(others) {
    
    // console.log(others)
    for (let i = 0; i < balls.length; i++) {
      if (others[i] != this) {
        let ballsDist = dist(this.pos.x, this.pos.y, others[i].pos.x, others[i].pos.y)
        // console.log(ballsDist)
        if (ballsDist < (this.r*2) ) {
           this.c = color(203,100,122);
        } 
        else {
          this.c = color(100, 180, 220);
        }
      } 
    }

  }
  // Use dist() and respond visually
}