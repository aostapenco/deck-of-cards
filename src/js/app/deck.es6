export default class Deck {
  constructor() {
    this.cards = [];
    this.reset();
  }

  build = () => {
    this.cards = [];

    // const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
    // const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

    const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
    const values = ['Ace'];

    for (let suit in suits) {
      for (let value in values) {
        this.cards.push(`${values[value]} of ${suits[suit]}`);
      }
    }
  };

  reset = () => {
    this.build();
    this.shuffle();
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