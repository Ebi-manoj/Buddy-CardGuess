// deck https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
// card https://deckofcardsapi.com/api/deck/new/draw/?count=16

////////////HTML ELEMENTS///////////////

const cardContainer = document.querySelector('.card-display');
const btnStart = document.querySelector('.btn-start');
const btnNext = document.querySelector('.btn-next');
const btnReset = document.querySelector('.restart-btn');
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

// Different Messages to display

const startMessage = [
  'Shall we begin the magic?',
  'Buddy is ready! Are you?',
  "Think you're ready to outsmart me?",
  'The game begins now!',
  'Let’s shuffle into some fun!',
  'Time to put your memory to the test!',
  'Get ready for a mind-blowing trick!',
  'Let’s dive into the world of cards!',
  'Are you prepared to play with Buddy?',
  "It's showtime! Shall we?",
];

const firstMessage = [
  "Think of a card... don't tell me!",
  'Choose a card in your mind and keep it a secret!',
  "Pick a card silently... I'll guess it!",
  "Focus on a card... and don't let me know!",
  'Imagine a card clearly in your mind!',
  'Think about one card... but don’t reveal it!',
  'Lock a card in your memory... keep it hidden!',
  'Choose your card carefully, and let me do the magic!',
  "Hold a card in your thoughts... I'll figure it out!",
  'Pick any card in your mind... I promise I won’t peek!',
];

const firstStackMessage = [
  'Where’s your card hiding this time?',
  'Spot your card... I know you can!',
  'I hope you can still find your card!',
  'Where did you leave your card this time?',
  'Peek carefully—where’s your card?',
  'I bet I know where your card is!',
  'Time to reveal the first clue. Where’s your card?',
  'Focus now—can you locate your card?',
  'Here we go! Where is it hiding?',
  'Take a close look. Where’s your card?',
];

const SecondStackMessage = [
  'One last time—where’s your card now?',
  'Final question! Where did it go?',
  'This is it! Tell me... where’s your card?',
  'Buddy’s almost got it! Where is it now?',
  'Don’t blink! Where’s your card this time?',
  'Final stretch—show me where your card is!',
  'Last chance! Where do you think it is?',
  'Think carefully now—where’s your card hiding?',
  'The answer is near! Where’s your card?',
  'Time to seal the deal—where’s your card?',
];

const lastMessage = [
  'Haha, I got it!',
  'I’ve figured it out—your card is mine!',
  'Hahaha, Buddy never misses!',
  'I know your card now, no escaping!',
  'Gotcha! Your card is locked in my mind!',
  'I’ve cracked it—your card is here!',
  'Hahaha, you can’t fool me!',
  'Buddy always wins—here’s your card!',
  'Easy! I’ve found your card!',
  'Aha, the trick is over—I got your card!',
];

// card alignment
const alignCard = function () {
  const cards = document.querySelectorAll('.card-16');
  cards.forEach((card, index) => {
    card.style.left = `${index * 5.8}%`;
  });
};

// Buddy message update
const updateMessage = function (messageArray) {
  const message = messageArray[[Math.trunc(Math.random() * 10)]];
  comandText.textContent = '';
  comandText.textContent = message;
};

let data;
let stacks = [];

// drawing 16cards from the deck
updateMessage(startMessage);
const drawCard = async function () {
  try {
    const response = await fetch(
      'https://deckofcardsapi.com/api/deck/new/draw/?count=16'
    );
    if (!response.ok) throw new Error();
    data = await response.json();
    stacks = [];
    for (i = 0; i < data.cards.length; i += 4) {
      stacks.push(data.cards.slice(i, i + 4));
    }
    console.log(data);
    console.log(stacks);
  } catch (error) {
    updateMessage('Failed to load cards. Please try again!');
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
  updateMessage(firstMessage);
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

btnNext.addEventListener('click', function () {
  card16Box.classList.add('hidden');
  cardStack.classList.remove('hidden');
  updateStack(stacks);
  updateMessage(firstStackMessage);
  btnBox.classList.add('hidden');
  btnStack.classList.remove('hidden');
});

// Answering the first question and arranging next stack
let finalStack = [];
let firstQuestion = true;
let firstStackNumber;
let SecondStackNumber;
let cardPosition;

const firstStackSelection = function (button) {
  firstQuestion = false;
  firstStackNumber = button.getAttribute('data-set');
  finalStack = [];
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
  updateMessage(SecondStackMessage);
  updateStack(finalStack);
  console.log(finalStack);
};

// Answering the 2nd question, where is card

let img;

const secondStackSelection = function (button) {
  SecondStackNumber = button.getAttribute('data-set');
  cardPosition = finalStack[SecondStackNumber - 1][firstStackNumber - 1];
  updateMessage(lastMessage);
  cardStack.classList.add('hidden');
  btnStack.classList.add('hidden');
  cardSingle.classList.remove('hidden');
  img = document.querySelector('.deck-img');

  // Gsap animation
  const tl = gsap.timeline();

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
      scaleX: 0,
      onComplete: () => {
        img.src = cardPosition.image;
        updateMessage(lastMessage);
      },
    })
    .to(img, {
      duration: 0.5,
      scaleX: 1,
      onComplete: () => {
        btnReset.classList.remove('hidden');
      },
    });

  btnBox.classList.remove('hidden');
  btnNext.classList.add('hidden');
};

stackButtons.forEach(btn =>
  btn.addEventListener('click', function () {
    if (firstQuestion) firstStackSelection(this);
    else secondStackSelection(this);
  })
);

// Restart The game

const restart = function () {
  drawCard();

  updateMessage(startMessage);
  img.src = 'images/deck.webp';
  btnReset.classList.add('hidden');
  btnStart.classList.remove('hidden');
  firstQuestion = true;
  card16Box.innerHTML = '';
  stackContainers.forEach(stack => (stack.innerHTML = ''));
};

btnReset.addEventListener('click', restart);
