// assets/js/language.js

const rtlLanguages = ['ar', 'he'];

document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language-select');
    let currentLanguage = navigator.language.slice(0, 2) || 'en';

    // 初期言語を設定
    if (languageSelect.querySelector(`option[value="${currentLanguage}"]`)) {
        languageSelect.value = currentLanguage;
    } else {
        currentLanguage = 'en';
        languageSelect.value = 'en';
    }

    loadLanguage(currentLanguage);

    languageSelect.addEventListener('change', function() {
        const selectedLanguage = this.value;
        if (selectedLanguage === 'qc') {
            document.body.classList.add('quantum-mode');
            document.getElementById('main-content').style.display = 'none';
            activateQuantumMode();
        } else {
            document.body.classList.remove('quantum-mode');
            document.getElementById('main-content').style.display = 'block';
            deactivateQuantumMode();
            loadLanguage(selectedLanguage);
        }
        showLanguageChangeNotification(selectedLanguage);
    });
});

function loadLanguage(lang) {
    fetch(`assets/languages/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (data[key]) {
                    element.innerHTML = data[key];
                }
            });
            setDirection(lang);
        })
        .catch(error => {
            console.error(`Error loading language file: ${lang}.json`, error);
        });
}

function setDirection(lang) {
    if (rtlLanguages.includes(lang)) {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', lang);
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', lang);
    }
}

function showLanguageChangeNotification(lang) {
    const notification = document.createElement('div');
    notification.classList.add('language-notification');

    if (lang === 'qc') {
        notification.innerText = getLocalizedMessage('qcModeActivated', lang);
        notification.style.color = '#00ccff';
    } else {
        notification.innerText = getLocalizedMessage('languageChanged', lang, getLanguageName(lang));
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function getLocalizedMessage(key, lang, additionalInfo = '') {
    const messages = {
        'qcModeActivated': {
            'en': 'Quantum Computer Mode Activated',
            'ja': 'Quantum Computerモードが有効になりました',
            // 他の言語もここに追加
        },
        'languageChanged': {
            'en': `Language changed to ${additionalInfo}`,
            'ja': `${additionalInfo} に言語が変更されました`,
            // 他の言語もここに追加
        }
    };
    return messages[key][lang] || messages[key]['en'];
}

function getLanguageName(lang) {
    const languages = {
        'en': 'English',
        'ja': '日本語',
        'zh': '中文',
        'hi': 'Hindi',
        'fa': 'Persian',
        'ar': 'Arabic',
        'he': 'Hebrew',
        'ru': 'Russian',
        'de': 'German',
        'it': 'Italian',
        'es': 'Spanish',
        'ko': 'Korean',
        'qc': 'Quantum Computer'
    };
    return languages[lang] || lang;
}

// Quantum Computer Mode Functions
function activateQuantumMode() {
    // Quantum Computer Modeのアクティブ化
    // 必要なスクリプトやスタイルをロード
    if (!document.getElementById('binary-js')) {
        const script = document.createElement('script');
        script.src = 'assets/js/binary.js';
        script.id = 'binary-js';
        document.body.appendChild(script);
    }
    if (!document.getElementById('binary-css')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'assets/css/binary.css';
        link.id = 'binary-css';
        document.head.appendChild(link);
    }
}

function deactivateQuantumMode() {
    // Quantum Computer Modeのディアクティブ化
    // ロードしたスクリプトやスタイルを削除
    const binaryJs = document.getElementById('binary-js');
    if (binaryJs) binaryJs.remove();
    const binaryCss = document.getElementById('binary-css');
    if (binaryCss) binaryCss.remove();
}

// Notification Styles
const style = document.createElement('style');
style.innerHTML = `
.language-notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 12px 20px;
    background-color: rgba(0, 0, 0, 0.7);
    color: #ffffff;
    border-radius: 5px;
    z-index: 1002;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    animation: fadeInOut 3s forwards;
}

@keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(20px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(20px); }
}
`;
document.head.appendChild(style);
