/* assets/js/binary.js */

// Variables for Quantum Binary Rain
const binaryContainer = document.getElementById('binary-rain-container');
const columns = [];
const columnCount = Math.floor(window.innerWidth / 20);
const quantumModeClass = 'quantum-mode';

// Initialize Quantum Bit Rain
function createBinaryRain() {
    for (let i = 0; i < columnCount; i++) {
        const binaryColumn = document.createElement('div');
        binaryColumn.className = 'binary-column';
        binaryColumn.style.setProperty('--random-position', Math.random() * 100);
        binaryColumn.style.setProperty('--random-duration', Math.random());
        binaryContainer.appendChild(binaryColumn);
        columns.push(binaryColumn);
        fillBinaryColumn(binaryColumn);
    }
}

// Fill each column with binary characters
function fillBinaryColumn(column) {
    for (let i = 0; i < 30; i++) {
        const binaryChar = document.createElement('span');
        binaryChar.className = 'binary-text';
        binaryChar.textContent = Math.random() > 0.5 ? '|0⟩' : '|1⟩';
        column.appendChild(binaryChar);
        applyNeonEffect(binaryChar);
    }
}

// Apply neon effect to some characters in Quantum Computer Mode
function applyNeonEffect(element) {
    if (document.body.classList.contains(quantumModeClass) && Math.random() > 0.95) {
        element.classList.add('neon-binary-column');
    }
}

// Update the Quantum Bit Rain when switching to Quantum Computer Mode
function updateForQuantumMode() {
    columns.forEach(column => {
        column.innerHTML = ''; // Clear existing bits
        fillBinaryColumn(column); // Refill with potential neon effect
    });
}

// Event Listener for Quantum Computer Mode
const languageSelect = document.getElementById('language-select');
if (languageSelect) {
    languageSelect.addEventListener('change', () => {
        if (languageSelect.value === 'qc') {
            document.body.classList.add(quantumModeClass);
            updateForQuantumMode();
        } else {
            document.body.classList.remove(quantumModeClass);
        }
    });
}

// Initialize Quantum Bit Rain on Load
window.addEventListener('load', () => {
    createBinaryRain();
});

// Resize Quantum Rain Effect Based on Window Size
window.addEventListener('resize', () => {
    // Clear the existing columns and regenerate them based on the new size
    binaryContainer.innerHTML = '';
    columns.length = 0;
    createBinaryRain();
});
