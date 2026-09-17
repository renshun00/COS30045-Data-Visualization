/**
 * Exercise 4.2 – D3 code (separate from main.js)
 *
 * Step 2: Apply styles to HTML elements using D3
 * Step 3: Append a paragraph element using D3
 * Step 4: Append an SVG rectangle using D3
 */

// ── Step 2: Style HTML elements with D3 ──────────────────
// Change the hero heading colour
d3.select("h1")
  .style("color", "#0ea5e9");

// Style the section heading for the D3 demo area
d3.select("#d3-demo h2")
  .style("color", "#6366f1")
  .style("font-style", "italic");

// ── Step 3: Append paragraph elements to a <div> ─────────
// Append a single tip to #d3-text-demo
d3.select("#d3-text-demo")
  .append("p")
  .text("💡 Purchasing a low energy consumption TV will help with your energy bills!")
  .style("color", "#16a34a")
  .style("font-weight", "600")
  .style("margin-top", "0.75rem");

// Using selectAll to append to ALL .d3-tip containers
d3.selectAll(".d3-tip")
  .append("p")
  .text("⚡ This text was added by D3 using selectAll — it appears in every .d3-tip element!")
  .style("color", "#9333ea")
  .style("font-size", "0.9rem")
  .style("margin-top", "0.5rem");

// ── Step 4: Append an SVG rectangle using D3 ─────────────
// First, append a rect without attributes (invisible but in DOM)
d3.select("#d3-svg-demo")
  .append("rect");
// ↑ Check developer tools → you'll see <rect></rect> with no attributes

// Now append a visible, styled rectangle
d3.select("#d3-svg-demo")
  .append("rect")
  .attr("x", 20)
  .attr("y", 20)
  .attr("width", 200)
  .attr("height", 60)
  .attr("rx", 8)
  .style("fill", "#6366f1");

// Add a label inside the rectangle
d3.select("#d3-svg-demo")
  .append("text")
  .attr("x", 120)
  .attr("y", 56)
  .attr("text-anchor", "middle")
  .attr("fill", "#fff")
  .attr("font-size", "14px")
  .attr("font-weight", "bold")
  .text("D3 Rectangle");

// Append a second rectangle with different colour
d3.select("#d3-svg-demo")
  .append("rect")
  .attr("x", 240)
  .attr("y", 20)
  .attr("width", 150)
  .attr("height", 60)
  .attr("rx", 8)
  .style("fill", "#0ea5e9");

d3.select("#d3-svg-demo")
  .append("text")
  .attr("x", 315)
  .attr("y", 56)
  .attr("text-anchor", "middle")
  .attr("fill", "#fff")
  .attr("font-size", "14px")
  .attr("font-weight", "bold")
  .text("Another Rect");

// Append a circle for variety
d3.select("#d3-svg-demo")
  .append("circle")
  .attr("cx", 480)
  .attr("cy", 50)
  .attr("r", 30)
  .style("fill", "#f59e0b")
  .style("stroke", "#d97706")
  .style("stroke-width", 2);

d3.select("#d3-svg-demo")
  .append("text")
  .attr("x", 480)
  .attr("y", 55)
  .attr("text-anchor", "middle")
  .attr("fill", "#fff")
  .attr("font-size", "11px")
  .attr("font-weight", "bold")
  .text("Circle");
