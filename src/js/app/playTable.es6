import React, {Component} from "react";
import Deck from "./deck";
import Card from "./card";

export default class PlayTable extends Component {
  constructor(props) {
    super(props);
    this.deck = new Deck();
    this.state = this._getInitialState();
    this.shuffleTimeout = 800;
  }

  _getInitialState = () => {
    return {
      card: void 0,
      isShuffling: false
    }
  };

  render = () => {
    const {card, isShuffling} = this.state;
    let deckClass = "deck";

    if (isShuffling) {
      deckClass += " shuffling";
    }

    return (
      <div className="play-table">
        <div className="control-wrapper">
          {(this.deck.cards.length)
            ? [
                <button key="shuffle" className="btn btn-primary shuffle-btn" onClick={this._shuffle}>Shuffle</button>,
                <button key="deal" className="btn btn-primary deal-btn" onClick={this._dealOneCard}>Deal a card</button>
              ]
            : <button className="btn btn-primary reset-btn" onClick={this._reset}>Again</button>
          }
        </div>

        <div className="deck-wrapper">
          {(!this.deck.cards.length) ? null
            : <div className={deckClass} onClick={this._dealOneCard} title="Click to deal a card"></div>
          }
        </div>

        <div className="play-card-wrapper">
          <Card card={card}/>
        </div>

        <div className="screen-overlay">Screen is too small</div>
      </div>
    );
  };

  _reset = () => {
    this.deck.build();
    this.setState(this._getInitialState());
  };

  _shuffle = () => {
    this.deck.shuffle();
    this.setState({isShuffling: true});

    // Return state back
    setTimeout(() => {
      this.setState({isShuffling: false});
    }, this.shuffleTimeout);
  };

  _dealOneCard = () => {
    let card = this.deck.dealOneCard();
    this.setState({card: card});
  };
}