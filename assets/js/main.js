/* assets/js/main.js */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize language selection
    const languageSelect = document.getElementById('language-select');
    const mainContent = document.getElementById('main-content');

    languageSelect.addEventListener('change', () => {
        const selectedLanguage = languageSelect.value;
        changeLanguage(selectedLanguage);
    });

    function changeLanguage(language) {
        fetch(`assets/languages/${language}.json`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('catchphrase').innerText = data.catchphrase;
                document.getElementById('contract-address-title').innerText = data.contractAddress;
                document.getElementById('about-heading').innerText = data.aboutHeading;
                document.getElementById('about-description').innerText = data.aboutDescription;
                document.getElementById('community-heading').innerText = data.communityHeading;
                document.getElementById('community-message').innerText = data.communityMessage;
                document.getElementById('faq-heading').innerText = data.faqHeading;

                const faqSection = document.getElementById('faq-section');
                faqSection.innerHTML = '';
                const faqQuestions = [
                    { question: data.faqQ1, answer: data.faqA1 },
                    { question: data.faqQ2, answer: data.faqA2 },
                    { question: data.faqQ3, answer: data.faqA3 }
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

                document.getElementById('buy-button').innerText = data.buyButton;
                document.getElementById('finalMessage').innerText = data.finalMessage;
            })
            .catch(error => console.error('Error loading language file:', error));
    }

    // Quantum Computer mode toggle
    const qcModeOption = document.querySelector('option[value="qc"]');
    qcModeOption.addEventListener('click', () => {
        document.body.classList.add('qc-mode');
        activateQuantumMode();
    });

    function activateQuantumMode() {
        const binaryContainer = document.createElement('div');
        binaryContainer.classList.add('binary-container');
        mainContent.appendChild(binaryContainer);

        for (let i = 0; i < 50; i++) {
            const binaryStream = document.createElement('div');
            binaryStream.classList.add('binary-stream');
            if (i % 10 === 0) {
                binaryStream.classList.add('neon-stream');
            }
            binaryContainer.appendChild(binaryStream);
        }
    }

    // Copy contract address to clipboard
    const copyButton = document.getElementById('copy-address-button');
    copyButton.addEventListener('click', copyAddress);

    function copyAddress() {
        const address = document.getElementById('contract-address').innerText;
        navigator.clipboard.writeText(address)
            .then(() => {
                alert('Contract address copied to clipboard!');
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
            });
    }

    // Default to English language
    changeLanguage('en');
});
