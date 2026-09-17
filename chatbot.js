(function () {
  const root = document.querySelector("[data-chatbot]");
  const content = window.MORAN_STUDIO_ASSISTANT_CONTENT;
  const Provider = window.MoranStudioAssistantProvider;
  if (!root || !content || !Provider) return;

  const whatsappNumber = "18092697630";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const toggle = root.querySelector("[data-chatbot-toggle]");
  const panel = root.querySelector("[data-chatbot-panel]");
  const closeButton = root.querySelector("[data-chatbot-close]");
  const messages = root.querySelector("[data-chatbot-messages]");
  const form = root.querySelector("[data-chatbot-form]");
  const input = root.querySelector("[data-chatbot-input]");
  const sendButton = root.querySelector("[data-chatbot-send]");
  const language = document.documentElement.lang === "en" ? "en" : "es";
  const provider = new Provider(content, language);

  let started = false;
  let responding = false;
  let responseTimer = 0;
  const mascot = root.querySelector(".chatbot__toggle-mark");
  let idleTimer = 0;
  let gestureIndex = 0;

  function scheduleGesture() {
    window.clearTimeout(idleTimer);
    mascot.removeAttribute("data-gesture");
    if (reducedMotion.matches || document.hidden || root.classList.contains("is-open")) return;
    idleTimer = window.setTimeout(() => {
      if (!toggle.matches(":hover, :focus-within")) {
        mascot.dataset.gesture = ["hop", "peek", "sway"][gestureIndex++ % 3];
      }
      idleTimer = window.setTimeout(scheduleGesture, 2800);
    }, 12000 + Math.random() * 10000);
  }

  function syncMobileViewport() {
    const viewport = window.visualViewport;
    if (!viewport) return;
    root.style.setProperty("--assistant-viewport-height", `${viewport.height}px`);
    const keyboardInset = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop);
    root.style.setProperty("--assistant-keyboard-inset", `${keyboardInset}px`);
  }

  document.addEventListener("visibilitychange", scheduleGesture);
  reducedMotion.addEventListener("change", scheduleGesture);
  toggle.addEventListener("pointerdown", () => mascot.removeAttribute("data-gesture"));
  window.visualViewport?.addEventListener("resize", syncMobileViewport);
  window.visualViewport?.addEventListener("scroll", syncMobileViewport);
  syncMobileViewport();
  scheduleGesture();

  function currentCopy() {
    return content[provider.language];
  }

  function applyUiCopy() {
    const ui = currentCopy().ui;
    root.setAttribute("aria-label", ui.rootLabel);
    toggle.setAttribute("aria-label", root.classList.contains("is-open") ? ui.closeLabel : ui.openLabel);
    root.querySelector("[data-chatbot-launcher-eyebrow]").textContent = ui.launcherEyebrow;
    root.querySelector("[data-chatbot-launcher-label]").textContent = ui.launcherLabel;
    root.querySelector("[data-chatbot-eyebrow]").textContent = ui.panelEyebrow;
    root.querySelector("[data-chatbot-title]").textContent = ui.panelTitle;
    root.querySelector("[data-chatbot-subtitle]").textContent = ui.panelSubtitle;
    closeButton.setAttribute("aria-label", ui.closeLabel);
    input.setAttribute("aria-label", ui.inputLabel);
    input.placeholder = ui.inputPlaceholder;
    sendButton.setAttribute("aria-label", ui.sendLabel);
    root.querySelector("[data-chatbot-hint]").textContent = ui.hint;
  }

  function setBusy(busy) {
    responding = busy;
    messages.setAttribute("aria-busy", String(busy));
    input.disabled = busy;
    sendButton.disabled = busy;
  }

  function scrollMessages() {
    window.requestAnimationFrame(() => { messages.scrollTop = messages.scrollHeight; });
  }

  function createReplies(items = []) {
    const wrap = document.createElement("div");
    wrap.className = "chatbot__quick-replies";
    items.forEach((reply) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "chatbot__quick-reply";
      if (["whatsapp", "email"].includes(reply.action)) button.classList.add("chatbot__quick-reply--accent");
      button.textContent = reply.label;
      button.dataset.reply = JSON.stringify(reply);
      wrap.appendChild(button);
    });
    return wrap;
  }

  function addMessage({ author, text, replies = [], typing = false }) {
    const article = document.createElement("article");
    article.className = `chatbot__message chatbot__message--${typing ? "typing" : author}`;
    if (typing) article.dataset.typing = "true";

    const bubble = document.createElement("div");
    bubble.className = "chatbot__bubble";
    if (typing) {
      bubble.setAttribute("aria-label", currentCopy().ui.typing);
      bubble.innerHTML = "<span class=\"chatbot__typing-dots\" aria-hidden=\"true\"><span></span><span></span><span></span></span>";
    } else {
      bubble.textContent = text;
    }
    article.appendChild(bubble);
    if (!typing && author === "bot" && replies.length) article.appendChild(createReplies(replies));
    messages.appendChild(article);
    scrollMessages();
    return article;
  }

  function removeTyping() {
    messages.querySelector("[data-typing]")?.remove();
  }

  function showWelcome() {
    const welcome = provider.getWelcome();
    addMessage({ author: "bot", text: welcome.text, replies: welcome.replies });
  }

  function openChat() {
    root.classList.add("is-open");
    scheduleGesture();
    toggle.setAttribute("aria-expanded", "true");
    panel.setAttribute("aria-hidden", "false");
    panel.inert = false;
    applyUiCopy();
    if (!started) {
      started = true;
      showWelcome();
    }
    window.setTimeout(() => input.focus(), reducedMotion.matches ? 0 : 180);
  }

  function closeChat({ restoreFocus = true } = {}) {
    root.classList.remove("is-open");
    scheduleGesture();
    toggle.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true");
    panel.inert = true;
    applyUiCopy();
    if (restoreFocus) toggle.focus();
  }

  function navigateTo(target) {
    const section = document.querySelector(target);
    if (!section) return;
    closeChat({ restoreFocus: false });
    section.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
    const heading = section.querySelector("h2, h3, h1");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      window.setTimeout(() => heading.focus({ preventScroll: true }), reducedMotion.matches ? 0 : 500);
    }
  }

  function openExternal(url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function requestResponse({ text = "", intent = "" }) {
    if (responding) return;
    setBusy(true);
    addMessage({ author: "bot", typing: true });
    const response = await provider.respond({ text, intent });
    const delay = reducedMotion.matches ? 0 : Math.min(680, Math.max(260, response.text.length * 2));
    window.clearTimeout(responseTimer);
    responseTimer = window.setTimeout(() => {
      removeTyping();
      addMessage({ author: "bot", text: response.text, replies: response.replies });
      setBusy(false);
      if (root.classList.contains("is-open")) input.focus();
    }, delay);
  }

  function sendText(text) {
    const value = text.trim();
    if (!value || responding) return;
    addMessage({ author: "user", text: value });
    input.value = "";
    requestResponse({ text: value });
  }

  function handleReply(reply) {
    if (reply.intent) {
      addMessage({ author: "user", text: reply.label });
      requestResponse({ intent: reply.intent });
      return;
    }
    if (reply.action === "scroll") {
      navigateTo(reply.target);
      return;
    }
    if (reply.action === "link") {
      openExternal(reply.href);
      return;
    }
    if (reply.action === "email") {
      window.location.href = reply.href;
      return;
    }
    if (reply.action === "whatsapp") {
      const message = reply.message || currentCopy().contactPrefill;
      openExternal(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`);
    }
  }

  toggle.addEventListener("click", () => root.classList.contains("is-open") ? closeChat() : openChat());
  closeButton.addEventListener("click", () => closeChat());
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendText(input.value);
  });
  messages.addEventListener("click", (event) => {
    const button = event.target.closest("[data-reply]");
    if (!button || responding) return;
    try { handleReply(JSON.parse(button.dataset.reply)); } catch (_) {}
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && root.classList.contains("is-open")) closeChat();
  });
  document.addEventListener("ms:languagechange", (event) => {
    provider.setLanguage(event.detail?.language);
    applyUiCopy();
    if (started) {
      window.clearTimeout(responseTimer);
      setBusy(false);
      messages.replaceChildren();
      showWelcome();
    }
  });

  panel.inert = true;
  applyUiCopy();
})();
