# Arquitectura final de componentes

La entrega permanece en HTML, CSS y JavaScript para conservar compatibilidad directa con GitHub Pages y no añadir una cadena de compilación innecesaria. La interfaz está separada por responsabilidades y puede migrarse después a componentes de framework sin cambiar el sistema visual.

## Árbol de página

```text
AppShell
├── ThemeBootstrap (dark por defecto + preferencia persistida)
├── SiteHeader
│   ├── StudioBrand
│   ├── PrimaryNavigation
│   ├── ThemeToggle (sol / luna)
│   ├── LanguageToggle
│   └── ProjectCTA
├── HeroSection
│   ├── HeroNarrative
│   ├── ExpertiseProof
│   └── FounderPortrait
├── StudioSection
│   ├── LeilanyFounderProfile
│   ├── YascariRelationsProfile
│   └── StudioPrinciples
├── CapabilitiesSection
│   ├── DisciplineRail
│   └── ServiceCard × 3
├── SelectedSystemsSection
│   └── CaseStudyGrid
│       ├── CartaYaCase
│       ├── MashFacturaERPCase
│       ├── SingTalkCase
│       └── Solar3DLabCase
├── WebExperiencesSection
├── ToolsSection
├── MethodologySection
├── ProjectIntakeSection
├── SiteFooter
└── StudioAssistant (flotante e independiente)
    ├── Launcher
    ├── AccessibleDialog
    ├── ConversationView
    ├── LocalStudioAssistantProvider
    └── AssistantContent (ES / EN)
```

## Sistema de diseño

- Tema inicial: oscuro. El control con sol cambia a claro y el control con luna vuelve a oscuro. La preferencia explícita se conserva en `localStorage`.
- Tokens oscuros: fondo carbón, superficies elevadas sutiles, rosa de marca, oliva y marfil.
- Tema claro: fondo marfil cálido, texto carbón y los mismos acentos de marca con contraste ajustado.
- Tipografía: Space Grotesk para titulares y UI técnica; Inter para lectura y controles.
- Layout: contenedor máximo de 1240 px, composición editorial asimétrica y tarjetas compactas.
- Movimiento: reveals, transiciones de navegación, progreso del método y apertura del asistente; todo se desactiva o reduce con `prefers-reduced-motion`.
- Accesibilidad: salto al contenido, foco visible, navegación por teclado, estados ARIA, región viva del asistente y formularios con etiquetas reales.

## Arquitectura del Studio Assistant

- `chatbot-content.js`: contenido verificado, bilingüe y separado de la interfaz.
- `chatbot-provider.js`: proveedor local basado en intenciones. Mantiene un contrato asíncrono para sustituirlo en el futuro por una API o LLM sin reconstruir la UI.
- `chatbot.js`: estado, renderizado seguro, foco, teclado y acciones hacia secciones o canales de contacto.
- `chatbot.css`: launcher, panel y adaptación visual dark/light, desktop/mobile.
- No se conecta a servicios externos, no promete precios o plazos y no se hace pasar por Leilany ni Yascari.

## Fuente de verdad de proyectos

- CartaYa: dominio canónico `tucartaya.com`; panel y menú cliente reales incorporados.
- Mash Factura: dashboard ERP real incorporado; sin métricas promocionales no verificadas.
- Sing Talk: producto de accesibilidad para traducción de lengua de señas en tiempo real; login y captura funcional reales incorporados.
- Solar 3D Lab: disposición fotovoltaica sobre captura aérea real incorporada; faltan renders 3D y datos técnicos completos.
