import React, { Component } from "react";
import deckService from '../api/deckofcards';
import settings from '../api/settings';
import PlayerList from './PlayerList';

class App extends Component {
  /**
   * gameStarted: Show splash screen if game hasn't started, else show gameboard
   * deckID: The unique string used to access our deck from the API
   * deckRemaining: The number of cards remaining according to the API
   * players: A list of names used to track players (or piles) from the API. The first player is the dealer.
   */
  state = {
    gameStarted: false,
    deckID: '',
    deckRemaining: 0,
    players: [],
  };

  /**
   * Returns a list of player objects { name: '', hand: cards[], numCards: int }
   * @param {number} num The number of players in the game, including the dealer. Should be > 0.
   * @returns {object[]}  
   */
  initPlayers(num) {
    const players = [...Array(num)].map((e, i) => {
      const playerObj = { name: `player${i}`, hand: [], numCards: 0 }
      if (i === 0) { playerObj.name = 'dealer' }
      return playerObj;
    })
    return players;
  }

  /**
   * Requests a new deck from the API and initializes the gameboard state
   * Edit ../api/settings.js for API and game settings
   */
  onNewGame = async (event) => {
    const newDeckData = await deckService.newDeck();

    this.setState({ 
      gameStarted: true, 
      deckID: newDeckData['deck_id'], 
      deckRemaining: newDeckData['remaining'],
      players: this.initPlayers(settings.numPlayers),
    });
  }



  /**
   * Deals one face down card to each player.
   */
  onDeal = async (event) => {
    // HELPER: Returns an updated player object after dealing a card to them
    const dealToPlayerAndUpdate = async (player, card) => {
      const dealResponseData = await deckService.dealCardToPlayer(this.state.deckID, player.name, card.code);
      const cardsOnHand = dealResponseData.piles[player.name].remaining;
      return { name: player.name, hand: [...player.hand, card], numCards: cardsOnHand };
    }

    // HELPER: Returns a list of promises for updated player states
    const dealAndUpdatePlayers = () => {
      return this.state.players.map(async (player, idx) => await dealToPlayerAndUpdate(player, cards[idx]));
    }
    // ----- END of Helper Functions -----

    // First, Draw cards and keep a list of cards
    const drawResponseData = await deckService.drawCards(this.state.deckID);
    this.setState({ deckRemaining: drawResponseData.remaining })
    const cards = drawResponseData.cards;

    // Then, Deal cards to each player and update their player objects
    const updatedPlayers = await Promise.all(dealAndUpdatePlayers())
    this.setState({ players: updatedPlayers });
  }

  renderGameboard() {
    if (!this.state.gameStarted) {
      return (
        <div id="gameboard-splash">
          <h1>Card Game</h1>
          <button onClick={this.onNewGame}>Start Game</button>
        </div>
      );
    } else {
      return (
        <div id="gameboard-active">
          <h1>Card Game</h1>
          <button onClick={this.onNewGame}>New Game</button>
          <ul>
            <li><strong>Deck ID:</strong> {this.state.deckID}</li>
            <li><strong>Deck Remaining:</strong> {this.state.deckRemaining}</li>
            <li><strong>Players:</strong> {this.state.players.map(player => player.name).toString()}</li>
          </ul>
          <button onClick={this.onDeal}>Deal</button>
          <PlayerList players={this.state.players} />
        </div>
      );
    }
  }

  render() {
    return (
      <main className="App">{this.renderGameboard()}</main>
    );
  }
}

export default App;
