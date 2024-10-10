// assets/js/binary.js

// Set up canvas and binary rain effect
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.getElementById('binary-container').appendChild(canvas);

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const columns = Math.floor(width / 20);
const drops = Array(columns).fill(1);
const binaryChars = ['0', '1'];

// Function to resize the canvas when the window size changes
window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    drops.length = Math.floor(width / 20);
    drops.fill(1);
});

// Main function for binary rain animation
function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#00ff00';
    ctx.font = '25px "Courier New", Courier, monospace';

    drops.forEach((y, x) => {
        const text = binaryChars[Math.floor(Math.random() * binaryChars.length)];
        const posX = x * 20;
        const isNeon = Math.random() < 0.05; // 5% chance to apply neon effect

        if (isNeon) {
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 20;
        } else {
            ctx.fillStyle = '#00ff00';
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
        }

        ctx.fillText(text, posX, y * 20);

        if (y * 20 > height && Math.random() > 0.975) {
            drops[x] = 0;
        }
        drops[x]++;
    });
}

setInterval(draw, 50);

// Activate and deactivate binary effect for Quantum Computer mode
function activateQuantumMode() {
    canvas.style.display = 'block';
}

function deactivateQuantumMode() {
    canvas.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('quantum-mode')) {
        activateQuantumMode();
    } else {
        deactivateQuantumMode();
    }
});

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            if (document.body.classList.contains('quantum-mode')) {
                activateQuantumMode();
            } else {
                deactivateQuantumMode();
            }
        }
    });
});

observer.observe(document.body, { attributes: true });
