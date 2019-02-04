import React, { Component } from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';
import cardBg from '../images/card-bg.svg';
// Card background image: https://www.heropatterns.com/

// ==================================================
//  STYLED COMPONENTS
// ==================================================

const CardContainer = styled.div`
  color: ${props => theme[props.suitColor]};
  background-color: #08AEEA;
  background-image: url(${cardBg}), linear-gradient(30deg, #08AEEA 0%, #2AF598 100%);
  background-position: center center, auto auto;
  ${props => props.isFaceUp &&
    `background-color: white;
    background-image: linear-gradient(30deg, rgba(245,245,245,1) 0%, rgba(255,255,255,1) 100%);
    `
  }
  border-radius: 16px;
  box-shadow: 0px 0px 4px rgba(0,0,0,0.2), -2px 0px 8px rgba(0,0,0,0.2);
  width: 160px;
  height: 240px;
  cursor: pointer;
  user-select: none;

  margin-right: calc(${props => props.offsetPercent / -100} * 160px);
  /* transform: translateX(${props => props.offsetPercent}%) rotate(${props=> props.rotateDegrees}deg); */
  transform: rotate(${props=> props.rotateDegrees}deg);
  transform-origin: ${props => props.rotateDegrees < 0 ? `bottom right` : `bottom left`};
  transition: margin 0.3s ease, transform 0.3s ease;

  i {
    font-style: normal;
  }
`;

const CardFront = styled.div`
  opacity: ${props => props.isFaceUp ? 1 : 0};
  position: relative;
  width: 100%;
  height: 100%;
`;

const StyledCardCenter = styled.div`
  font-size: 6.4rem;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCardCorners = styled.div`
  font-size: 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
  padding: 16px;
  position: absolute;
  ${props => props.isRotated ? 
    `bottom: 0;
    right: 0;
    transform: rotate(180deg);`
    :
    `top: 0;
    left: 0;`
  }

`;

// ==================================================
//  HELPER FUNCTIONS
// ==================================================
function getValueSymbol(value) {
  if (!isNaN(value)) { return ''+value; }
  if (value === 'ACE') { return 'A'; }
  if (value === 'JACK') { return 'J'; }
  if (value === 'QUEEN') { return 'Q'; }
  if (value === 'KING') {return 'K'; }
  return 'E';
}

function getSuitSymbol(suit) {
  if (suit === 'SPADES') { return '♠'; }
  if (suit === 'CLUBS') { return '♣'; }
  if (suit === 'HEARTS') { return '♥'; }
  if (suit === 'DIAMONDS') { return '♦'; }
  return '️E';
}

function getSuitColor(suit) {
  return (suit === 'HEARTS' || suit === 'DIAMONDS') ? 'red' : 'black';
}

// ==================================================
//  HELPER COMPONENTS
// ==================================================
function CardCorner(props) {
  const { suit, value, isRotated } = props;
  return (
    <StyledCardCorners isRotated={isRotated}>
      <i>{getValueSymbol(value)}</i>
      <i>{getSuitSymbol(suit)}</i>
    </StyledCardCorners>
  );
}

function CardCenter(props) {
  const { suit } = props;
  return (
    <StyledCardCenter>
      <i>{getSuitSymbol(suit)}</i>
    </StyledCardCenter>
  )
}

// ==================================================
//  MAIN COMPONENT
// ==================================================
class Card extends Component {
  // Hand component manages the flipping state of cards
  // Hand component passes isFaceUp as a prop to Card
  handleClick = (e) => {
    this.props.onFlipCard(e, this.props.code);
  }

  render() {
    const { isFaceUp, value, suit, offsetPercent, rotateDegrees } = this.props;
    const suitColor = getSuitColor(suit);
    return (
      <CardContainer 
        onClick={this.handleClick}
        isFaceUp={isFaceUp}
        suitColor={suitColor}
        offsetPercent={offsetPercent}
        rotateDegrees={rotateDegrees}
      >
        <CardFront isFaceUp={isFaceUp}>
          <CardCenter suit={suit} />
          <CardCorner suit={suit} value={value} />
          <CardCorner suit={suit} value={value} isRotated />
        </CardFront>
      </CardContainer>
    );
  }
}

Card.defaultProps = {
  offsetPercent: 0,
  rotateDegrees: 0
}

export default Card;