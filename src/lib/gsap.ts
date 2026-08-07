import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
      scrub: 1,
      pin: hero.firstElementChild as HTMLElement,
      pinSpacing: false,
    },
  });

  // 1. Zoom in and slight darkening of background image on scroll
  if (heroBg) {
    tl.to(heroBg, { scale: 1.35, filter: "", ease: "none", duration: 14 }, 0);
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

      // Fase 2: Zoom masivo y desenfoque (atravesamos el texto)
      tl.to(
        transitionText,
        {
          scale: 40,
          filter: "blur(30px)",
          opacity: 0,
          duration: 2.2,
          ease: "power3.in",
        },
        6.8,
      );
    }

    // Se desvanece el fondo oscuro mientras atravesamos el texto
    tl.to(
      transitionScreen,
      {
        opacity: 0,
        duration: 2.2,
        ease: "power2.inOut",
      },
      6.8,
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
    tl.to(
      trailerWrapper,
      { opacity: 0, y: -30, duration: 3, ease: "power2.in" },
      14,
    );
  }

  tl.to(
    [heroSubtitle, heroDescription],
    {
      opacity: 0,
      y: -50,
      filter: "blur(12px)",
      duration: 3,
      ease: "power2.in",
    },
    14,
  );
}

export function initHeaderAnimation() {}

export function initHugeTextAnimation() {
  const section = document.querySelector<HTMLElement>("#huge-text-section");
  const massiveText = document.querySelector<HTMLElement>(
    "[data-massive-text]",
  );

  if (!section || !massiveText) return;

  // Animate massive text to move left on scroll
  gsap.to(massiveText, {
    xPercent: -36,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "=+3000",
      scrub: 1,
    },
  });
}

export function initGalleryHorizontalScroll() {
  const gallerySection = document.querySelector<HTMLElement>("#gallery-scroll");
  const galleryContainer = document.querySelector<HTMLElement>(
    "[data-gallery-container]",
  );

  if (!gallerySection || !galleryContainer) return;

  // Calculate how far to move the container to see all cards
  // We want to move it to the left by its total width minus the viewport width

  gsap.to(galleryContainer, {
    x: () => -(galleryContainer.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: gallerySection,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      invalidateOnRefresh: true, // Recalculate on resize
    },
  });
}

export function initRevealAnimations() {
  gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((elem) => {
    gsap.fromTo(
      elem,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elem,
          start: "top 85%",
          once: true,
        },
      },
    );
  });
}

export function initPageAnimations() {
  initHeroCinematic();
  initHeaderAnimation();
  initHugeTextAnimation();
  initGalleryHorizontalScroll();
  initRevealAnimations();
  ScrollTrigger.refresh();
}
