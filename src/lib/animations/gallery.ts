import gsap from "gsap";

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
