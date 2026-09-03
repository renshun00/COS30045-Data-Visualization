# Run the website using Python
python -m http.server 8000

# PowerSense – Appliance Energy Consumption & TV Data Story

A multi-page responsive web application dedicated to appliance energy consumption and market analytics in Australia, built with vanilla HTML5, CSS3, and modern JavaScript.

## Website Pages

| File | Page Title | Description |
|------|------------|-------------|
| `index.html` | Home | National overview, quick statistics, interactive appliance energy calculator, FAQ accordion |
| `televisions.html` | Televisions Guide | Panel technology breakdown, star rating comparisons, comprehensive specifications table |
| `data-story.html` | **Data Story & Visualisations** | **Two interactive data storyboards featuring SVG Pie & Bar charts detailing Australian TV brand distribution and screen size energy consumption** |
| `about.html` | About Us | Project mission, organizational values, team profiles, and data governance overview |

## Folder Structure

```
/
├── index.html                  ← Home page
├── televisions.html            ← TV Energy Guide & comparison table
├── data-story.html             ← Interactive Data Storyboards & Visualisations (NEW)
├── about.html                  ← About us & project governance
├── README.md                   ← Full project documentation & data governance
├── data/
│   ├── BrandCount.csv          ← Australian TV brand availability dataset (Feb 2026)
│   └── screen_size.csv         ← TV screen sizes, categories & energy consumption dataset
└── assets/
    ├── css/
    │   └── style.css           ← External design system stylesheet (zero inline styles)
    ├── js/
    │   ├── main.js             ← Global navigation, mobile toggle, active state
    │   ├── calculator.js       ← Interactive appliance energy cost calculator
    │   └── charts.js           ← Custom interactive SVG Pie & Bar visualisations engine
    └── img/
        └── PowerIcon.png       ← Brand logo (navigation and footer)
```

---

## 1. Audience Analysis & Characteristics

### Primary Audience: Prospective Australian TV Buyers & Households
* **Profile**: Everyday Australian consumers, homeowners, and renters shopping for a new television in retail stores or online (JB Hi-Fi, The Good Guys, Harvey Norman, Kogan, Appliances Online).
* **Demographics**: Working adults, families, and budget-conscious individuals facing rising domestic utility tariffs (currently averaging 30–35¢ per kWh across NSW, VIC, QLD, and SA).
* **Technical Literacy**: Varied; most buyers understand screen size diagonal (e.g. 55" or 75") and brand reputation, but find official energy rating registry codes, standby metrics, and annual kilowatt-hour (kWh/year) figures abstract.
* **Key Motivation**: Wanting to upgrade living room entertainment without getting trapped in high recurring electricity bills or buyer's remorse.

### Secondary Audience: Consumer Advocates, Energy Analysts & Retailers
* **Profile**: Consumer policy bodies (e.g. CHOICE Australia), environmental advocacy groups, energy efficiency consultants, and consumer electronic retailers.
* **Key Motivation**: Tracking market concentration (e.g. which brands offer the most models), understanding whether manufacturers are meeting efficiency targets, and identifying whether larger screen formats are driving up household power footprints.

### Prioritised Questions
| Priority | Core Question | Why It Matters to the Audience |
|----------|---------------|--------------------------------|
| **P1 (Highest)** | *How much extra energy does choosing a large screen (70"+) consume compared to a medium (55") or small (32"-43") screen?* | Direct impact on recurring annual power bills ($50/year vs $250+/year). |
| **P2** | *Which TV brands dominate the Australian market, and do budget brands offer comparable energy efficiency to premium giants?* | Guides purchasing decisions across brand loyalty, budget constraints, and warranty trust. |
| **P3** | *What is the cumulative 5-to-10 year running cost of different TV size categories?* | Reveals that upfront price discounts on large budget screens can be wiped out by elevated annual operating power costs. |
| **P4** | *Is the Australian market monopolised or diverse?* | Informs consumers about options beyond the top three dominant brands (Samsung, Kogan, LG). |

---

## 2. Guidelines for the Visualisation Story

To ensure maximum comprehension and visual impact for both non-technical consumers and analytical readers, the following guidelines were established:

1. **Lead with Context, Escalate to Actionable Insight (Narrative Arc)**:
   * **Act 1 (Market Context)**: Establish who manufactures and supplies televisions in Australia using a Brand Distribution Pie Chart.
   * **Act 2 (The Size Dilemma)**: Reveal how screen scale dramatically inflates power consumption using a comparative Bar Chart.
   * **Act 3 (Resolution & Decision Framework)**: Provide a dynamic cost translator and clear buying rules to empower confident purchasing.
2. **Translate Abstract Units into Tangible Value**:
   * Always accompany raw electrical metrics (`kWh/year`) with estimated financial figures (`$ AUD/year`) calculated at prevailing Australian tariff benchmarks (33¢/kWh).
