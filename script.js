
document.addEventListener('DOMContentLoaded', () => {
  const questions = document.querySelectorAll('.qa dt');
  questions.forEach(dt => {
    dt.addEventListener('click', () => {
      const dd = dt.nextElementSibling;
      dd.style.display = dd.style.display === 'block' ? 'none' : 'block';
    });
  });

  const countdownEl = document.getElementById('countdown');
  const startSeconds = 13 * 365 * 24 * 60 * 60;
  let remaining = startSeconds;
  function formatTime(s) {
    const y = Math.floor(s / (365 * 24 * 3600));
    s %= 365 * 24 * 3600;
    const d = Math.floor(s / (24 * 3600));
    s %= 24 * 3600;
    const h = Math.floor(s / 3600);
    s %= 3600;
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${y}年 ${d}日 ${h}時間 ${m}分 ${sec}秒`;
  }
  function updateCountdown() {
    countdownEl.textContent = formatTime(remaining);
    if (remaining > 0) {
      remaining--;
      setTimeout(updateCountdown, 1000);
    }
  }
  updateCountdown();

  fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=jpy')
    .then(res => res.json())
    .then(data => {
      document.getElementById('sol-price').textContent = `現在のSOL価格：¥${data.solana.jpy.toLocaleString()}（Coingecko）`;
    });

  const lockRange = document.getElementById('lock-range');
  const lockValue = document.getElementById('lock-value');
  const lockMsg = document.getElementById('lock-msg');
  lockRange.addEventListener('input', () => {
    const months = parseInt(lockRange.value);
    lockValue.textContent = `${months}ヶ月`;
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + months);
    lockMsg.textContent = `→ あなたのSOLは ${futureDate.toLocaleDateString()} に戻ってきます`;
  });
});
