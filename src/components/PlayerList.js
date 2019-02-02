import React, { Component } from "react";

function PlayerList(props) {
  const players = props.players.map(({ name, hand, numCards }) => {
    return (
      <li key={name}>
        <strong>{name}:</strong> {numCards} [ {hand.map(card => card.code).toString()} ]
      </li>
    );
  });

  return <ul>{players}</ul>;
}

export default PlayerList;
