//////////////////////////////////////////////////////////////
// Accessibility related fixes - SAFE for Will Myers menus, Corrected using ChatGPT
//////////////////////////////////////////////////////////////

(function () {
  // ----------------------------
  // Helpers
  // ----------------------------
  function appendToAriaLabelForSpecificHref(targetHref, textToAppend) {
    const elements = document.querySelectorAll('[href]');
    elements.forEach((el) => {
      if (el.getAttribute('href') === targetHref) {
        const current = el.getAttribute('aria-label');
        const next = current ? current + textToAppend : textToAppend;
        el.setAttribute('aria-label', next);
      }
    });
  }

  function appendToAriaLabelForExternalLinks() {
    const elements = document.querySelectorAll('[href][target="_blank"]');
    elements.forEach((el) => {
      const textToAppend = ' (opens in a new tab)';
      const current = el.getAttribute('aria-label');
      const next = current ? current + textToAppend : textToAppend;
      el.setAttribute('aria-label', next);
    });
  }

  // Squarespace can re-render header/nav; re-run safely
  function runNavA11yEnhancements() {
    // Add ARIA to folder toggles (does not control behavior)
    const folderLinks = document.querySelectorAll(
      '.header-nav-item--folder > a, .header-nav-item--nested-folder > a'
    );

    folderLinks.forEach((a) => {
      a.setAttribute('aria-haspopup', 'true');

      // Try to link to submenu if present
      const parent = a.closest('.header-nav-item--folder, .header-nav-item--nested-folder');
      if (!parent) return;

      const submenu = parent.querySelector('.header-nav-folder-content');
      if (!submenu) return;

      // Ensure submenu has an id for aria-controls
      if (!submenu.id) {
        submenu.id = 'nav-submenu-' + Math.random().toString(36).slice(2, 10);
      }
      a.setAttribute('aria-controls', submenu.id);

      // Set initial expanded state based on Squarespace classes (best effort)
      const isOpen =
        parent.classList.contains('is-active') ||
        parent.classList.contains('open') ||
        a.classList.contains('open');

      a.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Keep aria-expanded in sync on hover/focus/click (without preventing anything)
    // Use capture to observe interactions early but do not stop propagation.
    document.addEventListener(
      'mouseover',
      (e) => {
        const a = e.target.closest('.header-nav-item--folder > a, .header-nav-item--nested-folder > a');
        if (!a) return;
        a.setAttribute('aria-expanded', 'true');
      },
      true
    );

    document.addEventListener(
      'focusin',
      (e) => {
        const a = e.target.closest('.header-nav-item--folder > a, .header-nav-item--nested-folder > a');
        if (!a) return;
        a.setAttribute('aria-expanded', 'true');
      },
      true
    );

    // When pointer leaves the whole header nav, collapse aria-expanded (best effort)
    const headerNav = document.querySelector('header .header-nav, header nav');
    if (headerNav && !headerNav.__a11yBound) {
      headerNav.__a11yBound = true;
      headerNav.addEventListener('mouseleave', () => {
        document
          .querySelectorAll('.header-nav-item--folder > a, .header-nav-item--nested-folder > a')
          .forEach((a) => a.setAttribute('aria-expanded', 'false'));
      });
    }

    // Keyboard: Escape closes ARIA state (doesn't force-close menu scripts)
    // Let Will/Squarespace handle actual close if they support Esc.
    if (!document.__a11yEscBound) {
      document.__a11yEscBound = true;
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          document
            .querySelectorAll('.header-nav-item--folder > a, .header-nav-item--nested-folder > a')
            .forEach((a) => a.setAttribute('aria-expanded', 'false'));
        }
      });
    }
  }

  // ----------------------------
  // DOMContentLoaded: run safe enhancements
  // ----------------------------
  document.addEventListener('DOMContentLoaded', () => {
    // IMPORTANT: Do NOT rewrite menu DOM (no outerHTML).

    // Keep accordion folder open in mobile view (this can be risky; leaving it but safer)
    const subMenu = document.querySelector('.header-menu-nav-item--accordion-folder > a');
    const subMenuContent = document.querySelector('.accordion-folder-content');
    if (subMenu && subMenuContent) {
      subMenu.classList.add('open');
      // Avoid hardcoding height if possible; but keep your intent
      subMenuContent.style.maxHeight = subMenuContent.scrollHeight
        ? subMenuContent.scrollHeight + 'px'
        : '226px';
    }

    // Fix the broken "mouseout" code: attach to the actual header link
    const nestedFolderHeader = document.querySelector('.header-nav-item--nested-folder > a');
    if (nestedFolderHeader) {
      nestedFolderHeader.addEventListener('mouseout', () => {
        nestedFolderHeader.style.color = '';
      });
    }

    // Add aria-labels for specific hrefs
    appendToAriaLabelForSpecificHref('tel:18882628266', ' Call us toll free');
    appendToAriaLabelForSpecificHref('mailto:info@matcom.com', ' Email us');
    appendToAriaLabelForSpecificHref('/', ' Home Page');
    appendToAriaLabelForSpecificHref('/home', ' Home Page');
    appendToAriaLabelForSpecificHref('/about-matcom', ' About');
    appendToAriaLabelForSpecificHref('/about', ' Our Story');
    appendToAriaLabelForSpecificHref('/safety-and-quality-standards', ' Safety, Training & Quality');
    appendToAriaLabelForSpecificHref('/partners-causes', ' Our Partners & Causes');
    appendToAriaLabelForSpecificHref('/the-fleet', ' The Fleet');
    appendToAriaLabelForSpecificHref('/industries-we-serve', ' Industries We Serve');
    appendToAriaLabelForSpecificHref('/services', ' Services');
    appendToAriaLabelForSpecificHref('/machinery-moving', ' Machinery Moving');
    appendToAriaLabelForSpecificHref('/industrial-service', ' Industrial Service');
    appendToAriaLabelForSpecificHref('/warehousing-logistics', ' Warehousing & Logistics');
    appendToAriaLabelForSpecificHref('/repairs-upgrades', ' Repairs & Upgrades');
    appendToAriaLabelForSpecificHref('/parts-sales', ' Parts & Sales');
    appendToAriaLabelForSpecificHref('/fabrication', ' Fabrication');
    appendToAriaLabelForSpecificHref('/lubrication-systems', ' Lubrication Systems');
    appendToAriaLabelForSpecificHref('/contact-1', ' Contact');
    appendToAriaLabelForSpecificHref('/contact', ' Contact Us');
    appendToAriaLabelForSpecificHref('/careers', ' Careers');

    // Replace instead of append for Instagram
    document.querySelectorAll('a[href="https://www.instagram.com/matcom1976/"]').forEach((link) => {
      link.setAttribute('aria-label', 'Instagram');
    });

    // External links open in new tab
    appendToAriaLabelForExternalLinks();

    // Unique landmark labels
    const footerNav = document.querySelector('footer nav.sqs-svg-icon--list');
    if (footerNav) footerNav.setAttribute('aria-label', 'footer social links menu');

    const contactSocialNav = document.querySelector('#block-e2286f40cc7eefb7dafb nav.sqs-svg-icon--list');
    if (contactSocialNav) contactSocialNav.setAttribute('aria-label', 'social media links');

    // Form error "Error:" injection with observer
    function addErrorText() {
      document.querySelectorAll('.form-field-error').forEach((el) => {
        if (el.querySelector('svg') && !el.textContent.includes('Error:')) {
          const svg = el.querySelector('svg');
          el.insertBefore(document.createTextNode(' Error: '), svg.nextSibling);
        }
      });
    }

    addErrorText();

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'childList') {
          addErrorText();
          break;
        }
      }
    });

    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    }

    // Nav ARIA enhancements (safe)
    runNavA11yEnhancements();
  });

  // Use addEventListener instead of overwriting window.onload
  window.addEventListener('load', () => {
    const contactMap = document.querySelector('#block-336fde4c5f3638bc1683 > div > div > div:nth-child(2)');
    if (contactMap) contactMap.setAttribute('aria-label', 'Location Map');
  });

  // If Squarespace swaps header/nav after navigation, re-run nav a11y safely
  // (MutationObserver focused on header area)
  const headerObserver = new MutationObserver(() => {
    runNavA11yEnhancements();
  });

  document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    if (header) headerObserver.observe(header, { childList: true, subtree: true });
  });
})();
