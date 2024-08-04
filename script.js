// script.js
let startTime, updatedTime, difference, tInterval, running = false;
let hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
let lapCount = 0;

const display = document.getElementById('display');
const laps = document.getElementById('laps');

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        running = true;
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 10); // Update time every 10 milliseconds
    }
}

function pauseTimer() {
    running = false;
    clearInterval(tInterval);
}

function resetTimer() {
    running = false;
    clearInterval(tInterval);
    difference = 0;
    display.innerHTML = "00:00:00:00";
    laps.innerHTML = '';
    lapCount = 0;
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapTime = display.innerHTML;
        const lapItem = document.createElement('div');
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        laps.appendChild(lapItem);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    minutes = Math.floor((difference / (1000 * 60)) % 60);
    seconds = Math.floor((difference / 1000) % 60);
    milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    display.innerHTML = hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
}
