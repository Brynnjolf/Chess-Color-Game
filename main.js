const coordinate = document.getElementById("coordinate")
const lightSquare = document.getElementById("light-square");
const darkSquare = document.getElementById("dark-square");
const scoreElement = document.getElementById("score");
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
    scoreElement.innerHTML = "Score: " + score;
}

function checkAnswer(color, coordinate) {
    if(color == getColorFromCoordinate(coordinate)) {
        userScore++;
        setScore(userScore);
    } else {
        alert("incorrect!");
        userScore = 0;
        setScore(userScore);
    }
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