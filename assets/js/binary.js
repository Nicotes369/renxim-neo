// assets/js/binary.js

// Binary Rain Effect using Canvas for enhanced performance and visual effects
(function() {
    let canvas, ctx;
    let columns;
    let drops = [];
    const baseFontSize = 28; // Increased font size as per user request
    const binaryBits = ['|0⟩', '|1⟩'];
    const neonWhiteProbability = 0.1; // 10% of columns will be white neon
    let animationId;
    const fallSpeed = 50; // Slower fall speed

    // Initialize Canvas
    function initializeCanvas() {
        canvas = document.createElement('canvas');
        canvas.id = 'binary-canvas';
        document.getElementById('binary-container').appendChild(canvas);
        ctx = canvas.getContext('2d');

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        initializeDrops();
        animate();
    }

    // Resize Canvas to Fullscreen
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = Math.floor(canvas.width / baseFontSize);
        drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * canvas.height;
        }
    }

    // Initialize Drops
    function initializeDrops() {
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * canvas.height;
        }
    }

    // Draw Function
    function draw() {
        // Black background with slight opacity for trailing effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set font properties
        ctx.font = `${baseFontSize}px 'Orbitron', sans-serif`;

        // Draw binary bits
        for (let i = 0; i < drops.length; i++) {
            // Determine if this column should be white neon
            const isWhiteNeon = Math.random() < neonWhiteProbability;

            if (isWhiteNeon) {
                ctx.fillStyle = '#ffffff'; // White neon
                ctx.shadowColor = '#ffffff';
            } else {
                ctx.fillStyle = '#00ccff'; // Neon Blue
                ctx.shadowColor = '#00ccff';
            }

            ctx.shadowBlur = 10;

            const bit = binaryBits[Math.floor(Math.random() * binaryBits.length)];
            ctx.fillText(bit, i * baseFontSize, drops[i]);

            // Reset shadow for next character
            ctx.shadowBlur = 0;

            // Move drop downwards
            drops[i] += baseFontSize / (fallSpeed / 10);

            // Reset drop to top after it reaches the bottom with increased delay
            if (drops[i] > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
        }
    }

    // Animation Loop with slower speed
    function animate() {
        draw();
        animationId = requestAnimationFrame(animate);
    }

    // Start Binary Rain Effect
    function startBinaryRain() {
        if (!canvas) {
            initializeCanvas();
        }
    }

    // Stop Binary Rain Effect
    function stopBinaryRain() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        if (canvas) {
            canvas.remove();
            canvas = null;
            ctx = null;
        }
    }

    // Listen for Quantum Computer mode activation/deactivation
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                if (document.body.classList.contains('quantum-mode')) {
                    startBinaryRain();
                } else {
                    stopBinaryRain();
                }
            }
        });
    });

    observer.observe(document.body, { attributes: true });

    // Initialize on page load if Quantum Computer mode is active
    document.addEventListener('DOMContentLoaded', () => {
        if (document.body.classList.contains('quantum-mode')) {
            startBinaryRain();
        }
    });

})();
