const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const ES_TO_EN = {
  "El equipo detrás del sistema.": "The team behind the system.",
  "Leilany lidera el desarrollo y el diseño. Yascari conecta las necesidades de cada proyecto con el estudio.": "Leilany leads development and design. Yascari connects each project’s needs with the studio.",
  "Saltar al contenido": "Skip to content",
  "Morán Studio, inicio": "Morán Studio, home",
  "Navegación principal": "Primary navigation",
  "Redes sociales": "Social links",
  "Abrir menú": "Open menu",
  "Cerrar menú": "Close menu",
  "Progreso": "Progress",
  "Áreas de práctica": "Practice areas",
  "Equipo de Morán Studio": "Morán Studio team",
  "Disciplinas": "Disciplines",
  "Estudio": "Studio",
  "Capacidades": "Capabilities",
  "Proyectos": "Projects",
  "Método": "Method",
  "Contacto": "Contact",
  "Cuéntame tu idea": "Tell me about your idea",
  "MORÁN STUDIO · REPÚBLICA DOMINICANA": "MORÁN STUDIO · DOMINICAN REPUBLIC",
  "Diseñamos e implementamos productos SaaS, plataformas ERP, experiencias web y soluciones 3D fotovoltaicas con precisión técnica y sensibilidad visual.": "We design and build SaaS products, ERP platforms, web experiences, and 3D photovoltaic solutions with technical precision and visual sensitivity.",
  "Ver proyectos destacados": "View featured projects",
  "Iniciar proyecto": "Start a project",
  "Arquitectura & producto": "Architecture & product",
  "UI/UX & dirección visual": "UI/UX & visual direction",
  "Fotogrametría & solar 3D": "Photogrammetry & 3D solar",
  "Tecnología con criterio.": "Technology with judgment.",
  "Diseño con personalidad.": "Design with personality.",
  "Soy Leilany Morán, desarrolladora y diseñadora dominicana. Morán Studio nace de unir dos formas de pensar que para mí nunca debieron estar separadas: la lógica de un sistema sólido y la sensibilidad de una experiencia bien diseñada.": "I’m Leilany Morán, a Dominican developer and designer. Morán Studio was born from bringing together two ways of thinking that should never have been separate: the logic of a solid system and the sensitivity of a well-designed experience.",
  "No construyo productos para llenar un portafolio. Me involucro en el problema, entiendo la operación y convierto esa complejidad en herramientas claras, útiles y visualmente cuidadas.": "I don’t build products just to fill a portfolio. I get involved in the problem, understand the operation, and turn that complexity into tools that are clear, useful, and visually considered.",
  "La forma importa cuando trabaja a favor de las personas y del negocio.": "Form matters when it works for people and for the business.",
  "LEILANY MORÁN · DIRECTORA": "LEILANY MORÁN · DIRECTOR",
  "Dirección técnica y creativa": "Technical and creative direction",
  "01 / CAPACIDADES": "01 / CAPABILITIES",
  "Construimos donde convergen": "We build where",
  "tecnología, operación y diseño.": "technology, operations, and design converge.",
  "Desde un producto digital hasta un entorno físico modelado: cada decisión parte del contexto real y termina en una solución que se puede usar, medir y hacer crecer.": "From a digital product to a modeled physical environment, every decision starts with real context and ends in a solution that can be used, measured, and scaled.",
  "Productos multi-tenant, portales y aplicaciones con una experiencia coherente desde la arquitectura hasta el último estado de interfaz.": "Multi-tenant products, portals, and applications with a coherent experience from architecture to the final interface state.",
  "Arquitectura de producto": "Product architecture",
  "Sistemas a medida para convertir procesos dispersos en una operación trazable: inventario, producción, finanzas y decisiones.": "Custom systems that turn fragmented processes into traceable operations across inventory, production, finance, and decision-making.",
  "Mapeo de procesos": "Process mapping",
  "Control operativo": "Operations control",
  "Levantamientos, fotogrametría y modelado técnico para validar instalaciones fotovoltaicas dentro de su contexto espacial.": "Surveying, photogrammetry, and technical modeling to validate photovoltaic installations within their spatial context.",
  "Captura con drone": "Drone capture",
  "Modelado espacial": "Spatial modeling",
  "Simulación fotovoltaica": "PV simulation",
  "02 / SISTEMAS DESTACADOS": "02 / FEATURED SYSTEMS",
  "Productos reales para": "Real products for",
  "problemas reales.": "real problems.",
  "PRODUCTO REAL": "REAL PRODUCT",
  "Panel de gestión de CartaYa": "CartaYa management dashboard",
  "Menú cliente de CartaYa": "CartaYa customer menu",
  "Plataforma multi-tenant para restaurantes con menú digital, pedidos, cocina, códigos QR, equipos y personalización.": "A multi-tenant restaurant platform with digital menus, ordering, kitchen workflows, QR codes, teams, and customization.",
  "SISTEMA OPERATIVO": "OPERATIONAL SYSTEM",
  "Dashboard del ERP Mash Factura": "Mash Factura ERP dashboard",
  "ERP para centralizar el ciclo comercial, inventario, operación y control financiero de manufactura.": "A custom ERP that centralizes the commercial cycle, inventory, operations, and financial control for manufacturing.",
  "Solicitar caso": "Request case study",
  "Inicio de sesión de Sing Talk": "Sing Talk sign-in screen",
  "Sing Talk traduciendo una seña en tiempo real": "Sing Talk translating a sign in real time",
  "DETECCIÓN LOCAL": "ON-DEVICE DETECTION",
  "Traductor de lengua de señas con visión por computadora, audio e historial privado.": "A sign-language translator with computer vision, audio output, and private history.",
  "Explorar producto": "Explore product",
  "Diseño fotovoltaico sobre captura aérea": "Photovoltaic design over an aerial survey",
  "Levantamiento y disposición espacial": "Surveying and spatial layout",
  "INGENIERÍA ESPACIAL": "SPATIAL ENGINEERING",
  "Levantamiento aéreo, disposición de módulos y validación espacial para diseño fotovoltaico.": "Aerial surveying, module layout, and spatial validation for photovoltaic design.",
  "Explorar capacidad": "Explore capability",
  "03 / EXPERIENCIAS WEB": "03 / WEB EXPERIENCES",
  "También construimos presencia,": "We also build presence,",
  "marca y conversión.": "brand, and conversion.",
  "Desliza para explorar los proyectos": "Swipe to explore the projects",
  "Desliza para ver más trabajos": "Swipe to see more work",
  "Una selección de páginas desarrolladas para negocios que necesitaban comunicar mejor y verse a la altura de su trabajo.": "A selection of websites built for businesses that needed to communicate better and look as strong as the work they deliver.",
  "Ver sitio ↗": "View site ↗",
  "Sitio web MASH": "MASH website",
  "Sitio web Lujan Smile Journey": "Lujan Smile Journey website",
  "Sitio web Solarys Ingeniería": "Solarys Engineering website",
  "Sitio web FitAppetit": "FitAppetit website",
  "Sitio web Nuvi Ingeniería": "Nuvi Engineering website",
  "Mobiliario exterior · Catálogo digital": "Outdoor furniture · Digital catalog",
  "Salud dental · Experiencia de marca": "Dental care · Brand experience",
  "Energía · Presencia corporativa": "Energy · Corporate presence",
  "Alimentos · Marca y conversión": "Food · Brand and conversion",
  "Ingeniería eléctrica · Confianza técnica": "Electrical engineering · Technical trust",
  "04 / STACK & HERRAMIENTAS": "04 / STACK & TOOLS",
  "Herramientas reales para": "Real tools to",
  "construir de principio a fin.": "build from start to finish.",
  "El stack cambia según el problema. La intención se mantiene: elegir tecnología útil, mantenible y apropiada para cada producto.": "The stack changes with the problem. The intention remains the same: choose technology that is useful, maintainable, and appropriate for each product.",
  "Desarrollo": "Development",
  "Diseño & producto": "Design & product",
  "3D & espacial": "3D & spatial",
  "05 / MÉTODO": "05 / METHOD",
  "De una conversación": "From a conversation",
  "a un sistema útil.": "to a useful system.",
  "El proceso es técnico, pero nunca impersonal. Trabajamos con claridad, entregables visibles y decisiones explicadas.": "The process is technical, but never impersonal. We work with clarity, visible deliverables, and well-explained decisions.",
  "Entender": "Understand",
  "Objetivos, usuarios, operación y restricciones reales.": "Goals, users, operations, and real constraints.",
  "Diseñar": "Design",
  "Arquitectura, flujos y prototipos antes de construir.": "Architecture, flows, and prototypes before building.",
  "Desarrollar": "Build",
  "Implementación por capas, integraciones y control de calidad.": "Layered implementation, integrations, and quality control.",
  "Entregar & evolucionar": "Deliver & evolve",
  "Despliegue, documentación y siguientes mejoras.": "Deployment, documentation, and the next improvements.",
  "06 / ¿TRABAJAMOS JUNTOS?": "06 / SHOULD WE WORK TOGETHER?",
  "En menos de un minuto encontramos": "In under a minute, we’ll find",
  "la mejor ruta.": "the best route.",
  "Elige qué necesitas y comparte el contexto esencial. Al final prepararé un mensaje para comenzar la conversación sin formularios eternos.": "Choose what you need and share the essential context. At the end, I’ll prepare a message so we can start the conversation without an endless form.",
  "1 / 4 · TIPO DE PROYECTO": "1 / 4 · PROJECT TYPE",
  "¿Qué necesitas construir?": "What do you need to build?",
  "Diseño 3D Solar": "3D Solar Design",
  "Página web": "Website",
  "2 / 4 · SITUACIÓN": "2 / 4 · CURRENT SITUATION",
  "¿Tu negocio tiene web actualmente?": "Does your business currently have a website?",
  "No, necesito crear una desde cero": "No, I need to build one from scratch",
  "Sí, pero no me representa bien": "Yes, but it doesn’t represent me well",
  "Sí, solo quiero optimizarla": "Yes, I only want to optimize it",
  "3 / 4 · OBJETIVO": "3 / 4 · GOAL",
  "¿Qué quieres lograr con tu web?": "What do you want your website to achieve?",
  "Vender más productos o servicios": "Sell more products or services",
  "Generar confianza y presencia de marca": "Build trust and brand presence",
  "Captar clientes sin pagar publicidad": "Attract clients without paid advertising",
  "4 / 4 · TIEMPO": "4 / 4 · TIMELINE",
  "¿Cuándo quieres tener tu web lista?": "When would you like your website to be ready?",
  "Lo antes posible, es urgente": "As soon as possible — it’s urgent",
  "En el próximo mes": "Within the next month",
  "Sin prisa, lo quiero bien hecho": "No rush — I want it done properly",
  "CONTEXTO COMPLETO": "CONTEXT COMPLETE",
  "Listo. Ya sé por dónde empezar.": "Great. I know where to start.",
  "Tu mensaje incluirá las respuestas para que podamos ir directo a lo importante.": "Your message will include your answers so we can go straight to what matters.",
  "Hablar con Leilany": "Talk to Leilany",
  "Volver a empezar": "Start again",
  "06 / INICIAR PROYECTO": "06 / START A PROJECT",
  "Hagamos algo sólido,": "Let’s build something solid,",
  "útil y muy tuyo.": "useful, and distinctly yours.",
  "Cuéntame dónde estás, qué necesitas resolver y qué resultado buscas. Te responderé personalmente con próximos pasos claros.": "Tell me where you are, what you need to solve, and the outcome you are looking for. I’ll reply personally with clear next steps.",
  "Fundadora · Morán Studio": "Founder · Morán Studio",
  "Cuéntame tu proyecto": "Tell me about your project",
  "RESPUESTA PERSONAL": "PERSONAL REPLY",
  "Nombre / Empresa": "Name / Company",
  "Contexto del proyecto": "Project context",
  "Preparar solicitud": "Prepare request",
  "Se abrirá WhatsApp para que revises el mensaje antes de enviarlo.": "WhatsApp will open so you can review the message before sending it.",
  "Software con precisión. Diseño con intención.": "Software with precision. Design with intention.",
  "© 2026 Morán Studio · República Dominicana": "© 2026 Morán Studio · Dominican Republic",
  "Leilany Morán, fundadora y directora de Morán Studio": "Leilany Morán, founder and director of Morán Studio",
  "Tu nombre o empresa": "Your name or company",
  "nombre@empresa.com": "name@company.com",
  "¿Qué necesitas transformar o construir?": "What do you need to transform or build?"
};

