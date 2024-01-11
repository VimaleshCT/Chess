import React from "react";
import { Navigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const socket = require("../connection/socket").socket;

/**
 * Onboard is where we create the game room.
 */

class CreateNewGame extends React.Component {
  state = {
    didGetUserName: false,
    inputText: "",
    gameId: "",
  };

  constructor(props) {
    super(props);
    this.textArea = React.createRef();
  }

  send = () => {
    /**
     * This method should create a new room in the '/' namespace
     * with a unique identifier.
     */
    const newGameRoomId = uuidv4();

    // set the state of this component with the gameId so that we can
    //Navigate the user to that URL later.
    this.setState({
      gameId: newGameRoomId,
    });

    // emit an event to the server to create a new room
    socket.emit("createNewGame", newGameRoomId);
  };

  typingUserName = () => {
    // grab the input text from the field from the DOM
    const typedText = this.textArea.current.value;

    // set the state with that text
    this.setState({
      inputText: typedText,
    });
  };

  render() {
    //Navigate if the user has entered their username and gameId is set
    if (this.state.didGetUserName) {
      return <Navigate to={"/game/" + this.state.gameId} />;
    }

    return (
      <div>
        <h1
          style={{
            textAlign: "center",
            marginTop: String(window.innerHeight / 3) + "px",
          }}
        >
          Your Username:
        </h1>

        <input
          style={{
            marginLeft: String(window.innerWidth / 2 - 120) + "px",
            width: "240px",
            marginTop: "62px",
          }}
          ref={this.textArea}
          onInput={this.typingUserName}
        ></input>

        <button
          className="btn btn-primary"
          style={{
            marginLeft: String(window.innerWidth / 2 - 60) + "px",
            width: "120px",
            marginTop: "62px",
          }}
          disabled={!(this.state.inputText.length > 0)}
          onClick={() => {
            // When the 'Submit' button gets pressed from the username screen,
            // We should send a request to the server to create a new room with
            // the uuid we generate here.
            this.props.didRedirect();
            this.props.setUserName(this.state.inputText);
            this.setState({
              didGetUserName: true,
            });
            this.send();
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}

const Onboard = (props) => {
  return (
    <CreateNewGame
      didRedirect={props.didRedirect}
      setUserName={props.setUserName}
    />
  );
};

export default Onboard;
