(function () {
  const html = document.documentElement;
  const body = document.body;
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const navLinks = document.querySelectorAll(".nav-links a");
  const siteHeader = document.querySelector(".site-header");
  // Replace the value below with your Formspree form endpoint when ready.
  // Example: const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mayxyzab'
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xaqvnogp';

  function applyTheme(theme) {
    const next = theme === "light" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("site-theme", next);

    if (themeToggle) {
      themeToggle.setAttribute("aria-label", next === "dark" ? "Switch to light mode" : "Switch to dark mode");
      themeToggle.innerHTML = next === "dark" ? "<span aria-hidden=\"true\">☀</span>" : "<span aria-hidden=\"true\">☾</span>";
    }
  }

  function initTheme() {
    const saved = localStorage.getItem("site-theme");
    applyTheme(saved || "dark");

    if (themeToggle) {
      themeToggle.addEventListener("click", function () {
        const current = html.getAttribute("data-theme") || "dark";
        applyTheme(current === "dark" ? "light" : "dark");
      });
    }
  }

  function initHeaderState() {
    if (!siteHeader) {
      return;
    }

    function onScroll() {
      if (window.scrollY > 12) {
        siteHeader.classList.add("scrolled");
      } else {
        siteHeader.classList.remove("scrolled");
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initActiveNav() {
    const file = window.location.pathname.split("/").pop() || "index.html";
    navLinks.forEach(function (link) {
      const href = link.getAttribute("href");
      if (href === file) {
        link.classList.add("active");
      }
    });
  }

  function closeMobileMenu() {
    body.classList.remove("nav-open");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  }

  function initMobileMenu() {
    if (!menuToggle) {
      return;
    }

    menuToggle.addEventListener("click", function () {
      const open = body.classList.toggle("nav-open");
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", closeMobileMenu);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) {
        closeMobileMenu();
      }
    });
  }

  function initAnimations() {
    const items = document.querySelectorAll("[data-animate]");
    if (!items.length) {
      return;
    }

    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll("[data-filter]");
    const cards = document.querySelectorAll(".project-card[data-category]");

    if (!filterButtons.length || !cards.length) {
      return;
    }

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const value = button.getAttribute("data-filter") || "all";

        filterButtons.forEach(function (btn) {
          btn.classList.remove("active");
        });
        button.classList.add("active");

        cards.forEach(function (card) {
          const categories = (card.getAttribute("data-category") || "").split(" ");
          const match = value === "all" || categories.includes(value);

          if (match) {
            card.classList.remove("hidden");
          } else {
            card.classList.add("hidden");
          }
        });
      });
    });
  }

  function initFAQ() {
    const faqButtons = document.querySelectorAll(".faq-toggle");
    if (!faqButtons.length) {
      return;
    }

    faqButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const item = button.closest(".faq-item");
        if (!item) {
          return;
        }

        const isOpen = item.classList.contains("open");
        item.classList.toggle("open");
        button.setAttribute("aria-expanded", isOpen ? "false" : "true");
      });
    });
  }

  function initContactForm() {
    const form = document.querySelector("[data-contact-form]");
    const submitButton = form ? form.querySelector("button[type='submit']") : null;
    const status = document.querySelector("[data-form-status]");

    if (!form || !submitButton || !status) {
      return;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
      status.className = "form-status";
      status.textContent = "Sending your message...";

      // Basic honeypot check (field present in form markup)
      const gotcha = form.querySelector("[name='_gotcha']");
      if (gotcha && gotcha.value) {
        // likely spam
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        status.className = "form-status error";
        status.textContent = "Spam detected.";
        return;
      }

      const data = new FormData(form);

      fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            status.className = "form-status success";
            status.innerHTML = "<span class=\"check\" aria-hidden=\"true\">✓</span> Sent! I'll be in touch soon.";
            form.reset();
          } else {
            return response.json().then(function (err) {
              throw new Error((err && err.error) || "Submission failed");
            });
          }
        })
        .catch(function (err) {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
          status.className = "form-status error";
          status.textContent = "Error sending message. Please try again.";
          console.error("Form submit error:", err);
        });
    });
  }

  initTheme();
  initHeaderState();
  initActiveNav();
  initMobileMenu();
  initAnimations();
  initPortfolioFilter();
  initFAQ();
  initContactForm();
})();
