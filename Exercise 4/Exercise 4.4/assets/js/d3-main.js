/**
 * Exercise 4.4 – Loading and Preparing CSV Data with D3
 *
 * Step 1: Use row conversion function, d3.csv(), to give D3 access to data
 * Step 2: Ensure data is typed correctly (+d.count converts string to number)
 * Step 3: Find summary statistics (length, max, min, extent) and sort data
 * Step 4: Call drawBarChart(data) to pass data to the visualisation function
 */

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

/**
 * Visualisation builder function (to be fully built in Exercise 4.5)
 * @param {Array} data - Array of TV brand count objects
 */
function drawBarChart(data) {
  // Confirm call in console
  console.log("drawBarChart(data) called with:", data);

  // Render on-page status indicator so container is not empty
  d3.select("#chart")
    .html(`<div style="padding:1.5rem;background:#f8fafc;border:1px dashed #cbd5e1;border-radius:8px;text-align:center;color:#475569;">
      <p style="font-weight:600;margin-bottom:0.5rem;color:#1e293b;">✓ Dataset successfully loaded and processed (${data.length} records)</p>
      <p style="font-size:0.9rem;">Highest count: <strong>${data[0].brand} (${data[0].count})</strong> &bull; Lowest count: <strong>${data[data.length - 1].brand} (${data[data.length - 1].count})</strong></p>
      <p style="font-size:0.85rem;margin-top:0.5rem;color:#64748b;">The SVG bar chart will be drawn in Exercise 4.5. Check the developer console (<kbd>F12</kbd>) to inspect the logged outputs.</p>
    </div>`);
}

/**
 * Handle and process the loaded data according to lab instructions
 */
function handleData(data) {
  // ── Step 2: Check browser console for typed objects ────────────────────────
  console.log(data);

  // ── Step 3: Finding information about the data set ─────────────────────────
  console.log(data.length);
  console.log(d3.max(data, d => d.count));
  console.log(d3.min(data, d => d.count));
  console.log(d3.extent(data, d => d.count)); //=> array with min and max

  // Sort descending by count
  data.sort((a, b) => b.count - a.count);
  console.log(data);

  // ── Step 4: Call drawBarChart ──────────────────────────────────────────────
  drawBarChart(data);
}

// Row conversion function: casts count to number using unary plus
const rowConverter = d => ({
  brand: d.brand,
  count: +d.count
});

// Load via d3.csv with automatic fallback
d3.csv("../data/tvBrandCount.csv", rowConverter)
  .then(data => {
    handleData(data);
  })
  .catch(() => {
    // If ../data is unreachable, try relative data/
    d3.csv("data/tvBrandCount.csv", rowConverter)
      .then(data => {
        handleData(data);
      })
      .catch(() => {
        // Fallback for file:/// protocol (CORS prevents local file fetch)
        const parsed = d3.csvParse(fallbackCsv, rowConverter);
        handleData(parsed);
      });
  });
