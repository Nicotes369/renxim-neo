// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // コントラクトアドレスのコピー機能
    const copyButton = document.querySelector('.contract-address button');
    const addressElement = document.getElementById('contract-address');

    copyButton.addEventListener('click', () => {
        const address = addressElement.innerText.trim();
        navigator.clipboard.writeText(address).then(() => {
            // コピー完了時のエフェクト
            addressElement.classList.add('copied');

            // 現在の言語を取得
            const currentLang = document.documentElement.getAttribute('lang') || 'en';

            // 各言語に対応するコピー完了メッセージ
            const messages = {
                'en': 'Copied!',
                'ja': 'コピーしました！',
                'zh': '已复制！',
                'hi': 'कॉपी किया गया!',
                'fa': 'کپی شد!',
                'ar': 'تم النسخ!',
                'he': 'הועתק!',
                'ru': 'Скопировано!',
                'de': 'Kopiert!',
                'it': 'Copiato!',
                'es': '¡Copiado!',
                'ko': '복사되었습니다!'
            };

            // メッセージを表示
            const confirmation = document.createElement('span');
            confirmation.classList.add('copy-confirmation');
            confirmation.innerText = messages[currentLang] || messages['en'];
            addressElement.parentElement.appendChild(confirmation);

            // 2秒後にエフェクトとメッセージを削除
            setTimeout(() => {
                addressElement.classList.remove('copied');
                confirmation.remove();
            }, 2000);
        }).catch(err => {
            alert('アドレスのコピーに失敗しました。');
            console.error('Error copying text: ', err);
        });
    });

    // FAQのアコーディオン機能
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('open');
        });
    });

    // ローディングアニメーションの制御
    const loadingScreen = document.getElementById('loading-screen');

    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000); // 1秒後にローディング画面を非表示
    });
});
