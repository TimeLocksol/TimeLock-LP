
const countdownEl = document.getElementById('countdown');
const targetDate = new Date(Date.now() + 7 * 60 * 60 * 1000); // 7時間後

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    countdownEl.textContent = "Time's up!";
    return;
  }

  const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
  const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
  const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

  countdownEl.textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateCountdown, 1000);
updateCountdown();