3. **Perceptual Hierarchy & Color Accessibility**:
   * Maintain the curated PowerSense warm aesthetic (cream `#FAF2CE`, gold `#F0C840`, orange `#E8923A`, deep brown `#7D6234`, dark brown `#3D2E10`).
   * For the pie chart, avoid visual noise from 70+ minor brands by showcasing the top tier brands individually and aggregating long-tail entries into an interactive "Others" slice.
   * In bar charts, sort categories logically (Small → Medium → Large) rather than alphabetically to demonstrate exponential progression.
4. **Interactive Engagement over Static Display**:
   * Include dynamic hover states, responsive SVG tooltips displaying percentage share, model counts, average kWh, and annual running costs.
   * Provide an interactive tariff slider so visitors can immediately recalculate annual costs for their specific energy retailer rates.

---

## 3. Data Story

The Data Story is hosted on the new **"Data Story"** tab (`data-story.html`) and is structured using the standard **6-panel visual storyboard methodology** (Issue $\rightarrow$ Demonstrate Issue $\rightarrow$ Ideas for Overcoming $\rightarrow$ Describe Plan $\rightarrow$ Show Data $\rightarrow$ Recommendation), modeled directly on the 3×2 sticky-note framework:

### Storyboard 1: Market Concentration — Who Powers Australian Living Rooms?
* **Objective**: Expose the structural concentration of television manufacturing in Australia using `BrandCount.csv` (4,116 models across 75 brands).
* **6-Step Storyboard Structure**:
  1. **Issue**: Consumers face an illusion of abundance with over 75 registered brands, mistakenly assuming broad price and energy innovation competition.
  2. **Demonstrate Issue (Visualisation)**: An interactive **Pie / Donut Chart** reveals that just three companies—**Samsung (26.6%)**, **Kogan (19.1%)**, and **LG (16.4%)**—dominate **62.2%** of all certified TV models in Australia.
  3. **Ideas for Overcoming Issue**: Promote cross-brand efficiency transparency by auditing government GEMS registry data rather than relying on manufacturer marketing.
  4. **Describe Evaluation Strategy**: Segment brands into three functional tiers (Market Leaders, Mid-Tier Value Disruptors, and Niche Specialists) to benchmark energy efficiency against purchase price.
  5. **Show Evidence & Comparative Data**: Analysis reveals that brand prestige does not guarantee energy thrift; several flagship models from the Big 3 score as low as 1.5–2.5 stars, while budget brands (Bauhn, Linsar) deliver 6-star models under $600.
  6. **RECOMMENDATION**: Look past brand logos! Filter TVs by certified 5+ Energy Stars first, and support high-efficiency challenger brands to force the oligopoly to innovate.

---

