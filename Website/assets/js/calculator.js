/**
 * PowerSense – calculator.js
 * Interactive Appliance Energy Calculator
 * All calculations are performed client-side in vanilla JavaScript.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Appliance preset data (made-up models for AU market) --- */
  const PRESETS = {
    custom:    null,
    samsung65: 180,
    lg55:      120,
    sony43:    90,
    panasonic50: 135,
    tcl32:     65,
    microwave: 1200,
    washingmachine: 500,
    refrigerator: 150,
    dishwasher: 1800,
    airconditioner: 1500,
    electricoven: 2200,
    kettleelectric: 2400,
    laptop: 65,
  };

  const form      = document.getElementById('calcForm');
  const appSelect = document.getElementById('applianceSelect');
  const wattsInput = document.getElementById('watts');
  const hoursInput = document.getElementById('hoursPerDay');
  const priceInput = document.getElementById('priceKwh');
  const resultsPanel = document.getElementById('calcResults');

  if (!form) return; // calculator not on this page

  /* --- Pre-fill watts when a preset is chosen --- */
  appSelect.addEventListener('change', () => {
    const watts = PRESETS[appSelect.value];
    if (watts !== null) {
      wattsInput.value = watts;
      clearError(wattsInput.closest('.field'));
    } else {
      wattsInput.value = '';
    }
  });

  /* --- Calculate on button click --- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validate()) {
      compute();
    }
  });

  /* --- Reset --- */
  document.getElementById('calcReset')?.addEventListener('click', () => {
    form.reset();
    resultsPanel.classList.remove('is-visible');
    document.querySelectorAll('.field').forEach(f => f.classList.remove('field--error'));
  });

  /* --- Validation --- */
  function validate() {
    let valid = true;

    const fields = [
      { el: wattsInput,  min: 0.1,  max: 30000, label: 'Power (watts)' },
      { el: hoursInput,  min: 0.01, max: 24,    label: 'Hours per day' },
      { el: priceInput,  min: 0.01, max: 500,   label: 'Electricity price' },
    ];

    fields.forEach(({ el, min, max }) => {
      const field = el.closest('.field');
      const val = parseFloat(el.value);
      if (isNaN(val) || val < min || val > max) {
        field.classList.add('field--error');
        valid = false;
      } else {
        clearError(field);
      }
    });

    return valid;
  }

  function clearError(field) {
    field.classList.remove('field--error');
  }

  /* --- Core calculations --- */
  function compute() {
    const watts       = parseFloat(wattsInput.value);
    const hoursPerDay = parseFloat(hoursInput.value);
    const centsPerKwh = parseFloat(priceInput.value);

    const pricePerKwh = centsPerKwh / 100; // convert cents → dollars

    // Energy
    const dailyKwh   = (watts * hoursPerDay) / 1000;
    const monthlyKwh = dailyKwh * 30.44;
    const yearlyKwh  = dailyKwh * 365;

    // Cost
    const dailyCost   = dailyKwh   * pricePerKwh;
    const monthlyCost = monthlyKwh * pricePerKwh;
    const yearlyCost  = yearlyKwh  * pricePerKwh;

    renderResults({ dailyKwh, monthlyKwh, yearlyKwh, dailyCost, monthlyCost, yearlyCost });
  }

  /* --- Render results to DOM --- */
  function renderResults(r) {
    document.getElementById('res-daily-kwh').textContent   = r.dailyKwh.toFixed(3);
    document.getElementById('res-monthly-kwh').textContent = r.monthlyKwh.toFixed(2);
    document.getElementById('res-yearly-kwh').textContent  = r.yearlyKwh.toFixed(1);
    document.getElementById('res-monthly-cost').textContent = '$' + r.monthlyCost.toFixed(2);
    document.getElementById('res-yearly-cost').textContent  = '$' + r.yearlyCost.toFixed(2);

    // Carbon estimate: AUS average ~0.79 kg CO₂ per kWh (2023)
    const co2Yearly = (r.yearlyKwh * 0.79).toFixed(0);
    document.getElementById('res-co2').textContent = co2Yearly + ' kg';

    resultsPanel.classList.add('is-visible');
    resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

});
