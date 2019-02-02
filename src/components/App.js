import React, { Component } from "react";
import deckofcards from '../api/deckofcards';
import settings from '../api/settings';

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
   * Returns a list of player names
   * @param {number} num The number of players in the game, including the dealer. Should be > 0.
   * @returns {string[]}  
   */
  initPlayers(num) {
    const playerNames = [...Array(num)].map((e, i) => {
      if (i === 0) { return 'dealer'; }
      return 'player' + i;
    })
    return playerNames;
  }

  onNewGame = async (event) => {
    const requestURL = settings.deckShuffled ? '/deck/new/shuffle/' : '/deck/new/';
    const deckResponse = await deckofcards.get(requestURL, {
      params: {deck_count: settings.deckCount}
    });

    this.setState({ 
      gameStarted: true, 
      deckID: deckResponse.data['deck_id'], 
      deckRemaining: deckResponse.data['remaining'],
      players: this.initPlayers(settings.numPlayers),
    });
    console.log(this.state);
    console.log("New Game");
  }

  onDeal() {
    return "Deal";
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
        <div id="gameboard-splash">
          <h1>Card Game</h1>
          <button onClick={this.onNewGame}>New Game</button>
          <ul>
            <li><strong>Deck ID:</strong> {this.state.deckID}</li>
            <li><strong>Deck Remaining:</strong> {this.state.deckRemaining}</li>
            <li><strong>Players:</strong> {this.state.players.toString()}</li>
          </ul>
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
