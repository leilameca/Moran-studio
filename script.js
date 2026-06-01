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

/* ---- WHATSAPP CTAs ---- */
const getCurrentLang = () => (document.documentElement.classList.contains("lang-en") ? "en" : "es");

const getWaNumber = () => {
  const href = document.querySelector("[data-wa-cta]")?.getAttribute("href")
    || document.querySelector('a[href^="https://wa.me/"]')?.getAttribute("href")
    || "";
  const match = href.match(/wa\.me\/(\d+)/);
  return match?.[1] || "18092697630";
};

const waNumber = getWaNumber();
const buildWaHref = (text) => `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

const quizWaState = {
  situation: null,
  goal: null,
  timeline: null,
  complete: false,
};

const waGeneralMessage = (lang) => {
  if (lang === "en") {
    return [
      "Hi Leilany, I saw your site and I’d like to request a website quote.",
      "",
      "Business:",
      "Type (landing / website / store):",
      "Goal:",
    ].join("\n");
  }

  return [
    "Hola Leilany, vi tu página y me gustaría cotizar una web.",
    "",
    "Negocio:",
    "Tipo (landing / web / tienda):",
    "Objetivo:",
  ].join("\n");
};

const waQuizMessage = (lang) => {
  const situation = quizWaState.situation?.[lang] || quizWaState.situation?.es || "";
  const goal      = quizWaState.goal?.[lang]      || quizWaState.goal?.es      || "";
  const timeline  = quizWaState.timeline?.[lang]  || quizWaState.timeline?.es  || "";

  if (lang === "en") {
    return [
      "Hi Leilany, I completed the quiz on your site.",
      "",
      `- Current: ${situation}`,
      `- Goal: ${goal}`,
      `- Timeline: ${timeline}`,
      "",
      "Business:",
    ].join("\n");
  }

  return [
    "Hola Leilany, hice el quiz en tu web.",
    "",
    `- Situación: ${situation}`,
    `- Objetivo: ${goal}`,
    `- Tiempo: ${timeline}`,
    "",
    "Mi negocio:",
  ].join("\n");
};

const syncWaCtas = (lang = getCurrentLang()) => {
  const ctas = document.querySelectorAll("[data-wa-cta]");
  if (!ctas.length) return;

  ctas.forEach((a) => {
    const kind = a.dataset.waCta || "general";
    const message = (kind === "quiz" && quizWaState.complete)
      ? waQuizMessage(lang)
      : waGeneralMessage(lang);
    a.href = buildWaHref(message);
  });
};

/* ---- QUIZ INTERACTIVO ---- */
const quizCard = document.getElementById("quiz-card");

if (quizCard) {
  const quizSteps = quizCard.querySelectorAll(".quiz-step");
  const quizDots  = document.querySelectorAll(".quiz-dot");
  let currentStep = 0;

  const goToStep = (step) => {
    quizSteps[currentStep].classList.remove("is-active");
    if (quizDots[currentStep]) quizDots[currentStep].classList.remove("is-active");
    currentStep = step;
    quizSteps[currentStep].classList.add("is-active");
    if (quizDots[currentStep]) quizDots[currentStep].classList.add("is-active");
  };

  quizCard.querySelectorAll(".quiz-opt").forEach((btn) => {
    btn.addEventListener("click", () => {
      // Visual feedback (only one per step)
      const stepEl = btn.closest(".quiz-step");
      stepEl?.querySelectorAll(".quiz-opt").forEach(b => b.classList.remove("is-selected"));
      btn.classList.add("is-selected");

      // Capture answer for WA message
      const stepIndex = parseInt(stepEl?.dataset.step || "", 10);
      const value = {
        es: btn.dataset.es ?? btn.textContent.trim(),
        en: btn.dataset.en ?? btn.textContent.trim(),
      };

      if (stepIndex === 0) quizWaState.situation = value;
      if (stepIndex === 1) quizWaState.goal      = value;
      if (stepIndex === 2) quizWaState.timeline  = value;

      setTimeout(() => {
        const next = btn.dataset.next;
        if (next !== undefined) {
          goToStep(parseInt(next));
        } else {
          // Final answer — go to result + sync WA message with answers
          quizWaState.complete = true;
          syncWaCtas(getCurrentLang());

          // Result is the last step
          quizSteps[currentStep].classList.remove("is-active");
          if (quizDots[currentStep]) quizDots[currentStep].classList.remove("is-active");
          currentStep = quizSteps.length - 1;
          quizSteps[currentStep].classList.add("is-active");
        }
      }, 280);
    });
  });

  const restartBtn = quizCard.querySelector(".quiz-restart");
  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      quizCard.querySelectorAll(".quiz-opt").forEach(b => b.classList.remove("is-selected"));
      quizWaState.situation = null;
      quizWaState.goal = null;
      quizWaState.timeline = null;
      quizWaState.complete = false;
      syncWaCtas(getCurrentLang());
      currentStep = quizSteps.length - 1; // trick goToStep into removing result
      goToStep(0);
    });
  }
}

/* ---- LANGUAGE TOGGLE ---- */
const langToggles = document.querySelectorAll("[data-lang-toggle]");

if (langToggles.length) {
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

    syncWaCtas(lang);
    localStorage.setItem("ms-lang", lang);
  };

  langToggles.forEach(btn => {
    btn.addEventListener("click", () => {
      applyLang(document.documentElement.classList.contains("lang-en") ? "es" : "en");
    });
  });

  applyLang(localStorage.getItem("ms-lang") === "es" ? "es" : "en");
}

// Ensure WA CTAs are populated even if language toggle is removed.
syncWaCtas(getCurrentLang());
