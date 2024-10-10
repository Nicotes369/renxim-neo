/* assets/js/binary.js */

// Handles binary rain effect for Quantum Computer mode

document.addEventListener('DOMContentLoaded', () => {
    const qcModeOption = document.querySelector('option[value="qc"]');
    qcModeOption.addEventListener('click', activateQuantumBinaryEffect);

    function activateQuantumBinaryEffect() {
        const binaryContainer = document.createElement('div');
        binaryContainer.classList.add('binary-container');
        document.body.appendChild(binaryContainer);

        // Create multiple binary streams to add to the binary container
        for (let i = 0; i < 50; i++) {
            const binaryStream = createBinaryStream();
            binaryContainer.appendChild(binaryStream);
        }
    }

    function createBinaryStream() {
        const binaryStream = document.createElement('div');
        binaryStream.classList.add('binary-stream');
        if (Math.random() < 0.1) {
            binaryStream.classList.add('neon-stream');
        }

        const streamContent = generateBinaryContent();
        binaryStream.innerHTML = streamContent;

        setAnimationDuration(binaryStream);
        return binaryStream;
    }

    function generateBinaryContent() {
        const characters = ['0', '1'];
        let content = '';
        for (let i = 0; i < 100; i++) {
            content += characters[Math.floor(Math.random() * characters.length)] + '<br>';
        }
        return content;
    }

    function setAnimationDuration(element) {
        const duration = Math.random() * 20 + 10;
        element.style.animationDuration = `${duration}s`;
    }
});
