import gsap from "gsap";

export function initInfiniteZoom() {
  const section = document.querySelector<HTMLElement>("#infinite-zoom-section");
  const zoomText = document.querySelector<HTMLElement>("[data-zoom-text]");

  if (!section || !zoomText) return;

  // Zoom masivo hasta que el interior de una letra ocupe toda la pantalla
  gsap.to(zoomText, {
    scale: 150, // Un scale masivo para asegurar que atraviese la pantalla
    ease: "power2.in", // Acelera hacia el final, dando sensación de succión
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    }
  });
}

export function initSliceAssembly() {
  const section = document.querySelector<HTMLElement>("#slice-assembly-section");
  const slicesLeft = document.querySelectorAll<HTMLElement>("[data-slice='left']");
  const slicesRight = document.querySelectorAll<HTMLElement>("[data-slice='right']");

  if (!section) return;

  // Estado inicial: desalineados y ligeramente transparentes
  gsap.set(slicesLeft, { xPercent: -20, opacity: 0 });
  gsap.set(slicesRight, { xPercent: 20, opacity: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "center top", // Termina el ensamblaje en la mitad del scroll de esta sección
      scrub: 1,
    }
  });

  // Ensamblaje magnético
  tl.to([slicesLeft, slicesRight], {
    xPercent: 0,
    opacity: 1,
    ease: "power2.out",
    duration: 1
  }, 0);
}
