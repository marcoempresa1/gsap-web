import gsap from "gsap";

export function initHeroCinematic() {
  const hero = document.querySelector<HTMLElement>("[data-hero-cinematic]");
  const heroBg = document.querySelector<HTMLElement>("[data-hero-bg]");
  const heroSubtitle = document.querySelector<HTMLElement>(
    "[data-hero-subtitle]",
  );
  const heroTitleWords = document.querySelectorAll<HTMLElement>(".hero-word");
  const heroDescription = document.querySelector<HTMLElement>(
    "[data-hero-description]",
  );
  const transitionScreen = hero?.querySelector<HTMLElement>(
    "[data-transition-screen]",
  );
  const transitionText = hero?.querySelector<HTMLElement>(
    "[data-transition-text]",
  );
  const header = document.querySelector<HTMLElement>("[header-animation-top]");
  const trailerWrapper = document.querySelector<HTMLElement>(
    "[data-trailer-wrapper]",
  );

  if (!hero) return;

  if (header) gsap.set(header, { yPercent: -100, opacity: 0 });

  const stickyBox = hero.querySelector<HTMLElement>(".sticky");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      pin: hero.firstElementChild as HTMLElement,
      pinSpacing: false,
    },
  });

  // 1. Zoom in and slight darkening of background image on scroll
  if (heroBg) {
    tl.fromTo(
      heroBg,
      { scale: 1 },
      { scale: 1.35, ease: "none", duration: 14 },
      0
    );
  }

  // 2. Animate central logo (Dragon Ball Xenoverse 3)
  if (heroSubtitle) {
    tl.fromTo(
      heroSubtitle,
      { opacity: 0, scale: 0.8, filter: "blur(20px)" },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 3,
        ease: "power2.out",
      },
      0.5,
    );
  }

  // 3. Reveal description tagline text (TOMA TU DESTINO...)
  if (heroDescription) {
    tl.fromTo(
      heroDescription,
      { opacity: 0, y: 30, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 2.5,
        ease: "power2.out",
      },
      1.5,
    );
  }

  // 5. Transition screen: full black overlay with 2027 that slides out while the next section is revealed
  if (transitionScreen) {
    gsap.set(transitionScreen, { opacity: 1, y: 0, scale: 1 });

    if (transitionText) {
      // Fase 1: Movimiento lento y tenso
      tl.to(
        transitionText,
        { scale: 1.15, letterSpacing: "0.4em", duration: 6.8, ease: "none" },
        0,
      );

      // Fase 2: Zoom masivo (atravesamos el texto). Quitamos el blur porque
      // re-renderizar text-clip + blur(30px) a escala 40x destroza el rendimiento
      tl.to(
        transitionText,
        {
          scale: 30, // Escala ligeramente menor para móviles (rendimiento)
          opacity: 0,
          duration: 2.2,
          ease: "power3.in",
        },
        6.8,
      );
    }

    // Se desvanece el fondo oscuro un poco antes para evitar peso en GPU
    tl.to(
      transitionScreen,
      {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
      },
      7.0,
    );
  }

  // 6. Reveal header and trailer button as the transition screen (2027) finishes fading out
  if (header) {
    tl.to(
      header,
      { yPercent: 0, opacity: 1, duration: 1.6, ease: "power2.out" },
      7.8,
    );
  }
  if (trailerWrapper) {
    gsap.set(trailerWrapper, { opacity: 0, y: 30 });
    tl.to(
      trailerWrapper,
      { opacity: 1, y: 0, duration: 1.6, ease: "power2.out" },
      7.8,
    );

  }


}

export function initHeaderAnimation() { }
