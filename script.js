// deck https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
// card https://deckofcardsapi.com/api/deck/new/draw/?count=16

////////////HTML ELEMENTS///////////////

const cardContainer = document.querySelector('.card-display');
const btnStart = document.querySelector('.btn-start');

// card alignment
const alignCard = function () {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.left = `${index * 5.8}%`;
  });
};
alignCard();

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
// btnStart.addEventListener('click', function () {
//   cardContainer.innerHTML = '';
//   data.cards.forEach(card =>
//     cardContainer.insertAdjacentHTML(
//       'afterbegin',
//       `
//       <div class="card">
//           <img src="${card.image}" class="img-fluid deck-img" alt="card" />
//         </div>
//     `
//     )
//   );
//   alignCard();
// });
