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
   * prevDeckID: The deckID from the last game played, retrieved from local storage
   */
  state = {
    gameStarted: false,
    deckID: '',
    deckRemaining: 0,
    players: [],
    prevDeckID: '',
  };

  componentWillMount() {
    const prevDeckID = localStorage.getItem('deckID');
    if (prevDeckID !== null) {
      console.log(prevDeckID);
      this.setState({ prevDeckID: prevDeckID });
    }
  }

  /**
   * Requests a new deck from the API and initializes the gameboard state
   * Edit ../api/settings.js for API and game settings
   */
  onNewGame = async (event) => {
    const newDeckData = await deckService.getNewDeck();

    this.setState({ 
      gameStarted: true, 
      deckID: newDeckData['deck_id'], 
      deckRemaining: newDeckData['remaining'],
      players: this.initPlayers(settings.numPlayers),
    });

    localStorage.setItem('deckID', newDeckData['deck_id']);
  }

  onResumeGame = async(event) => {
    if (this.state.prevDeckID) {
      try {
        const prevDeckData = await deckService.getPrevDeck(this.state.prevDeckID);
        console.log('prevDeckData:', prevDeckData);
        const prevPlayerStates = await this.getPlayerStates(this.state.prevDeckID);
        console.log('prevPlayers:', prevPlayerStates);

        this.setState({
          gameStarted: true,
          deckID: prevDeckData['deck_id'],
          deckRemaining: prevDeckData['remaining'],
          players: this.initPlayers(settings.numPlayers),
        })
      }
      catch {
        localStorage.removeItem('deckID');
        alert('Unable to resume previous game.');
      }
    } 
  }

  /**
   * Returns a list of player objects { name: '', hand: cards[], numCards: int }
   * @param {number} num The number of players in the game, including the dealer. Should be > 0.
   * @returns {object[]}  
   */
  initPlayers(num) {
    const players = [...Array(num)].map((e, i) => {
      const playerObj = { name: `player${i}`, hand: [], numCards: 0 }
      if (i === 0) { playerObj.name = settings.firstPlayerName }
      return playerObj;
    })
    return players;
  }

  getPlayerStates = async (deckID) => {
    const playerNames = await deckService.getPlayerNames(deckID, settings.firstPlayerName);
    return playerNames; 
  }

  /**
   * Deals one face down card to each player.
   */
  onDeal = async () => {
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


  // Resumes a previous game if its data is stored in localStorage
  renderResumeGame() {
    if (this.state.prevDeckID) {
      return <button onClick={this.onResumeGame}>Resume Game</button>
    }
  }

  renderGameboard() {
    if (!this.state.gameStarted) {
      return (
        <div id="gameboard-splash">
          <h1>Card Game</h1>
          <button onClick={this.onNewGame}>Start Game</button>
          {this.renderResumeGame()}
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
