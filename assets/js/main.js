// assets/js/main.js

// ドキュメントの読み込みを待ってから実行
document.addEventListener('DOMContentLoaded', function() {

    // コントラクトアドレスのコピー機能
    const copyButton = document.querySelector('.address-copy button');
    const addressElement = document.getElementById('contract-address');

    copyButton.addEventListener('click', function() {
        const address = addressElement.innerText.trim();
        navigator.clipboard.writeText(address).then(() => {
            // コピー成功時のエフェクトを追加
            addressElement.classList.add('copied');

            // 現在の言語を取得
            const currentLang = document.documentElement.lang || 'en';

            // 各言語に対応するコピー完了メッセージ
            const messages = {
                'en': 'Copy successful!',
                'ja': 'コピーが完了しました！',
                'zh': '复制成功！',
                'hi': 'कॉपी सफल!',
                'fa': 'کپی موفقیت‌آمیز بود!',
                'ar': 'تم النسخ بنجاح!',
                'he': 'ההעתקה הצליחה!',
                'ru': 'Копирование успешно!',
                'de': 'Kopieren erfolgreich!',
                'it': 'Copia avvenuta con successo!',
                'es': '¡Copiado con éxito!',
                'ko': '복사 성공!',
                // 必要に応じて他の言語を追加
            };

            // メッセージを表示
            const confirmation = document.createElement('span');
            confirmation.classList.add('copy-confirmation');
            confirmation.innerText = messages[currentLang] || messages['en'];
            addressElement.parentElement.appendChild(confirmation);

            // 一定時間後にエフェクトとメッセージを削除
            setTimeout(() => {
                addressElement.classList.remove('copied');
                confirmation.remove();
            }, 2000);

        }).catch(err => {
            // コピー失敗時のエラーメッセージ
            alert('アドレスのコピーに失敗しました。');
            console.error('Error copying text: ', err);
        });
    });

    // FAQのアコーディオン機能
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        questionButton.addEventListener('click', () => {
            const isExpanded = questionButton.getAttribute('aria-expanded') === 'true';
            questionButton.setAttribute('aria-expanded', !isExpanded);
            if (isExpanded) {
                answer.setAttribute('hidden', '');
            } else {
                answer.removeAttribute('hidden');
            }
        });
    });

    // モバイルメニューのトグル機能
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // ローディング画面の処理
    window.addEventListener('load', () => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.display = 'none';
    });

    // パーティクル背景の初期化
    if (typeof particlesJS !== 'undefined') {
        particlesJS.load('particle-background', 'assets/js/particles.json', function() {
            console.log('Particles.js config loaded');
        });
    }

    // スクロール時のパララックス効果
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        let scrollPosition = window.pageYOffset;
        header.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });

    // 3Dオブジェクトの初期化
    if (typeof THREE !== 'undefined') {
        // シーン、カメラ、レンダラーの設定
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // 量子ビットを模したオブジェクトの作成
        const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ccff, wireframe: true });
        const torusKnot = new THREE.Mesh(geometry, material);
        scene.add(torusKnot);

        camera.position.z = 50;

        function animate() {
            requestAnimationFrame(animate);
            torusKnot.rotation.x += 0.01;
            torusKnot.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();

        // ウィンドウリサイズ時の対応
        window.addEventListener('resize', function() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });
    }

    // アクセシビリティのためのキーボードナビゲーション
    document.addEventListener('keyup', function(event) {
        if (event.key === 'Tab') {
            document.body.classList.add('user-is-tabbing');
        }
    });

    // スクロールの有効化/無効化（Quantum Computerモード用）
    const languageSelect = document.getElementById('language-select');

    languageSelect.addEventListener('change', function() {
        if (this.value === 'qc') {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // 初期状態のスクロール設定
    if (languageSelect.value === 'qc') {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }

});