### Storyboard 2: The Screen Size Dilemma — How Much Does Immersion Cost?
* **Objective**: Quantify the non-linear energy tax incurred when upsizing television displays using `screen_size.csv` (Small, Medium, Large categories).
* **6-Step Storyboard Structure**:
  1. **Issue**: Affordable manufacturing has triggered a screen size explosion (75"–98"+). Buyers purchase massive screens without recognizing the steep, recurring 10-year electricity penalty.
  2. **Demonstrate Issue (Visualisation)**: An interactive **Bar Chart** plots the certified average labelled energy consumption:
     * **Small (< 48")**: **156.4 kWh/year** (~$52/year) · 360 models
     * **Medium (48"–65")**: **397.7 kWh/year** (~$131/year, **2.5×** jump) · 569 models
     * **Large (> 65")**: **766.4 kWh/year** (~$253/year, **4.9×** jump) · 289 models
  3. **Ideas for Overcoming Issue**: Institute an objective Room Viewing-Distance Sizing Rule and calculate 10-Year Total Cost of Ownership (TCO) prior to purchase.
  4. **Describe Sizing Framework**: The 2.5-Metre Rule (for distances under 2.8m, a 55"–65" TV provides optimal 40° field of view without the 85" power penalty), automated ambient brightness sensor activation, and disabling showroom "Vivid" mode.
  5. **Show Data & Tariff Impact**: A live interactive **Electricity Tariff Simulator** allowing households to test rates from 20¢ to 50¢/kWh, proving that a Large TV adds over **$2,010 in extra electricity** over 10 years compared to a Small screen.
  6. **RECOMMENDATION**: Choose the 55"–65" Medium sweet spot for the best balance of immersion and energy thrift (~$131/yr). If buying 75"+, strictly mandate 5.5+ energy stars to prevent thousands in bill waste.

---

## 4. About the Data

### Data Source
* **Origin**: Data is derived from the official Australian Government **Equipment Energy Efficiency (E3) Program** and the **Greenhouse and Energy Minimum Standards (GEMS) Regulator** public appliance database.
* **Coverage Date**: February 2026 registry snapshot of active televisions registered for legal sale and distribution in Australia (with shared registration flags across New Zealand and Fiji).
* **Fields Captured**: Brand registration name (`Brand_Reg`), model numbers (`Model_No`), regional availability (`SoldIn`), screen dimensions in cm and inches (`screensize`), panel technology (`Screen_Tech`), official certified energy consumption (`Labelled energy consumption (kWh/year)`), energy star ratings (`Star2`), and categorized screen size tier (`screensize_category`).

### Data Processing & Pipeline
1. **Cleaning & Standardization**:
   * Brand names were normalized (lowercased in `BrandCount.csv`, title-cased for presentation) to reconcile duplicate manufacturer registrations (e.g., "SAMSUNG ELECTRONICS" vs "Samsung").
   * Numerical fields for energy consumption (`kWh/year`) and screen diagonal (cm/inches) were parsed, validated, and scrubbed of text artifacts.
2. **Categorisation**:
   * Screen sizes were partitioned into three mutually exclusive categories:
     * **Small**: Diagonal `< 48 inches` (typically 19", 24", 32", 40", 42", 43").
     * **Medium**: Diagonal `48 inches to 65 inches` (typically 48", 50", 55", 58", 60", 65").
     * **Large**: Diagonal `> 65 inches` (typically 70", 75", 77", 82", 85", 86", 98", 100", 115").
3. **Statistical Aggregation**:
   * Brand frequency counts were compiled to calculate proportional market shares.
   * Arithmetic means, minimums, maximums, and standard deviations were computed for each screen size tier to form the foundation for the bar chart.

### Privacy
* **Compliance**: The underlying data represents public corporate and appliance technical specifications obtained from an open government register.
* **Zero PII**: The dataset contains zero Personally Identifiable Information (PII), zero consumer transaction histories, zero user location logs, and zero retailer IP addresses. There are no privacy breaches or confidentiality violations under the Australian Privacy Act 1988.

### Accuracy & Limitations
* **Standardized Laboratory Testing vs. Real-World Behaviour**:
  * Labelled energy figures are determined using Australian Standard **AS/NZS 62087** (simulated standard viewing modes at predefined factory brightness).
  * In practice, household consumption can vary significantly depending on user picture mode (e.g. Vivid/Dynamic mode vs Eco mode), ambient room lighting sensors, ambient operating temperature, HDR gaming brightness, and audio volume.
* **Model Count vs. Units Sold**:
  * The dataset counts the number of *registered model variants* available in the market, not retail unit sales volume. A brand like Kogan with dozens of specific model variants occupies a large slice of registrations, which correlates strongly with, but is not identical to, Point-of-Sale unit volumes.
* **Temporal Snapshot**:
  * Data reflects registrations valid as of February 2026. Future firmware updates, discontinuation of older stock, or release of new model lines may shift these metrics over time.

### Ethics
* **Impartiality & Commercial Neutrality**: PowerSense operates independently without retail sponsorships, manufacturer kickbacks, affiliate tracking links, or brand bias. All brands are evaluated solely on registered technical data.
* **Environmental Transparency**: By converting obscure laboratory kWh ratings into annual household operating costs and greenhouse gas footprints (using the Australian National Greenhouse Accounts factor of 0.79 kg CO₂-e/kWh), the visualization upholds the ethical imperative of environmental accountability and empowered consumer consent.

---

## 5. AI Declaration

In accordance with academic integrity and ethical AI usage guidelines:

* **Tools Used**: Google DeepMind Antigravity AI assistant.
* **Nature of Assistance**:
  * Giving idea and structure for audience analysis and visual storytelling guidelines.
  * Authoring semantic HTML5 and vanilla JavaScript rendering code for the custom SVG Pie Chart and Bar Chart.
  * Assisting with Markdown drafting for documentation sections.
* **Human Oversight & Verification**: All generated code, mathematical calculations, visual layouts, and written analyses have been reviewed, verified, tested in browser environments, and validated for technical accuracy and adherence to course requirements by the author.

---

## Technical Features & Implementation Notes

### Interactive Visualisations (`assets/js/charts.js`)
* **Pure Vanilla JavaScript & SVG**: Built from the ground up without relying on external CDNs or heavy graphing libraries, ensuring blazing fast load times and total styling coherence with `style.css`.
* **Responsive Donut/Pie Chart**:
  * Dynamic mathematical arc drawing using SVG path trigonometry (`sin`/`cos`).
  * Segment hover focus, slice explosion animation, active slice tooltips showing model count and market share percentage.
  * Interactive legend with brand highlight filtering.
* **Responsive Screen Size Bar Chart**:
  * Proportional vertical SVG bar rendering with smooth entry transitions.
  * Value labels displaying exact average kWh/year directly above each bar.
  * Integrated annual cost pills calculated dynamically at standard Australian tariffs.
  * Rich tooltips displaying model count, sample range, and percentage comparison relative to small displays.
* **Live Energy Cost Calculator Widget**:
  * Allows visitors on the Data Story page to adjust electricity tariff rates (c/kWh) and daily viewing hours (h/day) to observe real-time recalculations of annual running costs across all three screen tiers.

### Navigation
* Standardized navigation header across all 4 pages (`index.html`, `televisions.html`, `data-story.html`, `about.html`).
* Dynamic active state detection via `window.location.pathname`.
* Fully responsive hamburger navigation menu for mobile devices.
