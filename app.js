// app.js — shared behaviors for every page

// ---------- helpers ----------
const $ = (sel, ctx = document) => ctx.querySelector(sel);

// Year in footer (safe if missing)
const setYear = () => {
  const y = $("#y");
  if (y) y.textContent = new Date().getFullYear();
};

// Mobile hamburger
const initNav = () => {
  const toggle = $(".nav-toggle");
  const nav = $(".nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
};

// Lenis smooth scrolling
const initLenis = () => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.Lenis) return;

  const lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    smoothTouch: false,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
};

// Cursor glow (desktop only)
const initCursorGlow = () => {
  if (!matchMedia("(pointer:fine)").matches) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const root = document.documentElement;
  let fadeTimer;
  function setGlow(x, y) {
    root.style.setProperty("--mx", x + "px");
    root.style.setProperty("--my", y + "px");
    root.style.setProperty("--glow", 1);
    clearTimeout(fadeTimer);
    fadeTimer = setTimeout(() => root.style.setProperty("--glow", 0), 900);
  }
  window.addEventListener("pointermove", e => setGlow(e.clientX, e.clientY), { passive: true });
  window.addEventListener("pointerleave", () => root.style.setProperty("--glow", 0));
};

// Spotlight on hovered cards
const initCardSpotlight = () => {
  if (!matchMedia("(pointer:fine)").matches) return;
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("pointermove", e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--cx", (e.clientX - r.left) + "px");
      card.style.setProperty("--cy", (e.clientY - r.top) + "px");
      card.style.setProperty("--spot", 1);
    }, { passive: true });
    card.addEventListener("pointerleave", () => card.style.setProperty("--spot", 0));
  });
};

// Header blur after scrolling (works with/without Lenis)
const initHeaderScrollEffect = () => {
  const header = $(".site-header");
  if (!header) return;

  const SCROLL_TRIGGER = 8;
  let last = null;

  const update = () => {
    const y = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    const scrolled = y > SCROLL_TRIGGER;
    if (scrolled !== last) {
      header.classList.toggle("is-scrolled", scrolled);
      last = scrolled;
    }
  };

  update();
  window.addEventListener("scroll", update, { passive: true });

  // Keep it perfectly in sync even with smooth raf
  const hook = () => { update(); requestAnimationFrame(hook); };
  requestAnimationFrame(hook);
};

// (Optional) Fade-in on scroll for .fade-in elements
const initReveal = () => {
  const els = document.querySelectorAll(".fade-in");
  if (!els.length || "IntersectionObserver" in window === false) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.animationPlayState = "running";
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });

  els.forEach(el => {
    // start paused until seen
    el.style.animationPlayState = "paused";
    io.observe(el);
  });
};

// ---------- boot ----------
document.addEventListener("DOMContentLoaded", () => {
  setYear();
  initNav();
  initLenis();
  initCursorGlow();
  initCardSpotlight();
  initHeaderScrollEffect();
  initReveal();
});
