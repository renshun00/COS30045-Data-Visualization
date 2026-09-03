/**
 * PowerSense – main.js
 * Handles: navigation active state, mobile menu, FAQ accordion
 */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------
     1. Ensure 'Data Story' nav link exists on all pages
  ------------------------------------------------- */
  const navLinksList = document.getElementById('navLinks');
  if (navLinksList) {
    const hasDataStory = Array.from(navLinksList.querySelectorAll('a')).some(a => {
      const href = a.getAttribute('href') || '';
      return href.includes('data-story');
    });
    if (!hasDataStory) {
      const li = document.createElement('li');
      li.innerHTML = '<a href="data-story.html" class="nav__link">Data Story</a>';
      const aboutLi = Array.from(navLinksList.children).find(child => {
        const a = child.querySelector('a');
        return a && (a.getAttribute('href') || '').includes('about');
      });
      if (aboutLi) {
        navLinksList.insertBefore(li, aboutLi);
      } else {
        navLinksList.appendChild(li);
      }
    }
  }

  /* -------------------------------------------------
     2. Set active nav link based on current filename
  ------------------------------------------------- */
  const rawFile = window.location.pathname.split('/').pop() || 'index.html';
  const currentFile = rawFile.split('?')[0].split('#')[0] || 'index.html';

  document.querySelectorAll('.nav__link').forEach(link => {
    const href = (link.getAttribute('href') || '').split('?')[0].split('#')[0];
    if (href === currentFile ||
        (href === 'index.html' && (currentFile === '' || currentFile === '/' || currentFile === 'index.html'))) {
      link.classList.add('nav__link--active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('nav__link--active');
      link.removeAttribute('aria-current');
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

  /* -------------------------------------------------
     4. Footer current year
  ------------------------------------------------- */
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = y;
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) currentYearEl.textContent = y;

});
