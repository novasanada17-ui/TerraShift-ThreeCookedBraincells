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
      temp: '0.0°C',
      year: 'Pra-Industri (1800-an)',
      badge: 'Era Pra-Industri (0.0°C)',
      videoSrc: 'assets/video/bg1.mp4',
      detail: 'Iklim sangat seimbang, gas rumah kaca rendah (sekitar 280 ppm), lapisan ozon tebal, dan es kutub utuh menutupi wilayah kutub sepanjang tahun.',
      cause: 'Belum ada aktivitas industri atau kendaraan bermotor; emisi karbon dari alam diimbangi secara sempurna oleh penyerapan hutan dan lautan.',
      action: 'Beralih ke energi bersih, melakukan reboisasi hutan besar-besaran, dan mengurangi emisi karbon untuk mengembalikan keseimbangan alam seperti masa lalu.',
      slides: [
        { 
          image: 'assets/images/past.png', 
          captionId: 'Kondisi Visual Global Era Pra-Industri', 
          captionEn: 'Global Visual Conditions of the Pre-Industrial Era' 
        },
        { 
          image: 'assets/images/opast.png', 
          captionId: 'Lapisan Ozon: Utuh dan tebal melindungi dari radiasi UV.<br><small style="opacity: 0.7; font-size: 0.8rem;">Credit: NASA Ozone Watch</small>', 
          captionEn: 'Ozone Layer: Intact and thick, protecting against UV radiation.<br><small style="opacity: 0.7; font-size: 0.8rem;">Credit: NASA Ozone Watch</small>' 
        },
        { 
          image: 'assets/images/polepast.png', 
          captionId: 'Kawasan Artik: Es abadi menutupi seluruh wilayah. <br><small style="opacity: 0.7; font-size: 0.8rem;">Credit: NASA Earth / Arctic Sea Ice Minimum Extent</small>', 
          captionEn: 'Arctic Region: Perennial ice covers the entire area.<br><small style="opacity: 0.7; font-size: 0.8rem;">Credit: NASA Earth / Arctic Sea Ice Minimum Extent</small>' 
        }
      ]
    },
    {
      temp: '+1.2°C',
      year: 'Kondisi Saat Ini',
      badge: 'Kondisi Bumi Saat Ini (+1.2°C)',
      videoSrc: 'assets/video/bg2.mp4',
      detail: 'Suhu global telah meningkat sekitar +1.2°C, lapisan ozon mulai menipis akibat polusi, dan pencairan gletser masif terjadi di wilayah kutub.',
      cause: 'Emisi gas rumah kaca dari industri, pembakaran bahan bakar fosil, kendaraan bermotor, serta deforestasi atau penebangan hutan secara besar-besaran.',
      action: 'Melakukan transisi cepat ke energi terbarukan (surya/angin), menghentikan penggunaan bahan bakar fosil, dan memperluas penanaman kembali hutan (reboisasi) untuk menyerap emisi karbon..',
      slides: [
        { 
          image: 'assets/images/now.png', 
          captionId: 'Kondisi Visual Global Saat Ini', 
          captionEn: 'Current Global Visual Conditions' 
        },
        { 
          image: 'assets/images/onow.png', 
          captionId: 'Lapisan Ozon: Mulai menipis akibat polusi CFC dan emisi gas.<br><small style="opacity: 0.7; font-size: 0.8rem;">Credit: NASA Ozone Watch</small>', 
          captionEn: 'Ozone Layer: Beginning to thin due to CFC pollution and gas emissions.<br><small style="opacity: 0.7; font-size: 0.8rem;">Credit: NASA Ozone Watch</small>' 
        },
        { 
          image: 'assets/images/polenow.png', 
          captionId: 'Kawasan Artik: Pencairan gletser masif terjadi.<br><small style="opacity: 0.7; font-size: 0.8rem;">Credit: NASA Earth / Arctic Sea Ice Minimum Extent</small>', 
          captionEn: 'Arctic Region: Massive glacier melting is occurring.<br><small style="opacity: 0.7; font-size: 0.8rem;">Credit: NASA Earth / Arctic Sea Ice Minimum Extent</small>' 
        }
      ]
    },
    {
      temp: '+4.0°C ~ +6.0°C',
      year: 'Tahun 2100 (Skenario Terburuk)',
      badge: 'Skenario Terburuk (+4.0°C ~ +6.0°C)',
      videoSrc: 'assets/video/bg3.mp4',
      detail: 'Krisis iklim katastropik, permukaan air laut naik drastis yang menenggelamkan kota-kota pesisir, es kutub hampir sepenuhnya mencair, serta penipisan ozon parah yang memicu radiasi panas ekstrem.',
      cause: 'Kegagalan total umat manusia dalam membatasi emisi karbon, eksploitasi bahan bakar fosil tanpa batas, serta hilangnya sebagian besar hutan dunia sebagai penyerap karbon.',
      action: 'Diperlukan tindakan darurat global secara serentak, penghentian total emisi karbon, penerapan teknologi penangkapan karbon (carbon capture) skala besar, serta evakuasi dan adaptasi massal wilayah pesisir.',
      slides: [
        { 
          image: 'assets/images/then.png', 
          captionId: 'Kondisi Visual Global Skenario Terburuk (2100)', 
          captionEn: 'Worst-Case Global Visual Scenario (2100)' 
        },
        { 
          image: 'assets/images/othen.jpg', 
          captionId: 'Lapisan Ozon: Penipisan parah memicu radiasi panas ekstrem. (Prediksi)<br><small style="opacity: 0.7; font-size: 0.8rem;">Credit: MIT Department of Earth, Atmospheric and Planetary Sciences (EAPS)</small>', 
          captionEn: 'Ozone Layer: Severe depletion triggers extreme heat radiation. (Prediction)<br><small style="opacity: 0.7; font-size: 0.8rem;">Credit: MIT Department of Earth, Atmospheric and Planetary Sciences (EAPS)</small>' 
        },
        { 
          image: 'assets/images/polethen.jpg', 
          captionId: 'Kutub Artik: Es kutub hampir sepenuhnya mencair. (Prediksi)<br><small style="opacity: 0.7; font-size: 0.8rem;">Credit: WCRP CMIP6 Projections / IPCC Models</small>', 
          captionEn: 'Arctic Pole: Polar ice melts almost completely. (Prediction)<br><small style="opacity: 0.7; font-size: 0.8rem;">Credit: WCRP CMIP6 Projections / IPCC Models</small>' 
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