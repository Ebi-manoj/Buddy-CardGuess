// deck https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
// card https://deckofcardsapi.com/api/deck/new/draw/?count=16

////////////HTML ELEMENTS///////////////

const cardContainer = document.querySelector('.card-display');
const btnStart = document.querySelector('.btn-start');
const comandText = document.querySelector('.comand-text');

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
  btnStart.textContent = btnText;
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
  cardContainer.innerHTML = '';
  data.cards.forEach(card =>
    cardContainer.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="card card-16">
          <img src="${card.image}" class="img-fluid deck-img" alt="card" />
        </div>
    `
    )
  );
  updateMessage(`Think a card,Don't tell me!`, 'Next');
  alignCard();
});
