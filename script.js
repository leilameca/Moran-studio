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

(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("ms-theme");
  const fallbackTheme = root.getAttribute("data-theme") || "dark";

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);

    if (themeToggle) {
      const isDark = theme === "dark";
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute(
        "title",
        isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
      );
    }
  };

  applyTheme(savedTheme || fallbackTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      localStorage.setItem("ms-theme", nextTheme);
    });
  }
})();

const heroCounters = document.querySelectorAll("[data-count-to]");

if (heroCounters.length > 0) {
  const animateHeroCounter = (element) => {
    const target = Number.parseInt(element.dataset.countTo || "0", 10);
    const duration = 1400;
    const startTime = performance.now();

    const updateValue = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = String(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };

    requestAnimationFrame(updateValue);
  };

  const heroCounterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateHeroCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  heroCounters.forEach((counter) => {
    heroCounterObserver.observe(counter);
  });
}

const cursorDot = document.getElementById("cursor-dot");

if (cursorDot && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  const lerp = (start, end, amount) => start + (end - start) * amount;

  const renderCursor = () => {
    currentX = lerp(currentX, mouseX, 0.18);
    currentY = lerp(currentY, mouseY, 0.18);
    cursorDot.style.transform = `translate(calc(${currentX}px - 50%), calc(${currentY}px - 50%))`;
    requestAnimationFrame(renderCursor);
  };

  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    cursorDot.classList.add("is-visible");
  });

  document
    .querySelectorAll("a, button, [role='button'], summary, .project-story, .service-line")
    .forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursorDot.classList.add("is-hovering-link");
      });

      element.addEventListener("mouseleave", () => {
        cursorDot.classList.remove("is-hovering-link");
      });
    });

  document.addEventListener("mouseleave", () => {
    cursorDot.classList.remove("is-visible");
  });

  requestAnimationFrame(renderCursor);
}

const lazyVideos = document.querySelectorAll("[data-lazy-video]");

if (lazyVideos.length > 0) {
  const lazyVideoObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const video = entry.target;
        video.querySelectorAll("source[data-src]").forEach((source) => {
          source.src = source.dataset.src;
        });
        video.load();
        video.play().catch(() => {});
        observer.unobserve(video);
      });
    },
    { rootMargin: "200px 0px" }
  );

  lazyVideos.forEach((video) => {
    lazyVideoObserver.observe(video);
  });
}

const generatedTextBlocks = document.querySelectorAll("[data-typewriter]");

if (generatedTextBlocks.length > 0) {
  const runTypewriter = (block) => {
    if (block.dataset.typed === "true") {
      return;
    }

    const target = block.querySelector(".scroll-generated-text");
    const fullText = block.dataset.typewriter || target?.textContent || "";

    if (!target) {
      return;
    }

    block.dataset.typed = "true";
    target.textContent = "";

    let index = 0;

    const write = () => {
      target.textContent = fullText.slice(0, index);
      index += 1;

      if (index <= fullText.length) {
        window.setTimeout(write, index < 18 ? 36 : 24);
      }
    };

    write();
  };

  const typeObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        runTypewriter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.55 }
  );

  generatedTextBlocks.forEach((block) => {
    typeObserver.observe(block);
  });
}
