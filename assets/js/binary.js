// assets/js/binary.js

let binaryAnimation;

function startBinaryEffect() {
    const binaryContainer = document.createElement('div');
    binaryContainer.id = 'binary-container';
    document.body.appendChild(binaryContainer);

    const columns = [];
    const columnCount = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < columnCount; i++) {
        const column = document.createElement('div');
        column.classList.add('binary-column');
        column.style.left = `${i * 20}px`;
        binaryContainer.appendChild(column);
        columns.push(column);
    }

    function generateBinary() {
        columns.forEach(column => {
            const random = Math.random();
            const bit = random > 0.5 ? '|0⟩' : '|1⟩';
            const span = document.createElement('span');
            span.classList.add('binary-text');
            span.innerText = bit;
            if (Math.random() < 0.05) {
                span.classList.add('white-neon');
            }
            column.appendChild(span);
            if (column.childElementCount > 30) {
                column.removeChild(column.firstChild);
            }
        });
    }

    binaryAnimation = setInterval(generateBinary, 100);
}

function stopBinaryEffect() {
    clearInterval(binaryAnimation);
    const binaryContainer = document.getElementById('binary-container');
    if (binaryContainer) {
        binaryContainer.remove();
    }
}
