const totalCards = 12;
const availableCards = ['A', 'K', 'Q', 'J'];
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
let currentAttempts = 0;

const cardTemplate = `
  <div class="card">
    <div class="back"></div>
    <div class="face"></div>
  </div>`;

function activate(e) {
  const card = e.currentTarget; // Asegura que el evento se maneja correctamente
  if (currentMove < 2 && !card.classList.contains('active')) {
    card.classList.add('active');
    selectedCards.push(card);

    if (++currentMove === 2) {
      currentAttempts++;
      document.querySelector('#stats').textContent = `${currentAttempts} intentos`;

      const [firstCard, secondCard] = selectedCards;
      const firstValue = firstCard.querySelector('.face').textContent;
      const secondValue = secondCard.querySelector('.face').textContent;

      if (firstValue === secondValue) {
        selectedCards = [];
        currentMove = 0;
      } else {
        setTimeout(() => {
          firstCard.classList.remove('active');
          secondCard.classList.remove('active');
          selectedCards = [];
          currentMove = 0;
        }, 600);
      }
    }
  }
}

function randomValue() {
  let rnd;
  do {
    rnd = Math.floor(Math.random() * (totalCards / 2));
  } while (valuesUsed.filter(value => value === rnd).length >= 2);
  valuesUsed.push(rnd);
  return rnd;
}

function getFaceValue(value) {
  return availableCards[value] || value;
}

function initializeGame() {
  for (let i = 0; i < totalCards; i++) {
    const div = document.createElement('div');
    div.innerHTML = cardTemplate;

    const cardElement = div.querySelector('.card');
    const faceElement = cardElement.querySelector('.face');

    cards.push(cardElement);
    document.querySelector('#game').append(cardElement);

    const valueIndex = randomValue();
    faceElement.textContent = getFaceValue(valueIndex);

    cardElement.addEventListener('click', activate);
  }
}

initializeGame();
