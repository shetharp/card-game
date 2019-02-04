import React, { Component } from "react";
import styled from 'styled-components';
import Card from './Card';

// ==================================================
//  STYLED COMPONENTS
// ==================================================
const HandContainer = styled.div`
  display: flex;
  justify-content: center;
  outline: 1px solid mediumaquamarine;
`;

// ==================================================
//  HELPER FUNCTIONS
// ==================================================
/**
 * Returns an array of offset values used for css transfrom: translateX();
 * @param {number} numCards The number of cards in the hand we want to fan 
 */
function getOffsetValues(numCards) {
  let baseOffset = 66;
  if (numCards <= 1) { baseOffset = 0; }
  if (numCards === 2) { baseOffset = 25; }
  if (numCards === 3) { baseOffset = 33; }
  if (numCards === 4) { baseOffset = 50; }
  const baseValues = Array(numCards).fill(baseOffset);
  // const midIdx = Math.floor(baseValues.length / 2);
  // const offsetValues = baseValues.map((base, idx) => {
  //   return base * (midIdx - idx);
  // })
  return baseValues;
}

/**
 * Returns an array of rotation values used for css transfrom: rotate();
 * @param {number} numCards The number of cards in the hand we want to fan 
 */
function getRotateValues(numCards) {
  let baseOffset = 3;
  // if (numCards <= 1) { baseOffset = 0; }
  // if (numCards === 2) { baseOffset = 30; }
  // if (numCards === 3) { baseOffset = 20; }
  // if (numCards === 4) { baseOffset = 10; }
  const baseValues = Array(numCards).fill(baseOffset);
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
    const offsetValues = getOffsetValues(cards.length);
    const rotateValues = getRotateValues(cards.length);
    // console.log(offsetValues);
    console.log(rotateValues);
    return (
      <span>
        <h1>
          <strong>{playerName}:</strong> {cards.length} <br />
          <small><strong>Points:</strong> {this.getPoints()}</small>
        </h1>
        
        <HandContainer>
          {cards.map((card, idx) => {
            const faceUpCards = this.state.faceUpCards
            return (
              <Card 
                key={card.code} 
                isFaceUp={faceUpCards.has(card.code)} 
                onFlipCard={this.handleFlipCard}
                offsetPercent={offsetValues[idx]}
                rotateDegrees={rotateValues[idx]}
                { ...card } 
                />
            );
          })}
        </HandContainer>
      </span>
    );
  }
}

export default Hand;
