// Inisialisasi Google Translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: 'en,id,zh-TW', autoDisplay: false }, 'google_translate_element');
}

// Memuat script Google Translate secara dinamis
function loadGoogleTranslateScript() {
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);
}

// Mengubah Bahasa
function translatePage() {
    const lang = document.getElementById('language-select').value;
    if (lang === 'en') {
        // Reload halaman untuk mengatur ulang Google Translate
        location.reload();
    } else {
        if (!window.google || !window.google.translate) {
            loadGoogleTranslateScript();
        } else {
            triggerLanguageChange(lang);
        }
    }
}

// Memicu perubahan bahasa melalui Google Translate
function triggerLanguageChange(lang) {
    const iframe = document.querySelector('.goog-te-banner-frame');
    if (iframe) {
        const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        const selectElement = innerDoc.querySelector('select');
        if (selectElement) {
            selectElement.value = lang;
            selectElement.dispatchEvent(new Event('change'));
        }
    } else {
        setTimeout(() => triggerLanguageChange(lang), 500);
    }
}

// Muat script Google Translate saat halaman dimuat
loadGoogleTranslateScript();