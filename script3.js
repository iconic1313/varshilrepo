// const randomNumber = Math.floor(Math.random() * 100) + 1;
const randomNumber=10;
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const message = document.querySelector('.number');
const chancesLeft = document.querySelector('.limited');

let chances = 10;

function checkGuess() {
    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        message.textContent = 'Please enter a valid number between 1 and 100.';
        return;
    }

    chances--;
    chancesLeft.textContent = chances;

    if (userGuess === randomNumber) {
        message.textContent = `Congratulations! You guessed the correct number: ${randomNumber}`;
        endGame();
    } else if (chances === 0) {
        message.textContent = `Game Over! The correct number was ${randomNumber}.`;
        endGame();
    } else {
        message.textContent = userGuess < randomNumber ? 'Too low! Try again.' : 'Too high! Try again.';
    }

    guessInput.value = '';
}
function endGame() {
    guessInput.disabled = true;
    submitButton.disabled = true;
}

submitButton.addEventListener('click', checkGuess);

guessInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});