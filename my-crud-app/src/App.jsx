// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import CreatePlayer from "./pages/CreatePlayer";
import PlayerSummary from "./pages/PlayerSummary";
import EditPlayer from "./pages/EditPlayer";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", borderBottom: "1px solid gray" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        <Link to="/create" style={{ marginRight: "10px" }}>Create Player</Link>
        <Link to="/summary">Summary</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div style={{ padding: "20px" }}>
              <h1>Fantasy Soccer Team Builder</h1>
              <p>Use the navbar to create and view players.</p>
            </div>
          }
        />
        <Route path="/create" element={<CreatePlayer />} />
        <Route path="/summary" element={<PlayerSummary />} />
        <Route path="/edit/:id" element={<EditPlayer />} />
      </Routes>
    </Router>
  );
}

export default App;
