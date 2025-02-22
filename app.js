let timer;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapTimes = [];

const timeDisplay = document.getElementById('timeDisplay');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

function updateTimeDisplay() {
  const formattedTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
  timeDisplay.textContent = formattedTime;
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function startStopwatch() {
  timer = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
    updateTimeDisplay();
  }, 1000);
}

function stopStopwatch() {
  clearInterval(timer);
}

startStopBtn.addEventListener('click', () => {
  if (isRunning) {
    stopStopwatch();
    startStopBtn.textContent = 'Start';
  } else {
    startStopwatch();
    startStopBtn.textContent = 'Stop';
  }
  isRunning = !isRunning;
});

resetBtn.addEventListener('click', () => {
  stopStopwatch();
  seconds = 0;
  minutes = 0;
  hours = 0;
  updateTimeDisplay();
  startStopBtn.textContent = 'Start';
  isRunning = false;
  lapTimes = [];
  lapList.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
  if (isRunning) {
    const lapTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    lapTimes.push(lapTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
    lapList.appendChild(lapItem);
  }
});
