/**
 * Exercise 4.3 – D3 code
 *
 * Step 2: Create an SVG canvas inside .responsive-svg-container
 * Step 3: Append a test rectangle to the SVG
 */

// ── Step 2: Create SVG with viewBox ──────────────────────
const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 1200 1600")
      .style("border", "1px solid black");

// ── Step 3: Add a test rectangle ─────────────────────────
svg
  .append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");
