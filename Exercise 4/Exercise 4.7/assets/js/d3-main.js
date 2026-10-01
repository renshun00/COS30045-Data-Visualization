/**
 * Exercise 4.7 – Adding Labels
 *
 * Aim: Add brand name category labels and count value labels to the scaled bar chart.
 *
 * Step 1: Make room for labels on the x-axis (at least 100px on the left).
 * Step 2: Create a <g> selection joined to data and translated by yScale:
 *         .attr("transform", d => `translate(0, ${yScale(d.brand)})`)
 * Step 3: Append <rect> to the group at x = 100, y = 0.
 * Step 4: Append category label <text> for brand names (right-aligned at x = 90).
 * Step 5: Append value number <text> for counts (positioned at 100 + xScale(d.count) + 6).
 */

// SVG container with viewBox accommodating labels on both sides
const svg = d3.select(".responsive-svg-container")
  .append("svg")
    .attr("viewBox", "0 0 650 820")
    .style("border", "1px solid black");

/**
 * Function to render the horizontal bar chart with labels
 * @param {Array} data - Array of TV brand count objects
 */
const createBarChart = data => {
  // Step 1: Scales
  // Range is 450px wide so bars fit neatly between x = 100 and x = 550
  const xScale = d3.scaleLinear()
    .domain([0, 1200])
    .range([0, 450]);

  // Band scale spaces out 25 categories with padding between bars
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([20, 790])
    .padding(0.2);

  // ── Step 2: Group container for bars and labels ─────────────────────────────
  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
      .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

  // ── Step 3: Append the rectangles to the group ─────────────────────────────
  barAndLabel
    .append("rect")
      .attr("class", d => `bar bar-${d.count}`)
      .attr("x", 100)                     // Step 1 & 3: Starts at 100px (leaving room for labels)
      .attr("y", 0)                       // y is 0 relative to the translated <g>
      .attr("width", d => xScale(d.count)) // Linear scale sets width
      .attr("height", yScale.bandwidth())  // Band scale sets height
      .attr("fill", "blue");

  // ── Step 4: Add the brand category text labels ─────────────────────────────
  barAndLabel
    .append("text")
      .text(d => d.brand)
      .attr("x", 90)                      // 10px before the start of the bar
      .attr("y", 16)                      // Vertically aligned with the bar
      .attr("text-anchor", "end")         // Right justified
      .style("font-size", "13px")
      .style("fill", "#1e293b");

  // ── Step 5: Add the count value numbers ────────────────────────────────────
  barAndLabel
    .append("text")
      .text(d => d.count)
      .attr("x", d => 100 + xScale(d.count) + 6) // Positioned just after the end of each bar
      .attr("y", 16)                      // Vertically aligned with the bar
      .style("font-size", "13px")
      .style("fill", "#334155");

  console.log("Exercise 4.7 – Groups created:", barAndLabel.size());
};

const drawBarChart = createBarChart;

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
  console.log("Exercise 4.7 – Loaded data:", data);
  data.sort((a, b) => b.count - a.count);
  console.log("Exercise 4.7 – Sorted data (descending):", data);
  createBarChart(data);
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
