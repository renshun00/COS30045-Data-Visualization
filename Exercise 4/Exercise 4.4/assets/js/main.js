/**
 * PowerSense – main.js
 * Handles: navigation active state, mobile menu, FAQ accordion
 */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------
     1. Set active nav link based on current filename
  ------------------------------------------------- */
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentFile ||
        (href === 'index.html' && (currentFile === '' || currentFile === '/'))) {
      link.classList.add('nav__link--active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* -------------------------------------------------
     2. Mobile hamburger toggle
  ------------------------------------------------- */
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* -------------------------------------------------
     3. FAQ Accordion
  ------------------------------------------------- */
  document.querySelectorAll('.faq-item__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const body = document.getElementById(trigger.getAttribute('aria-controls'));
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Close all others (single-open behaviour)
      document.querySelectorAll('.faq-item__trigger').forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        document.getElementById(t.getAttribute('aria-controls'))?.classList.remove('is-open');
      });

      // Toggle current
      if (!isExpanded) {
        trigger.setAttribute('aria-expanded', 'true');
        body.classList.add('is-open');
      }
    });
  });

});
