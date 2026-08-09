document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('tempRangeSlider');
  const tooltip = document.getElementById('floatingTooltip');
  const tooltipYear = document.getElementById('tooltipYear');
  const resetBtn = document.getElementById('resetBtn');
  const stopPoints = document.querySelectorAll('.stop-point');

  const earthImg = document.getElementById('earthImg');
  const earthWrapper = document.querySelector('.earth-3d-wrapper');
  const badgeEra = document.getElementById('badgeEra');
  const syncCardsContainer = document.getElementById('syncCardsContainer');

  const cardDescDetail = document.getElementById('cardDescDetail');
  const cardDescCause = document.getElementById('cardDescCause');
  const cardDescAction = document.getElementById('cardDescAction');

  const contentBgVideo = document.getElementById('contentBgVideo');
  const videoSource = document.getElementById('videoSource');

  const prevSubBtn = document.getElementById('prevSubBtn');
  const nextSubBtn = document.getElementById('nextSubBtn');

  let currentClimateIndex = 1;
  let currentSubSlideIndex = 0;

  const climateData = [
    {
      temp: '0% Degradasi',
      year: 'Era Pra-Industri (Hutan Utuh)',
      badge: 'Era Tutupan Hutan Utuh (0% Degradasi)',
      videoSrc: 'assets/video/bg1.mp4',
      detail: 'Hutan primer dan kanopi hujan tropis dunia dalam keadaan utuh sempurna, berfungsi maksimal sebagai penyerap karbon raksasa dan penstabil iklim.',
      cause: 'Belum ada eksploitasi kayu komersial skala masif atau pembersihan lahan dengan cara pembakaran hutan terencana.',
      action: 'Menjaga kelestarian hutan adat, memberlakukan perlindungan mutlak bagi kawasan cagar alam primer, dan melarang konversi lahan lindung.',
      slides: [
        {
          image: 'assets/images/forestbef.jpeg',
          captionId: 'Kondisi Visual Tutupan Hutan Global Era Pra-Industri',
          captionEn: 'Global Forest Cover Visual Conditions in Pre-Industrial Era'
        },
        {
          image: 'assets/images/canopybef.jpeg',
          captionId: 'Kerapatan Kanopi: Hutan hujan lebat dengan biodiversitas tinggi.<br><small style="opacity: 0.7; font-size: 0.8rem;"></small>',
          captionEn: 'Canopy Density: Dense rainforest with rich biodiversity.<br><small style="opacity: 0.7; font-size: 0.8rem;"></small>'
        },
        {
          image: 'assets/images/amazonbef.jpeg',
          captionId: 'Hutan Amazon: Vegetasi hijau lebat tanpa fragmentasi lahan.<br><small style="opacity: 0.7; font-size: 0.8rem;"></small>',
          captionEn: 'Amazon Rainforest: Dense green vegetation without land fragmentation.<br><small style="opacity: 0.7; font-size: 0.8rem;"></small>'
        }
      ]
    },
    {
      temp: '32% Degradasi',
      year: 'Kondisi Hutan Saat Ini',
      badge: 'Kondisi Deforestasi Saat Ini (32% Degradasi)',
      videoSrc: 'assets/video/bg2.mp4',
      detail: 'Lebih dari sepertiga tutupan hutan dunia telah hilang atau terdegradasi parah, memicu kepunahan spesies endemik dan mempercepat krisis iklim.',
      cause: 'Pembukaan lahan untuk perkebunan monokultur skala besar, pembalakan liar (illegal logging), serta pembakaran hutan tahunan.',
      action: 'Penerapan moratorium izin tambang/sawit di hutan primer, penegakan hukum tegas terhadap pelaku pembakaran, dan reboisasi masif.',
      slides: [
        {
          image: 'assets/images/forestnow.jpeg', 
          captionId: 'Peta Visualisasi Tutupan Hutan Global Saat Ini<br><small style="opacity: 0.8; font-size: 0.8rem;"></small>',
          captionEn: 'Current Global Forest Cover Map Visualization<br><small style="opacity: 0.8; font-size: 0.8rem;"></small>'
        },
        {
          image: 'assets/images/canopynow.png',
          captionId: 'Kerapatan Kanopi: Terjadi fragmentasi lahan dan pembotakan masif.<br><small style="opacity: 0.8; font-size: 0.8rem;"></small>',
          captionEn: 'Canopy Density: Land fragmentation and massive deforestation observed.<br><small style="opacity: 0.8; font-size: 0.8rem;"></small>'
        },
        {
          image: 'assets/images/amazonnow.png',
          captionId: 'Hutan Amazon & Tropis: Deforestasi dan titik kebakaran terdeteksi satelit.<br><small style="opacity: 0.8; font-size: 0.8rem;"></small>',
          captionEn: 'Amazon & Tropical Forests: Deforestation and hotspots tracked by satellite.<br><small style="opacity: 0.8; font-size: 0.8rem;"></small>'
        }
      ]
    },
    {
      temp: '75% Kritis',
      year: 'Tahun 2100 (Skenario Terburuk)',
      badge: 'Skenario Terburuk Deforestasi (+75% Pembotakan)',
      videoSrc: 'assets/video/bg3.mp4',
      detail: 'Hutan hujan tropis kolaps menjadi sabana kering, pelepasan emisi karbon raksasa dari tanah gambut meledak, memicu kekeringan global ekstrem.',
      cause: 'Eksploitasi tanpa batas, pengalihan fungsi hutan secara liar, serta kegagalan total sistem mitigasi pemadaman kebakaran hutan.',
      action: 'Restorasi ekosistem darurat, perlindungan total sisa vegetasi alami, serta transisi ke komoditas pangan yang ramah hutan.',
      slides: [
        {
          image: 'assets/images/forestthen.png',
          captionId: 'Kondisi Visual Deforestasi Kritis Skenario Terburuk (2100)',
          captionEn: 'Worst-Case Critical Deforestation Visual Scenario (2100)'
        },
        {
          image: 'assets/images/canopythen.png',
          captionId: 'Kerapatan Kanopi: Hutan gundul total memicu pembentukan gurun baru. (Prediksi)<br><small style="opacity: 0.7; font-size: 0.8rem;"></small>',
          captionEn: 'Canopy Density: Total deforestation triggers new desertification. (Prediction)<br><small style="opacity: 0.7; font-size: 0.8rem;"></small>'
        },
        {
          image: 'assets/images/amazonthen.jpeg',
          captionId: 'Hutan Amazon: Dieback Amazon, di mana vegetasi berubah menjadi lahan tandus. (Prediksi)<br><small style="opacity: 0.7; font-size: 0.8rem;"></small>',
          captionEn: 'Amazon Rainforest: Amazon Dieback turning vegetation into barren land. (Prediction)<br><small style="opacity: 0.7; font-size: 0.8rem;"></small>'
        }
      ]
    }
  ];

  function preloadAllImages() {
    climateData.forEach(item => {
      item.slides.forEach(slide => {
        const img = new Image();
        img.src = slide.image;
      });
    });
  }
  preloadAllImages();

  function isEnglishActive() {
    const langSwitcher = document.getElementById('langSwitcher');
    if (langSwitcher && langSwitcher.getAttribute('data-selected') === 'en') {
      return true;
    }
    const googCookie = document.cookie.match(/googtrans=\/id\/en/);
    return !!googCookie;
  }

  function updateSubSlide() {
    const activeData = climateData[currentClimateIndex];
    const currentSlideData = activeData.slides[currentSubSlideIndex];

    if (earthImg && badgeEra) {
      earthImg.src = currentSlideData.image;
      badgeEra.innerHTML = isEnglishActive() ? currentSlideData.captionEn : currentSlideData.captionId;

      if (earthWrapper) {
        earthWrapper.setAttribute('data-current-slide', currentSubSlideIndex);
      }
    }
  }

  function updateVisualization(index) {
    const data = climateData[index];
    if (!data) return;
    currentClimateIndex = parseInt(index);

    const percent = (index / 2) * 100;
    if (tooltip) tooltip.style.left = `${percent}%`;
    if (tooltipYear) tooltipYear.innerText = data.year;

    stopPoints.forEach(sp => {
      if (parseInt(sp.getAttribute('data-value')) === currentClimateIndex) {
        sp.classList.add('active');
      } else {
        sp.classList.remove('active');
      }
    });

    if (contentBgVideo && videoSource) {
      if (!videoSource.src.includes(data.videoSrc)) {
        contentBgVideo.style.opacity = '0';
        setTimeout(() => {
          videoSource.src = data.videoSrc;
          contentBgVideo.load();
          contentBgVideo.play().catch(e => console.log("Auto-play prevented:", e));
          contentBgVideo.style.opacity = '0.35';
        }, 200);
      }
    }

    currentSubSlideIndex = 0;

    if (earthImg) {
      earthImg.src = data.slides[0].image;
      if (earthWrapper) {
        earthWrapper.setAttribute('data-current-slide', 0);
      }
    }

    if (badgeEra) {
      badgeEra.innerHTML = isEnglishActive() ? data.slides[0].captionEn : data.slides[0].captionId;
    }

    if (syncCardsContainer) {
      if (cardDescDetail) cardDescDetail.innerText = data.detail;
      if (cardDescCause) cardDescCause.innerText = data.cause;
      if (cardDescAction) cardDescAction.innerText = data.action;
    }
  }

  if (prevSubBtn) {
    prevSubBtn.addEventListener('click', () => {
      currentSubSlideIndex = (currentSubSlideIndex - 1 + 3) % 3;
      updateSubSlide();
    });
  }

  if (nextSubBtn) {
    nextSubBtn.addEventListener('click', () => {
      currentSubSlideIndex = (currentSubSlideIndex + 1) % 3;
      updateSubSlide();
    });
  }

  if (slider) {
    slider.addEventListener('input', (e) => updateVisualization(e.target.value));
  }

  stopPoints.forEach((sp) => {
    sp.addEventListener('click', () => {
      const val = sp.getAttribute('data-value');
      if (slider) slider.value = val;
      updateVisualization(val);
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (slider) slider.value = 1;
      updateVisualization(1);
    });
  }

  updateVisualization(1);

  const revealElements = document.querySelectorAll('.scroll-reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
  }
});