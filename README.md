# Trinket Pong Collection

This repository now includes both HTML/JS and Python (Turtle) versions of Pong tailored for Trinket.io projects. If you only need a **Python** version, skip straight to the next section—no HTML is required.

## Python (Turtle) Version
- `trinket-python-pong/main.py` – full project structure Trinket expects.
- `python-pong.py` – the exact same code in a single file so you can copy/paste it without drilling into folders.

### Using on Trinket.io
1. Create a new **Python** Trinket project (the yellow “Trinket Code” option).
2. Replace the default code in `main.py` with either file above.
   - Use the **Raw** button (or the repository’s **Download ZIP** option) so you copy the exact file contents—Trinket will raise a `SyntaxError` if any leading `+` symbols from a Git diff sneak into the editor.
3. Click **Run**. Control the left paddle with **W/S** and the right paddle with the **Up/Down arrows**. Press **Space** to serve the ball after each point, and after a player reaches 10 points press **Space** again to start a new match.

> **Tip:** If you only see the green `+` markers, you’re still looking at a Git diff. Click the file name, then **Raw**, before copying so Trinket receives clean Python code.

## HTML + CSS + JS Version (optional)
- `trinket-pong/index.html` – sets up the canvas element and loads the stylesheet and script.
- `trinket-pong/style.css` – styles the background, canvas, and on-screen instructions.
- `trinket-pong/script.js` – implements paddle controls, ball physics, scoring, and win handling.
- `pong.html` – a single-file version if you prefer to paste everything at once.

### Using on Trinket.io
1. Create a new **HTML + CSS + JS** Trinket project.
2. Replace the default `index.html`, `style.css`, and `script.js` files with the contents of the matching files in `trinket-pong/`.
3. Click the green **Run** button. Use **W/S** for the left paddle, **Up/Down arrows** for the right paddle, and press **Space** to restart after someone scores 10 points.

### Why am I seeing `+` characters in the code?
If you ever notice every line beginning with a `+`, it means the page is showing a **Git diff** rather than the raw file contents. Trinket will treat those extra symbols as part of the program and immediately raise a `SyntaxError` on the first line. The fix is simply to copy from the **Raw** view (or download the file) so you grab the exact code without any diff markers.

On GitHub you can get to the Raw view by opening the file and clicking the **Raw** button in the upper right. In other viewers, look for an option such as “plain text” or “download file.” After you paste the clean version into Trinket, the leading `+` characters will disappear and the project will run normally.
