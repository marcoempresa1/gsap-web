import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { initHeroCinematic, initHeaderAnimation } from "./animations/hero";
import { initHugeTextAnimation, initFullScreenTextSection } from "./animations/fullscreenText";
import { initGalleryHorizontalScroll } from "./animations/gallery";
import { initRevealAnimations } from "./animations/reveal";

import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export function initSmoothScroll() {
  const lenis = new Lenis({
    lerp: 0.1, // Ajusta la suavidad del scroll (más bajo = más suave)
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

export function initSectionSnapping() {
  const sections = gsap.utils.toArray<HTMLElement>("section");
  
  sections.forEach((section, index) => {
    if (index === 0) return; // Saltamos la primera sección (Hero) porque no tiene costura superior
    
    // Evita que el usuario se quede a medias entre dos secciones (en la "costura")
    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "top top",
      snap: {
        snapTo: [0, 1], // 0 = sección anterior, 1 = esta sección en pantalla completa
        duration: 0.8,
        ease: "power2.inOut"
      }
    });
  });
}

export function initPageAnimations() {
  initSmoothScroll();
  initSectionSnapping();
  initHeroCinematic();
  initHeaderAnimation();
  initHugeTextAnimation();
  initFullScreenTextSection();
  initGalleryHorizontalScroll();
  initRevealAnimations();
  ScrollTrigger.refresh();
}

export {
  initHeroCinematic,
  initHeaderAnimation,
  initHugeTextAnimation,
  initFullScreenTextSection,
  initGalleryHorizontalScroll,
  initRevealAnimations,
};
