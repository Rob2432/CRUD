import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePlayer from "./pages/CreatePlayer";
import PlayerSummary from "./pages/PlayerSummary";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ padding: "20px" }}>
              <h1>Fantasy Soccer Team Builder</h1>
              <p>
                Use <strong>/create</strong> to add a player.<br />
                Use <strong>/summary</strong> to view all players.
              </p>
            </div>
          }
        />
        <Route path="/create" element={<CreatePlayer />} />
        <Route path="/summary" element={<PlayerSummary />} />
      </Routes>
    </Router>
  );
}

export default App;
