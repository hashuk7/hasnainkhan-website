/**
 * HASNAIN KHAN - PORTFOLIO INTERACTIVITY
 * Terminal CLI, Monogram Loader, Quick Contact Drawer & Filter Tabs
 */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCollapsibleSidebar();
  initTerminal();
  initContactModal();
  initProjectFilters();
  highlightActiveNav();
});

/* --------------------------------------------------------------------------
   1. INTRO LOADER ANIMATION (Cinzel Monogram & Scanlines)
   -------------------------------------------------------------------------- */
function initLoader() {
  const loader = document.getElementById('site-loader');
  if (!loader) return;

  const hasSeenLoader = sessionStorage.getItem('hk_portfolio_loader');
  if (hasSeenLoader) {
    loader.classList.add('hidden');
    loader.style.display = 'none';
    return;
  }

  // Animate monogram and then fade out
  const monogram = loader.querySelector('.loader-monogram');
  setTimeout(() => {
    if (monogram) monogram.style.gap = '0px';
  }, 900);

  setTimeout(() => {
    loader.classList.add('hidden');
    sessionStorage.setItem('hk_portfolio_loader', 'true');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }, 1800);
}

/* --------------------------------------------------------------------------
   2. INTERACTIVE TERMINAL CLI
   -------------------------------------------------------------------------- */
function initTerminal() {
  const terminalBtn = document.getElementById('open-terminal-btn');
  const terminalOverlay = document.getElementById('terminal-modal');
  const terminalCloseBtn = document.getElementById('terminal-close-btn');
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');

  if (!terminalOverlay || !terminalInput) return;

  const toggleTerminal = (show) => {
    if (show) {
      terminalOverlay.classList.add('active');
      terminalInput.focus();
    } else {
      terminalOverlay.classList.remove('active');
    }
  };

  if (terminalBtn) {
    terminalBtn.addEventListener('click', () => toggleTerminal(true));
  }

  if (terminalCloseBtn) {
    terminalCloseBtn.addEventListener('click', () => toggleTerminal(false));
  }

  terminalOverlay.addEventListener('click', (e) => {
    if (e.target === terminalOverlay) toggleTerminal(false);
  });

  // Handle Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && terminalOverlay.classList.contains('active')) {
      toggleTerminal(false);
    }
  });

  // Terminal commands definition
  const COMMANDS = {
    help: `Available commands:
  whoami    — Summary of Hasnain Khan
  skills    — Core tech stack & specializations
  projects  — Featured projects & live websites
  services  — Website solutions I offer
  contact   — Direct contact channels
  socials   — LinkedIn, GitHub & web presence
  hire      — Start a project together
  matrix    — Wake up, Neo...
  clear     — Clear terminal screen
  help      — Show this command reference`,

    whoami: `Hasnain Khan — WordPress & Front-End Developer.
Based in Pakistan, working with clients worldwide.
I design & develop fast, conversion-optimized WordPress websites, custom front-end applications, and integrate intelligent AI chatbots for founders, institutions, and service businesses.`,

    skills: `Technical Stack:
  [CMS]        WordPress, WooCommerce, Elementor Pro, Shopify / Liquid
  [Front-End]  HTML5, CSS3/SCSS, JavaScript (ES6+), React, Tailwind CSS
  [Backend]    PHP, MySQL, REST APIs, Webhooks, Python
  [Perf & SEO] Core Web Vitals, Speed Optimization, On-Page SEO
  [AI / Auto]  Custom AI Chatbot Integration, API Automations`,

    projects: `Featured Highlights:
  1. Suleman Roshan Medical College — srmc.edu.pk (Purely Custom institutional platform)
  2. QEC Portal — Quality Assurance & institutional reporting
  3. HMIS Project — Healthcare Management Information System
  4. CocoPup London & Ayla Bag — E-Commerce theme customizations
  5. NINSS — ninss.edu.pk (Custom nursing institute website)
  6. HomeStar Solutions & The Shedo — WordPress business websites
  Type 'contact' to discuss or visit projects.html for complete gallery.`,

    services: `Solutions:
  - Custom WordPress Website Design & Development
  - High-Converting Landing Pages
  - Performance Tuning & Core Web Vitals Boost
  - E-Commerce (WooCommerce & Shopify)
  - Custom AI Chatbot Integrations`,

    contact: `Get in Touch:
  Email:    hasnainkhanreal18@gmail.com
  Website:  https://hasnainkhan.dev
  LinkedIn: linkedin.com/in/hasnainkhan18`,

    socials: `Online Presence:
  GitHub:   https://github.com
  LinkedIn: https://linkedin.com/in/hasnainkhan18
  Web:      https://hasnainkhan.dev`,

    hire: `Ready to elevate your digital presence?
Shoot an email directly to: hasnainkhanreal18@gmail.com
Or click 'Hire Me' in the navigation.`,

    matrix: `Follow the white rabbit... 🐇
01001000 01100001 01110011 01101110 01100001 01101001 01101110
[System initialized: reality loaded successfully]`
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawVal = terminalInput.value.trim();
      const cmd = rawVal.toLowerCase();
      terminalInput.value = '';

      if (!rawVal) return;

      if (cmd === 'clear') {
        terminalOutput.innerHTML = '';
        return;
      }

      // Append user command
      const cmdLine = document.createElement('div');
      cmdLine.innerHTML = `<span class="terminal-prompt">khan:~$</span> <span>${escapeHtml(rawVal)}</span>`;
      terminalOutput.appendChild(cmdLine);

      // Append response
      const respLine = document.createElement('div');
      respLine.style.marginBottom = '0.75rem';

      if (COMMANDS[cmd]) {
        respLine.innerHTML = `<span class="highlight">${escapeHtml(COMMANDS[cmd])}</span>`;
      } else {
        respLine.innerHTML = `<span style="color: #ff5f56;">Command not found: '${escapeHtml(rawVal)}'. Type 'help' for available commands.</span>`;
      }

      terminalOutput.appendChild(respLine);

      // Scroll to bottom
      const terminalBody = terminalOverlay.querySelector('.terminal-body');
      if (terminalBody) {
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    }
  });
}

