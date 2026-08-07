import gsap from "gsap";

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

export function initFullScreenTextSection() {
  const section = document.querySelector<HTMLElement>("#huge-text-section");
  const bgImageCorp = document.querySelector<HTMLElement>("#fullscreen-bg-section");
  const personaje = document.querySelector<HTMLElement>("#fullscreen-personaje-section");

  if (!section) return;

  // Parallax para el fondo (movimiento vertical sutil)
  if (bgImageCorp) {
    // Escalamos un poco para tener margen de movimiento sin ver bordes
    gsap.set(bgImageCorp, { scale: 1.15 });

    gsap.to(bgImageCorp, {
      yPercent: 5,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }

  // Efecto de acercamiento progresivo para el personaje (sin desvanecerse)
  if (personaje) {
    gsap.to(personaje, {
      scale: 1.02,
      transformOrigin: "bottom center",
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }
}
