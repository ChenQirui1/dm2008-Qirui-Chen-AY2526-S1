# Tribute to IABOT: Footstone of Dead Sites

## Sketch Concept

This project explores the concept of **link rot** and the gradual decay of the internet, and I came across Wikipedia's InternetArchiveBot and the "Million Dollar Homepage" (buy a pixel). As much of the internet slowly dies - links breaking, content disappearing, the InternetArchiveBot acts as both a digital gravedigger and necromancer, preserving dead websites through the Wayback Machine while resurrecting false versions of what once was.

The visualization presents a 3D tombstone (footstone) that displays archived web content retrieved in real-time from pages edited by InternetArchiveBot. Inspired by Cyberpunk 2077's Soulkiller program, which creates digital copies of consciousness (neither truly alive nor completely dead), the archived web exists in a liminal state, where it is preserved but not living, accessible and interactive but fundamentally unaltered.

The server continuously tracks the bot's Wikipedia edits, extracting Wayback Machine URLs and displaying the archived content (text, images, HTML fragments) on a rotating memorial stone. Matrix-style cascading code surrounds the structure, representing the constant flow of digital information, but the stone remains static and unmoving.

The piece serve as a contemplation, like visiting the graveyard and seeing the dead, each site has interesting stories to tell. And yet ephemeral, with so much information constantly being created and destroyed, the footstone provides a brief moment for the site to be seen, before it disappears as soon as the next arrives.

## Technical Implementation

**Server (Python)**

- Monitors Wikipedia's InternetArchiveBot edits in real-time using `pywikibot`
- Extracts archive URLs from bot edits that fix broken links
- Fetches archived content from the Wayback Machine
- Streams data to client via WebSocket connection
- Implements throttling to respect API rate limits

**Client (p5.js + WebGL)**

- 3D tombstone/footstone displaying archived web content
- Matrix-style cascading code streams (HTML tags, JavaScript snippets)
- Real-time text and image extraction from archived pages
- "HERE LIES" inscription marking digital death
- Dynamic texture mapping with horizontal and vertical scrolling
- Ghostly visual aesthetic with cyan/green monochrome palette

## Sketch Instructions

**Setup:**

1. Start the Python WebSocket server: `python server/main.py`
2. Open `index.html` in a browser to view the visualization
3. The server will begin tracking InternetArchiveBot edits and streaming archived content

**Interaction:**

- **Mouse Drag**: Rotate the 3D tombstone to view different faces
- **Scroll/Pinch**: Zoom in and out
- The visualization automatically updates when new archived pages are discovered
- Watch as dead websites materialize on the digital memorial.

**Visual Elements:**

- **Top/Bottom Faces**: Display archived text, images, and "HERE LIES" inscription
- **Side Faces**: Matrix-style scrolling HTML/JavaScript code fragments
- **Floor**: Cascading text streams creating a digital cemetery atmosphere
- **Color Scheme**: Cyan/green matrix aesthetic representing digital decay
