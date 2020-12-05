import React from "react";
import Platformer from "./games/PlatformerComponent.js";
import RogueBlitz from "./games/RogueBlitzComponent.js"
import Header from "./components/Header";
import Footer from "./components/Footer"

function App() {
  return (
    <div className="Dino Dynasty 
    A Race Before Time">
      <Header />
      <Platformer />
      <Footer />
    </div>
  );
}

export default App;
