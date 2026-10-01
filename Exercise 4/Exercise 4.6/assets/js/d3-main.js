/**
 * Exercise 4.6 – Scaling Charts
 *
 * Aim: Make the chart adaptable to different size SVGs using D3 scales:
 *  - d3.scaleLinear() for continuous data (x-axis / TV count)
 *  - d3.scaleBand()   for discrete/categorical data (y-axis / brand categories)
 *
 * Step 1: Add xScale (d3.scaleLinear) with domain and range.
 * Step 2: Use xScale to calculate bar widths (.attr("width", d => xScale(d.count))).
 * Step 3: Add yScale (d3.scaleBand) with .domain(data.map(d => d.brand)), .range(...), and .padding(0.2).
 * Step 4: Use yScale to calculate bar thickness (.attr("height", yScale.bandwidth()))
 *         and vertical position (.attr("y", d => yScale(d.brand))).
 */

// SVG container with viewBox adjusted so the chart fits proportionally
const svg = d3.select(".responsive-svg-container")
  .append("svg")
    .attr("viewBox", "0 0 500 800")
    .style("border", "1px solid black");

/**
 * Function to render the scaled bar chart
 * @param {Array} data - Array of TV brand count objects
 */
const createBarChart = data => {
  // ── Step 1: Linear scale for continuous count data (x-axis) ────────────────
  const xScale = d3.scaleLinear()
    .domain([0, 1200])   // Covers highest count (~1096) with room at end
    .range([0, 450]);    // Fits comfortably inside the 500px wide viewBox

  // ── Step 3: Band scale for discrete brand categories (y-axis) ──────────────
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand)) // Map array to list of brand names
    .range([0, 700])                // Proportional height within 800px viewBox
    .padding(0.2);                  // 20% padding between bars for spacing

  // ── Step 2 & 4: Bind data and draw scaled rectangles ───────────────────────
  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("class", d => `bar bar-${d.count}`)
      .attr("x", 0)                                  // Keep start of bars at x = 0
      .attr("y", d => yScale(d.brand))               // Band scale sets y coordinate
      .attr("width", d => xScale(d.count))           // Linear scale sets bar width
      .attr("height", yScale.bandwidth())            // Band scale sets bar thickness
      .attr("fill", "blue");

  console.log("Exercise 4.6 – Scaled bars rendered in DOM:", svg.selectAll("rect").size());
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
  console.log("Exercise 4.6 – Loaded data:", data);
  data.sort((a, b) => b.count - a.count);
  console.log("Exercise 4.6 – Sorted data (descending):", data);
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
