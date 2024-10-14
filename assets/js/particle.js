// assets/js/particles.js

(function() {
    const particleCount = 100; // Number of particles
    const particleContainer = document.getElementById('particle-background');
    const particles = [];

    function createParticles() {
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            resetParticle(particle);
            particleContainer.appendChild(particle);
            particles.push(particle);
        }
    }

    function resetParticle(particle) {
        particle.style.width = `${Math.random() * 4 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
        particle.style.animationDelay = `${Math.random() * -30}s`;
    }

    // Initialize particles on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => {
        createParticles();
    });
})();
