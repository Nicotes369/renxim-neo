// assets/js/language.js

const languageSelect = document.getElementById('language-select');

languageSelect.addEventListener('change', function () {
    const selectedLanguage = this.value;
    if (selectedLanguage === 'qc') {
        document.body.classList.add('quantum-mode');
        document.getElementById('main-content').style.display = 'none';
        // スクロールを無効化
        document.body.style.overflow = 'hidden';
        // バイナリエフェクトを開始
        startBinaryEffect();
    } else {
        document.body.classList.remove('quantum-mode');
        document.getElementById('main-content').style.display = 'block';
        document.body.style.overflow = 'auto';
        // バイナリエフェクトを停止
        stopBinaryEffect();
        loadLanguage(selectedLanguage);
    }
    showLanguageChangeNotification(selectedLanguage);
});

// 言語ファイルを読み込む関数
function loadLanguage(lang) {
    fetch(`assets/languages/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            window.translations = data;
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (data[key]) {
                    element.innerHTML = data[key];
                }
            });
            document.documentElement.setAttribute('lang', lang);
        })
        .catch(error => {
            console.error(`Error loading language file: ${lang}.json`, error);
        });
}

// 言語変更の通知を表示
function showLanguageChangeNotification(lang) {
    const message = lang === 'qc' ? 'Quantum Computerモードが有効になりました' : `${getLanguageName(lang)} に言語が変更されました`;
    showNotification(message);
}

// 言語名を取得
function getLanguageName(lang) {
    const languages = {
        'en': 'English',
        'ja': '日本語',
        'zh': '中文',
        'hi': 'हिन्दी',
        'fa': 'فارسی',
        'ar': 'العربية',
        'he': 'עברית',
        'ru': 'Русский',
        'de': 'Deutsch',
        'it': 'Italiano',
        'es': 'Español',
        'ko': '한국어',
        'qc': 'Quantum Computer'
    };
    return languages[lang] || lang;
}

// 初期言語を読み込み
document.addEventListener('DOMContentLoaded', () => {
    const initialLang = document.documentElement.lang || 'ja';
    loadLanguage(initialLang);
});
