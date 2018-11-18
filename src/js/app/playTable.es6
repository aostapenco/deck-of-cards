import React, {Component} from "react";
import Deck from "./deck";

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

        <div className="play-container">
          {(this.deck.cards.length)
            ? <div className="deck" onClick={this._dealOneCard} title="Click to deal a card">
                <div className="counter">{this.deck.cards.length}</div>
              </div>
            : <button className="btn btn-primary reset-btn" onClick={this._reset}>Again</button>
          }
        </div>

        <div className="play-card-wrapper">
          {this._renderCard()}
        </div>
      </div>
    );
  };

  _renderCard = () => {
    return (
      <div className="play-card">{this.state.card}</div>
    )
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