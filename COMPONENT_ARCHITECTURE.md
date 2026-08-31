# Arquitectura final de componentes

La entrega actual permanece en HTML/CSS/JavaScript para conservar compatibilidad directa con GitHub Pages. La estructura está diseñada como componentes visuales independientes y puede migrarse después a React/Next.js sin cambiar el sistema de diseño.

## Árbol de página

```text
AppShell
├── SiteHeader
│   ├── StudioBrand
│   ├── PrimaryNavigation
│   └── ProjectCTA
├── HeroSection
│   ├── HeroNarrative
│   ├── ExpertiseProof
│   └── FounderPortrait
├── FounderSection
│   ├── PersonalNarrative
│   └── StudioPrinciple
├── CapabilitiesSection
│   └── ServiceCard × 3
├── SelectedSystemsSection
│   └── CaseStudyBentoGrid
│       ├── CartaYaCase
│       ├── MashFacturaERPCase
│       ├── SingTalkCase
│       └── Solar3DLabCase
├── WebExperiencesSection
│   ├── MashWebsite
│   ├── LujanSmileJourney
│   ├── SolarysEngineering
│   ├── FitAppetit
│   └── NuviEngineering
├── ToolsSection
│   ├── DevelopmentStack
│   ├── ProductDesignStack
│   ├── Spatial3DStack
│   └── WorkflowStack
├── MethodologySection
│   └── DeliverySteps
├── InteractiveQuizSection
│   ├── ThreeQuestionFlow
│   └── WhatsAppResult
├── ProjectIntakeSection
│   ├── ContactChannels
│   └── QuoteForm
└── SiteFooter
```

## Sistema de diseño

- Tokens base: fondo `#07080C`, superficie `#0F1117`, rosa de marca `#D6A4A4`, oliva `#6B705C`, beige `#F5F1ED`; cian y amber quedan como acentos técnicos secundarios.
- Tipografía: Space Grotesk para titulares y UI técnica; Inter para lectura y controles.
- Layout: contenedor máximo de 1240 px, grillas de 12 px y tarjetas con radio de 10 px.
- Movimiento: reveal progresivo, profundidad en casos de estudio y estados claros de navegación. Todo respeta `prefers-reduced-motion`.
- Accesibilidad: enlace de salto, navegación semántica, foco visible, controles de tabs con estado ARIA y formulario con etiquetas reales.

## Fuente de verdad de proyectos

- CartaYa: dominio canónico `tucartaya.com`; panel y menú cliente reales incorporados.
- Mash Factura: dashboard ERP real incorporado; sin métricas promocionales no verificadas.
- Sing Talk: producto de accesibilidad para traducción de lengua de señas en tiempo real; login y captura funcional reales incorporados.
- Solar 3D Lab: disposición fotovoltaica sobre captura aérea real incorporada; faltan renders 3D y datos técnicos completos.
