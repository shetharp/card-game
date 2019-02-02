const settings = {
    // The number of decks to start the game with. Each deck has 52 cards.
    // NOTE: The deckofcardsapi.com requires only 1 deck in order to use piles.
    // Since we make use of piles in the API, keep deckCount: 1
    deckCount: 1,

    // Should the game start with a shuffled deck?
    // Default is true.
    deckShuffled: true,

    // Number of total players (including the dealer). There will always be one dealer.
    // Default is 2.
    numPlayers: 2,
}

export default settings;