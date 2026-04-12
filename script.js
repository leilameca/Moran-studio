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
const header    = document.querySelector("[data-header]");
const navLinks  = document.querySelectorAll(".site-nav a");
const sections  = document.querySelectorAll("section[id]");

if (header) {
  const syncHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  };
  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });
}

// Active nav link on scroll
if (navLinks.length && sections.length) {
  const syncActiveLink = () => {
    let current = "";
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.id;
      }
    });
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
    });
  };
  window.addEventListener("scroll", syncActiveLink, { passive: true });
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
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("is-open");
    nav.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) closeMenu();
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
    { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
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
  const onScroll = () => {
    const scrolled = window.scrollY;
    parallaxTarget.style.transform = `translateY(${scrolled * 0.06}px)`;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* =============================================
   HERO ROLE TEXT ROTATION
   ============================================= */
const roleEl = document.querySelector(".hero-role");

if (roleEl && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const getLang   = () => document.documentElement.classList.contains("lang-en") ? "en" : "es";
  const rolesEs   = roleEl.dataset.rolesEs ? roleEl.dataset.rolesEs.split(",") : [];
  const rolesEn   = roleEl.dataset.rolesEn ? roleEl.dataset.rolesEn.split(",") : [];
  let   index     = 0;

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
   LANGUAGE TOGGLE
   ============================================= */
const langToggle = document.querySelector("[data-lang-toggle]");

if (langToggle) {
  // Translate all elements carrying data-es / data-en
  const applyLang = (lang) => {
    document.documentElement.classList.toggle("lang-en", lang === "en");
    document.documentElement.classList.toggle("lang-es", lang === "es");
    document.documentElement.lang = lang === "en" ? "en" : "es";

    document.querySelectorAll("[data-es], [data-en]").forEach((el) => {
      const text = lang === "en" ? el.dataset.en : el.dataset.es;
      if (text !== undefined) el.innerHTML = text;
    });

    // Sync role text immediately if not currently fading
    if (roleEl && !roleEl.classList.contains("is-fading")) {
      const rolesEs = roleEl.dataset.rolesEs ? roleEl.dataset.rolesEs.split(",") : [];
      const rolesEn = roleEl.dataset.rolesEn ? roleEl.dataset.rolesEn.split(",") : [];
      // Keep the same index (already stored on the closure above)
      // Just reflect current index in the right language
      roleEl.textContent = lang === "en" ? rolesEn[0] : rolesEs[0];
    }

    localStorage.setItem("ms-lang", lang);
  };

  langToggle.addEventListener("click", () => {
    const current = document.documentElement.classList.contains("lang-en") ? "en" : "es";
    applyLang(current === "en" ? "es" : "en");
  });

  // Restore saved preference
  const saved = localStorage.getItem("ms-lang");
  if (saved && saved !== "es") applyLang(saved);
  else applyLang("es"); // default: Spanish, sets classes correctly
}
