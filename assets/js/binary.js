// assets/js/binary.js

// バイナリレインエフェクトの実装
function initBinaryRain() {
    const binaryContainer = document.createElement('div');
    binaryContainer.id = 'binary';
    document.body.appendChild(binaryContainer);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const columns = Math.floor(width / 20);

    for (let i = 0; i < columns; i++) {
        const stream = document.createElement('div');
        stream.classList.add('binary-stream');
        stream.style.left = i * 20 + 'px';

        
        // 白色ネオンをランダムに適用
        if (Math.random() < 0.05) {
            stream.classList.add('white');
        }

        binaryContainer.appendChild(stream);
        animateStream(stream);
    }

    function animateStream(stream) {
        let position = 0;
        const speed = Math.random() * 3 + 2; // スピードを少し遅く

        function update() {
            position += speed;
            if (position > height) {
                position = -100;
            }
            stream.style.transform = `translateY(${position}px)`;
            stream.innerText = generateBinaryString(16);
            requestAnimationFrame(update);
        }
        update();
    }

    function generateBinaryString(length) {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.random() > 0.5 ? '|0⟩\n' : '|1⟩\n';
        }
        return result.trim();
    }

    
    // ウィンドウリサイズ時の処理
    window.addEventListener('resize', function() {
        binaryContainer.remove();
        initBinaryRain();
    });
}

// Quantum Computer Modeがアクティブな場合に初期化
if (document.body.classList.contains('quantum-mode')) {
    initBinaryRain();
}
