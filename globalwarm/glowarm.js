document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. PARALLAX HERO SCROLLING LOGIC
     ========================================================================== */
  const heroSection = document.getElementById('parallaxHero');
  const layerTitle = document.getElementById('layerTitle');
  const layerDesc = document.getElementById('layerDesc');
  const earthLayer = document.querySelector('.layer-3-silhouette');
  const sunOrb = document.querySelector('.sun-orb');
  const skyLayer = document.querySelector('.layer-1-sky');

  if (!sunOrb) {
    console.error("ERROR: .sun-orb tidak ditemukan di HTML!");
  }

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

      if (earthLayer) {
        earthLayer.style.transform = `translateY(${scrollY * 0.2}px)`;
      }

      /* GERAKAN MATAHARI */
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

  // Jalankan kalkulasi posisi awal
  animateParallax();


  /* ==========================================================================
     2. MAIN CONTENT SLIDER & 3D IMAGE FLIP LOGIC
     ========================================================================== */
  const slider = document.getElementById('tempSlider');
  const tooltip = document.getElementById('sliderTooltip');
  const resetBtn = document.getElementById('resetBtn');
  const cards = document.querySelectorAll('.interactive-card');
  const imageFlipper = document.getElementById('imageFlipper');
  const sliderImage = document.getElementById('sliderImage');

  // Sumber Gambar dan Tahun Proyeksi untuk tiap step Slider
  const sliderData = [
    { year: '2026', image: '../assets/images/slider-1.jpg' },
    { year: '2035', image: '../assets/images/slider-2.jpg' },
    { year: '2050', image: '../assets/images/slider-3.jpg' }
  ];

  function updateSliderState(index) {
    const idx = parseInt(index);
    const data = sliderData[idx];

    if (!data) return;

    // 1. Animasi Putar Gambar 3D (RotateY)
    if (imageFlipper && sliderImage) {
      imageFlipper.classList.add('rotating');

      setTimeout(() => {
        // Ganti file gambar tepat di pertengahan efek rotasi
        sliderImage.src = data.image;
        imageFlipper.classList.remove('rotating');
      }, 250);
    }

    // 2. Update Nilai Input Slider & Tooltip Posisi
    if (slider) {
      slider.value = idx;
    }

    if (tooltip) {
      const percentage = (idx / (sliderData.length - 1)) * 100;
      tooltip.style.left = `${percentage}%`;
      tooltip.innerText = data.year;
    }

    // 3. Highlight Kartu Aktif
    cards.forEach((card, i) => {
      if (i === idx) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }

  // Event Input Range Slider
  if (slider) {
    slider.addEventListener('input', (e) => {
      updateSliderState(e.target.value);
    });
  }

  // Event Klik Langsung pada Kartu
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const index = card.getAttribute('data-index');
      updateSliderState(index);
    });
  });

  // Event Tombol Reset (Kembali ke Indeks 0 / Tahun 2026)
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      updateSliderState(0);
    });
  }
});