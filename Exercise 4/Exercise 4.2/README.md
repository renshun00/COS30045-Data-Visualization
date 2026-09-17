# Run the website using Python
python -m http.server 8000

# PowerSense – Appliance Energy Consumption Website

A three-page static website about appliance energy consumption in the Australian market,
built with vanilla HTML, CSS, and JavaScript.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Home page — overview, energy calculator, FAQ accordion |
| `televisions.html` | Television energy comparison table and tips |
| `about.html` | About us, mission, team, and data sources |

## Folder Structure

```
/
├── index.html
├── televisions.html
├── about.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css          ← All styles (external CSS, no inline styles)
    ├── js/
    │   ├── main.js            ← Nav active state, mobile toggle, FAQ accordion
    │   ├── calculator.js      ← Energy calculator logic
    │   └── d3-main.js         ← D3 code for Exercise 4.2
    └── img/
        └── PowerIcon.png      ← Logo (appears in nav and footer)
```

## Features

### Navigation
- Present on all three pages
- Logo (top-left) links back to Home
- Hover effect on all nav links
- Active page highlighted with an orange underline indicator
- Active state set via JavaScript by comparing `window.location.pathname`
- Mobile-responsive hamburger menu

### Home Page
- Hero section with Australian energy market statistics
- Six feature/overview cards
- **Interactive Appliance Energy Calculator** (JavaScript extension, see below)
- FAQ accordion (six questions, hidden by default, JS-powered)
- **D3 Demo section** (Exercise 4.2)

### Televisions Page
- Panel technology overview cards
- Full energy comparison table with 12 TV models
- Energy label badges (A–F colour-coded) and star ratings
- Tips for reducing running costs

### About Us Page
- Mission statement and headline statistics
- Team members (placeholder)
- Company values
- Data sources and methodology

### Footer
- Present on all pages
- Current year (injected by JavaScript)
- Author name
- Generative AI acknowledgement

## Exercise 4.2 – D3 Manipulations

Located in `assets/js/d3-main.js`. A **separate** file from `main.js` to keep D3 code isolated.

| Step | What it does | D3 method |
|---|---|---|
| **Step 2** | Styles the `<h1>` heading colour and the D3 demo section `<h2>` | `d3.select("h1").style(...)` |
| **Step 3** | Appends a `<p>` element with text to `#d3-text-demo` div | `d3.select("#d3-text-demo").append("p").text(...)` |
| **Step 3b** | Appends text to **all** `.d3-tip` containers | `d3.selectAll(".d3-tip").append("p").text(...)` |
| **Step 4a** | Appends a `<rect>` with **no attributes** (invisible, check dev tools) | `d3.select("#d3-svg-demo").append("rect")` |
| **Step 4b** | Appends styled rects, circle, and text labels to the SVG | `.append("rect").attr(...).style(...)` |

### Scripts loaded in index.html

```html
<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="assets/js/d3-main.js"></script>
```

## JavaScript Energy Calculator

Located in `assets/js/calculator.js`. Requirements met:

| Requirement | Implementation |
|---|---|
| Appliance preset or manual watts | `<select>` populates the watts field |
| Hours per day | `<input type="number">` |
| Electricity price (c/kWh) | `<input type="number">`, defaults to 33 c |
| Daily kWh | Computed: `(W × h) / 1000` |
| Monthly kWh | `dailyKwh × 30.44` |
| Yearly kWh | `dailyKwh × 365` |
| Monthly cost | `monthlyKwh × (price/100)` |
| Yearly cost | `yearlyKwh × (price/100)` |
| CO₂ estimate | `yearlyKwh × 0.79 kg/kWh` (DCCEEW 2023) |
| Validation | Range checks + `field--error` CSS class + `aria-live` results |
| Dynamic results | Results panel updates in place, no duplicates |
| No external libraries | Pure vanilla JS |

## Styling

- **All styling in `assets/css/style.css`** — zero inline styles in HTML
- Colour palette derived from the `PowerIcon.png` logo:
  - Cream `#FAF2CE`, Gold `#F0C840`, Brown `#7D6234`, Orange `#E8923A`, Dark Brown `#3D2E10`
- Google Fonts: Playfair Display (headings) + Inter (body)
- Responsive down to mobile (hamburger nav, single-column grids)

## AI Usage Declaration

| Aspect | Details |
|---|---|
| **Tool used** | Google Antigravity (Gemini-based coding assistant) |
| **What AI generated** | `d3-main.js` (D3 code), D3 demo section in `index.html`, README updates |
| **Human review** | All generated code reviewed for correctness and exercise requirement compliance |

Content, copy, and code in this project were developed with the assistance of
Generative AI. All AI-generated content has been reviewed and adapted by the author.
