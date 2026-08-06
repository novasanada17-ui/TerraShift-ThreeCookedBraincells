document.addEventListener('DOMContentLoaded', () => {
  const htmlElement = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggle');
  const langSwitcher = document.getElementById('langSwitcher');
  const langBtns = document.querySelectorAll('.lang-btn');

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('terrashift_theme', newTheme);
    });
  }

  function clearGoogleTranslateCookie() {
    const domain = window.location.hostname;
    const path = '/';
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=${domain};`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=.${domain};`;
  }

  function setGoogleTranslateCookie(lang) {
    const domain = window.location.hostname;
    const path = '/';
    const cookieValue = `/id/${lang}`;

    clearGoogleTranslateCookie();

    if (lang !== 'id') {
      document.cookie = `googtrans=${cookieValue}; path=${path};`;
      if (domain) {
        document.cookie = `googtrans=${cookieValue}; path=${path}; domain=${domain};`;
      }
    }

    localStorage.setItem('terrashift_lang', lang);
  }

  function applyLanguageUI(lang) {
    if (langSwitcher) langSwitcher.setAttribute('data-selected', lang);
    htmlElement.setAttribute('lang', lang);

    langBtns.forEach((btn) => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  let savedLang = localStorage.getItem('terrashift_lang');

  if (!savedLang || savedLang === 'undefined') {
    savedLang = 'id';
    localStorage.setItem('terrashift_lang', 'id');
    clearGoogleTranslateCookie();
  }

  applyLanguageUI(savedLang);

  function triggerGoogleTranslate(targetLang) {
    setGoogleTranslateCookie(targetLang);
    applyLanguageUI(targetLang);

    const googleSelect = document.querySelector('.goog-te-combo');

    if (googleSelect) {
      if (targetLang === 'id') {
        googleSelect.value = '';
        googleSelect.dispatchEvent(new Event('change'));
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        googleSelect.value = targetLang;
        googleSelect.dispatchEvent(new Event('change'));
      }
    } else {
      window.location.reload();
    }
  }

  langBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const selectedLang = e.currentTarget.getAttribute('data-lang');
      if (selectedLang) {
        triggerGoogleTranslate(selectedLang);
      }
    });
  });

  const hideGoogleBanner = () => {
    const googleIframe = document.querySelector('iframe.goog-te-banner-frame');
    if (googleIframe) {
      googleIframe.style.display = 'none';
      googleIframe.style.visibility = 'hidden';
    }
    document.body.style.top = '0px';
  };

  const observer = new MutationObserver(hideGoogleBanner);
  observer.observe(document.body, { childList: true, subtree: true });
});