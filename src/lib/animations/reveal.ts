import gsap from "gsap";

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
