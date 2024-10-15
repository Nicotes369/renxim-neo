// assets/js/main.js

// コントラクトアドレスのコピー機能とコピー完了時のエフェクト
document.addEventListener('DOMContentLoaded', () => {
    const copyButton = document.querySelector('.contract-address button');
    const addressElement = document.getElementById('contract-address');

    copyButton.addEventListener('click', () => {
        const address = addressElement.innerText.trim();
        navigator.clipboard.writeText(address).then(() => {
            // コピー完了時の発光効果を追加
            addressElement.classList.add('copied');

            // 現在の言語を取得
            const currentLang = document.documentElement.getAttribute('lang') || 'en';

            // 各言語に対応するコピー完了メッセージ
            const messages = {
                'en': 'Copy successful!',
                'ja': 'コピーが完了しました！',
                'zh': '复制成功！',
                'hi': 'कॉपी सफल!',
                'fa': 'کپی با موفقیت انجام شد!',
                'ar': 'تم النسخ بنجاح!',
                'he': 'ההעתקה הושלמה!',
                'ru': 'Копирование завершено!',
                'de': 'Kopieren erfolgreich!',
                'it': 'Copia riuscita!',
                'es': '¡Copia exitosa!',
                'ko': '복사 완료!',
                'qc': '|0⟩ Copy ⟩1|' // Quantum Computerモード用
            };

            // メッセージを作成
            const confirmation = document.createElement('span');
            confirmation.classList.add('copy-confirmation');
            confirmation.innerText = `${messages[currentLang] || messages['en']}`;
            addressElement.parentElement.appendChild(confirmation);

            // 2秒後に発光効果とメッセージを削除
            setTimeout(() => {
                addressElement.classList.remove('copied');
                confirmation.remove();
            }, 2000);
        }).catch(err => {
            // コピー失敗時のアラート
            alert('アドレスのコピーに失敗しました。');
            console.error('Error copying text: ', err);
        });
    });
});

// FAQのアコーディオン機能
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item h3');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.nextElementSibling;
            const icon = item.querySelector('.faq-icon');

            // アコーディオンの開閉
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                item.classList.remove('active');
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                item.classList.add('active');
            }
        });
    });
});

// カスタムカーソルの設定
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // リンクやボタンにホバーしたときのエフェクト
    const hoverElements = document.querySelectorAll('a, button');
    hoverElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            cursor.classList.add('hover');
        });
        el.addEventListener('mouseout', () => {
            cursor.classList.remove('hover');
        });
    });
});

// サウンドエフェクトの設定
document.addEventListener('DOMContentLoaded', () => {
    const audio = new Audio('assets/sounds/click.mp3');
    const clickableElements = document.querySelectorAll('a, button');

    clickableElements.forEach(el => {
        el.addEventListener('click', () => {
            audio.currentTime = 0;
            audio.play();
        });
    });
});

// 3Dモデルのロード
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('quantum-canvas');

    if (canvas) {
        // シーン、カメラ、レンダラーの設定
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);

        // ライトの追加
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        // GLTFローダーを使用してモデルをロード
        const loader = new THREE.GLTFLoader();
        loader.load('models/quantum_model.glb', gltf => {
            const model = gltf.scene;
            scene.add(model);

            // モデルの位置とスケールを調整
            model.position.set(0, 0, 0);
            model.scale.set(1.5, 1.5, 1.5);

            // アニメーションループ
            function animate() {
                requestAnimationFrame(animate);
                model.rotation.y += 0.005;
                renderer.render(scene, camera);
            }

            animate();
        }, undefined, error => {
            console.error('3Dモデルの読み込み中にエラーが発生しました:', error);
        });

        camera.position.z = 5;

        // レスポンシブ対応
        window.addEventListener('resize', () => {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });
    }
});
