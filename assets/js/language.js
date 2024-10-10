/* assets/js/language.js */

// Handles language-specific operations, such as setting content based on selected language

function setLanguageContent(languageData) {
    document.getElementById('catchphrase').innerText = languageData.catchphrase;
    document.getElementById('contract-address-title').innerText = languageData.contractAddress;
    document.getElementById('about-heading').innerText = languageData.aboutHeading;
    document.getElementById('about-description').innerText = languageData.aboutDescription;
    document.getElementById('community-heading').innerText = languageData.communityHeading;
    document.getElementById('community-message').innerText = languageData.communityMessage;
    document.getElementById('faq-heading').innerText = languageData.faqHeading;

    const faqSection = document.getElementById('faq-section');
    faqSection.innerHTML = '';
    const faqQuestions = [
        { question: languageData.faqQ1, answer: languageData.faqA1 },
        { question: languageData.faqQ2, answer: languageData.faqA2 },
        { question: languageData.faqQ3, answer: languageData.faqA3 }
    ];
    faqQuestions.forEach(faq => {
        const faqItem = document.createElement('div');
        faqItem.classList.add('faq-item');
        const faqQuestion = document.createElement('h3');
        faqQuestion.classList.add('faq-question');
        faqQuestion.innerText = faq.question;
        const faqAnswer = document.createElement('p');
        faqAnswer.classList.add('faq-answer');
        faqAnswer.innerText = faq.answer;
        faqItem.appendChild(faqQuestion);
        faqItem.appendChild(faqAnswer);
        faqSection.appendChild(faqItem);
    });

    document.getElementById('buy-button').innerText = languageData.buyButton;
    document.getElementById('finalMessage').innerText = languageData.finalMessage;
}

function loadLanguage(language) {
    fetch(`assets/languages/${language}.json`)
        .then(response => response.json())
        .then(data => setLanguageContent(data))
        .catch(error => console.error('Error loading language file:', error));
}

// Event listener to change content when the language selection changes
document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language-select');
    languageSelect.addEventListener('change', () => {
        const selectedLanguage = languageSelect.value;
        loadLanguage(selectedLanguage);
    });

    // Set default language to English
    loadLanguage('en');
});
