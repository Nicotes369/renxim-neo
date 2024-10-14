// assets/js/particle.js
// パーティクルエフェクトの初期化
function initParticleEffect() {
    // Three.js を使用してパーティクルを初期化
    // シーン、カメラ、レンダラーの作成
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.z = 1000;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('particle-container').appendChild(renderer.domElement);

    // パーティクルの設定
    const particles = new THREE.BufferGeometry();
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() * 2 - 1) * 1000;
        positions[i * 3 + 1] = (Math.random() * 2 - 1) * 1000;
        positions[i * 3 + 2] = (Math.random() * 2 - 1) * 1000;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
        color: 0x00ccff,
        size: 2,
        transparent: true,
        blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // アニメーションループ
    function animateParticles() {
        requestAnimationFrame(animateParticles);
        particleSystem.rotation.y += 0.0005;
        renderer.render(scene, camera);
    }

    animateParticles();

    // ウィンドウリサイズ時の処理
    window.addEventListener('resize', function() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}
