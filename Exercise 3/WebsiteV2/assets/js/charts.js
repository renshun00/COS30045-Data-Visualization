/**
 * PowerSense – charts.js
 * High-performance, responsive, accessible SVG visualisations:
 * 1. Brand Distribution Pie / Donut Chart (BrandCount.csv)
 * 2. Screen Size vs Average Energy Consumption Bar Chart (screen_size.csv)
 * 3. Interactive live cost calculation and tooltip system
 */

/* ==========================================================================
   DATA DEFINITIONS (Derived from BrandCount.csv & screen_size.csv)
   ========================================================================== */

const BRAND_DATA = [
  { brand: 'Samsung', count: 1096, color: '#E8923A' },
  { brand: 'Kogan', count: 788, color: '#F0C840' },
  { brand: 'LG', count: 677, color: '#7D6234' },
  { brand: 'Hisense', count: 263, color: '#2B7A78' },
  { brand: 'Eko', count: 189, color: '#E76F51' },
  { brand: 'Sylvox', count: 132, color: '#457B9D' },
  { brand: 'JVC', count: 122, color: '#D97706' },
  { brand: 'Philips', count: 118, color: '#2A9D8F' },
  { brand: 'Blaupunkt', count: 110, color: '#B45309' },
  { brand: 'TCL', count: 91, color: '#8B5CF6' },
  { brand: 'Sony', count: 80, color: '#3D2E10' },
  { brand: 'Other 64 Brands', count: 450, color: '#B89A60' }
];

const TOTAL_BRANDS_MODELS = BRAND_DATA.reduce((sum, item) => sum + item.count, 0); // 4116

const SCREEN_SIZE_DATA = [
  {
    category: 'Small',
    range: '< 48" (19" – 43")',
    avgKwh: 156.4,
    models: 360,
    minKwh: 56,
    maxKwh: 397,
    color: '#2A9D8F',
    mult: '1.0x (Baseline)'
  },
  {
    category: 'Medium',
    range: '48" – 65"',
    avgKwh: 397.7,
    models: 569,
    minKwh: 149,
    maxKwh: 1011,
    color: '#E8923A',
    mult: '2.5x vs Small'
  },
  {
    category: 'Large',
    range: '> 65" (70" – 116")',
    avgKwh: 766.4,
    models: 289,
    minKwh: 258,
    maxKwh: 2652,
    color: '#C94A29',
    mult: '4.9x vs Small'
  }
];

let currentElectricityPriceCents = 33; // Default 33c/kWh benchmark

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */

function initCharts() {
  try {
    initBrandPieChart();
  } catch (err) {
    console.error('Error initializing Brand Pie Chart:', err);
  }
  try {
    initScreenSizeBarChart();
  } catch (err) {
    console.error('Error initializing Screen Size Bar Chart:', err);
  }
  try {
    initInteractiveCostCalculator();
  } catch (err) {
    console.error('Error initializing Cost Calculator:', err);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCharts);
} else {
  initCharts();
}

/* ==========================================================================
   STORYBOARD 1: BRAND DISTRIBUTION PIE / DONUT CHART
   ========================================================================== */

