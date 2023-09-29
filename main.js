const coordinate = document.getElementById("coordinate")
const lightSquare = document.getElementById("light-square");
const darkSquare = document.getElementById("dark-square");
const startButton = document.getElementById("start-button");
const retryButton = document.getElementById("retry-button");
const letters = "abcdefgh";
const TIMECONSTANT = 60;
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
    document.getElementById('time').innerHTML = time;
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

// set button handlers
lightSquare.onclick = () => {
    checkAnswer("light", coordinate.innerHTML);
    coordinate.innerHTML = getRandomCoordinate();
}
darkSquare.onclick = () => {
    checkAnswer("dark", coordinate.innerHTML);
    coordinate.innerHTML = getRandomCoordinate();
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