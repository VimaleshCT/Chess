import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import JoinRoom from "./onboard/joinroom";
import { ColorContext } from "./context/colorcontext";
import Onboard from "./onboard/onboard";
import JoinGame from "./onboard/joingame";
import ChessGame from "./game/UI/chessgame";

function App() {
  const [didRedirect, setDidRedirect] = React.useState(false);
  const [userName, setUserName] = React.useState("");

  const playerDidRedirect = React.useCallback(() => {
    setDidRedirect(true);
  }, []);

  const playerDidNotRedirect = React.useCallback(() => {
    setDidRedirect(false);
  }, []);

  return (
    <ColorContext.Provider
      value={{
        didRedirect: didRedirect,
        playerDidRedirect: playerDidRedirect,
        playerDidNotRedirect: playerDidNotRedirect,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" exact>
            <Onboard setUserName={setUserName} />
          </Route>
          <Route path="/game/:gameid" exact>
            {didRedirect ? (
              <>
                <JoinGame userName={userName} isCreator={true} />
                <ChessGame myUserName={userName} />
              </>
            ) : (
              <JoinRoom />
            )}
          </Route>
          {/* Redirect to the home page if no route matches */}
          <Navigate to="/" />
        </Routes>
      </Router>
    </ColorContext.Provider>
  );
}

export default App;
