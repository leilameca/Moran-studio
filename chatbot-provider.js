(function () {
  const normalize = (value = "") => value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  class LocalStudioAssistantProvider {
    constructor(content, language = "es") {
      this.content = content;
      this.language = language === "en" ? "en" : "es";
      this.pending = null;
    }

    setLanguage(language) {
      this.language = language === "en" ? "en" : "es";
    }

    get copy() {
      return this.content[this.language];
    }

    getWelcome() {
      this.pending = null;
      return this.copy.welcome;
    }

    resolveIntent(text) {
      const value = normalize(text);
      if (/(hola|hello|menu|inicio|start|volver)/.test(value)) return "welcome";
      if (/(estudio|studio|quienes|equipo|team|leilany|yascari)/.test(value)) return "studio";
      if (/(servicio|service|capacidad|capabilities|que hacen|what do you do)/.test(value)) return "services";
      if (/(saas|software|aplicacion|application|producto digital)/.test(value)) return "service-software";
      if (/(erp|inventario|inventory|operacion|operations|manufactura)/.test(value)) return "service-erp";
      if (/(3d|spatial|solar|fotogrametr|photogramm|drone)/.test(value)) return "service-3d";
      if (/(web|website|design|diseno|ui|ux)/.test(value)) return "service-web";
      if (/(proyecto|projects|portfolio|casos|cases)/.test(value)) return "projects";
      if (/(contact|contacto|whatsapp|email|correo|telefono)/.test(value)) return "contact";
      if (/(empezar|iniciar|cotizar|brief|quiero construir|start a project)/.test(value)) return "start";
      return "fallback";
    }

    createProjectPrompt(intent) {
      const type = intent.replace("start-", "");
      this.pending = { type: "brief", projectType: type };
      return {
        text: this.copy.projectPrompts[type] || this.copy.projectPrompts.unknown,
        replies: [
          { label: this.language === "en" ? "Go to the form" : "Ir al formulario", action: "scroll", target: "#contacto" },
          { label: "WhatsApp", action: "whatsapp" },
          { label: this.language === "en" ? "Main menu" : "Menú principal", intent: "welcome" }
        ]
      };
    }

    createBriefResponse(text) {
      const context = text.trim();
      const projectType = this.pending?.projectType || "unknown";
      this.pending = null;
      const projectLabels = {
        es: { software: "Software / SaaS", erp: "ERP Industrial", web: "Web / Design", "3d": "3D / Spatial", unknown: "Proyecto por definir" },
        en: { software: "Software / SaaS", erp: "Industrial ERP", web: "Web / Design", "3d": "3D / Spatial", unknown: "Project to define" }
      };
      const label = projectLabels[this.language][projectType] || projectLabels[this.language].unknown;
      const message = this.language === "en"
        ? `Hi, I’m visiting the Morán Studio website and would like to discuss a project.\n\nProject type: ${label}\nContext: ${context}`
        : `Hola, vengo desde la web de Morán Studio y quiero conversar sobre un proyecto.\n\nTipo de proyecto: ${label}\nContexto: ${context}`;
      return {
        text: this.copy.briefCaptured,
        replies: [
          { label: this.language === "en" ? "Continue in the form" : "Continuar en el formulario", action: "scroll", target: "#contacto" },
          { label: this.language === "en" ? "Prepare WhatsApp" : "Preparar WhatsApp", action: "whatsapp", message },
          { label: this.language === "en" ? "Main menu" : "Menú principal", intent: "welcome" }
        ]
      };
    }

    async respond({ text = "", intent = "" } = {}) {
      if (this.pending?.type === "brief" && !intent) return this.createBriefResponse(text);
      const resolved = intent || this.resolveIntent(text);
      if (resolved === "welcome") return this.getWelcome();
      if (resolved.startsWith("start-")) return this.createProjectPrompt(resolved);
      this.pending = null;
      return this.copy.responses[resolved] || this.copy.responses.fallback;
    }
  }

  window.MoranStudioAssistantProvider = LocalStudioAssistantProvider;
})();
