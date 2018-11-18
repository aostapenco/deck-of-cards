import React, {Component} from "react";

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

 render() {
    let {card} = this.props;

    if (!card) return null;
    else {
      let cardClass = `play-card ${card.suit} rank${card.rank}`;

      return(
        <div className={cardClass}>
          <div className="face"></div>
        </div>
      );
    }
  }
}