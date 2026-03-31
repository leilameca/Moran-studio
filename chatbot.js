const chatbotRoot = document.querySelector("[data-chatbot]");

if (chatbotRoot) {
  const CHATBOT_CONFIG = {
    whatsappNumber: "18092697630",
    whatsappDisplay: "809-269-7630",
    whatsappPrefill:
      "Hola, vengo desde la web de Morán Studio y me gustaría hablar sobre una página para mi negocio.",
    delivery: {
      landing: "4 días",
      full: "1 a 2 semanas",
    },
    investment: {
      landing: "se define según contenido, alcance y extras",
      full: "varía según estructura, cantidad de secciones y nivel de personalización",
    },
    quickReplies: {
      main: ["Qué web necesito", "Servicios", "Inversión", "Tiempo", "WhatsApp"],
      businessTypes: [
        "Belleza",
        "Tienda o productos",
        "Servicios profesionales",
        "Comida",
        "Otro negocio",
      ],
      projectTypes: ["Landing page", "Web más completa", "No lo tengo claro"],
    },
    welcomeMessage:
      "Hola, soy el asistente de Morán Studio.\nSi quieres, te ayudo a ubicar qué tipo de web encaja mejor con tu negocio y cuál sería el mejor siguiente paso.",
    nudgeMessage:
      "Si me cuentas a qué se dedica tu negocio, puedo orientarte mejor sin hacerte perder tiempo.",
  };

  const toggle = chatbotRoot.querySelector("[data-chatbot-toggle]");
  const panel = chatbotRoot.querySelector("[data-chatbot-panel]");
  const closeButton = chatbotRoot.querySelector("[data-chatbot-close]");
  const messages = chatbotRoot.querySelector("[data-chatbot-messages]");
  const form = chatbotRoot.querySelector("[data-chatbot-form]");
  const input = chatbotRoot.querySelector("[data-chatbot-input]");

  let hasStartedConversation = false;
  let hasShownNudge = false;
  let pendingStep = null;
  let nudgeTimer = null;
  let typingTimer = null;

  const buildWhatsAppLink = (prefill = CHATBOT_CONFIG.whatsappPrefill) =>
    `https://wa.me/${CHATBOT_CONFIG.whatsappNumber}?text=${encodeURIComponent(prefill)}`;

  const normalizeText = (value) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  const escapeHtml = (value) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const formatBotText = (text) => {
    let safeText = escapeHtml(text);

    safeText = safeText.replace(
      new RegExp(CHATBOT_CONFIG.whatsappDisplay.replace(/[-]/g, "[- ]?"), "g"),
      `<a href="${buildWhatsAppLink()}" target="_blank" rel="noreferrer">${CHATBOT_CONFIG.whatsappDisplay}</a>`
    );

    return safeText;
  };

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      messages.scrollTop = messages.scrollHeight;
    });
  };

  const createQuickReplies = (items) => {
      const wrap = document.createElement("div");
      wrap.className = "chatbot__quick-replies";

    items.forEach((label) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "chatbot__quick-reply";
      if (normalizeText(label).includes("whatsapp")) {
        button.classList.add("chatbot__quick-reply--primary");
      }
      button.textContent = label;
      button.setAttribute("data-chatbot-reply", label);
      wrap.appendChild(button);
    });

      return wrap;
    };

    const syncToolbarState = (quickReplies) => {
      const hasContextualReplies = Array.isArray(quickReplies) && quickReplies.length > 0;
      chatbotRoot.classList.toggle("has-contextual-actions", hasContextualReplies);
    };

    const addMessage = ({ author, text, quickReplies, isTyping = false }) => {
      const message = document.createElement("article");
    message.className = isTyping
      ? "chatbot__message chatbot__message--typing"
      : `chatbot__message chatbot__message--${author}`;

    const bubble = document.createElement("div");
    bubble.className = "chatbot__bubble";

    if (isTyping) {
      bubble.innerHTML =
        '<span class="chatbot__typing-dots" aria-label="Escribiendo"><span></span><span></span><span></span></span>';
    } else if (author === "bot") {
      bubble.innerHTML = formatBotText(text);
    } else {
      bubble.textContent = text;
    }

      message.appendChild(bubble);

      if (!isTyping && author === "bot") {
        syncToolbarState(quickReplies);
      }

      if (!isTyping && author === "bot" && Array.isArray(quickReplies) && quickReplies.length > 0) {
        message.appendChild(createQuickReplies(quickReplies));
      }

    messages.appendChild(message);
    scrollToBottom();

    return message;
  };

  const removeTypingIndicator = () => {
    const typingMessage = messages.querySelector(".chatbot__message--typing");

    if (typingMessage) {
      typingMessage.remove();
    }
  };

  const queueBotResponse = (response) => {
    window.clearTimeout(typingTimer);
    removeTypingIndicator();
    addMessage({ author: "bot", isTyping: true });

    const responseDelay = Math.min(
      920,
      Math.max(420, 360 + Math.round((response.text || "").length * 2.2))
    );

    typingTimer = window.setTimeout(() => {
      removeTypingIndicator();
      addMessage({
        author: "bot",
        text: response.text,
        quickReplies: response.quickReplies,
      });
    }, responseDelay);
  };

    const resetToMainMenu = () => {
      pendingStep = null;

      return {
        text: CHATBOT_CONFIG.welcomeMessage,
      };
    };

  const startRecommendationFlow = () => {
    pendingStep = "business-type";

    return {
      text:
        "Perfecto. Elige la opción que más se parezca a tu negocio y te digo qué tipo de web te conviene más.",
      quickReplies: CHATBOT_CONFIG.quickReplies.businessTypes,
    };
  };

  const startInvestmentFlow = () => {
    pendingStep = "project-type";

    return {
      text: "Claro. Dime qué quieres evaluar primero y te doy una referencia más útil.",
      quickReplies: CHATBOT_CONFIG.quickReplies.projectTypes,
    };
  };

  const getProjectTypeKey = (text) => {
    if (/(landing|one page|pagina simple)/.test(text)) {
      return "landing";
    }

    if (/(web mas completa|pagina completa|sitio completo|varias secciones)/.test(text)) {
      return "full";
    }

    if (/(no lo tengo claro|no se|no estoy segura|no estoy seguro)/.test(text)) {
      return "unknown";
    }

    return null;
  };

  const getBusinessTypeKey = (text) => {
    if (
      /(belleza|salon|spa|unas|peluqueria|estetica|lashes|cejas|maquillaje)/.test(text)
    ) {
      return "beauty";
    }

    if (
      /(tienda|productos|catalogo|ropa|accesorios|muebles|decoracion|velas|boutique)/.test(
        text
      )
    ) {
      return "store";
    }

    if (
      /(servicios profesionales|abogada|abogado|doctor|doctora|psicolog|consultor|consultora|medico|medica|dentista|terapeuta|arquitecta|arquitecto)/.test(
        text
      )
    ) {
      return "professional";
    }

    if (
      /(comida|restaurante|cafeteria|pasteleria|reposteria|menu|chef|cocina)/.test(text)
    ) {
      return "food";
    }

    if (/(otro negocio|otro|emprendimiento)/.test(text)) {
      return "other";
    }

    return null;
  };

  const getProjectTypeResponse = (projectType) => {
    if (projectType === "landing") {
      return {
        text:
          `Si tu oferta es directa y necesitas una página clara, enfocada y fácil de recorrer, una landing page suele ser la mejor ruta.\n\nTiempo estimado: ${CHATBOT_CONFIG.delivery.landing}.\nInversión: ${CHATBOT_CONFIG.investment.landing}.\n\nSi quieres, te llevo a WhatsApp y lo vemos con tu caso.`,
        quickReplies: ["WhatsApp", "Tiempo", "Volver al inicio"],
      };
    }

    if (projectType === "full") {
      return {
        text:
          `Si necesitas explicar mejor tu negocio, mostrar varios servicios, trabajar confianza y tener más recorrido, te conviene una web más completa.\n\nTiempo estimado: ${CHATBOT_CONFIG.delivery.full}.\nInversión: ${CHATBOT_CONFIG.investment.full}.\n\nTambién puedo ayudarte a confirmar si esta es la mejor opción para tu caso.`,
        quickReplies: ["Qué web necesito", "WhatsApp", "Volver al inicio"],
      };
    }

    return startRecommendationFlow();
  };

  const getBusinessRecommendation = (businessType) => {
    if (businessType === "beauty") {
      return {
        text:
          "Para una marca de belleza suele funcionar muy bien una landing page visual o una web de servicios con más presencia.\n\nLo importante es que se vea aspiracional, clara y fácil de reservar o contactar.",
        quickReplies: ["Inversión", "Tiempo", "Volver al inicio"],
      };
    }

    if (businessType === "store") {
      return {
        text:
          "Para una tienda o negocio de productos, normalmente conviene una web más completa o un catálogo visual.\n\nAsí puedes ordenar mejor la oferta y darle más valor a cada producto.",
        quickReplies: ["Servicios", "Inversión", "Volver al inicio"],
      };
    }

    if (businessType === "professional") {
      return {
        text:
          "Para servicios profesionales, una web más completa suele ser la mejor decisión.\n\nTe ayuda a transmitir confianza, explicar tu proceso y sostener mejor la decisión del cliente.",
        quickReplies: ["Inversión", "Tiempo", "Volver al inicio"],
      };
    }

    if (businessType === "food") {
      return {
        text:
          "Para un negocio de comida, una landing clara y visual suele funcionar muy bien.\n\nLa clave es presentar menú, beneficios y contacto rápido sin perder estilo.",
        quickReplies: ["WhatsApp", "Tiempo", "Volver al inicio"],
      };
    }

    pendingStep = "business-description";

    return {
      text:
        "Cuéntame en una frase qué vendes o qué servicio ofreces, y te oriento con más criterio.",
      quickReplies: ["Servicios", "Inversión", "Volver al inicio"],
    };
  };

  const getCustomBusinessRecommendation = (rawText) => ({
    text:
      `Por lo que me cuentas sobre "${rawText}", te conviene una página clara, bien estructurada y con una presencia visual cuidada.\n\nSi tu oferta es directa, una landing puede ser suficiente. Si necesitas explicar varias cosas o sostener mejor la confianza, iría por una web más completa.`,
    quickReplies: ["Inversión", "Tiempo", "WhatsApp"],
  });

  const getServicesResponse = () => ({
    text:
      "Trabajo sobre todo con tres rutas:\n1. Landing pages para presentar una oferta con claridad.\n2. Webs más completas para negocios que necesitan explicar mejor lo que hacen.\n3. Sitios editables para marcas que quieren autonomía sin perder nivel visual.",
    quickReplies: ["Qué web necesito", "Inversión", "Volver al inicio"],
  });

  const getInvestmentResponse = () => ({
    text:
      `La inversión depende del tipo de web, el contenido y el nivel de personalización.\n\nLanding page: ${CHATBOT_CONFIG.investment.landing}.\nWeb más completa: ${CHATBOT_CONFIG.investment.full}.\n\nSi quieres una orientación más precisa, lo ideal es verlo por WhatsApp.`,
    quickReplies: ["WhatsApp", "Tiempo", "Volver al inicio"],
  });

  const getDeliveryResponse = () => ({
    text:
      `Como referencia:\n1. Landing page: ${CHATBOT_CONFIG.delivery.landing}.\n2. Web más completa: ${CHATBOT_CONFIG.delivery.full}.\n\nSi el contenido ya está claro, el proceso se mueve mucho más ágil.`,
    quickReplies: ["Inversión", "WhatsApp", "Volver al inicio"],
  });

  const getWhatsAppResponse = () => ({
    text:
      `Puedes escribirme directo por WhatsApp al ${CHATBOT_CONFIG.whatsappDisplay}.\n\nSi me mandas qué haces, qué te gustaría mejorar y alguna referencia, te respondo con mucha más claridad.`,
    quickReplies: ["Volver al inicio"],
  });

    const getFallbackResponse = () => ({
      text:
        "Si quieres, puedo ayudarte a definir qué tipo de web te conviene, orientarte con inversión y tiempos, o llevarte directo a WhatsApp.",
    });

  const getIntentResponse = (rawText) => {
    const text = normalizeText(rawText);
    const projectType = getProjectTypeKey(text);
    const businessType = getBusinessTypeKey(text);

    if (
      /(^|\b)(hola|buenas|hello|info|menu|inicio|volver al inicio|empezar)(\b|$)/.test(text)
    ) {
      return resetToMainMenu();
    }

    if (/(servicios|que haces|que ofreces|tipos de paginas|opciones)/.test(text)) {
      pendingStep = null;
      return getServicesResponse();
    }

    if (
      /(inversion|precio|precios|presupuesto|cuanto cuesta|cuanto vale|cotizar|quiero cotizar)/.test(
        text
      )
    ) {
      if (projectType) {
        pendingStep = null;
        return getProjectTypeResponse(projectType);
      }

      return startInvestmentFlow();
    }

    if (/(que web necesito|cual necesito|que me recomiendas|no se que pagina necesito)/.test(text)) {
      return startRecommendationFlow();
    }

    if (/(tiempo|entrega|cuanto tarda|en cuantos dias)/.test(text)) {
      pendingStep = null;
      return getDeliveryResponse();
    }

    if (/(whatsapp|contacto|como te escribo|numero|telefono)/.test(text)) {
      pendingStep = null;
      return getWhatsAppResponse();
    }

    if (pendingStep === "project-type" && projectType) {
      pendingStep = null;
      return getProjectTypeResponse(projectType);
    }

    if (pendingStep === "business-type" && businessType) {
      pendingStep = null;
      return getBusinessRecommendation(businessType);
    }

    if (pendingStep === "business-description") {
      pendingStep = null;
      return getCustomBusinessRecommendation(rawText);
    }

    if (projectType) {
      pendingStep = null;
      return getProjectTypeResponse(projectType);
    }

    if (businessType) {
      pendingStep = null;
      return getBusinessRecommendation(businessType);
    }

    return getFallbackResponse();
  };

  const sendUserMessage = (text) => {
    const cleanText = text.trim();

    if (!cleanText) {
      return;
    }

    addMessage({ author: "user", text: cleanText });
    input.value = "";
    window.clearTimeout(nudgeTimer);

    const response = getIntentResponse(cleanText);
    queueBotResponse(response);
  };

  const showInitialConversation = () => {
    if (hasStartedConversation) {
      return;
    }

    hasStartedConversation = true;
    queueBotResponse(resetToMainMenu());

      nudgeTimer = window.setTimeout(() => {
        if (!hasShownNudge && messages.children.length <= 2) {
          hasShownNudge = true;
          queueBotResponse({
            text: CHATBOT_CONFIG.nudgeMessage,
          });
        }
      }, 5200);
  };

  const openChat = () => {
    chatbotRoot.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    panel.setAttribute("aria-hidden", "false");
    showInitialConversation();

    window.setTimeout(() => {
      input.focus();
      scrollToBottom();
    }, 180);
  };

  const closeChat = () => {
    chatbotRoot.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true");
    removeTypingIndicator();
    window.clearTimeout(typingTimer);
  };

  toggle.addEventListener("click", () => {
    if (chatbotRoot.classList.contains("is-open")) {
      closeChat();
    } else {
      openChat();
    }
  });

  closeButton.addEventListener("click", closeChat);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendUserMessage(input.value);
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendUserMessage(input.value);
    }
  });

  panel.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-chatbot-reply], [data-chatbot-shortcut]");

    if (!actionButton) {
      return;
    }

    const message =
      actionButton.getAttribute("data-chatbot-reply") ||
      actionButton.getAttribute("data-chatbot-shortcut") ||
      "";

    sendUserMessage(message);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && chatbotRoot.classList.contains("is-open")) {
      closeChat();
      toggle.focus();
    }
  });
}
