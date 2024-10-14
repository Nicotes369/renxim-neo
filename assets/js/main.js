// assets/js/main.js

// コピー機能の強化とQuantum Computerモードとの連携
document.addEventListener('DOMContentLoaded', () => {
    const copyButton = document.querySelector('.contract-address button');
    const addressElement = document.getElementById('contract-address');

    // コピー機能の追加
    copyButton.addEventListener('click', () => {
        const address = addressElement.innerText.trim();
        navigator.clipboard.writeText(address).then(() => {
            // コピー完了時の発光効果を追加
            addressElement.classList.add('copied');

            // 現在の言語を取得し、コピー成功メッセージを生成
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
                'ko': '복사 완료!'
            };

            // 確認メッセージの要素を作成
            const confirmation = document.createElement('span');
            confirmation.classList.add('copy-confirmation');
            confirmation.innerText = ` ${messages[currentLang] || messages['en']}`;
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

    // Quantum Computerモードでのスクロール制御
    const languageSelect = document.getElementById('language-select');
    const originalOverflow = document.body.style.overflow;

    languageSelect.addEventListener('change', function() {
        if (this.value === 'qc') {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = originalOverflow;
        }
    });

    // ページ読み込み時にQuantum Computerモードが選択されている場合の処理
    if (languageSelect.value === 'qc') {
        document.body.style.overflow = 'hidden';
    }

    // Binary Rain Effectの初期化
    const binaryContainer = document.getElementById('binary-container');
    if (binaryContainer) {
        initBinaryRain(binaryContainer);
    }

    function initBinaryRain(container) {
        const columns = Math.floor(window.innerWidth / 20);
        for (let i = 0; i < columns; i++) {
            const column = document.createElement('div');
            column.classList.add('binary-column');
            container.appendChild(column);
            createBinaryText(column);
        }
    }

    function createBinaryText(column) {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 20; i++) {
            const text = document.createElement('span');
            text.classList.add('binary-text');
            text.innerText = Math.round(Math.random());
            if (Math.random() < 0.05) {
                text.classList.add('white-neon-binary-text');
            }
            fragment.appendChild(text);
        }
        column.appendChild(fragment);
        animateBinaryColumn(column);
    }

    function animateBinaryColumn(column) {
        const duration = 8000 + Math.random() * 4000; // Adjusted duration for more natural effect
        column.style.animationDuration = `${duration}ms`;
    }
});
