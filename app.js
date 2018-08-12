const squares = document.querySelectorAll('.square');
const colorDisplay = document.querySelector('#color-display');
const messageDisplay = document.querySelector('#message');
const h1 = document.querySelector('h1');
const resetButton = document.querySelector('#reset');
const modeButtons = document.querySelectorAll('.mode');
const accuracyDisplay = document.querySelector('#accuracy');

let numSquares = 6;
let colors = generateRandomColors(numSquares);
let theColor = pickColorFromColorsArray();
let accuracy = 100;
let runs = 1;
let tries = 0;
let lastTry = '';

function startTheGame() {
  initializeGameModes();
  initializeGameLogic();
}

function initializeGameLogic() {
  colorDisplay.textContent = theColor;

  for (let i = 0; i < squares.length; i++) {
    renderSquares();

    squares[i].addEventListener('click', function () {
      if (lastTry !== this.style.backgroundColor) {
        tries++;
      }

      const clickedColor = this.style.backgroundColor;
      if (clickedColor === theColor) {
        messageDisplay.textContent = 'Correct!';
        messageDisplay.style.color = 'royalblue';
        resetButton.textContent = 'Play again?';
        changeAllColorsToAnswer(theColor);
        h1.style.backgroundColor = theColor;
      } else {
        this.style.backgroundColor = '#333';
        messageDisplay.textContent = 'Keep trying!';
        messageDisplay.style.color = 'orangered';
      }

      lastTry = this.style.backgroundColor;
      if (tries > 1) {
        calculateAccuracy();
      }

      console.log(
        'tries:', tries, 'accuracy:', accuracy
      );
    });
  }
}

function initializeGameModes() {
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener('click', function () {
      for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].classList.remove('selected');
      }
      this.classList.add('selected');
      numSquares = this.textContent === 'Easy' ? 3 : 6;

      reset();
    });
  }
}

function reset() {
  colors = generateRandomColors(numSquares);
  theColor = pickColorFromColorsArray();
  colorDisplay.textContent = theColor;
  h1.style.backgroundColor = 'steelblue';
  messageDisplay.textContent = '';
  resetButton.textContent = 'New colors';

  runs++;

  renderSquares();
}

function renderSquares() {
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = 'block';
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = 'none';
    }
  }
}

resetButton.addEventListener('click', function () {
  reset();
});

function changeAllColorsToAnswer(color) {
  squares.forEach(square => {
    square.style.backgroundColor = color;
  });
}

function pickColorFromColorsArray() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function generateRandomColors(number) {
  let array = [];

  for (let i = 0; i < number; i++) {
    array[i] = randomColor();
  }
  return array;
}

function randomColor() {
  const red = randomValueFrom0To255();
  const green = randomValueFrom0To255();
  const blue = randomValueFrom0To255();

  return `rgb(${red}, ${green}, ${blue})`;
}

function randomValueFrom0To255() {
  return Math.floor(Math.random() * 256);
}

function calculateAccuracy() {
  accuracy = Math.floor(runs / tries * 100);
  accuracyDisplay.textContent = accuracy;
  return accuracy;
}

startTheGame();