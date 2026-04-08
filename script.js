const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const revealItems = document.querySelectorAll("[data-reveal]");
const parallaxTarget = document.querySelector("[data-parallax]");
const progressBar = document.querySelector("[data-progress]");
const projectTabs = document.querySelectorAll("[data-project-tab]");
const projectImage = document.querySelector("[data-project-image]");
const projectArt = document.querySelector("[data-project-art]");
const projectArtText = document.querySelector("[data-project-art-text]");
const projectSector = document.querySelector("[data-project-sector]");
const projectTitle = document.querySelector("[data-project-title]");
const projectSummary = document.querySelector("[data-project-summary]");
const projectImpact = document.querySelector("[data-project-impact]");
const projectLink = document.querySelector("[data-project-link]");

if (header) {
  const syncHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });
}

if (progressBar) {
  const syncProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
    progressBar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
  };

  syncProgress();
  window.addEventListener("scroll", syncProgress, { passive: true });
  window.addEventListener("resize", syncProgress);
}

if (menuToggle && nav) {
  const closeMenu = () => {
    menuToggle.classList.remove("is-open");
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("is-open");
    nav.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });
}

if (revealItems.length > 0 && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -48px 0px",
    }
  );

  revealItems.forEach((item) => {
    if (!item.classList.contains("is-visible")) {
      observer.observe(item);
    }
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (
  parallaxTarget &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const maxRotate = 5;
  const maxTranslate = 10;

  const moveCard = (event) => {
    const bounds = parallaxTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const rotateY = (x - 0.5) * maxRotate;
    const rotateX = (0.5 - y) * maxRotate;
    const translateX = (x - 0.5) * maxTranslate;
    const translateY = (y - 0.5) * maxTranslate;

    parallaxTarget.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetCard = () => {
    parallaxTarget.style.transform = "";
  };

  parallaxTarget.addEventListener("mousemove", moveCard);
  parallaxTarget.addEventListener("mouseleave", resetCard);
}

if (
  projectTabs.length > 0 &&
  projectImage &&
  projectArt &&
  projectArtText &&
  projectSector &&
  projectTitle &&
  projectSummary &&
  projectImpact &&
  projectLink
) {
  const applyProject = (tab) => {
    projectTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
      item.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    projectSector.textContent = tab.dataset.sector || "";
    projectTitle.textContent = tab.dataset.title || "";
    projectSummary.textContent = tab.dataset.summary || "";
    projectImpact.textContent = tab.dataset.impact || "";
    projectLink.href = tab.dataset.url || "#";

    if (tab.dataset.image) {
      projectImage.src = tab.dataset.image;
      projectImage.alt = tab.dataset.alt || "";
      projectImage.classList.remove("is-hidden");
      projectArt.className = "project-stage-art is-hidden";
      projectArtText.textContent = "";
    } else {
      projectImage.classList.add("is-hidden");
      projectArt.className = tab.dataset.artClass || "project-stage-art";
      projectArt.classList.remove("is-hidden");
      projectArtText.textContent = tab.dataset.art || "";
    }
  };

  projectTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => applyProject(tab));

    tab.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
        return;
      }

      event.preventDefault();
      const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (index + direction + projectTabs.length) % projectTabs.length;
      const nextTab = projectTabs[nextIndex];
      nextTab.focus();
      applyProject(nextTab);
    });
  });
}
