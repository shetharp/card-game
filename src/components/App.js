import React, { Component } from "react";
import styled, { css } from 'styled-components';
import deckService from '../api/deckofcards';
import settings from '../api/settings';
import theme from '../styles/theme';
import PlayerList from './PlayerList';

// ==================================================
//  STYLED COMPONENTS
// ==================================================
const AppContainer = styled.div`
  text-align: center;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledLogo = styled.h1`
  font-size: 4.8rem;
  margin: 0;
`;

const StyledHeader = styled.header`
  text-align: center;
  padding: 4rem;
`;

const StyledFooter = styled.footer`
  text-align: center;
  padding: 4rem;
  opacity: 0.5;
`;

const Gameboard = styled.div`

`;

const Button = styled.button`
  font-family: inherit;
  font-weight: inherit;
  font-size: 2.4rem;
  color: mediumseagreen;
  height: 8rem;
  width: 24rem;
  margin: 0.8rem;
  background: white;
  border: none;
  border-radius: 8rem;
  outline: none;
  box-shadow: 0 2px 2px rgba(0,0,0,0.2), 0 4px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  :hover {
    color: seagreen;
    box-shadow: 0 2px 2px rgba(0,0,0,0.2), 0 4px 4px rgba(0,0,0,0.4);
  }
`;

// ==================================================
//  HELPER COMPONENTS
// ==================================================
function Logo(props) {
  return (
    <StyledLogo>
      <span role="img" aria-label="Playing Card">🃏</span> Card Game<br/>
    </StyledLogo>
  );
}

function Header(props) {
  return (
    <StyledHeader>
      <Logo />
    </StyledHeader>
  )
}

function Footer(props) {
  return (
    <StyledFooter>
      By <a href="https://arpitsheth.com/" target="_blank" rel="noopener noreferrer">Arpit Sheth</a>
    </StyledFooter>
  )
}

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
      players: this.initPlayerStates(settings.numPlayers),
    });

    localStorage.setItem('deckID', newDeckData['deck_id']);
  }

  onResumeGame = async(event) => {
    if (this.state.prevDeckID) {
      try {
        const prevDeckData = await deckService.getPrevDeck(this.state.prevDeckID);
        const prevPlayerStates = await this.getPlayerStates(this.state.prevDeckID);
        const playerStates = (prevPlayerStates.length === 0) ? this.initPlayerStates(settings.numPlayers) : prevPlayerStates;
        this.setState({
          gameStarted: true,
          deckID: prevDeckData['deck_id'],
          deckRemaining: prevDeckData['remaining'],
          players: playerStates,
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
  initPlayerStates(num) {
    const playerStates = [...Array(num)].map((e, i) => {
      const playerObj = { name: `player${i}`, hand: [], numCards: 0 }
      if (i === 0) { playerObj.name = settings.firstPlayerName }
      return playerObj;
    })
    return playerStates;
  }

  getPlayerStates = async (deckID) => {
    const playerNames = await deckService.getPlayerNames(deckID, settings.firstPlayerName);
    const playerStates = playerNames.map(async playerName => {
      const playerHand = await deckService.getPlayerHand(deckID, playerName);
      return { name: playerName, hand: playerHand.cards, numCards: playerHand.remaining }
    });
    return Promise.all(playerStates); 
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
      return <Button onClick={this.onResumeGame}>Resume Game</Button>
    }
  }

  renderGameboard() {
    if (!this.state.gameStarted) {
      return (
        <Gameboard id="gameboard-splash">
          <div>
            <Button onClick={this.onNewGame}>Start Game</Button>
            {this.renderResumeGame()}
          </div>
        </Gameboard>
      );
    } else {
      return (
        <Gameboard id="gameboard-active">
          <div id="sidebar">
            <Button onClick={this.onNewGame}>New Game</Button>
            <ul>
              <li><strong>Deck ID:</strong> {this.state.deckID}</li>
              <li><strong>Deck Remaining:</strong> {this.state.deckRemaining}</li>
              <li><strong>Players:</strong> {this.state.players.map(player => player.name).toString()}</li>
            </ul>
            <Button onClick={this.onDeal}>Deal</Button>
          </div>
          <PlayerList players={this.state.players} />
        </Gameboard>
      );
    }
  }

  render() {
    return (
      <main className="App">
        <AppContainer>
          <Header />
          {this.renderGameboard()}
          <Footer />
        </AppContainer>
      </main>
    );
  }
}

export default App;
