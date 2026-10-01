# Run using Python
```bash
python -m http.server 8000
```

# Exercise 4.3 – D3 Setup

In this exercise, we configure the D3.js library in a webpage and use D3 to create an SVG canvas element with a responsive `viewBox` and append a test rectangle to verify the setup.

## Folder Structure

```
Exercise 4.3/
├── index.html               ← Webpage containing the exercise task
├── README.md                ← Exercise documentation
└── assets/
    ├── css/
    │   └── style.css        ← Stylesheet
    └── js/
        └── d3-main.js       ← D3 SVG setup script
```

## Exercise Steps & Implementation Details ([assets/js/d3-main.js](file:///c:/COS30045-Data-Visualization/Exercise%204/Exercise%204.3/assets/js/d3-main.js))

### Step 2: Create SVG Canvas with viewBox
```javascript
const svg = d3.select(".responsive-svg-container")
  .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid black");
```

### Step 3: Append Test Rectangle
```javascript
svg
  .append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");
```

## Scripts Loaded in index.html

```html
<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="assets/js/d3-main.js"></script>
```
