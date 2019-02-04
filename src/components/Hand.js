import React, { Component } from "react";
import styled from 'styled-components';
import Card from './Card';

// ==================================================
//  STYLED COMPONENTS
// ==================================================
const HandContainer = styled.section`
  padding: 1.6rem;
`;

const HandHeader = styled.header`
  padding: 4rem 0 2.4rem 0;
`;

const StyledName = styled.h1`
  text-transform: uppercase;
  margin: 0;
`;

const StyledInfo = styled.h2`
  font-weight: normal;
  display: inline-block;
  background: ${props => props.priority ? `rgba(0,0,0,0.3)` : `rgba(0,0,0,0.1)`};
  border-radius: 1.6rem;
  padding: 0.8rem 2.4rem;
  margin: 0.8rem;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100%;
  min-height: 240px;
`;

// ==================================================
//  HELPER FUNCTIONS
// ==================================================
/**
 * Returns overlap value used for css
 * @param {number} numCards The number of cards in the hand we want to fan 
 */
function getOverlapValues(numCards) {
  if (numCards < 2) { return 0; }
  if (numCards < 4) { return 15; }
  if (numCards < 6) { return 25; }
  if (numCards < 10) { return 30; }
  if (numCards < 20) { return 33; }
  return 36;
}

/**
 * Returns an array of rotation values used for css transfrom: rotate()
 * @param {number} numCards The number of cards in the hand we want to fan 
 */
function getRotateValues(numCards) {
  const calcBaseRotation = () => {
    if (numCards < 2) { return 0; }
    if (numCards < 8) { return 3; }
    if (numCards < 12) { return 2; }
    if (numCards < 22) { return 1; }
    return 0;
  }
  const baseRotation = calcBaseRotation();
  const baseValues = Array(numCards).fill(baseRotation);
  const midIdx = Math.floor(baseValues.length / 2);
  const rotateValues = baseValues.map((base, idx) => {
    return base * (idx - midIdx);
  })
  return rotateValues;
}

class Hand extends Component {
  /**
   * faceUpCards: the set of cards that are face up and should be used to calculate points
   */
  state = {
    faceUpCards: new Set()
  }

  // Flip the state of the card and add/remove it from the Set of faceUpCards
  handleFlipCard = (e, cardCode) => {
    const newFaceUpCards = new Set(this.state.faceUpCards);
    if (this.state.faceUpCards.has(cardCode)) {
      newFaceUpCards.delete(cardCode);
      this.setState({ faceUpCards: newFaceUpCards });
    }
    else {
      newFaceUpCards.add(cardCode)
      this.setState({ faceUpCards: newFaceUpCards });
    } 
  }

  // Returns the sum of only the face up cards on hand
  getPoints() {
    const sum = this.props.cards.reduce((acc, card) => {
      return this.state.faceUpCards.has(card.code) ? acc + this.getCardPoints(card) : acc;
    }, 0);
    return sum;
  }

  // Returns the point value of a card
  // Ace is 1 pt, Face cards are 10 pts, Cards 2-10 are worth those points respectively 
  getCardPoints(card) {
    if (!isNaN(card.value)) {
      return +card.value;
    }
    if (card.value === "ACE") {
      return 1;
    }
    if (card.value === "JACK" || card.value === "QUEEN" || card.value === "KING") {
      return 10;
    }
    return 0; 
  }

  render() {
    const {playerName, cards } = this.props;
    const overlapPercent = getOverlapValues(cards.length);
    const rotateValues = getRotateValues(cards.length);
    return (
      <HandContainer>
        <HandHeader>
          <StyledName>{playerName}</StyledName>
          <StyledInfo priority>{this.getPoints()} <small>Points</small></StyledInfo>
          <StyledInfo>{cards.length} <small>Cards</small></StyledInfo>
        </HandHeader>
        
        <CardsContainer>
          {cards.map((card, idx) => {
            const faceUpCards = this.state.faceUpCards
            return (
              <Card 
                key={card.code} 
                isFaceUp={faceUpCards.has(card.code)} 
                onFlipCard={this.handleFlipCard}
                overlapPercent={overlapPercent}
                rotateDegrees={rotateValues[idx]}
                { ...card } 
                />
            );
          })}
        </CardsContainer>
      </HandContainer>
    );
  }
}

export default Hand;
