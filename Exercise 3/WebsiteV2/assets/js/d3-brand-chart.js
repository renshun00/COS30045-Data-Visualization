/**
 * Exercise 4.7 D3 Bar Chart Integration for PowerSense Website
 * Renders the television brand distribution chart inside #d3-brand-barchart
 */

(function () {
  const container = d3.select("#d3-brand-barchart");
  if (container.empty()) return;

  const svg = container
    .append("svg")
      .attr("viewBox", "0 0 650 820")
      .attr("width", "100%")
      .style("height", "auto")
      .style("display", "block")
      .style("border", "1px solid var(--border, #e2e8f0)")
      .style("border-radius", "8px")
      .style("background", "#ffffff");

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

  function renderChart(data) {
    // Sort descending by count
    data.sort((a, b) => b.count - a.count);

    // Linear scale for bar widths
    const xScale = d3.scaleLinear()
      .domain([0, 1200])
      .range([0, 440]);

    // Band scale for vertical category distribution
    const yScale = d3.scaleBand()
      .domain(data.map(d => d.brand))
      .range([20, 790])
      .padding(0.2);

    // Group container for each bar and its labels
    const barAndLabel = svg
      .selectAll("g")
      .data(data)
      .join("g")
        .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

    // Rectangles
    barAndLabel
      .append("rect")
        .attr("x", 110)
        .attr("y", 0)
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "#e8923a")
        .attr("rx", 3);

    // Brand category text
    barAndLabel
      .append("text")
        .text(d => d.brand)
        .attr("x", 100)
        .attr("y", yScale.bandwidth() / 2 + 4)
        .attr("text-anchor", "end")
        .style("font-size", "12.5px")
        .style("font-family", "var(--font-body, sans-serif)")
        .style("font-weight", "600")
        .style("fill", "var(--brown-dark, #3d2e10)");

    // Count value number text
    barAndLabel
      .append("text")
        .text(d => d.count.toLocaleString())
        .attr("x", d => 110 + xScale(d.count) + 6)
        .attr("y", yScale.bandwidth() / 2 + 4)
        .style("font-size", "12px")
        .style("font-family", "var(--font-body, sans-serif)")
        .style("font-weight", "600")
        .style("fill", "var(--brown, #7d6234)");
  }

  // Load CSV data with multi-tier fallback
  d3.csv("data/tvBrandCount.csv", rowConverter)
    .then(data => renderChart(data))
    .catch(() => {
      d3.csv("../data/tvBrandCount.csv", rowConverter)
        .then(data => renderChart(data))
        .catch(() => {
          const parsed = d3.csvParse(fallbackCsv, rowConverter);
          renderChart(parsed);
        });
    });
})();
