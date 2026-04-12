/* ---- capability flags ---- */
const canHover     = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---- unified scroll dispatcher ---- */
const scrollCbs = [];
window.addEventListener("scroll", () => { scrollCbs.forEach(fn => fn()); }, { passive: true });

/* ---- onceVisible factory ---- */
const onceVisible = (el, cb, options = {}) => {
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      cb(entry);
      o.unobserve(entry.target);
    });
  }, options);
  obs.observe(el);
};

/* ---- SCROLL PROGRESS ---- */
const progressBar = document.querySelector("[data-progress]");

if (progressBar) {
  const syncProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    progressBar.style.transform = `scaleX(${Math.min(Math.max(ratio, 0), 1)})`;
  };
  syncProgress();
  scrollCbs.push(syncProgress);
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(syncProgress, 80);
  });
}

/* ---- HEADER ---- */
const header = document.querySelector("[data-header]");

if (header) {
  const syncHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
  syncHeader();
  scrollCbs.push(syncHeader);
}

/* ---- ACTIVE NAV ---- */
const navLinks = document.querySelectorAll(".site-nav a");
const sections = document.querySelectorAll("section[id]");

if (navLinks.length && sections.length) {
  let sectionTops = [];
  const cacheTops = () => {
    sectionTops = Array.from(sections).map(sec => ({ id: sec.id, top: sec.offsetTop }));
  };
  cacheTops();
  window.addEventListener("resize", cacheTops);

  const syncActiveLink = () => {
    let current = "";
    sectionTops.forEach(({ id, top }) => {
      if (window.scrollY >= top - 140) current = id;
    });
    navLinks.forEach(link => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
    });
  };
  scrollCbs.push(syncActiveLink);
  syncActiveLink();
}

/* ---- MOBILE MENU ---- */
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav        = document.querySelector("[data-nav]");

if (menuToggle && nav) {
  const setMenuOpen = (open) => {
    menuToggle.classList.toggle("is-open", open);
    nav.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    document.body.style.overflow = open ? "hidden" : "";
  };

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    setMenuOpen(!nav.classList.contains("is-open"));
  });

  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenuOpen(false)));

  document.addEventListener("click", (e) => {
    if (nav.classList.contains("is-open") && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) setMenuOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) setMenuOpen(false);
  });
}

/* ---- REVEAL ON SCROLL ---- */
const revealItems = document.querySelectorAll("[data-reveal]");

if (revealItems.length && "IntersectionObserver" in window) {
  revealItems.forEach(el => {
    if (!el.classList.contains("is-visible")) {
      onceVisible(el, () => el.classList.add("is-visible"), { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });
    }
  });
} else {
  revealItems.forEach(el => el.classList.add("is-visible"));
}

/* ---- HERO PARALLAX (desktop only) ---- */
const parallaxTarget = document.querySelector("[data-parallax]");

if (parallaxTarget && canHover && !reducedMotion) {
  let rafId = null;
  let lastY  = 0;
  scrollCbs.push(() => {
    const y = window.scrollY;
    if (y === lastY) return;
    lastY = y;
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      parallaxTarget.style.transform = `translateY(${lastY * 0.05}px)`;
      rafId = null;
    });
  });
}

/* ---- HERO ROLE TEXT ROTATION ---- */
const roleEl = document.querySelector(".hero-role");

if (roleEl && !reducedMotion) {
  const rolesEs = (roleEl.dataset.rolesEs || "").split(",");
  const rolesEn = (roleEl.dataset.rolesEn || "").split(",");
  let index = 0;
  let currentLang = document.documentElement.classList.contains("lang-en") ? "en" : "es";

  const rotate = () => {
    roleEl.classList.add("is-fading");
    setTimeout(() => {
      index = (index + 1) % rolesEs.length;
      roleEl.textContent = currentLang === "en" ? rolesEn[index] : rolesEs[index];
      roleEl.classList.remove("is-fading");
    }, 320);
  };

  let rotateInterval = setInterval(rotate, 2800);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearInterval(rotateInterval);
    } else {
      rotateInterval = setInterval(rotate, 2800);
    }
  });

  /* expose so language toggle can sync lang + reset index */
  roleEl._rolesEs = rolesEs;
  roleEl._rolesEn = rolesEn;
  roleEl._setLang = (lang) => { currentLang = lang; };
}

/* ---- SERVICE CARDS — 3D TILT (desktop only) ---- */
if (canHover && !reducedMotion) {
  document.querySelectorAll(".service-card").forEach((card) => {
    const MAX = 10;

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateX(${-y * MAX}deg) rotateY(${x * MAX}deg) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });
}

/* ---- TECH PILLS — STAGGERED CASCADE ---- */
if ("IntersectionObserver" in window) {
  document.querySelectorAll(".tech-group").forEach(group => {
    onceVisible(group, () => {
      group.querySelectorAll(".tech-pill").forEach((pill, i) => {
        setTimeout(() => pill.classList.add("is-visible"), i * 70);
      });
    }, { threshold: 0.2 });
  });
}

/* ---- TECH PILLS — MAGNETIC HOVER (desktop only) ---- */
if (canHover && !reducedMotion) {
  document.querySelectorAll(".tech-pill").forEach((pill) => {
    pill.addEventListener("mousemove", (e) => {
      const rect = pill.getBoundingClientRect();
      const dx   = (e.clientX - (rect.left + rect.width  / 2)) * 0.28;
      const dy   = (e.clientY - (rect.top  + rect.height / 2)) * 0.28;
      pill.style.transform = `translate(${dx}px, ${dy}px) scale(1.05)`;
    });

    pill.addEventListener("mouseleave", () => { pill.style.transform = ""; });
  });
}

/* ---- ANIMATED COUNTERS ---- */
const counters = document.querySelectorAll("[data-counter]");

if (counters.length && "IntersectionObserver" in window) {
  const runCounter = (el) => {
    const target   = parseInt(el.dataset.counter, 10);
    const suffix   = el.dataset.suffix || "";
    const duration = 900;
    const start    = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease     = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  counters.forEach(el => onceVisible(el, () => runCounter(el), { threshold: 0.6 }));
}

/* ---- TIMELINE FILL ---- */
const timelineFill = document.querySelector("[data-timeline-fill]");

if (timelineFill && "IntersectionObserver" in window) {
  const timeline = timelineFill.closest(".process-timeline");
  if (timeline) {
    onceVisible(timeline, () => timelineFill.classList.add("is-filled"), { threshold: 0.3 });
  }
}

/* ---- LANGUAGE TOGGLE ---- */
const langToggle = document.querySelector("[data-lang-toggle]");

if (langToggle) {
  const i18nEls = document.querySelectorAll("[data-es], [data-en]");

  const applyLang = (lang) => {
    document.documentElement.classList.toggle("lang-en", lang === "en");
    document.documentElement.classList.toggle("lang-es", lang !== "en");
    document.documentElement.lang = lang === "en" ? "en" : "es";

    i18nEls.forEach((el) => {
      const text = lang === "en" ? el.dataset.en : el.dataset.es;
      if (text !== undefined) el.innerHTML = text;
    });

    if (roleEl) {
      roleEl._setLang?.(lang);
      if (!roleEl.classList.contains("is-fading")) {
        roleEl.textContent = lang === "en" ? roleEl._rolesEn[0] : roleEl._rolesEs[0];
      }
    }

    localStorage.setItem("ms-lang", lang);
  };

  langToggle.addEventListener("click", () => {
    applyLang(document.documentElement.classList.contains("lang-en") ? "es" : "en");
  });

  applyLang(localStorage.getItem("ms-lang") === "en" ? "en" : "es");
}
