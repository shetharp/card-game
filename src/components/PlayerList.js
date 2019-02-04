import React from "react";
import styled from 'styled-components';
import Hand from "./Hand";

// ==================================================
//  HELPER FUNCTIONS
// ==================================================
/**
 * Returns a sorted COPY of playerState objects, sorted by the 'name' property 
 * @param {playerState[]} playerStates A list of player state objects that should be sorted by name
 */
function getSortedPlayerStates(playerStates) {
  const sortedPlayerStates = playerStates.slice();
  sortedPlayerStates.sort((p1Obj, p2Obj) => {
    if (p1Obj.name < p2Obj.name) { return -1; }
    if (p1Obj.name > p2Obj.name) { return 1; }
    return 0;
  });
  return sortedPlayerStates;
}

function PlayerList(props) {
  const sortedPlayerStates = getSortedPlayerStates(props.players);
  const players = sortedPlayerStates.map(({ name, hand, numCards }) => {
    return (
        <Hand key={name} playerName={name} cards={hand} />
    );
  });

  return <div>{players}</div>;
}

export default PlayerList;
