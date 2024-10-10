// assets/js/main.js

// Copy Contract Address Functionality
function copyAddress() {
    const addressElement = document.getElementById('contract-address');
    const address = addressElement.innerText.trim();
    navigator.clipboard.writeText(address).then(() => {
        // Apply glow effect and show confirmation message
        addressElement.classList.add('copied');
        const confirmation = document.createElement('span');
        confirmation.classList.add('copy-confirmation');
        confirmation.innerText = ' コピーが完了しました！';
        addressElement.parentElement.appendChild(confirmation);

        // Remove glow effect and message after 2 seconds
        setTimeout(() => {
            addressElement.classList.remove('copied');
            confirmation.remove();
        }, 2000);
    }).catch(err => {
        alert('アドレスのコピーに失敗しました。');
        console.error('Error copying text: ', err);
    });
}

// Activate Quantum Mode
function activateQuantumModeUI() {
    document.body.classList.add('quantum-mode');
    document.getElementById('main-content').style.display = 'none';
}

// Deactivate Quantum Mode
function deactivateQuantumModeUI() {
    document.body.classList.remove('quantum-mode');
    document.getElementById('main-content').style.display = 'block';
}

// Language Select Event Listener
const languageSelect = document.getElementById('language-select');
if (languageSelect) {
    languageSelect.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        if (selectedLanguage === 'qc') {
            activateQuantumModeUI();
        } else {
            deactivateQuantumModeUI();
        }
    });
}

// Initialize UI based on selected language
document.addEventListener('DOMContentLoaded', () => {
    const currentLang = document.getElementById('language-select').value;
    if (currentLang === 'qc') {
        activateQuantumModeUI();
    } else {
        deactivateQuantumModeUI();
    }
});

// Handle Observer for Quantum Mode Toggle
const bodyClassObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            if (document.body.classList.contains('quantum-mode')) {
                activateQuantumModeUI();
            } else {
                deactivateQuantumModeUI();
            }
        }
    });
});

bodyClassObserver.observe(document.body, { attributes: true });
