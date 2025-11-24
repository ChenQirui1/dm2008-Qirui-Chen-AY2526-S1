# Sensor Jam - Arduino Video Scrubber

## Sketch Concept

This project creates an interactive video scrubbing experience controlled by an Arduino sensor. The sketch demonstrates serial communication between Arduino hardware and p5.js, allowing physical sensor input to control video playback. Users can scrub through video content by moving their mouse horizontally across the screen, while Arduino sensor data can be integrated for additional interactive control.

The project showcases the integration of physical computing with web-based media playback, creating a tangible interface for digital video manipulation. The current implementation uses the "Why Are You Running?" video as demo content and provides real-time feedback with frame counters and duration display.

## Technical Implementation

**Hardware Requirements:**
- Arduino board (Uno, Nano, or compatible)
- Sensor connected to Arduino (potentiometer, distance sensor, etc.)
- USB connection between Arduino and computer

**Software Components:**
- **p5.js**: Main sketch and video playback
- **p5.serialport / p5.webserial**: Serial communication library for Arduino connection
- **Arduino IDE**: Upload sensor reading code to Arduino board

**Features:**
- Serial port connection interface with connect/disconnect button
- Video time scrubbing via mouse position (mouseX mapped to video duration)
- Real-time sensor data reading from Arduino
- Smooth value interpolation using lerp() for responsive control
- Frame-accurate video positioning
- On-screen display of current playhead time and total duration

## Sketch Instructions

**Setup:**

1. **Prepare Arduino:**
   - Connect a sensor (potentiometer, distance sensor, etc.) to your Arduino
   - Upload Arduino code that reads sensor values and sends them via Serial at 9600 baud rate
   - Arduino code should send values with newline character (`\n`)

2. **Launch the Sketch:**
   - Open `index.html` in a web browser
   - The video will load automatically

**Interaction:**

- **Connect Button**: Click "Connect to Arduino" in the top-left corner to establish serial connection
  - Button changes to "Disconnect Arduino" when connected
  - Button styling updates to show connection status
  
- **Mouse Control**: 
  - Move mouse horizontally (left to right) across the canvas to scrub through the video
  - Left edge = start of video (0:00)
  - Right edge = end of video (duration)
  
- **Sensor Control** (when Arduino is connected):
  - Sensor values are read continuously from Arduino
  - Data is logged to browser console for debugging
  - Sensor data is smoothed using lerp interpolation for fluid control
  - Can be mapped to control video properties (implementation ready)

**Display Elements:**
- Red text showing current playhead time (top-left, below connect button)
- Red text showing total video duration
- Full-screen video display that updates in real-time

**Troubleshooting:**
- If "Connect to Arduino" doesn't work, ensure Arduino is connected via USB
- Check that Arduino is sending data at 9600 baud rate
- Open browser console (F12) to verify sensor data is being received
- Ensure video file path is correct in the sketch
