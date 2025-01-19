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
const btnBox = document.querySelector('.btn-box');
const btnStack = document.querySelector('.btn-box-stack');
const stackButtons = document.querySelectorAll('.btn-stack');

// card alignment
const alignCard = function () {
  const cards = document.querySelectorAll('.card-16');
  cards.forEach((card, index) => {
    card.style.left = `${index * 5.8}%`;
  });
};

// Buddy message update
const updateMessage = function (message) {
  comandText.textContent = '';
  comandText.textContent = message;
};
let data;
const stacks = [];

// drawing 16cards from the deck
const drawCard = async function () {
  try {
    const response = await fetch(
      'https://deckofcardsapi.com/api/deck/new/draw/?count=16'
    );
    if (!response.ok) throw new Error();
    data = await response.json();
    for (i = 0; i < data.cards.length; i += 4) {
      stacks.push(data.cards.slice(i, i + 4));
    }
    console.log(data);
    console.log(stacks);
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

// function for updating stack
const updateStack = function (stackArray) {
  stackArray.forEach((stack, index) => {
    const stackContainer = stackContainers[index];
    stack.forEach(card => {
      stackContainer.insertAdjacentHTML(
        'beforeend',
        `
        <div class="card card-stack">
            <img
              src="${card.image}"
              class="img-fluid deck-img"
              alt="card"
            />
          </div>
        `
      );
    });
  });
};

// Stacking the cards in column wise;
const stackContainers = document.querySelectorAll(
  '.stack-1,.stack-2,.stack-3,.stack-4'
);
const finalStack = [];
let firstQuestion = true;
let firstStackNumber;
let SecondStackNumber;
let cardPosition;

btnNext.addEventListener('click', function () {
  card16Box.classList.add('hidden');
  cardStack.classList.remove('hidden');
  updateStack(stacks);
  updateMessage('Where is Your Card...');
  btnBox.classList.add('hidden');
  btnStack.classList.remove('hidden');
});

// stacking first selection of card
const firtsStackSelection = function (button) {
  firstQuestion = false;
  firstStackNumber = button.getAttribute('data-set');
  stacks.forEach(stack => {
    stack.forEach((card, index) => {
      if (!finalStack[index]) {
        finalStack[index] = [];
      }

      finalStack[index].push(card);
    });
  });
  // clearing the stack container and ready to insert another stack
  stackContainers.forEach(stack => (stack.innerHTML = ''));
  // update stack
  updateMessage('Final question..Where is now?');
  updateStack(finalStack);
  console.log(finalStack);
};

// selecting the 2nd question

const secondStackSelection = function (button) {
  SecondStackNumber = button.getAttribute('data-set');
  cardPosition = finalStack[SecondStackNumber - 1][firstStackNumber - 1];
  updateMessage('Hm...thinking..I got it Hahaha');
  cardStack.classList.add('hidden');
  btnStack.classList.add('hidden');
  cardSingle.classList.remove('hidden');
  const img = document.querySelector('.deck-img');
  const tl = gsap.timeline(); // Create a GSAP timeline

  tl.to(img, {
    duration: 0,
    scale: 0,
  })
    .to(img, {
      duration: 4,
      scale: 1,
    })
    .to(img, {
      duration: 0.5,
      scaleX: 0, // Flip horizontally
      onComplete: () => {
        img.src = cardPosition.image;
        updateMessage('Your Card is....');
      },
    })
    .to(img, {
      duration: 0.5,
      scaleX: 1,
    });
};

stackButtons.forEach(btn =>
  btn.addEventListener('click', function () {
    if (firstQuestion) firtsStackSelection(this);
    else secondStackSelection(this);
  })
);
