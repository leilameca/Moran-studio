/* =============================================
   SCROLL PROGRESS
   ============================================= */
const progressBar = document.querySelector("[data-progress]");

if (progressBar) {
  const syncProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    progressBar.style.transform = `scaleX(${Math.min(Math.max(ratio, 0), 1)})`;
  };
  syncProgress();
  window.addEventListener("scroll", syncProgress, { passive: true });
  window.addEventListener("resize", syncProgress);
}

/* =============================================
   HEADER — scroll state + active nav
   ============================================= */
const header   = document.querySelector("[data-header]");
const navLinks = document.querySelectorAll(".site-nav a");
const sections = document.querySelectorAll("section[id]");

if (header) {
  const syncHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });
}

if (navLinks.length && sections.length) {
  const syncActiveLink = () => {
    let current = "";
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
    });
  };
  window.addEventListener("scroll", syncActiveLink, { passive: true });
  syncActiveLink();
}

/* =============================================
   MOBILE MENU
   ============================================= */
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav        = document.querySelector("[data-nav]");

if (menuToggle && nav) {
  const closeMenu = () => {
    menuToggle.classList.remove("is-open");
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    document.body.style.overflow = "";
  };

  const openMenu = () => {
    menuToggle.classList.add("is-open");
    nav.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Cerrar menú");
    document.body.style.overflow = "hidden";
  };

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.contains("is-open") ? closeMenu() : openMenu();
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("click", (e) => {
    if (nav.classList.contains("is-open") && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) closeMenu();
  });

  // Close on resize to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeMenu();
  });
}

/* =============================================
   REVEAL ON SCROLL
   ============================================= */
const revealItems = document.querySelectorAll("[data-reveal]");

if (revealItems.length && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
  );
  revealItems.forEach((el) => {
    if (!el.classList.contains("is-visible")) observer.observe(el);
  });
} else {
  revealItems.forEach((el) => el.classList.add("is-visible"));
}

/* =============================================
   HERO PHOTO PARALLAX (desktop only)
   ============================================= */
const parallaxTarget = document.querySelector("[data-parallax]");

if (
  parallaxTarget &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  window.addEventListener("scroll", () => {
    parallaxTarget.style.transform = `translateY(${window.scrollY * 0.05}px)`;
  }, { passive: true });
}

/* =============================================
   HERO ROLE TEXT ROTATION
   ============================================= */
const roleEl = document.querySelector(".hero-role");

if (roleEl && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const getLang = () => document.documentElement.classList.contains("lang-en") ? "en" : "es";
  const rolesEs = (roleEl.dataset.rolesEs || "").split(",");
  const rolesEn = (roleEl.dataset.rolesEn || "").split(",");
  let index = 0;

  const rotate = () => {
    roleEl.classList.add("is-fading");
    setTimeout(() => {
      index = (index + 1) % rolesEs.length;
      roleEl.textContent = getLang() === "en" ? rolesEn[index] : rolesEs[index];
      roleEl.classList.remove("is-fading");
    }, 320);
  };

  setInterval(rotate, 2800);
}

/* =============================================
   SERVICE CARDS — 3D TILT (desktop only)
   ============================================= */
if (
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  document.querySelectorAll(".service-card").forEach((card) => {
    const MAX = 10;

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateX(${-y * MAX}deg) rotateY(${x * MAX}deg) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* =============================================
   TECH PILLS — STAGGERED CASCADE ENTRANCE
   ============================================= */
const techPills = document.querySelectorAll(".tech-pill");

if (techPills.length && "IntersectionObserver" in window) {
  const pillObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        // Stagger all pills inside the visible group
        const group = entry.target;
        const pills = group.querySelectorAll(".tech-pill");
        pills.forEach((pill, i) => {
          setTimeout(() => pill.classList.add("is-visible"), i * 70);
        });
        obs.unobserve(group);
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".tech-group").forEach((group) => pillObserver.observe(group));
}

/* =============================================
   TECH PILLS — MAGNETIC HOVER (desktop only)
   ============================================= */
if (
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  techPills.forEach((pill) => {
    pill.addEventListener("mousemove", (e) => {
      const rect  = pill.getBoundingClientRect();
      const cx    = rect.left + rect.width  / 2;
      const cy    = rect.top  + rect.height / 2;
      const dx    = (e.clientX - cx) * 0.28;
      const dy    = (e.clientY - cy) * 0.28;
      pill.style.transform = `translate(${dx}px, ${dy}px) scale(1.05)`;
    });

    pill.addEventListener("mouseleave", () => {
      pill.style.transform = "";
    });
  });
}

/* =============================================
   ANIMATED COUNTERS
   ============================================= */
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

  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((el) => counterObserver.observe(el));
}

/* =============================================
   TIMELINE FILL
   ============================================= */
const timelineFill = document.querySelector("[data-timeline-fill]");

if (timelineFill && "IntersectionObserver" in window) {
  const tlObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        timelineFill.classList.add("is-filled");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.3 }
  );
  const timeline = timelineFill.closest(".process-timeline");
  if (timeline) tlObserver.observe(timeline);
}

/* =============================================
   LANGUAGE TOGGLE
   ============================================= */
const langToggle = document.querySelector("[data-lang-toggle]");

if (langToggle) {
  const applyLang = (lang) => {
    document.documentElement.classList.toggle("lang-en", lang === "en");
    document.documentElement.classList.toggle("lang-es", lang !== "en");
    document.documentElement.lang = lang === "en" ? "en" : "es";

    document.querySelectorAll("[data-es], [data-en]").forEach((el) => {
      const text = lang === "en" ? el.dataset.en : el.dataset.es;
      if (text !== undefined) el.innerHTML = text;
    });

    if (roleEl && !roleEl.classList.contains("is-fading")) {
      const rEs = (roleEl.dataset.rolesEs || "").split(",");
      const rEn = (roleEl.dataset.rolesEn || "").split(",");
      roleEl.textContent = lang === "en" ? rEn[0] : rEs[0];
    }

    localStorage.setItem("ms-lang", lang);
  };

  langToggle.addEventListener("click", () => {
    applyLang(document.documentElement.classList.contains("lang-en") ? "es" : "en");
  });

  const saved = localStorage.getItem("ms-lang");
  applyLang(saved === "en" ? "en" : "es");
}
