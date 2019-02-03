import axios from 'axios';
import settings from './settings';

const deckofcards = axios.create({
  baseURL: 'https://deckofcardsapi.com/api',
});

/**
 * Returns a promise the response data from Getting a New Deck
 */
const newDeck = async () => {
  const requestURL = settings.deckShuffled ? '/deck/new/shuffle/' : '/deck/new/';
  const deckResponse = await deckofcards.get(requestURL, {
    params: { deck_count: settings.deckCount }
  });
  return deckResponse.data;
}

  /**
   * Returns a promise of the response data from Drawing Cards
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

const deckService = {
  deckofcards,
  newDeck,
  drawCards,
  dealCardToPlayer,
};


export default deckService;
export { deckofcards };