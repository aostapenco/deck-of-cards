import React, {Component} from "react";
import Deck from "./deck";
import Card from "./card";

export default class PlayTable extends Component {
  constructor(props) {
    super(props);
    this.deck = new Deck();
    this.state = this._getInitialState();
  }

  _getInitialState = () => {
    return {
      card: void 0
    }
  };

  render = () => {
    return (
      <div className="play-table">
        <div className="control-wrapper">
          {(this.deck.cards.length)
            ? [
                <button key="shuffle "className="btn btn-primary shuffle-btn" onClick={this.deck.shuffle}>Shuffle</button>,
                <button key="deal" className="btn btn-primary deal-btn" onClick={this._dealOneCard}>Deal a card</button>
              ]
            : <button className="btn btn-primary reset-btn" onClick={this._reset}>Again</button>
          }
        </div>

        <div className="deck-wrapper">
          {(!this.deck.cards.length) ? null
            : <div className="deck" onClick={this._dealOneCard} title="Click to deal a card">
                <div className="counter">{this.deck.cards.length}</div>
              </div>
          }
        </div>

        <div className="play-card-wrapper">
          <Card card={this.state.card}/>
        </div>
      </div>
    );
  };

  _reset = () => {
    this.deck.reset();
    this.setState(this._getInitialState());
  };

  _dealOneCard = () => {
    let card = this.deck.dealOneCard();
    this.setState({card: card});
  };
}