import React from "react";
import { useParams } from "react-router-dom";
const socket = require("../connection/socket").socket;

/**
 * 'Join game' is where we actually join the game room.
 */

const JoinGameRoom = (gameid, userName, isCreator) => {
  /**
   * For this browser instance, we want
   * to join it to a gameRoom. For now
   * assume that the game room exists
   * on the backend.
   *
   *
   * TODO: handle the case when the game room doesn't exist.
   */
  const idData = {
    gameId: gameid,
    userName: userName,
    isCreator: isCreator,
  };
  socket.emit("playerJoinGame", idData);
};

const JoinGame = (props) => {
  /**
   * Extract the 'gameId' from the URL.
   * the 'gameId' is the gameRoom ID.
   */
  const { gameid } = useParams();
  JoinGameRoom(gameid, props.userName, props.isCreator);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Welcome to Chess with Friend!</h1>
      <h3 style={{ textAlign: "center" }}>
        Made with ❤️ by{" "}
        <a
          href="https://vimaleshct.github.io/Personal_Portfolio/"
          target="_blank"
        >
          Vimalesh C T
        </a>
        . Follow me on{" "}
        <a href="https://www.instagram.com/pranovvimal_30/" target="_blank">
          Instagram
        </a>
        .
      </h3>
    </div>
  );
};

export default JoinGame;
