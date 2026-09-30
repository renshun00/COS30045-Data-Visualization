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
};

// Alias createBarChart to drawBarChart for consistency with both names in the instructions
const createBarChart = drawBarChart;

// ── Load CSV Data (from Exercise 4.4) ─────────────────────────────────────────
d3.csv("../data/tvBrandCount.csv", d => {
  return {
    brand: d.brand,
    count: +d.count //=> converts count string to number
  };
}).then(data => {
  console.log("Loaded data:", data);
  console.log("Dataset length:", data.length);
  console.log("Max count (d3.max):", d3.max(data, d => d.count));
  console.log("Min count (d3.min):", d3.min(data, d => d.count));
  console.log("Extent [min, max] (d3.extent):", d3.extent(data, d => d.count));

  // Sort descending by count as learned in Exercise 4.4
  data.sort((a, b) => b.count - a.count);
  console.log("Sorted data (descending):", data);

  // Call createBarChart / drawBarChart passing the loaded data
  drawBarChart(data);

}).catch(error => {
  // Fallback in case web server root is Exercise 4.5
  console.warn("Could not load '../data/tvBrandCount.csv', trying fallback 'data/tvBrandCount.csv':", error);
  d3.csv("data/tvBrandCount.csv", d => ({
    brand: d.brand,
    count: +d.count
  })).then(data => {
    data.sort((a, b) => b.count - a.count);
    drawBarChart(data);
  }).catch(err => {
    console.error("Failed to load CSV data:", err);
  });
});
