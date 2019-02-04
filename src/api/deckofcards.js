import axios from 'axios';
import settings from './settings';

const deckofcards = axios.create({
  baseURL: 'https://deckofcardsapi.com/api',
});

/**
 * Returns a promise for new deck data
 */
const getNewDeck = async () => {
  const requestURL = settings.deckShuffled ? '/deck/new/shuffle/' : '/deck/new/';
  const deckResponse = await deckofcards.get(requestURL, {
    params: { deck_count: settings.deckCount }
  });
  return deckResponse.data;
}

/**
 * Returns a promise for the deck data
 * @param {string} deckID A valid deckID that has been used within the past 2 weeks.
 */
const getPrevDeck = async (deckID) => {
  const requestURL = `/deck/${deckID}/`;
  const deckResponse = await deckofcards.get(requestURL);
  return deckResponse.data;
}

/**
 * Returns a promise for the draw cards data
 * @param {string} deckID The current deck ID used as the API token
 */
const drawCards = async (deckID) => {
  const numCardsToDraw = settings.numPlayers;
  const drawURL = `/deck/${deckID}/draw/`;
  const drawResponse = await deckofcards.get(drawURL, {
    params: { count: numCardsToDraw }
  });
  return drawResponse.data;
}

/**
 * Returns a promise for the add card to pile data
 * DOES NOT WORK WITH MULTIPLE DECKS.
 * @param {string} deckID The current deck ID used as the API token
 * @param {string} playerName The player who is being dealt the card
 * @param {string} cardCode The 2 char card code representing the card being dealt
 */
const dealCardToPlayer = async (deckID, playerName, cardCode) => {
  const dealCardToPlayerURL = `/deck/${deckID}/pile/${playerName}/add/`;
  const dealCardToPlayerResponse = await deckofcards.get(dealCardToPlayerURL, {
    params: { cards: cardCode }
  });
  return dealCardToPlayerResponse.data;
}

/**
 * Returns a list of player names
 * DOES NOT WORK WITH MULTIPLE DECKS.
 * @param {string} deckID The current deck ID used as the API token
 * @param {string} playerName The name of a player, ideally the dealer
 */
const getPlayerNames = async (deckID, playerName) => {
  try {
    const getPlayersURL = `/deck/${deckID}/pile/${playerName}/list/`;
    const getPlayersResponse = await deckofcards.get(getPlayersURL);
    return Object.keys(getPlayersResponse.data.piles);
  }
  catch {
    return [];
  }
}


/**
 * Returns a promise for the data associated with the player's hand
 * DOES NOT WORK WITH MULTIPLE DECKS.
 * @param {string} deckID The current deck ID used as the API toekn 
 * @param {string} playerName The player who's hand we are listing out
 */
const getPlayerHand = async (deckID, playerName) => {
  const getPlayerHandURL = `/deck/${deckID}/pile/${playerName}/list/`;
  const getPlayerHandResponse = await deckofcards.get(getPlayerHandURL);
  return getPlayerHandResponse.data.piles[playerName];
}


const deckService = {
  deckofcards,
  getNewDeck,
  getPrevDeck,
  drawCards,
  dealCardToPlayer,
  getPlayerNames,
  getPlayerHand,
};


export default deckService;
export { deckofcards };