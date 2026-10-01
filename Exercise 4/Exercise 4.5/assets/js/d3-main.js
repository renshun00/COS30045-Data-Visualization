/**
 * Exercise 4.5 – D3 Binding and Drawing with Data
 *
 * Aim: Use the dataset loaded from CSV to draw SVG rectangles (bars) for visualisation.
 *
 * Step 1: Bind data to DOM elements using selectAll("rect").data(data).join("rect")
 *         Assign a class attribute associated with count data.
 * Step 2: Make data visible: add attributes for width (d.count), height (barHeight), fill ("blue").
 * Step 3: Space out bars: set x (0 or offset for labels) and y (spaced along y-axis by index).
 */

// Create the responsive SVG container
const svg = d3.select(".responsive-svg-container")
  .append("svg")
    .attr("viewBox", "0 0 1200 680")
    .style("border", "1px solid black");

/**
 * Step 1–3: Function that builds the horizontal bar chart
 * @param {Array} data - Array of TV brand count objects
 */
const drawBarChart = data => {
  // Step 2: Add constant for bar height
  const barHeight = 20;

  // Step 3: Spacing between bars and top offset
  const barSpacing = 5;
  const topPadding = 12;

  // Step 3: x position (0 as per basic requirement, or 100 to leave room for labels as in lab screenshot)
  const barX = 100;

  // Step 1: Bind data and join rectangles
  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
      // Step 1: Assign class attribute associated with count data
      .attr("class", d => `bar bar-${d.count}`)
      // Step 3: Space out bars with x and y coordinates
      .attr("x", barX)
      .attr("y", (d, i) => topPadding + i * (barHeight + barSpacing))
      // Step 2: Width relative to count data, height defined by constant, and fill colour
      .attr("width", d => d.count)
      .attr("height", barHeight)
      .attr("fill", "blue");

  console.log("Exercise 4.5 – Bars rendered in DOM:", svg.selectAll("rect").size());
};

const createBarChart = drawBarChart;

// Embedded CSV data fallback to support file:/// protocol without CORS issues
const fallbackCsv = `brand,count
aiwa,44
akai,38
bauhn,73
blaupunkt,110
caixun,62
chiq,47
eko,189
emete,55
englaon,32
ffalcon,26
hisense,263
jvc,122
kogan,788
lg,677
linsar,43
loewe,27
philips,118
samsung,1096
skyworth,24
sony,80
spark electronics,29
sylvox,132
tcl,91
toshiba,50
walton,24`;

const rowConverter = d => ({
  brand: d.brand,
  count: +d.count
});

function handleData(data) {
  console.log("Exercise 4.5 – Loaded data:", data);
  data.sort((a, b) => b.count - a.count);
  console.log("Exercise 4.5 – Sorted data (descending):", data);
  drawBarChart(data);
}

// Load CSV Data with fallback
d3.csv("../data/tvBrandCount.csv", rowConverter)
  .then(data => {
    handleData(data);
  })
  .catch(() => {
    d3.csv("data/tvBrandCount.csv", rowConverter)
      .then(data => {
        handleData(data);
      })
      .catch(() => {
        const parsed = d3.csvParse(fallbackCsv, rowConverter);
        handleData(parsed);
      });
  });