function initBrandPieChart() {
  const container = document.getElementById('brandPieChartContainer');
  if (!container) return;

  const width = 480;
  const height = 480;
  const radius = Math.min(width, height) / 2;
  const innerRadius = radius * 0.54;
  const outerRadius = radius * 0.90;

  // Build SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('class', 'chart-svg');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Donut chart showing television brand distribution in Australia for February 2026');

  // Center group
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('transform', `translate(${width / 2}, ${height / 2})`);
  svg.appendChild(g);

  // Center label display
  const centerTextGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  centerTextGroup.setAttribute('class', 'donut-center-group');

  const centerTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  centerTitle.setAttribute('class', 'donut-center-title');
  centerTitle.setAttribute('text-anchor', 'middle');
  centerTitle.setAttribute('dy', '-0.4em');
  centerTitle.textContent = 'Total Models';

  const centerValue = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  centerValue.setAttribute('class', 'donut-center-value');
  centerValue.setAttribute('text-anchor', 'middle');
  centerValue.setAttribute('dy', '0.9em');
  centerValue.textContent = TOTAL_BRANDS_MODELS.toLocaleString();

  const centerSub = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  centerSub.setAttribute('class', 'donut-center-sub');
  centerSub.setAttribute('text-anchor', 'middle');
  centerSub.setAttribute('dy', '2.5em');
  centerSub.textContent = '75 Brands (Feb 2026)';

  centerTextGroup.appendChild(centerTitle);
  centerTextGroup.appendChild(centerValue);
  centerTextGroup.appendChild(centerSub);
  g.appendChild(centerTextGroup);

  // Calculate angles and render slices
  let startAngle = -Math.PI / 2;
  const sliceElements = [];
  let activeIndex = -1;

  BRAND_DATA.forEach((item, index) => {
    const angleSpan = (item.count / TOTAL_BRANDS_MODELS) * (Math.PI * 2);
    const endAngle = startAngle + angleSpan;
    const sharePercent = ((item.count / TOTAL_BRANDS_MODELS) * 100).toFixed(1);

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', describeArc(0, 0, innerRadius, outerRadius, startAngle, endAngle));
    path.setAttribute('fill', item.color);
    path.setAttribute('class', 'donut-slice');
    path.setAttribute('data-brand', item.brand);
    path.setAttribute('data-count', item.count);
    path.setAttribute('data-share', sharePercent);
    path.setAttribute('tabindex', '0');
    path.setAttribute('role', 'graphics-symbol');
    path.setAttribute('aria-label', `${item.brand}: ${item.count} models, ${sharePercent}% of market`);

    // Slice interaction — NO path redraw, just CSS class + center text update
    const setHighlight = (active) => {
      if (active) {
        // Dim all other slices, highlight this one
        if (activeIndex !== index) {
          activeIndex = index;
          sliceElements.forEach((s, si) => {
            if (si !== index) {
              s.path.style.opacity = '0.45';
              s.path.classList.remove('donut-slice--active');
            }
          });
        }
        path.style.opacity = '1';
        path.classList.add('donut-slice--active');
        centerTitle.textContent = item.brand;
        centerValue.textContent = `${item.count} models`;
        centerSub.textContent = `${sharePercent}% market share`;
        highlightLegendItem(index, true);
      } else {
        // Restore all slices
        activeIndex = -1;
        sliceElements.forEach(s => {
          s.path.style.opacity = '1';
          s.path.classList.remove('donut-slice--active');
        });
        centerTitle.textContent = 'Total Models';
        centerValue.textContent = TOTAL_BRANDS_MODELS.toLocaleString();
        centerSub.textContent = '75 Brands (Feb 2026)';
        highlightLegendItem(index, false);
      }
    };

    path.addEventListener('mouseenter', () => setHighlight(true));
    path.addEventListener('mouseleave', () => setHighlight(false));
    path.addEventListener('focus', () => setHighlight(true));
    path.addEventListener('blur', () => setHighlight(false));

    g.appendChild(path);
    sliceElements.push({ path, setHighlight, index });
    startAngle = endAngle;
  });

  container.innerHTML = '';
  container.appendChild(svg);

  // Render legend
  renderBrandLegend(sliceElements);
}

function describeArc(x, y, rIn, rOut, startAngle, endAngle) {
  const isCircle = endAngle - startAngle >= Math.PI * 2;
  if (isCircle) endAngle = startAngle + Math.PI * 1.9999;

  const x1 = x + rOut * Math.cos(startAngle);
  const y1 = y + rOut * Math.sin(startAngle);
  const x2 = x + rOut * Math.cos(endAngle);
  const y2 = y + rOut * Math.sin(endAngle);

  const x3 = x + rIn * Math.cos(endAngle);
  const y3 = y + rIn * Math.sin(endAngle);
  const x4 = x + rIn * Math.cos(startAngle);
  const y4 = y + rIn * Math.sin(startAngle);

  const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

  return [
    `M ${x1} ${y1}`,
    `A ${rOut} ${rOut} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
    `L ${x3} ${y3}`,
    `A ${rIn} ${rIn} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
    'Z'
  ].join(' ');
}

function renderBrandLegend(sliceElements) {
  const legendContainer = document.getElementById('brandPieLegend');
  if (!legendContainer) return;

  legendContainer.innerHTML = '';
  BRAND_DATA.forEach((item, index) => {
    const share = ((item.count / TOTAL_BRANDS_MODELS) * 100).toFixed(1);
    const itemEl = document.createElement('button');
    itemEl.className = 'legend-item';
    itemEl.id = `legend-brand-${index}`;
    itemEl.setAttribute('type', 'button');
    itemEl.setAttribute('aria-label', `Highlight ${item.brand}`);

    itemEl.innerHTML = `
      <span class="legend-swatch" style="background-color: ${item.color};"></span>
      <span class="legend-name">${item.brand}</span>
      <span class="legend-count">${item.count}</span>
      <span class="legend-percent">${share}%</span>
    `;

    itemEl.addEventListener('mouseenter', () => sliceElements[index].setHighlight(true));
    itemEl.addEventListener('mouseleave', () => sliceElements[index].setHighlight(false));
    itemEl.addEventListener('focus', () => sliceElements[index].setHighlight(true));
    itemEl.addEventListener('blur', () => sliceElements[index].setHighlight(false));

    legendContainer.appendChild(itemEl);
  });
}

