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

  const cardTitleDetail = document.getElementById('cardTitleDetail');
  const cardTitleCause = document.getElementById('cardTitleCause');
  const cardTitleAction = document.getElementById('cardTitleAction');

  const cardDescDetail = document.getElementById('cardDescDetail');
  const cardDescCause = document.getElementById('cardDescCause');
  const cardDescAction = document.getElementById('cardDescAction');

  const contentBgVideo = document.getElementById('contentBgVideo');
  const videoSource = document.getElementById('videoSource');

  const prevSubBtn = document.getElementById('prevSubBtn');
  const nextSubBtn = document.getElementById('nextSubBtn');
  const langBtns = document.querySelectorAll('.lang-btn');

  let currentClimateIndex = 1;
  let currentSubSlideIndex = 0;
  let currentLang = localStorage.getItem('terrashift_lang') || 'id';

  const climateData = [
    {
      temp: 'pH 8.2',
      yearId: 'Kondisi Pra-Industri',
      yearEn: 'Pre-Industrial Conditions',
      videoSrc: 'assets/video/bg1.mp4',

      detailId: 'Pada pH 8.2, kondisi kimia laut lebih mendekati keadaan pra-industri. Ion karbonat tersedia dalam jumlah yang lebih tinggi sehingga lingkungan laut lebih mendukung organisme yang membentuk cangkang dan kerangka dari kalsium karbonat.',
      detailEn: 'At pH 8.2, ocean chemistry is closer to pre-industrial conditions. Carbonate ions are more available, creating more favorable conditions for organisms that build calcium carbonate shells and skeletons.',

      causeId: 'Sebelum emisi industri meningkat secara besar-besaran, jumlah karbon dioksida antropogenik yang diserap laut lebih rendah. Akibatnya, perubahan keseimbangan kimia karbonat laut belum sebesar kondisi setelah industrialisasi.',
      causeEn: 'Before industrial emissions increased dramatically, the ocean absorbed less human-generated carbon dioxide. As a result, changes in the ocean carbonate system were smaller than those occurring after industrialization.',

      actionId: 'Mengurangi emisi karbon dioksida, menjaga ekosistem penyerap karbon seperti mangrove dan lamun, serta melindungi terumbu karang dapat membantu mempertahankan keseimbangan kimia laut.',
      actionEn: 'Reducing carbon dioxide emissions, protecting carbon-absorbing ecosystems such as mangroves and seagrass, and conserving coral reefs can help maintain the chemical balance of the ocean.',

      slides: [
        {
          image: 'assets/images/ocean82.png',
          captionId: 'Kondisi Visual Laut pada pH 8.2',
          captionEn: 'Visual Ocean Conditions at pH 8.2'
        },
        {
          image: 'assets/images/coral82.png',
          captionId: 'Terumbu Karang: Kondisi kimia laut lebih mendukung pembentukan dan pertumbuhan kerangka karang.',
          captionEn: 'Coral Reefs: Ocean chemistry is more favorable for coral skeleton formation and growth.'
        },
        {
          image: 'assets/images/shell82.png',
          captionId: 'Organisme Bercangkang: Ion karbonat lebih tersedia untuk membantu pembentukan dan pemeliharaan cangkang.',
          captionEn: 'Shell-forming Organisms: Carbonate ions are more available to support shell formation and maintenance.'
        }
      ]
    },

    {
      temp: 'pH 8.0',
      yearId: 'Pengasaman Meningkat',
      yearEn: 'Increasing Acidification',
      videoSrc: 'assets/video/bg2.mp4',

      detailId: 'Pada pH 8.0, konsentrasi ion hidrogen di laut meningkat dan keseimbangan kimia karbonat mulai berubah. Ion karbonat menjadi lebih sedikit tersedia bagi organisme laut dibandingkan pada kondisi pH 8.2.',
      detailEn: 'At pH 8.0, the concentration of hydrogen ions in seawater increases and the carbonate system begins to shift. Fewer carbonate ions are available to marine organisms compared with conditions at pH 8.2.',

      causeId: 'Karbon dioksida dari atmosfer larut ke dalam air laut dan bereaksi dengan air membentuk asam karbonat. Reaksi ini meningkatkan jumlah ion hidrogen yang kemudian mengurangi ketersediaan ion karbonat.',
      causeEn: 'Carbon dioxide from the atmosphere dissolves into seawater and reacts with water to form carbonic acid. This reaction increases hydrogen ions, which reduces the availability of carbonate ions.',

      actionId: 'Mengurangi emisi karbon dioksida menjadi langkah utama untuk memperlambat pengasaman laut. Perlindungan mangrove, lamun, terumbu karang, dan pengurangan pencemaran lokal juga membantu meningkatkan ketahanan ekosistem laut.',
      actionEn: 'Reducing carbon dioxide emissions is the main step for slowing ocean acidification. Protecting mangroves, seagrass, coral reefs, and reducing local pollution can also improve the resilience of marine ecosystems.',

      slides: [
        {
          image: 'assets/images/ocean80.png',
          captionId: 'Kondisi Visual Laut pada pH 8.0',
          captionEn: 'Visual Ocean Conditions at pH 8.0'
        },
        {
          image: 'assets/images/coral80.png',
          captionId: 'Terumbu Karang: Penurunan ion karbonat mulai meningkatkan tekanan pada proses pembentukan kerangka.',
          captionEn: 'Coral Reefs: Reduced carbonate ions begin to increase stress on skeleton formation.'
        },
        {
          image: 'assets/images/shell80.png',
          captionId: 'Organisme Bercangkang: Lebih banyak energi diperlukan untuk membentuk dan mempertahankan cangkang.',
          captionEn: 'Shell-forming Organisms: More energy is required to build and maintain shells.'
        }
      ]
    },

    {
      temp: 'pH 7.8',
      yearId: 'Pengasaman Berat',
      yearEn: 'Severe Acidification',
      videoSrc: 'assets/video/bg3.mp4',

      detailId: 'Pada pH 7.8, laut mengalami tingkat pengasaman yang jauh lebih tinggi dibandingkan kondisi pH 8.2. Ketersediaan ion karbonat semakin berkurang sehingga organisme pembentuk kalsium karbonat menghadapi tekanan kimia yang lebih besar.',
      detailEn: 'At pH 7.8, the ocean experiences substantially greater acidification than at pH 8.2. Carbonate ions become increasingly scarce, placing greater chemical stress on organisms that form calcium carbonate structures.',

      causeId: 'Peningkatan karbon dioksida atmosfer menyebabkan laut menyerap lebih banyak CO₂. Semakin banyak CO₂ yang masuk ke laut, semakin besar pembentukan asam karbonat dan ion hidrogen yang menurunkan pH serta mengurangi ion karbonat.',
      causeEn: 'Rising atmospheric carbon dioxide causes the ocean to absorb more CO₂. As more CO₂ enters seawater, more carbonic acid and hydrogen ions are produced, lowering pH and reducing carbonate ions.',

      actionId: 'Pengurangan emisi CO₂ secara global, restorasi habitat pesisir, perlindungan keanekaragaman hayati laut, serta pengurangan tekanan lokal diperlukan untuk memperlambat dampak pengasaman yang semakin berat.',
      actionEn: 'Global reductions in CO₂ emissions, restoration of coastal habitats, protection of marine biodiversity, and reduced local environmental pressures are needed to slow increasingly severe acidification.',

      slides: [
        {
          image: 'assets/images/ocean78.png',
          captionId: 'Kondisi Visual Laut pada pH 7.8',
          captionEn: 'Visual Ocean Conditions at pH 7.8'
        },
        {
          image: 'assets/images/coral78.png',
          captionId: 'Terumbu Karang: Pembentukan kerangka menjadi semakin sulit dan ketahanan struktur terumbu dapat menurun.',
          captionEn: 'Coral Reefs: Skeleton formation becomes increasingly difficult and reef structural resilience may decline.'
        },
        {
          image: 'assets/images/shell78.png',
          captionId: 'Organisme Bercangkang: Pembentukan dan pemeliharaan cangkang menghadapi tekanan yang semakin besar.',
          captionEn: 'Shell-forming Organisms: Shell formation and maintenance face increasing stress.'
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

  function isEnglish() {
    return currentLang === 'en';
  }

  function updateCardTitles() {
    if (cardTitleDetail) {
      cardTitleDetail.innerText = isEnglish()
        ? 'Condition Explanation'
        : 'Penjelasan Kondisi';
    }

    if (cardTitleCause) {
      cardTitleCause.innerText = isEnglish()
        ? 'Main Cause'
        : 'Penyebab Utama';
    }

    if (cardTitleAction) {
      cardTitleAction.innerText = isEnglish()
        ? 'How to Address It'
        : 'Cara Mengatasi';
    }
  }

  function updateSubSlide() {
    const activeData = climateData[currentClimateIndex];
    const slideData = activeData.slides[currentSubSlideIndex];

    if (earthImg) {
      earthImg.src = slideData.image;
    }

    if (badgeEra) {
      badgeEra.innerHTML = isEnglish()
        ? slideData.captionEn
        : slideData.captionId;
    }

    if (earthWrapper) {
      earthWrapper.setAttribute('data-current-slide', currentSubSlideIndex);
    }
  }

  function updateTextContent() {
    const data = climateData[currentClimateIndex];

    if (tooltipYear) {
      tooltipYear.innerText = isEnglish()
        ? data.yearEn
        : data.yearId;
    }

    updateCardTitles();

    if (cardDescDetail) {
      cardDescDetail.innerText = isEnglish()
        ? data.detailEn
        : data.detailId;
    }

    if (cardDescCause) {
      cardDescCause.innerText = isEnglish()
        ? data.causeEn
        : data.causeId;
    }

    if (cardDescAction) {
      cardDescAction.innerText = isEnglish()
        ? data.actionEn
        : data.actionId;
    }

    updateSubSlide();
  }

  function animateLanguageChange() {
    if (syncCardsContainer) {
      syncCardsContainer.classList.add('fade-out');
    }

    if (badgeEra) {
      badgeEra.classList.add('fade-sub');
    }

    if (tooltip) {
      tooltip.style.opacity = '0';
    }

    setTimeout(() => {
      updateTextContent();

      if (syncCardsContainer) {
        syncCardsContainer.classList.remove('fade-out');
      }

      if (badgeEra) {
        badgeEra.classList.remove('fade-sub');
      }

      if (tooltip) {
        tooltip.style.opacity = '1';
      }
    }, 250);
  }

  function updateVisualization(index) {
    const data = climateData[index];
    if (!data) return;

    currentClimateIndex = parseInt(index);

    const percent = (index / 2) * 100;

    if (tooltip) {
      tooltip.style.left = `${percent}%`;
    }

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

          contentBgVideo
            .play()
            .catch(e => console.log("Auto-play prevented:", e));

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

    updateTextContent();
  }

  if (prevSubBtn) {
    prevSubBtn.addEventListener('click', () => {
      currentSubSlideIndex =
        (currentSubSlideIndex - 1 + 3) % 3;

      updateSubSlide();
    });
  }

  if (nextSubBtn) {
    nextSubBtn.addEventListener('click', () => {
      currentSubSlideIndex =
        (currentSubSlideIndex + 1) % 3;

      updateSubSlide();
    });
  }

  if (slider) {
    slider.addEventListener('input', e => {
      updateVisualization(e.target.value);
    });
  }

  stopPoints.forEach(sp => {
    sp.addEventListener('click', () => {
      const val = sp.getAttribute('data-value');

      if (slider) {
        slider.value = val;
      }

      updateVisualization(val);
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (slider) {
        slider.value = 1;
      }

      updateVisualization(1);
    });
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');

      if (!selectedLang || selectedLang === currentLang) {
        return;
      }

      currentLang = selectedLang;
      localStorage.setItem('terrashift_lang', currentLang);
      animateLanguageChange();
    });
  });

  window.addEventListener('storage', e => {
    if (e.key === 'terrashift_lang' && e.newValue) {
      currentLang = e.newValue;
      animateLanguageChange();
    }
  });

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