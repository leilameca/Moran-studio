(function () {
  const sharedProjects = {
    cartaya: {
      es: "CartaYa es una plataforma SaaS multi-tenant para restaurantes con menú digital, pedidos, cocina, códigos QR, equipos y personalización.",
      en: "CartaYa is a multi-tenant SaaS platform for restaurants with digital menus, ordering, kitchen workflows, QR codes, teams, and customization."
    },
    mash: {
      es: "Mash Factura es un ERP que centraliza el ciclo comercial, inventario, operación y control financiero de manufactura.",
      en: "Mash Factura is an ERP that centralizes the commercial cycle, inventory, operations, and financial control for manufacturing."
    },
    singtalk: {
      es: "Sing Talk es un traductor de lengua de señas con visión por computadora, audio e historial privado.",
      en: "Sing Talk is a sign-language translator with computer vision, audio output, and private history."
    },
    solar: {
      es: "Solar 3D & Photogrammetry Lab reúne levantamiento aéreo, disposición de módulos y validación espacial para diseño fotovoltaico.",
      en: "Solar 3D & Photogrammetry Lab combines aerial surveying, module layout, and spatial validation for photovoltaic design."
    }
  };

  window.MORAN_STUDIO_ASSISTANT_CONTENT = {
    es: {
      ui: {
        rootLabel: "Asistente de Morán Studio",
        launcherEyebrow: "MORÁN STUDIO",
        launcherLabel: "Studio Assistant",
        openLabel: "Abrir Studio Assistant",
        closeLabel: "Cerrar Studio Assistant",
        panelEyebrow: "STUDIO ASSISTANT",
        panelTitle: "¿Qué quieres explorar?",
        panelSubtitle: "Orientación breve sobre servicios, proyectos y próximos pasos.",
        inputLabel: "Escribe un mensaje",
        inputPlaceholder: "Escribe aquí…",
        sendLabel: "Enviar mensaje",
        hint: "Sin respuestas automáticas externas. Tú decides cuándo contactar al estudio.",
        typing: "Preparando respuesta"
      },
      welcome: {
        text: "Hola. Soy el asistente de Morán Studio. Puedo ayudarte a explorar nuestros servicios, proyectos o contarnos qué quieres construir.",
        replies: [
          { label: "Sobre el estudio", intent: "studio" },
          { label: "Explorar servicios", intent: "services" },
          { label: "Ver proyectos", intent: "projects" },
          { label: "Iniciar un proyecto", intent: "start" },
          { label: "Contacto", intent: "contact" }
        ]
      },
      responses: {
        studio: {
          text: "Morán Studio es un estudio de tecnología y diseño dirigido por Leilany Morán. El trabajo combina software, producto, experiencias web y soluciones 3D / Spatial. Yascari Morán acompaña el desarrollo de negocio y las relaciones de proyecto.",
          replies: [
            { label: "Conocer The Studio", action: "scroll", target: "#estudio" },
            { label: "Explorar servicios", intent: "services" },
            { label: "Contacto", intent: "contact" }
          ]
        },
        services: {
          text: "El estudio trabaja en cuatro áreas conectadas: Software / SaaS, ERP y operaciones, Web / Design, y 3D / Spatial. Puedes explorar una disciplina o verlas todas en la página.",
          replies: [
            { label: "Software / SaaS", intent: "service-software" },
            { label: "ERP / Operaciones", intent: "service-erp" },
            { label: "Web / Design", intent: "service-web" },
            { label: "3D / Spatial", intent: "service-3d" },
            { label: "Ver capacidades", action: "scroll", target: "#capacidades" }
          ]
        },
        "service-software": {
          text: "Morán Studio diseña e implementa productos SaaS, portales y aplicaciones web, cuidando la arquitectura, los flujos y cada estado de la interfaz.",
          replies: [
            { label: "Ver sistemas", action: "scroll", target: "#proyectos" },
            { label: "Contar mi proyecto", intent: "start-software" },
            { label: "Volver a servicios", intent: "services" }
          ]
        },
        "service-erp": {
          text: "El trabajo ERP parte de procesos reales para convertir inventario, producción, finanzas y operación en sistemas claros y trazables.",
          replies: [
            { label: "Ver Mash Factura", action: "scroll", target: "#mash-factura" },
            { label: "Contar mi proyecto", intent: "start-erp" },
            { label: "Volver a servicios", intent: "services" }
          ]
        },
        "service-web": {
          text: "Las experiencias web combinan estructura, dirección visual, responsive design y conversión sin separar el diseño de la implementación.",
          replies: [
            { label: "Ver experiencias web", action: "scroll", target: "#webs" },
            { label: "Contar mi proyecto", intent: "start-web" },
            { label: "Volver a servicios", intent: "services" }
          ]
        },
        "service-3d": {
          text: "La práctica 3D / Spatial incluye levantamiento, fotogrametría, modelado técnico y validación espacial para proyectos fotovoltaicos.",
          replies: [
            { label: "Ver Solar 3D Lab", action: "scroll", target: "#solar-3d" },
            { label: "Contar mi proyecto", intent: "start-3d" },
            { label: "Volver a servicios", intent: "services" }
          ]
        },
        projects: {
          text: "Puedes explorar sistemas y productos digitales, o una selección de experiencias web desarrolladas para negocios reales.",
          replies: [
            { label: "Sistemas y productos", intent: "project-systems" },
            { label: "Experiencias web", intent: "project-web" },
            { label: "Ver todos", action: "scroll", target: "#proyectos" }
          ]
        },
        "project-systems": {
          text: "Los sistemas destacados cubren SaaS, operaciones industriales, accesibilidad e ingeniería espacial.",
          replies: [
            { label: "CartaYa", intent: "project-cartaya" },
            { label: "Mash Factura", intent: "project-mash" },
            { label: "Sing Talk", intent: "project-singtalk" },
            { label: "Solar 3D Lab", intent: "project-solar" },
            { label: "Volver a proyectos", intent: "projects" }
          ]
        },
        "project-cartaya": {
          text: sharedProjects.cartaya.es,
          replies: [
            { label: "Ver CartaYa", action: "scroll", target: "#cartaya" },
            { label: "Abrir tucartaya.com", action: "link", href: "https://tucartaya.com" },
            { label: "Contar mi proyecto", intent: "start-software" }
          ]
        },
        "project-mash": {
          text: sharedProjects.mash.es,
          replies: [
            { label: "Ver Mash Factura", action: "scroll", target: "#mash-factura" },
            { label: "Contar mi proyecto", intent: "start-erp" }
          ]
        },
        "project-singtalk": {
          text: sharedProjects.singtalk.es,
          replies: [
            { label: "Ver Sing Talk", action: "scroll", target: "#sing-talk" },
            { label: "Contar mi proyecto", intent: "start-software" }
          ]
        },
        "project-solar": {
          text: sharedProjects.solar.es,
          replies: [
            { label: "Ver Solar 3D Lab", action: "scroll", target: "#solar-3d" },
            { label: "Contar mi proyecto", intent: "start-3d" }
          ]
        },
        "project-web": {
          text: "La selección web incluye MASH, Lujan Smile Journey, Solarys Ingeniería, FitAppetit y Nuvi Ingeniería.",
          replies: [
            { label: "Ver experiencias web", action: "scroll", target: "#webs" },
            { label: "Contar mi proyecto", intent: "start-web" },
            { label: "Volver a proyectos", intent: "projects" }
          ]
        },
        start: {
          text: "¿Qué necesitas construir? Elige la opción más cercana. Si todavía no lo tienes claro, también podemos empezar por el problema.",
          replies: [
            { label: "Software / SaaS", intent: "start-software" },
            { label: "ERP Industrial", intent: "start-erp" },
            { label: "Web / Design", intent: "start-web" },
            { label: "3D / Spatial", intent: "start-3d" },
            { label: "No lo tengo claro", intent: "start-unknown" }
          ]
        },
        contact: {
          text: "Puedes iniciar la conversación mediante el formulario de proyecto, WhatsApp o email. El estudio revisará personalmente el contexto que compartas.",
          replies: [
            { label: "Ir al formulario", action: "scroll", target: "#contacto" },
            { label: "WhatsApp", action: "whatsapp" },
            { label: "Email", action: "email", href: "mailto:leiladev20@gmail.com" },
            { label: "Menú principal", intent: "welcome" }
          ]
        },
        fallback: {
          text: "Puedo orientarte sobre Morán Studio, servicios, proyectos o cómo iniciar una conversación con el estudio.",
          replies: [
            { label: "Explorar servicios", intent: "services" },
            { label: "Ver proyectos", intent: "projects" },
            { label: "Iniciar un proyecto", intent: "start" },
            { label: "Contacto", intent: "contact" }
          ]
        }
      },
      projectPrompts: {
        software: "Cuéntame en una frase qué producto, plataforma o proceso necesitas construir o mejorar.",
        erp: "Cuéntame en una frase qué operación o proceso necesitas organizar en el sistema.",
        web: "Cuéntame en una frase qué necesita comunicar o conseguir tu experiencia web.",
        "3d": "Cuéntame en una frase qué necesitas levantar, modelar o validar espacialmente.",
        unknown: "Cuéntame en una frase qué problema necesitas resolver. No hace falta que conozcas todavía la solución."
      },
      briefCaptured: "Gracias. Ya existe un punto de partida claro. Puedes continuar en el formulario o preparar un mensaje de WhatsApp con este contexto.",
      contactPrefill: "Hola, vengo desde la web de Morán Studio y quiero conversar sobre un proyecto."
    },
    en: {
      ui: {
        rootLabel: "Morán Studio assistant",
        launcherEyebrow: "MORÁN STUDIO",
        launcherLabel: "Studio Assistant",
        openLabel: "Open Studio Assistant",
        closeLabel: "Close Studio Assistant",
        panelEyebrow: "STUDIO ASSISTANT",
        panelTitle: "What would you like to explore?",
        panelSubtitle: "Brief guidance on services, projects, and next steps.",
        inputLabel: "Write a message",
        inputPlaceholder: "Write here…",
        sendLabel: "Send message",
        hint: "No external automated replies. You decide when to contact the studio.",
        typing: "Preparing response"
      },
      welcome: {
        text: "Hi. I’m the Morán Studio assistant. I can help you explore our services and projects, or tell us what you want to build.",
        replies: [
          { label: "About the studio", intent: "studio" },
          { label: "Explore services", intent: "services" },
          { label: "View projects", intent: "projects" },
          { label: "Start a project", intent: "start" },
          { label: "Contact", intent: "contact" }
        ]
      },
      responses: {
        studio: {
          text: "Morán Studio is a technology and design studio led by Leilany Morán. The work combines software, product, web experiences, and 3D / Spatial solutions. Yascari Morán supports business development and project relations.",
          replies: [
            { label: "Meet The Studio", action: "scroll", target: "#estudio" },
            { label: "Explore services", intent: "services" },
            { label: "Contact", intent: "contact" }
          ]
        },
        services: {
          text: "The studio works across four connected areas: Software / SaaS, ERP and operations, Web / Design, and 3D / Spatial. You can explore a discipline or see them all on the page.",
          replies: [
            { label: "Software / SaaS", intent: "service-software" },
            { label: "ERP / Operations", intent: "service-erp" },
            { label: "Web / Design", intent: "service-web" },
            { label: "3D / Spatial", intent: "service-3d" },
            { label: "View capabilities", action: "scroll", target: "#capacidades" }
          ]
        },
        "service-software": {
          text: "Morán Studio designs and builds SaaS products, portals, and web applications, considering architecture, flows, and every interface state.",
          replies: [
            { label: "View systems", action: "scroll", target: "#proyectos" },
            { label: "Tell us about my project", intent: "start-software" },
            { label: "Back to services", intent: "services" }
          ]
        },
        "service-erp": {
          text: "ERP work starts with real processes and turns inventory, production, finance, and operations into clear, traceable systems.",
          replies: [
            { label: "View Mash Factura", action: "scroll", target: "#mash-factura" },
            { label: "Tell us about my project", intent: "start-erp" },
            { label: "Back to services", intent: "services" }
          ]
        },
        "service-web": {
          text: "Web experiences combine structure, visual direction, responsive design, and conversion without separating design from implementation.",
          replies: [
            { label: "View web experiences", action: "scroll", target: "#webs" },
            { label: "Tell us about my project", intent: "start-web" },
            { label: "Back to services", intent: "services" }
          ]
        },
        "service-3d": {
          text: "The 3D / Spatial practice includes surveying, photogrammetry, technical modeling, and spatial validation for photovoltaic projects.",
          replies: [
            { label: "View Solar 3D Lab", action: "scroll", target: "#solar-3d" },
            { label: "Tell us about my project", intent: "start-3d" },
            { label: "Back to services", intent: "services" }
          ]
        },
        projects: {
          text: "You can explore digital systems and products, or a selection of web experiences developed for real businesses.",
          replies: [
            { label: "Systems and products", intent: "project-systems" },
            { label: "Web experiences", intent: "project-web" },
            { label: "View all", action: "scroll", target: "#proyectos" }
          ]
        },
        "project-systems": {
          text: "The featured systems cover SaaS, industrial operations, accessibility, and spatial engineering.",
          replies: [
            { label: "CartaYa", intent: "project-cartaya" },
            { label: "Mash Factura", intent: "project-mash" },
            { label: "Sing Talk", intent: "project-singtalk" },
            { label: "Solar 3D Lab", intent: "project-solar" },
            { label: "Back to projects", intent: "projects" }
          ]
        },
        "project-cartaya": {
          text: sharedProjects.cartaya.en,
          replies: [
            { label: "View CartaYa", action: "scroll", target: "#cartaya" },
            { label: "Open tucartaya.com", action: "link", href: "https://tucartaya.com" },
            { label: "Tell us about my project", intent: "start-software" }
          ]
        },
        "project-mash": {
          text: sharedProjects.mash.en,
          replies: [
            { label: "View Mash Factura", action: "scroll", target: "#mash-factura" },
            { label: "Tell us about my project", intent: "start-erp" }
          ]
        },
        "project-singtalk": {
          text: sharedProjects.singtalk.en,
          replies: [
            { label: "View Sing Talk", action: "scroll", target: "#sing-talk" },
            { label: "Tell us about my project", intent: "start-software" }
          ]
        },
        "project-solar": {
          text: sharedProjects.solar.en,
          replies: [
            { label: "View Solar 3D Lab", action: "scroll", target: "#solar-3d" },
            { label: "Tell us about my project", intent: "start-3d" }
          ]
        },
        "project-web": {
          text: "The web selection includes MASH, Lujan Smile Journey, Solarys Engineering, FitAppetit, and Nuvi Engineering.",
          replies: [
            { label: "View web experiences", action: "scroll", target: "#webs" },
            { label: "Tell us about my project", intent: "start-web" },
            { label: "Back to projects", intent: "projects" }
          ]
        },
        start: {
          text: "What do you need to build? Choose the closest option. If you’re not sure yet, we can start with the problem.",
          replies: [
            { label: "Software / SaaS", intent: "start-software" },
            { label: "Industrial ERP", intent: "start-erp" },
            { label: "Web / Design", intent: "start-web" },
            { label: "3D / Spatial", intent: "start-3d" },
            { label: "I’m not sure yet", intent: "start-unknown" }
          ]
        },
        contact: {
          text: "You can start the conversation through the project form, WhatsApp, or email. The studio will personally review the context you share.",
          replies: [
            { label: "Go to the form", action: "scroll", target: "#contacto" },
            { label: "WhatsApp", action: "whatsapp" },
            { label: "Email", action: "email", href: "mailto:leiladev20@gmail.com" },
            { label: "Main menu", intent: "welcome" }
          ]
        },
        fallback: {
          text: "I can guide you through Morán Studio, its services and projects, or help you start a conversation with the studio.",
          replies: [
            { label: "Explore services", intent: "services" },
            { label: "View projects", intent: "projects" },
            { label: "Start a project", intent: "start" },
            { label: "Contact", intent: "contact" }
          ]
        }
      },
      projectPrompts: {
        software: "In one sentence, tell us what product, platform, or process you need to build or improve.",
        erp: "In one sentence, tell us what operation or process the system needs to organize.",
        web: "In one sentence, tell us what your web experience needs to communicate or achieve.",
        "3d": "In one sentence, tell us what you need to survey, model, or validate spatially.",
        unknown: "In one sentence, tell us what problem you need to solve. You don’t need to know the solution yet."
      },
      briefCaptured: "Thank you. There is now a clear starting point. You can continue in the form or prepare a WhatsApp message with this context.",
      contactPrefill: "Hi, I’m visiting the Morán Studio website and would like to discuss a project."
    }
  };
})();
