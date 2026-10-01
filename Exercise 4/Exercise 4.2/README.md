# Run using Python
```bash
python -m http.server 8000
```

# Exercise 4.2 – D3 Setup & Manipulations

In this exercise, we explore the core concepts of selecting DOM elements, styling elements, and appending new HTML and SVG elements using D3.js.

## Folder Structure

```
Exercise 4.2/
├── index.html               ← Webpage containing the exercise task
├── README.md                ← Exercise documentation
└── assets/
    ├── css/
    │   └── style.css        ← Stylesheet
    └── js/
        └── d3-main.js       ← D3 manipulation script
```

## Exercise Steps & Implementation Details ([assets/js/d3-main.js](file:///c:/COS30045-Data-Visualization/Exercise%204/Exercise%204.2/assets/js/d3-main.js))

| Step | What it does | D3 method |
|---|---|---|
| **Step 2** | Styles the `<h1>` heading colour and the demo section `<h2>` | `d3.select("h1").style(...)` |
| **Step 3** | Appends a `<p>` element with text to the `#d3-text-demo` container | `d3.select("#d3-text-demo").append("p").text(...)` |
| **Step 3b** | Appends text to all `.d3-tip` containers using `selectAll` | `d3.selectAll(".d3-tip").append("p").text(...)` |
| **Step 4a** | Appends a `<rect>` with no attributes (invisible in SVG, inspect via dev tools) | `d3.select("#d3-svg-demo").append("rect")` |
| **Step 4b** | Appends styled rectangles, text labels, and a circle to the SVG | `.append("rect").attr(...).style(...)` |

## Scripts Loaded in index.html

```html
<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="assets/js/d3-main.js"></script>
```
