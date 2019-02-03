import React from "react";
import Hand from "./Hand";

function PlayerList(props) {
  const players = props.players.map(({ name, hand, numCards }) => {
    return (
      <li key={name}>
        {/* <Hand playerName={name} cards={hand} /> */}
        <Hand playerName={name} cards={hand} />
      </li>
    );
  });

  return <ul>{players}</ul>;
}

export default PlayerList;
