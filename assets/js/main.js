/* assets/js/main.js */

// Variables
const copyButton = document.querySelector('.copy-button');
const contractAddressElement = document.getElementById('contract-address');

// Function to Copy Contract Address
function copyAddress() {
    const contractAddress = contractAddressElement.textContent;
    navigator.clipboard.writeText(contractAddress).then(() => {
        showNotification('Contract Address copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Event Listener for Copy Button
if (copyButton) {
    copyButton.addEventListener('click', copyAddress);
}

// Notification Function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate the notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Remove the notification after a delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Notification Styles (Dynamically Injected for Quantum Feel)
const notificationStyle = document.createElement('style');
notificationStyle.innerHTML = `
    .notification {
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0, 0, 0, 0.8);
        color: #00ccff;
        padding: 15px 30px;
        border-radius: 10px;
        box-shadow: 0 0 15px #00ccff, 0 0 25px #00ccff;
        opacity: 0;
        transition: opacity 0.5s, transform 0.5s;
        z-index: 1002;
    }
    .notification.show {
        opacity: 1;
        transform: translateX(-50%) translateY(-20px);
    }
`;
document.head.appendChild(notificationStyle);

// Event Listener for Quantum Mode Activation
if (languageSelect) {
    languageSelect.addEventListener('change', () => {
        if (languageSelect.value === 'qc') {
            activateQuantumMode();
        } else {
            deactivateQuantumMode();
        }
    });
}

// Activate Quantum Mode
function activateQuantumMode() {
    document.body.classList.add('quantum-mode');
    showNotification('Quantum Computer Mode Activated! Welcome to the Quantum Realm!');
}

// Deactivate Quantum Mode
function deactivateQuantumMode() {
    document.body.classList.remove('quantum-mode');
    showNotification('Quantum Computer Mode Deactivated! Returning to Classical View.');
}

// Responsive Font Adjustment for Quantum Mode
window.addEventListener('resize', () => {
    if (document.body.classList.contains('quantum-mode')) {
        adjustQuantumFonts();
    }
});

// Function to Adjust Font Size in Quantum Mode
function adjustQuantumFonts() {
    const quantumTextElements = document.querySelectorAll('.quantum-phrase, .binary-text');
    quantumTextElements.forEach(element => {
        const newSize = window.innerWidth > 768 ? '26px' : '20px';
        element.style.fontSize = newSize;
    });
}

// Initialize Quantum Effects on Page Load
window.addEventListener('load', () => {
    if (languageSelect && languageSelect.value === 'qc') {
        activateQuantumMode();
    }
});
