export default class Deck {
  constructor() {
    this.cards = [];
    this.build();
  }

  build = () => {
    this.cards = [];

    const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
    const values = {1: 'Ace', 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 'Jack', 12: 'Queen', 13: 'King'};

    for (let suit in suits) {
      for (let value in values) {
        this.cards.push({
          name: `${values[value]} of ${suits[suit]}`,
          suit: suits[suit],
          rank: value
        })
      }
    }
  };

  reset = () => {
    this.build();
  };

  /**
   * Use Richard Durstenfeld's algorithm to shuffle
   *
   * @returns {Shuffled Deck}
   */
  shuffle = () => {
    const { cards } = this;
    let m = cards.length, i;

    while (m) {
      i = Math.floor(Math.random() * m--);

      [cards[m], cards[i]] = [cards[i], cards[m]];
    }

    return this;
  };

  dealOneCard = () =>  {
    return this.cards.pop();
  };
}