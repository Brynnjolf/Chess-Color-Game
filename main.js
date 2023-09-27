const coordinate = document.getElementById("coordinate")
const lightSquare = document.getElementById("light-square");
const darkSquare = document.getElementById("dark-square");

function getRandomCoordinate() {
    let letters = "abcdefgh"
    let randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
    let randomNumber = Math.floor(Math.random() * 8) + 1;
    return randomLetter + randomNumber;
}



// set button handlers
lightSquare.onclick = () => {
    console.log("light button clicked");
    coordinate.innerHTML = getRandomCoordinate();
}
darkSquare.onclick = () => {
    console.log("dark button clicked");
    coordinate.innerHTML = getRandomCoordinate();
}