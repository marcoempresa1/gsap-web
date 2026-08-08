import gsap from "gsap";

export function initHugeTextAnimation() {
  const section = document.querySelector<HTMLElement>("#el-poder");
  const massiveText = document.querySelector<HTMLElement>(
    "[data-massive-text]",
  );

  if (!section || !massiveText) return;

  // Calculate exactly how far to move the text to reveal all of it, regardless of screen size
  gsap.to(massiveText, {
    x: () => -(massiveText.scrollWidth - window.innerWidth + (window.innerWidth * 0.1)),
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      invalidateOnRefresh: true, // Importante para recalcular si el usuario gira el móvil
    },
  });
}

export function initFullScreenTextSection() {
  const section = document.querySelector<HTMLElement>("#el-poder");
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
        scrub: true,
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
        scrub: true,
      },
    });
  }
}