function highlightLegendItem(index, active) {
  const item = document.getElementById(`legend-brand-${index}`);
  if (item) {
    if (active) item.classList.add('legend-item--active');
    else item.classList.remove('legend-item--active');
  }
}

/* ==========================================================================
   STORYBOARD 2: SCREEN SIZE VS ENERGY CONSUMPTION BAR CHART
   ========================================================================== */

function initScreenSizeBarChart() {
  renderScreenSizeBarChart();
}

function renderScreenSizeBarChart() {
  const container = document.getElementById('screenSizeBarChartContainer');
  if (!container) return;

  const width = 640;
  const height = 400;
  const margin = { top: 48, right: 30, bottom: 65, left: 70 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Max value with head-room
  const maxKwh = 900;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('class', 'chart-svg');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Bar chart showing average labelled energy consumption for small, medium, and large televisions');

  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('transform', `translate(${margin.left}, ${margin.top})`);
  svg.appendChild(g);

  // Background grid lines & Y-axis ticks
  const yTicks = [0, 200, 400, 600, 800];
  yTicks.forEach(tick => {
    const y = innerHeight - (tick / maxKwh) * innerHeight;

    // Grid line
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '0');
    line.setAttribute('x2', innerWidth);
    line.setAttribute('y1', y);
    line.setAttribute('y2', y);
    line.setAttribute('stroke', tick === 0 ? 'var(--brown-dark)' : 'rgba(125, 98, 52, 0.14)');
    line.setAttribute('stroke-dasharray', tick === 0 ? 'none' : '3,4');
    g.appendChild(line);

    // Y Label
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '-12');
    text.setAttribute('y', y + 4);
    text.setAttribute('text-anchor', 'end');
    text.setAttribute('class', 'chart-axis-label');
    text.textContent = tick;
    g.appendChild(text);
  });

  // Y-axis title
  const yTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  yTitle.setAttribute('transform', 'rotate(-90)');
  yTitle.setAttribute('x', -innerHeight / 2);
  yTitle.setAttribute('y', -50);
  yTitle.setAttribute('text-anchor', 'middle');
  yTitle.setAttribute('class', 'chart-axis-title');
  yTitle.textContent = 'Avg. Energy Consumption (kWh / year)';
  g.appendChild(yTitle);

  // Bars rendering
  const barWidth = 90;
  const categorySpacing = innerWidth / SCREEN_SIZE_DATA.length;

  SCREEN_SIZE_DATA.forEach((d, i) => {
    const barX = i * categorySpacing + (categorySpacing - barWidth) / 2;
    const barHeight = (d.avgKwh / maxKwh) * innerHeight;
    const barY = innerHeight - barHeight;
    const annualCost = ((d.avgKwh * currentElectricityPriceCents) / 100).toFixed(0);

    const barGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    barGroup.setAttribute('class', 'barchart-item');
    barGroup.setAttribute('tabindex', '0');
    barGroup.setAttribute('role', 'graphics-symbol');
    barGroup.setAttribute('aria-label', `${d.category} TVs: ${d.avgKwh} kWh/year on average ($${annualCost}/yr), based on ${d.models} models`);

    // Gradient def
    const defs = svg.querySelector('defs') || document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    if (!svg.querySelector('defs')) svg.appendChild(defs);

    const gradId = `barGrad-${i}`;
    const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    grad.setAttribute('id', gradId);
    grad.setAttribute('x1', '0');
    grad.setAttribute('y1', '0');
    grad.setAttribute('x2', '0');
    grad.setAttribute('y2', '1');

    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', d.color);

    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', d.color);
    stop2.setAttribute('stop-opacity', '0.85');

    grad.appendChild(stop1);
    grad.appendChild(stop2);
    defs.appendChild(grad);

    // Bar rectangle
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', barX);
    rect.setAttribute('y', barY);
    rect.setAttribute('width', barWidth);
    rect.setAttribute('height', barHeight);
    rect.setAttribute('rx', '6');
    rect.setAttribute('ry', '6');
    rect.setAttribute('fill', `url(#${gradId})`);
    rect.setAttribute('class', 'chart-bar');
    barGroup.appendChild(rect);

    // Value text above bar (kWh)
    const valText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    valText.setAttribute('x', barX + barWidth / 2);
    valText.setAttribute('y', barY - 10);
    valText.setAttribute('text-anchor', 'middle');
    valText.setAttribute('class', 'chart-bar-value');
    valText.textContent = `${d.avgKwh.toFixed(1)} kWh`;
    barGroup.appendChild(valText);

    // Cost pill text above bar
    const costPill = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    costPill.setAttribute('x', barX + barWidth / 2);
    costPill.setAttribute('y', barY - 26);
    costPill.setAttribute('text-anchor', 'middle');
    costPill.setAttribute('class', 'chart-bar-cost');
    costPill.textContent = `~$${annualCost}/yr`;
    barGroup.appendChild(costPill);

    // X Category label
    const xLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    xLabel.setAttribute('x', barX + barWidth / 2);
    xLabel.setAttribute('y', innerHeight + 24);
    xLabel.setAttribute('text-anchor', 'middle');
    xLabel.setAttribute('class', 'chart-bar-category');
    xLabel.textContent = d.category;
    barGroup.appendChild(xLabel);

    // X Range Sub-label
    const xSub = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    xSub.setAttribute('x', barX + barWidth / 2);
    xSub.setAttribute('y', innerHeight + 42);
    xSub.setAttribute('text-anchor', 'middle');
    xSub.setAttribute('class', 'chart-bar-sub');
    xSub.textContent = d.range;
    barGroup.appendChild(xSub);

    // Tooltip interaction
    barGroup.addEventListener('mouseenter', (e) => showBarTooltip(e, d, annualCost));
    barGroup.addEventListener('mousemove', (e) => updateTooltipPosition(e));
    barGroup.addEventListener('mouseleave', hideBarTooltip);
    barGroup.addEventListener('focus', (e) => showBarTooltip(e, d, annualCost));
    barGroup.addEventListener('blur', hideBarTooltip);

    g.appendChild(barGroup);
  });

  container.innerHTML = '';
  container.appendChild(svg);
}

