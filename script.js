const revealItems = document.querySelectorAll("[data-reveal]");
const siteHeader = document.querySelector(".site-header");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -48px 0px",
  }
);

revealItems.forEach((item) => {
  if (!item.classList.contains("is-visible")) {
    revealObserver.observe(item);
  }
});

if (siteHeader) {
  const syncHeaderState = () => {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  syncHeaderState();
  window.addEventListener("scroll", syncHeaderState, { passive: true });
}

const managedAutoplayVideos = document.querySelectorAll("video[autoplay]");

if (managedAutoplayVideos.length > 0) {
  const reduceVideoMotion = window.matchMedia("(max-width: 720px), (prefers-reduced-motion: reduce)");

  const syncVideoPlayback = () => {
    const shouldPause = reduceVideoMotion.matches;

    managedAutoplayVideos.forEach((video) => {
      if (shouldPause) {
        video.pause();
        return;
      }

      if (video.paused) {
        video.play().catch(() => {});
      }
    });
  };

  syncVideoPlayback();

  if (typeof reduceVideoMotion.addEventListener === "function") {
    reduceVideoMotion.addEventListener("change", syncVideoPlayback);
  } else if (typeof reduceVideoMotion.addListener === "function") {
    reduceVideoMotion.addListener(syncVideoPlayback);
  }
}

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  const closeMenu = () => {
    menuToggle.classList.remove("is-open");
    siteNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("is-open");
    siteNav.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });
}

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const summary = item.querySelector("summary");

  if (!summary) {
    return;
  }

  const syncExpandedState = () => {
    summary.setAttribute("aria-expanded", String(item.open));
  };

  syncExpandedState();
  item.addEventListener("toggle", syncExpandedState);
});