/* --------------------------------------------------------------------------
   3. QUICK CONTACT DRAWER MODAL
   -------------------------------------------------------------------------- */
function initContactModal() {
  const openBtns = document.querySelectorAll('[data-open-contact]');
  const contactModal = document.getElementById('quick-contact-modal');
  const closeBtn = document.getElementById('quick-contact-close');
  const form = document.getElementById('quick-contact-form');

  if (!contactModal) return;

  const toggleModal = (show) => {
    if (show) {
      contactModal.classList.add('active');
    } else {
      contactModal.classList.remove('active');
    }
  };

  openBtns.forEach(b => b.addEventListener('click', (e) => {
    e.preventDefault();
    toggleModal(true);
  }));

  if (closeBtn) closeBtn.addEventListener('click', () => toggleModal(false));

  contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) toggleModal(false);
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      // Simulate sending
      setTimeout(() => {
        if (status) {
          status.textContent = "Thank you! Your message has been sent. I'll get back to you shortly.";
          status.style.color = '#34d399';
          status.style.marginTop = '0.75rem';
        }
        form.reset();
        setTimeout(() => {
          toggleModal(false);
          if (submitBtn) submitBtn.disabled = false;
          if (status) status.textContent = '';
        }, 2500);
      }, 700);
    });
  }
}

/* --------------------------------------------------------------------------
   4. PROJECTS CATEGORY FILTER
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('[data-category]');

  if (!filterTabs.length || !projectCards.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = '';
          card.classList.add('fade-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. ACTIVE NAVIGATION HIGHLIGHT
   -------------------------------------------------------------------------- */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-item, .mobile-nav-item');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

/* --------------------------------------------------------------------------
   6. COLLAPSIBLE SIDEBAR TOGGLE
   -------------------------------------------------------------------------- */
function initCollapsibleSidebar() {
  const sidebar = document.getElementById('collapsible-sidebar');
  if (!sidebar) return;

  const expandTrigger = document.getElementById('sidebar-expand-trigger');
  const collapseTrigger = document.getElementById('sidebar-collapse-trigger');
  const copyBtn = document.getElementById('copy-email-btn');

  // Check saved state in localStorage (default to expanded if unset)
  const isSavedCollapsed = localStorage.getItem('hk_sidebar_collapsed') === 'true';
  if (isSavedCollapsed) {
    sidebar.classList.add('collapsed');
    if (collapseTrigger) collapseTrigger.setAttribute('aria-expanded', 'false');
  } else {
    sidebar.classList.remove('collapsed');
    if (collapseTrigger) collapseTrigger.setAttribute('aria-expanded', 'true');
  }

  const setCollapsedState = (collapsed) => {
    if (collapsed) {
      sidebar.classList.add('collapsed');
      localStorage.setItem('hk_sidebar_collapsed', 'true');
      if (collapseTrigger) collapseTrigger.setAttribute('aria-expanded', 'false');
    } else {
      sidebar.classList.remove('collapsed');
      localStorage.setItem('hk_sidebar_collapsed', 'false');
      if (collapseTrigger) collapseTrigger.setAttribute('aria-expanded', 'true');
    }
  };

  // Expand when clicking collapsed strip (desktop 84px strip)
  if (expandTrigger) {
    expandTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      setCollapsedState(false);
    });
  }

  // Click on header row: toggles open/close on mobile, collapses on desktop
  if (collapseTrigger) {
    collapseTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        const isCollapsed = sidebar.classList.contains('collapsed');
        setCollapsedState(!isCollapsed);
      } else {
        setCollapsedState(true);
      }
    });
  }

  // Copy Email with visual feedback
  if (copyBtn) {
    copyBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const email = 'hasnainkhanreal18@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        copyBtn.classList.add('copied');
        setTimeout(() => copyBtn.classList.remove('copied'), 1800);
      } catch (err) {
        const temp = document.createElement('input');
        temp.value = email;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        copyBtn.classList.add('copied');
        setTimeout(() => copyBtn.classList.remove('copied'), 1800);
      }
    });
  }
}

