/* ============================================================
   Stackly Law Firm — Interactions
   Sticky nav shadow, mobile menu, button ripple, scroll reveal
   ============================================================ */

(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Sticky navbar shadow ---------- */
  const navbar = document.getElementById("navbar");

  const onScrollNav = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 8);
  };

  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- Mobile menu toggle ---------- */
  const navToggle = document.getElementById("navToggle");
  const fsMenu = document.getElementById("fullscreenMenu");
  const fsMenuClose = document.getElementById("fsMenuClose");

  const setMenu = (open) => {
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    fsMenu.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("fs-menu-open", open);

    if (open) {
      const firstLink = fsMenu.querySelector(".fs-menu__link");
      if (firstLink) firstLink.focus();
    } else {
      navToggle.focus();
    }
  };

  navToggle.addEventListener("click", () => {
    setMenu(navToggle.getAttribute("aria-expanded") !== "true");
  });

  fsMenuClose.addEventListener("click", () => setMenu(false));

  fsMenu.querySelector(".fs-menu__backdrop").addEventListener("click", () => setMenu(false));

  fsMenu.querySelectorAll(".fs-menu__link, .fs-menu__cta").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
    }
  });

  /* ---------- Button ripple ---------- */
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      if (prefersReducedMotion) return;

      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      const ripple = document.createElement("span");
      ripple.className = "btn-ripple";
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      button.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Active nav link on scroll ---------- */
  const navLinks = document.querySelectorAll(".nav-link[href^='#']");

  if ("IntersectionObserver" in window && navLinks.length) {
    const sections = Array.from(navLinks)
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = `#${entry.target.id}`;
            navLinks.forEach((link) => {
              link.classList.toggle(
                "is-active",
                link.getAttribute("href") === id
              );
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ---------- About hero fade-in on load ---------- */
  const aboutHero = document.querySelector(".about-hero");

  if (aboutHero) {
    window.addEventListener(
      "load",
      () => aboutHero.classList.add("is-loaded"),
      { once: true }
    );
  }

  /* ---------- Contact form validation ---------- */
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    const fields = [
      {
        input: document.getElementById("firstName"),
        error: document.getElementById("firstNameError"),
        validate: (value) => {
          if (!value) return "First name is required";
          if (!/^[A-Za-z]+$/.test(value))
            return "Only letters allowed, no numbers or symbols";
          return "";
        },
      },
      {
        input: document.getElementById("lastName"),
        error: document.getElementById("lastNameError"),
        validate: (value) => {
          if (!value) return "Last name is required";
          if (!/^[A-Za-z]+$/.test(value))
            return "Only letters allowed, no numbers or symbols";
          return "";
        },
      },
      {
        input: document.getElementById("phone"),
        error: document.getElementById("phoneError"),
        validate: (value) => {
          if (!value) return "Phone number is required";
          if (!/^[0-9]+$/.test(value)) return "Only numbers allowed";
          if (value.length < 10 || value.length > 15)
            return "Phone must be 10 to 15 digits";
          return "";
        },
      },
      {
        input: document.getElementById("email"),
        error: document.getElementById("emailError"),
        validate: (value) => {
          if (!value) return "Email is required";
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            return "Enter a valid email address";
          return "";
        },
      },
    ];

    const showError = (field, message) => {
      field.error.textContent = message;
      field.error.classList.add("is-visible");
      field.input.classList.add("has-error");
    };

    const clearError = (field) => {
      field.error.textContent = "";
      field.error.classList.remove("is-visible");
      field.input.classList.remove("has-error");
    };

    const validateField = (field) => {
      const message = field.validate(field.input.value.trim());
      if (message) {
        showError(field, message);
        return false;
      }
      clearError(field);
      return true;
    };

    fields.forEach((field) => {
      field.input.addEventListener("input", () => {
        if (field.input.classList.contains("has-error")) {
          validateField(field);
        }
      });
      field.input.addEventListener("blur", () => validateField(field));
    });

    let successTimer = null;

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      let isValid = true;
      fields.forEach((field) => {
        if (!validateField(field)) isValid = false;
      });

      if (!isValid) return;

      contactForm.reset();
      fields.forEach(clearError);

      const successMsg = document.getElementById("contactSuccess");
      successMsg.classList.remove("is-hiding");
      successMsg.classList.add("is-visible");

      clearTimeout(successTimer);
      successTimer = setTimeout(() => {
        successMsg.classList.remove("is-visible");
        successMsg.classList.add("is-hiding");
        setTimeout(
          () => successMsg.classList.remove("is-hiding"),
          500
        );
      }, 3000);
    });
  }
})();
