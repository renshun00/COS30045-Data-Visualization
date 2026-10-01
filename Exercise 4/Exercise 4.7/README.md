# Run the website using Python
```bash
python -m http.server 8000
```

# Exercise 4.7 – Adding Labels to D3 Bar Chart

## Aim & Purpose
Add category labels (brand names) and numerical value labels (counts) to the scaled horizontal bar chart created in Exercise 4.6.

## Folder Structure

```
Exercise 4.7/
├── index.html               ← Webpage containing the exercise task
├── README.md                ← Exercise documentation
├── data/
│   └── tvBrandCount.csv     ← CSV dataset containing TV brand counts
└── assets/
    ├── css/
    │   └── style.css        ← Stylesheet
    └── js/
        └── d3-main.js       ← Exercise 4.7 D3 labeled bar chart code
```

## Implementation Steps ([assets/js/d3-main.js](file:///c:/COS30045-Data-Visualization/Exercise%204/Exercise%204.7/assets/js/d3-main.js))

### Step 1: Make Room for Labels
We offset the start position of the bars by setting `x = 100`, providing at least 100px on the left for brand category labels.

### Step 2: Create a Group Container (`<g>`)
Instead of binding data directly to `<rect>`, we bind data to `<g>` elements and position each group vertically using `yScale`:
```javascript
const barAndLabel = svg
  .selectAll("g")
  .data(data)
  .join("g")
    .attr("transform", d => `translate(0, ${yScale(d.brand)})`);
```

### Step 3: Append Rectangles to the Group
Because vertical position is now managed by the `<g>` translation, the rectangle's `y` attribute is reset to `0`:
```javascript
barAndLabel
  .append("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("x", 100)
    .attr("y", 0)
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "blue");
```

### Step 4: Add Column Category Text (Brand Names)
```javascript
barAndLabel
  .append("text")
    .text(d => d.brand)
    .attr("x", 90)
    .attr("y", 16)
    .attr("text-anchor", "end")
    .style("font-size", "13px")
    .style("fill", "#1e293b");
```
*Note: `text-anchor="end"` aligns the text to the right, ending neatly 10px before the bar starts.*

### Step 5: Add Value Numbers (Counts)
```javascript
barAndLabel
  .append("text")
    .text(d => d.count)
    .attr("x", d => 100 + xScale(d.count) + 6)
    .attr("y", 16)
    .style("font-size", "13px")
    .style("fill", "#334155");
```
*Positions the count number 6px to the right of each bar.*
