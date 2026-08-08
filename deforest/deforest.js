document.addEventListener('DOMContentLoaded', () => {
  const heroSection = document.getElementById('parallaxHero');
  const layerTitle = document.getElementById('layerTitle');
  const layerDesc = document.getElementById('layerDesc');
  const forestLayer = document.querySelector('.layer-3-silhouette');
  const sunOrb = document.querySelector('.sun-orb');
  const skyLayer = document.querySelector('.layer-1-sky');

  let ticking = false;

  function animateParallax() {
    const scrollY = window.scrollY;
    const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;

    if (scrollY <= heroHeight) {
      const progress = scrollY / heroHeight;

      if (layerTitle) {
        layerTitle.style.transform = `translateY(${scrollY * 0.6}px)`;
        layerTitle.style.opacity = Math.max(0, 1 - progress * 1.6).toFixed(2);
      }

      if (layerDesc) {
        layerDesc.style.transform = `translateY(${scrollY * 0.6}px)`;
        layerDesc.style.opacity = Math.max(0, 1 - progress * 1.4).toFixed(2);
      }

      if (forestLayer) {
        forestLayer.style.transform = `translateY(${scrollY * 0.2}px)`;
      }

      if (sunOrb) {
        sunOrb.style.transform = `translateY(${scrollY * 0.4}px)`;
      }

      if (skyLayer) {
        skyLayer.style.transform = `translateY(${scrollY * 0.05}px)`;
      }
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(animateParallax);
      ticking = true;
    }
  }, { passive: true });

  animateParallax();
});