import React, { Component } from "react";
import deckofcards from '../api/deckofcards';
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
    const requestURL = settings.deckShuffled ? '/deck/new/shuffle/' : '/deck/new/';
    const deckResponse = await deckofcards.get(requestURL, {
      params: { deck_count: settings.deckCount }
    });

    this.setState({ 
      gameStarted: true, 
      deckID: deckResponse.data['deck_id'], 
      deckRemaining: deckResponse.data['remaining'],
      players: this.initPlayers(settings.numPlayers),
    });
    console.log('~~~ NEW GAME STARTED ~~~');
    console.log(this.state);
  }



  /**
   * Deals one face down card to each player.
   */
  onDeal = async (event) => {
    // API: Draw the cards and update the deck state
    const onDraw = async () => {
      const numCardsToDraw = settings.numPlayers;
      const drawURL = `/deck/${this.state.deckID}/draw/`;
      const drawResponse = await deckofcards.get(drawURL, {
        params: { count: numCardsToDraw }
      });
      return drawResponse;
    }

    // API: Add a card to a player's hand and return an updated player state
    const onDealCardToPlayer = async (player, card) => {
      const dealCardToPlayerURL = `/deck/${this.state.deckID}/pile/${player.name}/add/`;
      const dealCardToPlayerResponse = await deckofcards.get(dealCardToPlayerURL, {
        params: { cards: card.code }
      });
      const cardsOnHand = dealCardToPlayerResponse.data.piles[player.name].remaining;
      return { name: player.name, hand: [...player.hand, card], numCards: cardsOnHand };
    }
    // End Helper Functions
    // --------------------------------------------------

    // First, Draw cards and keep a list of cards
    const drawResponse = await onDraw();
    this.setState({ deckRemaining: drawResponse.data.remaining })
    const cards = drawResponse.data.cards;

    // Next, Deal cards to each player with the API
    // Wait until all cards have been dealt, to get a list of updated player objects
    const updatedPlayers = await Promise.all(
      this.state.players.map(async (player, idx) => await onDealCardToPlayer(player, cards[idx]))
    );
    
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
