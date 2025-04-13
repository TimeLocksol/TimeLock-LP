
let publicKey;
let countdownInterval;

document.getElementById("connectWallet").onclick = async function() {
  if (window.solana && window.solana.isPhantom) {
    try {
      const resp = await window.solana.connect();
      publicKey = resp.publicKey.toString();
      document.getElementById("walletAddress").textContent = `接続済み: ${publicKey}`;
    } catch (err) {
      alert("接続に失敗しました");
    }
  } else {
    alert("Phantomウォレットをインストールしてください。");
  }
};

document.getElementById("lockSol").onclick = async function() {
  const amount = parseFloat(document.getElementById("amount").value);
  const duration = parseInt(document.getElementById("duration").value);
  if (!publicKey) return alert("ウォレットに接続してください");
  if (isNaN(amount) || amount < 0.1) return alert("0.1 SOL以上を入力してください");
  if (isNaN(duration) || duration < 1) return alert("1分以上のロック時間を入力してください");

  const unlockTime = Date.now() + duration * 60 * 1000;
  startCountdown(unlockTime);
  document.getElementById("status").textContent = "ロック処理はスマートコントラクトと接続準備中（ダミー表示）";
};

function startCountdown(unlockTime) {
  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    const now = Date.now();
    const diff = unlockTime - now;
    if (diff <= 0) {
      document.getElementById("countdown").textContent = "解除可能！";
      clearInterval(countdownInterval);
    } else {
      const min = String(Math.floor(diff / 60000)).padStart(2, '0');
      const sec = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      document.getElementById("countdown").textContent = `${min}:${sec}`;
    }
  }, 1000);
}
