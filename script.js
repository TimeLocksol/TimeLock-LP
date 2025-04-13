
document.addEventListener("DOMContentLoaded", function() {
    const timer = document.getElementById("timer");
    let seconds = 7 * 3600 + 45 * 60 + 12;
    function updateTimer() {
        const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        timer.textContent = `${h}:${m}:${s}`;
        if (seconds > 0) seconds--;
    }
    updateTimer();
    setInterval(updateTimer, 1000);
});
