const addTimerButton = document.getElementById('add-timer');
const timeInput = document.getElementById('time-input');
const timers = document.getElementById('timers');

function addTimer(timeMs, timersEl) {
  let currentTimeMs = timeMs;

  const template = document.querySelector('#timer-template')
  const timerEl = template.content.cloneNode(true).querySelector('li');
  const timerProgressEl = timerEl.querySelector('.timer__progress');
  const timerValueEl = timerEl.querySelector('.timer__value');
  const timerClearEl = timerEl.querySelector('.timer__clear');
  timerValueEl.textContent = Math.floor(currentTimeMs / 1000).toString();
  timersEl.append(timerEl);

  const timerId = setInterval(() => {
    currentTimeMs -= 1000;
    const progressDeg = 360 - (currentTimeMs / timeMs) * 360;
    timerProgressEl.style.background = `conic-gradient(#36c912 ${progressDeg}deg, #fff 0deg)`;
    timerValueEl.textContent = Math.floor(currentTimeMs / 1000).toString();

    if (currentTimeMs < 0) {
      clearInterval(timerId);
      timerEl.remove();
    }
  }, 1000);

  timerClearEl.addEventListener('click', () => {
    clearInterval(timerId);
    timerEl.remove();
  })
}

function onAddTimer() {
  if (!timeInput.value) {
    alert("Введите время в секундах.");
    return;
  }
  addTimer(parseInt(timeInput.value) * 1000, timers);
}

addTimerButton.addEventListener('click', onAddTimer);
