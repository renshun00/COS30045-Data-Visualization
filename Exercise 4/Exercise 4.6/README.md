# Run the website using Python
```bash
python -m http.server 8000
```

# Exercise 4.6 – Scaling Charts with D3.js

## Aim & Purpose
Make the bar chart adaptable to different SVG canvas dimensions using D3 scales:
- **`d3.scaleLinear()`**: Maps quantitative continuous values (TV counts) to horizontal bar widths on the x-axis.
- **`d3.scaleBand()`**: Maps discrete categorical values (TV brand names) to vertical bar positions and calculates uniform bar thickness and spacing on the y-axis.

## Folder Structure

```
Exercise 4.6/
├── index.html               ← Webpage containing the exercise task
├── README.md                ← Exercise documentation
├── data/
│   └── tvBrandCount.csv     ← CSV dataset containing TV brand counts
└── assets/
    ├── css/
    │   └── style.css        ← Stylesheet
    └── js/
        └── d3-main.js       ← Exercise 4.6 D3 scaling code
```

## Implementation Walkthrough ([assets/js/d3-main.js](file:///c:/COS30045-Data-Visualization/Exercise%204/Exercise%204.6/assets/js/d3-main.js))

### Preparation: SVG ViewBox
We constrain the SVG `viewBox` (e.g. `0 0 500 800`) to demonstrate how scales prevent raw pixel overflows when counts exceed the container width:
```javascript
const svg = d3.select(".responsive-svg-container")
  .append("svg")
    .attr("viewBox", "0 0 500 800")
    .style("border", "1px solid black");
```

### Step 1 & 2: Linear Scale for Widths (`d3.scaleLinear`)
- **Domain**: `[0, 1200]` — encompasses the highest data value (Samsung: 1096).
- **Range**: `[0, 450]` — fits comfortably within the 500px width of the SVG.
- **Width Attribute**: Updated from raw count `.attr("width", d => d.count)` to `.attr("width", d => xScale(d.count))`.

```javascript
const xScale = d3.scaleLinear()
  .domain([0, 1200])
  .range([0, 450]);
```

### Step 3: Band Scale for Vertical Distribution (`d3.scaleBand`)
- **Domain**: `data.map(d => d.brand)` — list of unique brand names.
- **Range**: `[0, 700]` — height allocated for all 25 bars within the 800px tall canvas.
- **Padding**: `.padding(0.2)` — creates a 20% proportional gap between consecutive bars.
- **Y Position**: Updated from index multiplication to `.attr("y", d => yScale(d.brand))`.
- **Bar Height**: Updated from fixed constant to `.attr("height", yScale.bandwidth())`.

```javascript
const yScale = d3.scaleBand()
  .domain(data.map(d => d.brand))
  .range([0, 700])
  .padding(0.2);
```

### Updated Chart Function

```javascript
const createBarChart = data => {
  const xScale = d3.scaleLinear()
    .domain([0, 1200])
    .range([0, 450]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 700])
    .padding(0.2);

  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("class", d => `bar bar-${d.count}`)
      .attr("x", 0)
      .attr("y", d => yScale(d.brand))
      .attr("width", d => xScale(d.count))
      .attr("height", yScale.bandwidth())
      .attr("fill", "blue");
};
```

## Upcoming Improvements
- **Exercise 4.7**: Add SVG text labels and axes to display brand names and numerical count values alongside each bar.
