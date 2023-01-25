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
const userElement = document.querySelector('#name');
const betweenElement = document.querySelector('.between');

let score = 10;
let highscore = 0;
let tries = 0;
let username;
let upper = 50;
difficulty.value = 'normal';

let secretNumber = Math.trunc(Math.random() * upper) + 1;

window.addEventListener('load', () => {
	username = localStorage.getItem('username');
	if (!username || username === null) {
		username = window.prompt('what is your name');
		localStorage.setItem('username', username);
		if (window.confirm('Do you want to learn how to play')) {
			window.open('rules.html');
		}
	}
	userElement.textContent = `Hello ${username || 'Unknown user'}`;
});

userElement.addEventListener('click', () => {
	username = window.prompt('what is your name');
	localStorage.setItem('username', username);
	userElement.textContent = `Hello ${username || 'Unknown user'}`;
});

questionMark.addEventListener('click', () => {
	console.log('click');
	questionMark.textContent = secretNumber;
	questionMark.setAttribute('style', 'width: 30rem');
	message.textContent = 'You lose!';
	scoreElement.textContent = 0;
	body.setAttribute('style', 'background-color: #fc3f42');
});

const checkGuess = () => {
	difficulty.setAttribute('disabled', true);
	tries++;
	const guess = Number(guessInput.value);
	guessInput.value = null;

	// Whne there is no input
	if (!guess || guess > upper || guess < 1 || typeof guess !== 'number') {
		if (guess < 1) {
			message.textContent = `Please enter a POSITIVE number between 1 to ${upper}!`;
		}

		if (guess > upper || typeof guess !== 'number') {
			message.textContent = `Please enter a number between 1 and ${upper}!`;
		}

		if (typeof guess === 'float') {
			message.textContent = `please enter a WHOLE number between 1 and ${upper}!`;
		}

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
			if (guess - secretNumber <= 5 && guess - secretNumber > 0) {
				message.textContent = `Guess a Bit LOWER!`;
			} else if (Math.abs(guess - secretNumber) <= 5) {
				message.textContent = `Guess a Bit HIGHER!`;
			} else {
				message.textContent = guess > secretNumber ? 'Too High!' : 'Too Low!';
			}
			score--;
			scoreElement.textContent = score;
		} else {
			message.textContent = 'Too bad! Try Again!';
			questionMark.textContent = secretNumber;
			body.setAttribute('style', 'background-color: #fc3f42');
			questionMark.setAttribute('style', 'width: 30rem');
			scoreElement.textContent = 0;
		}
	}
};

const keyCheckGuess = (e) => {
	if (e.keyCode === 13 && Number(guessInput.value)) {
		checkGuess();
	}
};

button.addEventListener('click', checkGuess);
window.addEventListener('keyup', keyCheckGuess);

const reset = () => {
	setDifficulty();
	secretNumber = Math.trunc(Math.random() * upper) + 1;
	scoreElement.textContent = 10;
	questionMark.setAttribute('style', 'width: 15rem');
	questionMark.textContent = '?';
	body.setAttribute('style', 'background-color: #222');
	guessInput.value = '';
	message.textContent = 'Start guessing...';
	difficulty.removeAttribute('disabled');
	tries = 0;
};

const setDifficulty = () => {
	if (difficulty.value === 'easy') {
		score = 15;
		upper = 20;
	} else if (difficulty.value === 'normal') {
		score = 10;
		upper = 50;
	} else {
		score = 7;
		upper = 100;
	}
	secretNumber = Math.trunc(Math.random() * upper) + 1;
	betweenElement.textContent = `(Between 1 and ${upper})`;
	scoreElement.textContent = score;
};

difficulty.addEventListener('click', setDifficulty);

tryAgain.addEventListener('click', reset);
