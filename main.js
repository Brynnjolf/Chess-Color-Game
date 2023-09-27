const coordinate = document.getElementById("coordinate")
const lightSquare = document.getElementById("light-square");
const darkSquare = document.getElementById("dark-square");
const retryButton = document.getElementById("retry-button")
const letters = "abcdefgh";
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
    scoreElement.innerHTML = "Score: " + score;
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
    document.getElementById('retry-section').style.display = "block"
}

function showMainApp() {
    document.getElementById('app').style.display = "block";
    document.getElementById('retry-section').style.display = "none"
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

retryButton.onclick = () => {
    userScore = 0;
    setScore(userScore);
    showMainApp();
}