/* Tooltip Helpers */
function showBarTooltip(e, data, annualCost) {
  let tooltip = document.getElementById('chartTooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'chartTooltip';
    tooltip.className = 'chart-tooltip';
    document.body.appendChild(tooltip);
  }

  tooltip.innerHTML = `
    <div class="tooltip-header" style="color:${data.color};">
      <strong>${data.category} TVs (${data.range})</strong>
    </div>
    <div class="tooltip-body">
      <div><strong>Average Consumption:</strong> ${data.avgKwh.toFixed(1)} kWh/year</div>
      <div><strong>Est. Annual Running Cost:</strong> ~$${annualCost} AUD (at ${currentElectricityPriceCents}¢/kWh)</div>
      <div><strong>Sample Size:</strong> ${data.models} certified models</div>
      <div><strong>Observed Range:</strong> ${data.minKwh} – ${data.maxKwh} kWh/year</div>
      <div><strong>Scale Factor:</strong> <span class="badge badge--gold">${data.mult}</span></div>
    </div>
  `;
  tooltip.style.display = 'block';
  updateTooltipPosition(e);
}

function updateTooltipPosition(e) {
  const tooltip = document.getElementById('chartTooltip');
  if (!tooltip) return;
  const x = e.pageX || (e.touches && e.touches[0].pageX);
  const y = e.pageY || (e.touches && e.touches[0].pageY);
  tooltip.style.left = `${x + 14}px`;
  tooltip.style.top = `${y - 20}px`;
}

function hideBarTooltip() {
  const tooltip = document.getElementById('chartTooltip');
  if (tooltip) tooltip.style.display = 'none';
}

/* ==========================================================================
   INTERACTIVE ELECTRICITY COST SIMULATOR
   ========================================================================== */

function initInteractiveCostCalculator() {
  const tariffSlider = document.getElementById('tariffSlider');
  const tariffDisplay = document.getElementById('tariffDisplay');

  if (!tariffSlider) return;

  tariffSlider.addEventListener('input', (e) => {
    currentElectricityPriceCents = parseFloat(e.target.value) || 33;
    if (tariffDisplay) {
      tariffDisplay.textContent = `${currentElectricityPriceCents}¢ / kWh`;
    }
    renderScreenSizeBarChart();
    updateComparisonCards();
  });

  updateComparisonCards();
}

function updateComparisonCards() {
  const smallCostEl = document.getElementById('calcCostSmall');
  const medCostEl = document.getElementById('calcCostMedium');
  const largeCostEl = document.getElementById('calcCostLarge');
  const diffEl = document.getElementById('calcCostDiff');

  const smallCost = ((156.4 * currentElectricityPriceCents) / 100).toFixed(0);
  const medCost = ((397.7 * currentElectricityPriceCents) / 100).toFixed(0);
  const largeCost = ((766.4 * currentElectricityPriceCents) / 100).toFixed(0);
  const tenYearDiff = ((largeCost - smallCost) * 10).toLocaleString();

  if (smallCostEl) smallCostEl.textContent = `$${smallCost}`;
  if (medCostEl) medCostEl.textContent = `$${medCost}`;
  if (largeCostEl) largeCostEl.textContent = `$${largeCost}`;
  if (diffEl) diffEl.textContent = `$${tenYearDiff}`;
}
