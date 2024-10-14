// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // ローディングアニメーションの終了
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.style.display = 'none';
    }, 1500);

    // コントラクトアドレスのコピー機能
    const copyButton = document.getElementById('copy-button');
    const addressElement = document.getElementById('contract-address');

    copyButton.addEventListener('click', () => {
        const address = addressElement.innerText.trim();
        navigator.clipboard.writeText(address).then(() => {
            showNotification(getTranslation('copy-success'));
        }).catch(err => {
            alert('アドレスのコピーに失敗しました。');
            console.error('Error copying text: ', err);
        });
    });

    // スワイパー（タイムライン）の初期化
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        },
    });

    // パーティクル背景の初期化
    initQuantumBackground();

    // その他の初期化処理...
});

// 通知を表示する関数
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.innerText = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('visible');
    }, 100);
    setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// 翻訳を取得する関数
function getTranslation(key) {
    const translations = window.translations || {};
    return translations[key] || key;
}
