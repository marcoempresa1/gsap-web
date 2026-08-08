import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { initHeroCinematic, initHeaderAnimation } from "./animations/hero";
import { initHugeTextAnimation, initFullScreenTextSection } from "./animations/fullscreenText";
import { initRevealAnimations } from "./animations/reveal";

import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.8, // Duración del deslizamiento (1.8s) para un efecto ultra fluido de inercia
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing exponencial ultra suave
    smoothWheel: true,
    wheelMultiplier: 1.2, // Un poco más de distancia por cada giro de rueda
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Fundamental para evitar tirones (micro-stutters) a 60fps con GSAP
  gsap.ticker.lagSmoothing(0);
}

export function initFeatureScroll() {
  const section = document.querySelector<HTMLElement>("#mundo");
  const pinContainer = document.querySelector<HTMLElement>("[data-feature-pin]");
  const textBlocks = gsap.utils.toArray<HTMLElement>("[data-feature-text]");
  const images = gsap.utils.toArray<HTMLImageElement>("[data-feature-img]");

  if (!section || !pinContainer || textBlocks.length === 0 || images.length === 0) return;

  // Pin the left side (images) while the right side scrolls
  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "bottom bottom",
    pin: pinContainer,
    pinSpacing: false,
  });

  textBlocks.forEach((textBlock, index) => {
    // 1. Crossfade images based on scroll position of text blocks
    if (index > 0) {
      gsap.fromTo(images[index], 
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: textBlock,
            start: "top center",
            end: "center center",
            scrub: 1.5,
          }
        }
      );
    }

    // 2. Animate text appearance with scrub
    const textContent = textBlock.querySelector<HTMLElement>(".feature-text-content");
    if (textContent) {
      gsap.to(textContent, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: textBlock,
          start: "top 80%",
          end: "center center",
          scrub: 1.5,
        }
      });
    }
  });
}

export function initSectionSnapping() {
  // 1. Snap para las secciones principales (que se alineen al top de la pantalla)
  const sections = gsap.utils.toArray<HTMLElement>("section");
  sections.forEach((section, index) => {
    if (index === 0) return; // Saltamos el Hero
    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "top top",
      snap: {
        snapTo: 1, // Snaps exactly to 'top top'
        duration: { min: 0.4, max: 0.8 },
        delay: 0.15, // Espera a que el usuario deje de scrollear
        ease: "power2.inOut"
      }
    });
  });

  // 2. Snap magnético para los textos de FeatureScroll (que se alineen al centro)
  const textBlocks = gsap.utils.toArray<HTMLElement>("[data-feature-text]");
  textBlocks.forEach((textBlock) => {
    ScrollTrigger.create({
      trigger: textBlock,
      start: "top bottom",
      end: "center center",
      snap: {
        snapTo: 1, // Snaps exactly to 'center center'
        duration: { min: 0.3, max: 0.6 },
        delay: 0.15,
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
  initFeatureScroll();
  initRevealAnimations();
  ScrollTrigger.refresh();
}

export {
  initHeroCinematic,
  initHeaderAnimation,
  initHugeTextAnimation,
  initFullScreenTextSection,

  initRevealAnimations,
};
