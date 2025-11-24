let port; // Serial Communication port
let connectBtn;

let sensorVal;
// let circleSize = 50;
// let targetSize = 50; // used for Option 2

let vid;
let playing = true;
let duration = 0;
let playhead = 0;
let oneFrame = 1 / 60;
let vidTime = 10.0;
let step = oneFrame;

function setup() {
  createCanvas(windowWidth, windowHeight);
  port = createSerial(); // creates the Serial Port

  // Connection helpers
  connectBtn = createButton("Connect to Arduino");
  connectBtn.position(20, 20);
  connectBtn.mousePressed(connectBtnClick);

  //create video
  // vid = createVideo("/assets/why-are_you_running.mp4");

  // vid = createVideo("iwaswrong.mp4");
  vid = createVideo(
    "/03-sensor-jam/assets/why-are_you_running.mp4",
    function () {
      console.log("i have loaded " + frameCount + " " + vid.duration());
      duration = vid.duration();
    }
  );
  // console.log(duration);
  vid.size(width, height);
  vid.volume(0);
  // vid.loop();
  vid.hide(); // hides the html video loader
  vid.position(0.0);
  // vid.time(10);
}

function draw() {
  background(100);
  // ellipse(width / 2, height / 2, circleSize);

  // Receive data from Arduino
  if (port.opened()) {
    sensorVal = port.readUntil("\n");
    // Only log data that has information, not empty signals
    if (sensorVal[0]) {
      // Once you verify data is coming in,
      // disable logging to improve performance
      console.log(sensorVal);

      // OPTION 1:
      // Update circle's size with sensor's data directly
      // Reduce delay() value in Ardiuno to get smoother changes

      // use float() to convert from data from string to number
      // circleSize = float(sensorVal);

      // OPTION 2:
      // Update circle's size using lerp() to smoothly change values
      // This method even works with longer delay() values in Arduino

      targetSize = float(sensorVal);
      // last value in lerp() controls speed of change
      circleSize = lerp(circleSize, targetSize, 0.1);

      //change colour based on size
      let col = map(circleSize, 0, width, 0, 255);
    }
  }

  // Map mouseX to video duration (numeric)
  vidTime = constrain(map(mouseX, 0, width, 0, duration), 0, duration);
  vid.time(vidTime);

  let img = vid.get();
  image(img, 0, 0, width, height);

  textSize(40);
  fill(255, 0, 0);

  let counter = nf(vidTime, 0, 2); // format vidTime for display only
  let durText = nf(duration, 0, 2); // format duration for display only

  text(counter, 10, 300);
  text(durText, 10, 350);
}

function connectBtnClick(e) {
  // If port is not already open, open on click,
  // otherwise close the port
  if (!port.opened()) {
    port.open(9600); // opens port with Baud Rate of 9600
    e.target.innerHTML = "Disconnect Arduino";
    e.target.classList.add("connected");
  } else {
    port.close();
    e.target.innerHTML = "Connect to Arduino";
    e.target.classList.remove("connected");
  }
}
