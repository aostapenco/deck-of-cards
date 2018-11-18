import Deck from "./deck";

it('Deal one card', () => {
  let deck = new Deck();
  let lastCard = deck.cards[deck.cards.length - 1];
  let dealedCard = deck.dealOneCard();

  expect(dealedCard).toEqual(lastCard);
});

it('Shuffle deck', () => {
  let deck = new Deck();
  let lastCard = deck.cards[deck.cards.length - 1];
  deck.shuffle();
  let lastCardAfterShuffle = deck.cards[deck.cards.length - 1];

  expect(lastCardAfterShuffle).not.toEqual(lastCard);
});