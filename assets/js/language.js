/* assets/js/language.js */

// Language JSON files
const languageFiles = {
    en: '/assets/languages/en.json',
    ja: '/assets/languages/ja.json',
    zh: '/assets/languages/zh.json',
    hi: '/assets/languages/hi.json',
    fa: '/assets/languages/fa.json',
    ar: '/assets/languages/ar.json',
    he: '/assets/languages/he.json',
    ru: '/assets/languages/ru.json',
    de: '/assets/languages/de.json',
    it: '/assets/languages/it.json',
    es: '/assets/languages/es.json',
    ko: '/assets/languages/ko.json',
    qc: '/assets/languages/qc.json' // Quantum Computer Mode
};

// Function to load language data
function loadLanguage(language) {
    fetch(languageFiles[language])
        .then(response => response.json())
        .then(data => {
            updateTextContent(data);
        })
        .catch(error => {
            console.error('Error loading language file:', error);
        });
}

// Function to update text content dynamically
function updateTextContent(data) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (data[key]) {
            element.textContent = data[key];
        }
    });
}

// Event listener for language selection
if (languageSelect) {
    languageSelect.addEventListener('change', () => {
        const selectedLanguage = languageSelect.value;
        loadLanguage(selectedLanguage);
        if (selectedLanguage === 'qc') {
            document.body.classList.add(quantumModeClass);
            updateForQuantumMode();
        } else {
            document.body.classList.remove(quantumModeClass);
        }
    });
}

// Load default language on page load
window.addEventListener('load', () => {
    const defaultLanguage = languageSelect ? languageSelect.value : 'en';
    loadLanguage(defaultLanguage);
});

// Quantum Computer Mode - Unique Language Handling
function loadQuantumLanguage() {
    if (languageSelect.value === 'qc') {
        // Quantum-specific phrases and stylings
        const quantumPhrases = document.querySelectorAll('.quantum-phrase');
        quantumPhrases.forEach(phrase => {
            phrase.style.textShadow = '0 0 15px #ffffff, 0 0 30px #00ccff, 0 0 45px #00ffcc';
            phrase.classList.add('neon-quantum');
        });
    }
}
