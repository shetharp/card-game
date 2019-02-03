import React, { Component } from 'react';

class Card extends Component {
  state = { isFaceUp: false }

  handleClick = (e) => {
    // console.log(`Card [${this.props.code}] was clicked.`);
    this.props.onFlipCard(e, this.props.code);
  }

  render() {
    return (
      <span 
        // onClick={e => this.setState({ isFaceUp: !this.state.isFaceUp })}
        onClick={this.handleClick}
        style={{ color: this.props.isFaceUp ? 'mediumseagreen' : 'gray' }}
      >
        {this.props.code}, &nbsp;
      </span>
    );
  }
}

export default Card;