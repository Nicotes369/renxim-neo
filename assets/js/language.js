// assets/js/language.js

// Define RTL languages
const rtlLanguages = ['ar', 'he'];

// Language Selection and Content Loading
const languageSelect = document.getElementById('language-select');
let currentLanguage = 'ja'; // Default language

// Function to load language JSON files
function loadLanguage(lang) {
    fetch(`assets/languages/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (data[key]) {
                    element.textContent = data[key];
                }
            });
            setDirection(lang);
        })
        .catch(error => {
            console.error(`Error loading language file: ${lang}.json`, error);
        });
}

// Function to set text direction based on language
function setDirection(lang) {
    if (rtlLanguages.includes(lang)) {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', lang);
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', lang);
    }
}

// Function to show language change notifications
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

    // Remove notification after animation completes
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Function to get language-specific messages
function getLocalizedMessage(key, lang, additionalInfo = '') {
    const messages = {
        'qcModeActivated': {
            'en': 'Quantum Computer Mode Activated',
            'ja': 'Quantum Computerモードが有効になりました',
            // 他の言語も同様に追加
        },
        'languageChanged': {
            'en': `Language changed to ${additionalInfo}`,
            'ja': `${additionalInfo} に言語が変更されました`,
            // 他の言語も同様に追加
        }
    };

    return messages[key][lang] || messages[key]['en'];
}

// Helper function to get language name
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

// Event listener for language selection
languageSelect.addEventListener('change', function() {
    const selectedLanguage = this.value;
    if (selectedLanguage === 'qc') {
        document.body.classList.add('quantum-mode');
        document.getElementById('main-content').style.display = 'none';
    } else {
        document.body.classList.remove('quantum-mode');
        document.getElementById('main-content').style.display = 'block';
        loadLanguage(selectedLanguage);
    }
    showLanguageChangeNotification(selectedLanguage);
});

// Initial language load
document.addEventListener('DOMContentLoaded', () => {
    loadLanguage(currentLanguage);
});

// Notification animation
const style = document.createElement('style');
style.innerHTML = `
.language-notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    background-color: rgba(0, 0, 0, 0.7);
    color: #ffffff;
    border-radius: 5px;
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 16px;
    z-index: 1002;
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
