import React, { Component } from 'react';
import styled from 'styled-components';

const StyledCard = styled.span`
  color: ${props => props.isFaceUp ? 'orange' : 'steelblue'};
  font-weight: bold;
`;

class Card extends Component {
  state = { isFaceUp: false }

  handleClick = (e) => {
    // console.log(`Card [${this.props.code}] was clicked.`);
    this.props.onFlipCard(e, this.props.code);
  }

  render() {
    const { isFaceUp } = this.props; 
    return (
      <StyledCard 
        onClick={this.handleClick}
        isFaceUp={isFaceUp}
      >
        {this.props.code},&nbsp;
      </StyledCard>
    );
  }
}

export default Card;