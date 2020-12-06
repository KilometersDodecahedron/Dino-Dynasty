import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Platformer from "./games/PlatformerComponent.js";
import RogueBlitz from "./games/RogueBlitzComponent.js"
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Forget from "./components/Forget";
// import Account from "./components/Account";
import Reset from "./components/Reset";
import Welcome from "./components/Welcome"

function App() {
  return (
    <div className="Dino Dynasty 
    A Race Before Time">
      {/* <Router>
        <div>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/Forget" component={Forget} />
          <Route exact path="/Account" component={Account} />
          <Route exact path="/Reset" component={Reset} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Game" component={Platformer} />
        </div>
      </Router> */}
      <Platformer />
    </div>
  );
}

export default App;
