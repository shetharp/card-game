import React, { Component } from "react";
import Card from './Card';

class Hand extends Component {
  state = {
    faceUpCards: new Set()
  }

  // Flip the state of the card and add/remove it from the Set of faceUpCards
  handleFlipCard = (e, cardCode) => {
    const newFaceUpCards = new Set(this.state.faceUpCards);
    if (this.state.faceUpCards.has(cardCode)) {
      console.log(`Flipping Card ${cardCode} DOWN.`);
      newFaceUpCards.delete(cardCode);
      this.setState({ faceUpCards: newFaceUpCards });
    }
    else {
      console.log(`Flipping Card ${cardCode} UP.`);
      newFaceUpCards.add(cardCode)
      this.setState({ faceUpCards: newFaceUpCards });
    } 
    console.log(this.state)
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
    const {playerName, cards} = this.props;
    return (
      <span>
        <strong>{playerName}:</strong> {cards.length}
        [ 
          {cards.map(card => {
            const faceUpCards = this.state.faceUpCards
            return <Card key={card.code} isFaceUp={faceUpCards.has(card.code)} onFlipCard={this.handleFlipCard} { ...card } />
          })} 
        ]

        <strong>Points:</strong> {this.getPoints()}
      </span>
    );
  }
}


// class Hand extends Component {
//   state = {
//     playerName: this.props.playerName,
//     cards: this.props.cards,
//     numCards: 0,
//     points: 0
//   };

//   componentDidMount() {
//     this.setState({ numCards: this.getNumCards(), points: this.getPoints() });
//     console.log(this.state);
//   }

//   getNumCards() {
//     return this.state.cards.length;
//   }

//   getPoints() {
//     const sum = this.state.cards.reduce((acc, card) => {
//       return acc + this.getCardPoints(card);
//     }, 0);
//     return sum;
//   }

//   getCardPoints(card) {
//     if (isNaN(card.value)) {
//       if (card.value === "ACE") {
//         return 1;
//       }
//       if (card.value === "JACK" || card.value === "QUEEN" || card.value === "KING") {
//         return 10;
//       }
//       return 0; // Fallback if card value is not a number and not a face card
//     }
//     return +card.value; 
//   }

//   onAddCard(card) {
//     const updatedCards = [...this.state.cards, card];
//     const updatedNumCards = updatedCards.length;
//     const updatedPoints = this.state.points + this.getCardPoints(card);
//     this.setState({ cards: updatedCards, numCards: updatedNumCards, points: updatedPoints });
//   }

//   render() {
//     return (
//       <span>
//         <strong>{this.state.playerName}:</strong>
//         {this.state.numCards} [ {this.state.cards.map(card => card.code).toString()} ]
//         <em> Points: {this.state.points}</em>
//       </span>
//     );
//   }
// }

export default Hand;
