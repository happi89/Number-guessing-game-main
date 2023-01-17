'use strict';
const button = document.querySelector('.check');
const guessInput = document.querySelector('.guess');
const message = document.querySelector('.message');
const scoreElement = document.querySelector('.score');
const body = document.querySelector('body');
const questionMark = document.querySelector('.number');
const tryAgain = document.querySelector('.again');
const highscoreElement = document.querySelector('.highscore');
const difficulty = document.querySelector('#difficulty');

let score = 10;
let highscore = 0;
let tries = 0;
difficulty.value = 'normal';

let secretNumber = Math.trunc(Math.random() * 100) + 1;

button.addEventListener('click', function () {
	difficulty.setAttribute('disabled', true);
	tries++;
	console.log(tries);
	const guess = Number(guessInput.value);
	// Whne there is no input
	if (!guess || guess > 100 || guess < 1) {
		message.textContent = 'Please enter a valid number!';

		// when the answer is correct
	} else if (guess === secretNumber) {
		message.textContent = 'Correct! You Win!';
		body.setAttribute('style', 'background-color: #60b347');
		questionMark.textContent = secretNumber;
		questionMark.setAttribute('style', 'width: 30rem');

		if (highscore < score) {
			highscoreElement.textContent = `${tries} tries`;
		}
		// when then the guess is too high
	} else if (guess !== secretNumber) {
		if (score > 1) {
			message.textContent = guess > secretNumber ? 'Too High!' : 'Too Low!';
			score--;
			scoreElement.textContent = score;
		} else {
			message.textContent = 'You lose!';
			questionMark.textContent = secretNumber;
			body.setAttribute('style', 'background-color: #fc3f42');
			questionMark.setAttribute('style', 'width: 30rem');
			scoreElement.textContent = 0;
		}
	}
});

const setDifficulty = () => {
	if (difficulty.value === 'easy') {
		score = 15;
	} else if (difficulty.value === 'normal') {
		score = 10;
	} else {
		score = 7;
	}
	scoreElement.textContent = score;
};

difficulty.addEventListener('change', setDifficulty);

tryAgain.addEventListener('click', function () {
	secretNumber = Math.trunc(Math.random() * 100) + 1;
	scoreElement.textContent = 10;
	questionMark.setAttribute('style', 'width: 15rem');
	questionMark.textContent = '?';
	body.setAttribute('style', 'background-color: #222');
	guessInput.value = '';
	message.textContent = 'Start guessing...';
	difficulty.removeAttribute('disabled');
	tries = 0;
	setDifficulty();
});
