// deck https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
// card https://deckofcardsapi.com/api/deck/new/draw/?count=16

////////////HTML ELEMENTS///////////////

const cardContainer = document.querySelector('.card-display');
const btnStart = document.querySelector('.btn-start');
const btnNext = document.querySelector('.btn-next');
const comandText = document.querySelector('.comand-text');
const cardSingle = document.querySelector('.card-single');
const card16 = document.querySelector('.card-16');
const cardStack = document.querySelector('.cards-stack');
const stackOne = document.querySelector('.stack-1');
const stackTwo = document.querySelector('.stack-2');
const stackThree = document.querySelector('.stack-3');
const stackFour = document.querySelector('.stack-4');
const card16Box = document.querySelector('.card-16-box');

// card alignment
const alignCard = function () {
  const cards = document.querySelectorAll('.card-16');
  cards.forEach((card, index) => {
    card.style.left = `${index * 5.8}%`;
  });
};

// Buddy message update
const updateMessage = function (message, btnText) {
  comandText.textContent = '';
  comandText.textContent = message;
};

let data;

// drawing 16cards from the deck
const drawCard = async function () {
  try {
    const response = await fetch(
      'https://deckofcardsapi.com/api/deck/new/draw/?count=16'
    );
    if (!response.ok) throw new Error();
    data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
drawCard();

// Game starting after clicking start button
btnStart.addEventListener('click', function () {
  cardSingle.classList.add('hidden');
  card16Box.classList.remove('hidden');
  data.cards.forEach(card =>
    card16Box.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="card card-16">
          <img src="${card.image}" class="img-fluid deck-img" alt="card" />
        </div>
    `
    )
  );
  updateMessage(`Think a card,Don't tell me!`);
  btnStart.classList.add('hidden');
  btnNext.classList.remove('hidden');
  alignCard();
});

// Stacking the cards in column wise;

btnNext.addEventListener('click', function () {
  card16Box.classList.add('hidden');
  cardStack.classList.remove('hidden');
  stackOne.insertAdjacentHTML(
    'afterbegin',
    `
     <div class="card card-stack">
                <img
                  src="https://deckofcardsapi.com/static/img/5D.png"
                  class="img-fluid deck-img"
                  alt="card"
                />
              </div>
    `
  );
});
