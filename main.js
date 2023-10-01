const coordinate = document.getElementById("coordinate")
const lightSquare = document.getElementById("light-square");
const darkSquare = document.getElementById("dark-square");
const startButton = document.getElementById("start-button");
const retryButton = document.getElementById("retry-button");

const settingsButton = document.getElementById("settings-button");
const closeSettingsButton = document.getElementById("close-settings-button")
const modalBackgrounds = document.getElementsByClassName("modal-background")

const letters = "abcdefgh";
const TIMECONSTANT = 61;
var time;
let timerId;
let userScore = 0;

function getRandomCoordinate() {
    let randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
    let randomNumber = Math.floor(Math.random() * 8) + 1;
    return randomLetter + randomNumber;
}

function getColorFromCoordinate(coordinate) {
    const number = coordinate[1];
    const letterIndex = letters.indexOf(coordinate[0]);

    let isLight = letterIndex % 2 != 0

    if(number % 2 == 0) {
        isLight = !isLight
    }

    return isLight ? "light" : "dark";
}

function setScore(score) {
    const scoreElement = document.getElementById("score");
    const scoreElementInRetrySection = document.getElementById("score-display")
    scoreElement.innerHTML = score;
    scoreElementInRetrySection.innerHTML = score;
}

function checkAnswer(color, coordinate) {
    if(color == getColorFromCoordinate(coordinate)) {
        userScore++;
        setScore(userScore);
    } else {
        showRetrySection("incorrect");
    }
}

function showRetrySection(reason) {
    if(reason == "incorrect") {
        document.getElementById("retry-section-title").innerHTML = "Sorry, Incorrect!"
    } else if(reason == "timeout") {
        document.getElementById("retry-section-title").innerHTML = "Time's up!"
    }
    document.getElementById('app').style.display = "none";
    document.getElementById('intro-section').style.display = "none";
    document.getElementById('retry-section').style.display = "block";

    if(timerId) {
        clearInterval(timerId);
    }
}

function showIntroSection() {
    document.getElementById('app').style.display = "none";
    document.getElementById('intro-section').style.display = "block";
    document.getElementById('retry-section').style.display = "none";
}

function showMainApp() {
    document.getElementById('app').style.display = "block";
    document.getElementById('intro-section').style.display = "none";
    document.getElementById('retry-section').style.display = "none"
}

function countdown() {
    if(time <= 0 && timerId)
    {
        clearInterval(timerId);
        timerId = null;
        showRetrySection("timeout")
        return;
    }
    time--;
    document.getElementById('time').innerHTML = formatTime(time);
}

function formatTime(SecondsRemaining) {
    // returns a string in the format 0:00
    let minutes = 0;
    while(SecondsRemaining >= 60) {
        minutes++;
        SecondsRemaining-=60;
    }
    return minutes+":"+String(SecondsRemaining).padStart(2, '0');
}

function initGame() {
    userScore = 0;
    setScore(userScore);
    time = TIMECONSTANT;
    countdown(time)
    timerId = setInterval(() => {
        countdown(time)
    }, 1000);
    coordinate.innerHTML = getRandomCoordinate();
    showMainApp();
}

function openSettingsMenu() {
    document.getElementById("settings-menu").style.display = "flex";
}

function closeSettingsMenu() {
    document.getElementById("settings-menu").style.display = "none";
}

// set button handlers
lightSquare.onclick = () => {
    checkAnswer("light", coordinate.innerHTML);

    let newCoordinate = getRandomCoordinate();
    while(coordinate.innerHTML == newCoordinate) {
        newCoordinate = getRandomCoordinate();
    }
    coordinate.innerHTML = newCoordinate;
}
darkSquare.onclick = () => {
    checkAnswer("dark", coordinate.innerHTML);
    let newCoordinate = getRandomCoordinate();
    while(coordinate.innerHTML == newCoordinate) {
        newCoordinate = getRandomCoordinate();
    }
    coordinate.innerHTML = newCoordinate;
}

window.onload = () => {
    showIntroSection();
}

retryButton.onclick = () => {
    initGame();
}

startButton.onclick = () => {
    initGame();
}

settingsButton.onclick = () => {
    openSettingsMenu();
}

closeSettingsButton.onclick = () => {
    closeSettingsMenu();
}

modalBackgrounds[0].onclick = () => {
    closeSettingsMenu();
}