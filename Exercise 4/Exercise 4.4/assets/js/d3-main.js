/**
 * Exercise 4.4 – Loading and Preparing CSV Data with D3
 *
 * Step 1: Use row conversion function, d3.csv(), to give D3 access to data
 * Step 2: Ensure data is typed correctly (+d.count converts string to number)
 * Step 3: Find summary statistics (length, max, min, extent) and sort data
 * Step 4: Call drawBarChart(data) to pass data to the visualisation function
 */

/**
 * Visualisation builder function (to be fully built in Exercise 4.5)
 * @param {Array} data - Array of TV brand count objects
 */
function drawBarChart(data) {
  console.log("drawBarChart called with data:", data);
}

// ── Step 1 & 2: Load CSV with Row Conversion Function ────────────────────────
d3.csv("../data/tvBrandCount.csv", d => {
  return {
    brand: d.brand,
    count: +d.count //=> converts count string to number
  };
}).then(data => {
  // ── Step 2: Check browser console for typed objects ────────────────────────
  console.log("Raw loaded data:", data);

  // ── Step 3: Finding information about the data set ─────────────────────────
  console.log("Dataset length:", data.length);
  console.log("Max count (d3.max):", d3.max(data, d => d.count));
  console.log("Min count (d3.min):", d3.min(data, d => d.count));
  console.log("Extent [min, max] (d3.extent):", d3.extent(data, d => d.count));

  // Sort data descending by count for easier interpretation
  data.sort((a, b) => b.count - a.count);
  console.log("Sorted data (descending by count):", data);

  // ── Call drawBarChart to pass data to visualisation ────────────────────────
  drawBarChart(data);

}).catch(error => {
  // Fallback in case server root is Exercise 4.4 rather than Exercise 4
  console.warn("Could not load '../data/tvBrandCount.csv', trying 'data/tvBrandCount.csv':", error);
  d3.csv("data/tvBrandCount.csv", d => {
    return {
      brand: d.brand,
      count: +d.count
    };
  }).then(data => {
    console.log("Raw loaded data:", data);
    console.log("Dataset length:", data.length);
    console.log("Max count (d3.max):", d3.max(data, d => d.count));
    console.log("Min count (d3.min):", d3.min(data, d => d.count));
    console.log("Extent [min, max] (d3.extent):", d3.extent(data, d => d.count));

    data.sort((a, b) => b.count - a.count);
    console.log("Sorted data (descending by count):", data);

    drawBarChart(data);
  }).catch(err => {
    console.error("Failed to load CSV data:", err);
  });
});
