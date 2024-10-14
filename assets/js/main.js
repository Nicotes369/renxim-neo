// assets/js/main.js

// DOMContentLoadedイベント
document.addEventListener('DOMContentLoaded', () => {
    // コントラクトアドレスのコピー機能
    const copyButton = document.querySelector('.address-box button');
    const addressElement = document.getElementById('contract-address');

    copyButton.addEventListener('click', () => {
        const address = addressElement.innerText.trim();
        navigator.clipboard.writeText(address).then(() => {
            // コピー成功時のエフェクト
            addressElement.classList.add('copied');
            showConfirmationMessage('copySuccess');
            setTimeout(() => {
                addressElement.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            alert('アドレスのコピーに失敗しました。');
            console.error('Error copying text: ', err);
        });
    });

    // リアルタイムデータの取得
    fetchRealTimeData();

    // パーティクルエフェクトの初期化
    initParticleEffect();

    // スクロールアニメーションの初期化
    initScrollAnimations();

    // ユーザー生成コンテンツのフォーム送信イベント
    const ugcForm = document.getElementById('ugc-form');
    ugcForm.addEventListener('submit', handleUgcSubmit);
});


// リアルタイムデータの取得関数
function fetchRealTimeData() {
    // ここでAPIからデータを取得します（APIのエンドポイントは仮定）
    fetch('https://api.example.com/renxim/data')
        .then(response => response.json())
        .then(data => {
            document.getElementById('current-price').innerText = data.price + ' USD';
            document.getElementById('market-cap').innerText = data.marketCap + ' USD';
        })
        .catch(error => {
            console.error('Error fetching real-time data:', error);
            document.getElementById('current-price').innerText = 'Unavailable';
            document.getElementById('market-cap').innerText = 'Unavailable';
        });
}

// パーティクルエフェクトの初期化関数
function initParticleEffect() {
    // Particle.jsの設定（仮の設定）
    const particleContainer = document.getElementById('particle-container');
    // Particle.jsの初期化コードをここに記述
}

// スクロールアニメーションの初期化関数
function initScrollAnimations() {
    const controller = new ScrollMagic.Controller();

    document.querySelectorAll('.section').forEach((section) => {
        new ScrollMagic.Scene({
            triggerElement: section,
            triggerHook: 0.8,
            reverse: false
        })
        .setClassToggle(section, 'visible')
        .addTo(controller);
    });
}

// 確認メッセージを表示する関数
function showConfirmationMessage(type) {
    const message = document.createElement('div');
    message.classList.add('confirmation-message');

    // 言語に応じたメッセージを取得
    const currentLang = document.documentElement.lang || 'en';
    const messages = {
        'copySuccess': {
            'en': 'Address copied successfully!',
            'ja': 'アドレスをコピーしました！',
            // 他の言語もここに追加
        }
    };

    message.innerText = messages[type][currentLang] || messages[type]['en'];
    document.body.appendChild(message);

    setTimeout(() => {
        message.remove();
    }, 2000);
}

// ユーザー生成コンテンツの送信処理
function handleUgcSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('ugc-name').value;
    const content = document.getElementById('ugc-content').value;

    // 簡易的なバリデーション
    if (name && content) {
        // サーバーに送信する処理をここに追加（バックエンドが必要）
        displayUgcPost(name, content);
        // フォームをリセット
        event.target.reset();
    } else {
        alert('名前とコンテンツを入力してください。');
    }
}

// ユーザー生成コンテンツを表示する関数
function displayUgcPost(name, content) {
    const ugcDisplay = document.getElementById('ugc-display');
    const post = document.createElement('div');
    post.classList.add('ugc-post');
    const postTitle = document.createElement('h4');
    postTitle.innerText = name;
    const postContent = document.createElement('p');
    postContent.innerText = content;
    post.appendChild(postTitle);
    post.appendChild(postContent);
    ugcDisplay.insertBefore(post, ugcDisplay.firstChild);
}