const translatedTextNodes = [];
const translatedAttributes = [];
let currentLanguage = localStorage.getItem("ms-lang") === "es" ? "es" : "en";

function prepareTranslations() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const raw = node.nodeValue;
    const core = raw.trim();
    if (!core || !ES_TO_EN[core]) continue;
    translatedTextNodes.push({
      node,
      es: core,
      en: ES_TO_EN[core],
      before: raw.slice(0, raw.indexOf(core)),
      after: raw.slice(raw.indexOf(core) + core.length)
    });
  }

  document.querySelectorAll("[placeholder],[alt],[aria-label]").forEach((element) => {
    ["placeholder", "alt", "aria-label"].forEach((attribute) => {
      const es = element.getAttribute(attribute);
      if (es && ES_TO_EN[es]) translatedAttributes.push({ element, attribute, es, en: ES_TO_EN[es] });
    });
  });
}

function getTheme() {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function syncThemeControl() {
  const toggle = document.querySelector("[data-theme-toggle]");
  if (!toggle) return;
  const isLight = getTheme() === "light";
  const label = currentLanguage === "en"
    ? (isLight ? "Switch to dark mode" : "Switch to light mode")
    : (isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro");
  toggle.setAttribute("aria-label", label);
  toggle.setAttribute("aria-pressed", String(isLight));
}

function setTheme(theme, persist = true) {
  const nextTheme = theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  document.documentElement.style.colorScheme = nextTheme;
  document.querySelector("meta[name='theme-color']")?.setAttribute("content", nextTheme === "light" ? "#f3efe9" : "#07080c");
  if (persist) localStorage.setItem("ms-theme", nextTheme);
  syncThemeControl();
}

function setLanguage(language, persist = true) {
  currentLanguage = language;
  document.documentElement.lang = language;
  translatedTextNodes.forEach((item) => { item.node.nodeValue = `${item.before}${item[language]}${item.after}`; });
  translatedAttributes.forEach((item) => item.element.setAttribute(item.attribute, item[language]));
  document.title = language === "en"
    ? "Morán Studio — Software, Design & 3D Solar Engineering"
    : "Morán Studio — Software, Diseño e Ingeniería Solar 3D";
  document.querySelector("meta[name='description']")?.setAttribute("content", language === "en"
    ? "Technology and design studio led by Leilany Morán. SaaS products, industrial ERPs, web experiences, and 3D photovoltaic design."
    : "Estudio tecnológico y creativo dirigido por Leilany Morán. Productos SaaS, ERPs industriales, experiencias web y diseño fotovoltaico 3D.");
  document.querySelector("[data-lang-toggle]")?.setAttribute("aria-label", language === "en" ? "Cambiar idioma a español" : "Change language to English");
  if (persist) localStorage.setItem("ms-lang", language);
  syncThemeControl();
  document.dispatchEvent(new CustomEvent("ms:languagechange", { detail: { language } }));
}

prepareTranslations();
setLanguage(currentLanguage, false);
setTheme(getTheme(), false);

document.querySelector("[data-lang-toggle]")?.addEventListener("click", () => setLanguage(currentLanguage === "en" ? "es" : "en"));
document.querySelector("[data-theme-toggle]")?.addEventListener("click", () => setTheme(getTheme() === "dark" ? "light" : "dark"));

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const mobileMenuQuery = window.matchMedia("(max-width: 920px)");

function setMenu(open, moveFocus = false) {
  if (!menuButton || !nav) return;
  const shouldOpen = mobileMenuQuery.matches && open;
  menuButton.classList.toggle("is-open", shouldOpen);
  nav.classList.toggle("is-open", shouldOpen);
  nav.inert = mobileMenuQuery.matches && !shouldOpen;
  document.body.classList.toggle("is-menu-open", shouldOpen);
  menuButton.setAttribute("aria-expanded", String(shouldOpen));
  menuButton.setAttribute("aria-label", shouldOpen
    ? (currentLanguage === "en" ? "Close menu" : "Cerrar menú")
    : (currentLanguage === "en" ? "Open menu" : "Abrir menú"));
  if (shouldOpen && moveFocus) nav.querySelector("a")?.focus();
}

function syncMenuMode() {
  if (mobileMenuQuery.matches) setMenu(false);
  else {
    nav.inert = false;
    nav.classList.remove("is-open");
    menuButton?.classList.remove("is-open");
    document.body.classList.remove("is-menu-open");
    menuButton?.setAttribute("aria-expanded", "false");
  }
}

menuButton?.addEventListener("click", () => setMenu(!nav.classList.contains("is-open"), true));
nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("click", (event) => {
  if (!nav?.classList.contains("is-open")) return;
  if (!nav.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav?.classList.contains("is-open")) {
    setMenu(false);
    menuButton?.focus();
  }
});
mobileMenuQuery.addEventListener("change", syncMenuMode);
syncMenuMode();

function syncHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
}
syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

const revealItems = document.querySelectorAll("[data-reveal]");
if (reducedMotionQuery.matches || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  document.documentElement.classList.add("motion-ready");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -35px" });
  revealItems.forEach((item) => revealObserver.observe(item));
}

const observedSections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".main-nav a[href^='#']");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!current) return;
    navLinks.forEach((link) => {
      const active = link.hash === `#${current.target.id}`;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-22% 0px -66%", threshold: [0, 0.2, 0.5] });
  observedSections.forEach((section) => sectionObserver.observe(section));
}

const methodSteps = document.querySelector("[data-method-steps]");
const methodProgress = document.querySelector("[data-method-progress]");
let progressFrame = 0;
function updateMethodProgress() {
  progressFrame = 0;
  if (!methodSteps || !methodProgress) return;
  const rect = methodSteps.getBoundingClientRect();
  const start = window.innerHeight * 0.72;
  const end = window.innerHeight * 0.28;
  const progress = Math.max(0, Math.min(1, (start - rect.top) / Math.max(1, rect.height - end)));
  methodProgress.style.height = `${progress * 100}%`;
}
window.addEventListener("scroll", () => {
  if (!progressFrame) progressFrame = window.requestAnimationFrame(updateMethodProgress);
}, { passive: true });
updateMethodProgress();

document.querySelector("[data-quote-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const selectedService = form.querySelector("input[name='service']:checked")?.closest("label")?.querySelector("span")?.textContent.trim() || data.get("service");
  const message = currentLanguage === "en" ? [
    "Hi Leilany, I’d like to discuss a project with Morán Studio.", "", `Service: ${selectedService}`, `Name / company: ${data.get("name")}`, `Email: ${data.get("email")}`, `Context: ${data.get("message")}`
  ].join("\n") : [
    "Hola Leilany, quiero conversar sobre un proyecto con Morán Studio.", "", `Servicio: ${selectedService}`, `Nombre / empresa: ${data.get("name")}`, `Email: ${data.get("email")}`, `Contexto: ${data.get("message")}`
  ].join("\n");
  window.open(`https://wa.me/18092697630?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});
