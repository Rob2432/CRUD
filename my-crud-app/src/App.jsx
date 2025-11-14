import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePlayer from "./pages/CreatePlayer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create" element={<CreatePlayer />} />
      </Routes>
    </Router>
  );
}

export default App;

