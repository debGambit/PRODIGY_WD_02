let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapTimes = [];

function startStop() {
    if (isRunning) {
        clearInterval(timerInterval);
        document.getElementById("startStop").innerText = "Start";
        isRunning = false;
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        document.getElementById("startStop").innerText = "Stop";
        isRunning = true;
    }
}

function updateTime() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    displayTime(elapsedTime);
}

function displayTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    document.getElementById("display").innerText =
        `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;
}

function padTime(val) {
    return val < 10 ? "0" + val : val;
}

function lapReset() {
    clearInterval(timerInterval);
    document.getElementById("startStop").innerText = "Start";
    isRunning = false;

    document.getElementById("display").innerText = "00:00:00";
    elapsedTime = 0;

    lapTimes = [];
    displayLapTimes();
}

function recordLap() {
    if (isRunning) {
        const lapTime = elapsedTime;
        lapTimes.push(lapTime);
        displayLapTimes();
    }
}

function displayLapTimes() {
    const lapsList = document.getElementById("laps");
    lapsList.innerHTML = "";
    lapTimes.forEach((lapTime, index) => {
        const lapItem = document.createElement("li");
        lapItem.innerText = `Lap ${index + 1}: ${formatTime(lapTime)}`;
        lapsList.appendChild(lapItem);
    });
}

function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;
}

