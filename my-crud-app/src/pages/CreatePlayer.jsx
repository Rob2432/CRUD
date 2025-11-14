// src/pages/CreatePlayer.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

function CreatePlayer() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const navigate = useNavigate();
  const positions = ["GK", "DEF", "MID", "FWD"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !position) {
      alert("Please enter a name and select a position!");
      return;
    }

    const { data, error } = await supabase
      .from("players")
      .insert([{ name, position, created_at: new Date().toISOString() }]);

    if (error) {
      console.error("Insert failed:", error.message);
      alert("Failed to create player.");
    } else {
      navigate("/summary");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Player</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Player Name"
          />
        </label>

        <div style={{ marginTop: "10px" }}>
          <p>Select Position:</p>
          {positions.map((pos) => (
            <button
              type="button"
              key={pos}
              onClick={() => setPosition(pos)}
              style={{
                margin: "5px",
                backgroundColor: position === pos ? "lightgreen" : "white",
              }}
            >
              {pos}
            </button>
          ))}
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>Create Player</button>
      </form>
    </div>
  );
}

export default CreatePlayer;
