// const drawCard = async function () {
//   try {
//     const response = await fetch(
//       'https://deckofcardsapi.com/api/deck/new/draw/?count=16'
//     );
//     if (!response.ok) throw new Error();
//     const data = await response.json();
//     document.body.innerHTML = `<img src="${data.cards[0].image}" alt=""></img>`;

//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };
// drawCard();
