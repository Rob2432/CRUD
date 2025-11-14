// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import CreatePlayer from "./pages/CreatePlayer";
import PlayerSummary from "./pages/PlayerSummary";
import EditPlayer from "./pages/EditPlayer";

function App() {
  const [players, setPlayers] = useState([]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ padding: "20px" }}>
              <h1>Fantasy Soccer Team Builder</h1>
              <p>Use /create, /summary, or /edit/:id</p>
            </div>
          }
        />
        <Route
          path="/create"
          element={<CreatePlayer players={players} setPlayers={setPlayers} />}
        />
        <Route
          path="/summary"
          element={<PlayerSummary players={players} />}
        />
        <Route
          path="/edit/:id"
          element={<EditPlayer players={players} setPlayers={setPlayers} />}
        />

      </Routes>
    </Router>
  );
}

export default App;
