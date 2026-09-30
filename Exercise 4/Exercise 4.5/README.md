# Run the website using Python
```bash
python -m http.server 8000
```

# Exercise 4.5 – D3 Binding and Drawing with Data

## Aim & Purpose
Use the TV brand dataset loaded in Exercise 4.4 to bind data to SVG `<rect>` elements and draw a horizontal bar chart visualisation.

## Folder Structure

```
Exercise 4.5/
├── index.html               ← Home page with D3 bar chart section
├── televisions.html         ← Televisions page
├── about.html               ← About page
├── README.md                ← Exercise documentation
├── data/
│   └── tvBrandCount.csv     ← CSV dataset containing TV brand counts
└── assets/
    ├── css/
    │   └── style.css        ← Stylesheet
    ├── js/
    │   ├── main.js          ← Navigation & UI logic
    │   ├── calculator.js    ← Energy calculator
    │   └── d3-main.js       ← Exercise 4.5 D3 binding & bar chart code
    └── img/
        └── PowerIcon.png    ← Logo
```

## Implementation Steps ([assets/js/d3-main.js](file:///c:/COS30045-Data-Visualization/Exercise%204/Exercise%204.5/assets/js/d3-main.js))

### Step 1: Bind Data to DOM Elements
We define [`drawBarChart(data)`](file:///c:/COS30045-Data-Visualization/Exercise%204/Exercise%204.5/assets/js/d3-main.js#L20-L45) (also aliased as `createBarChart`), selecting all rectangles, binding the dataset, joining `<rect>` elements, and setting dynamic CSS class names:
```javascript
svg
  .selectAll("rect")
  .data(data)
  .join("rect")
    .attr("class", d => `bar bar-${d.count}`);
```

### Step 2: Make Data Visible (Width, Height, Fill)
- A constant `barHeight = 20` defines the thickness of each bar.
- `width` is bound dynamically to `d.count`.
- `height` is bound to `barHeight`.
- `fill` is set to `"blue"`.

### Step 3: Space Out the Bars (x and y Coordinates)
- `x`: Starts at `100` (or `0`), providing space on the left for future brand labels.
- `y`: Spaced vertically using the item index `i`: `(d, i) => topPadding + i * (barHeight + barSpacing)`.

```javascript
const drawBarChart = data => {
  const barHeight = 20;
  const barSpacing = 5;
  const topPadding = 12;
  const barX = 100;

  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("class", d => `bar bar-${d.count}`)
      .attr("x", barX)
      .attr("y", (d, i) => topPadding + i * (barHeight + barSpacing))
      .attr("width", d => d.count)
      .attr("height", barHeight)
      .attr("fill", "blue");
};
```

## Upcoming Improvements
- **Exercise 4.6**: Add D3 linear scales (`d3.scaleLinear`) so bars automatically scale to fit any SVG dimensions.
- **Exercise 4.7**: Add SVG text labels (`<text>`) to display brand names and counts.
