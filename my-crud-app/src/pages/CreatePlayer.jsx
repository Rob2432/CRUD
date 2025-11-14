import { useState } from "react";

export default function CreatePlayer() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");

  // Positions = clickable attributes
  const positions = ["GK", "DEF", "MID", "FWD"];

  function handleSubmit(e) {
    e.preventDefault();

    const newPlayer = {
      name,
      position,
    };

    console.log("New player created:", newPlayer);
    // Later you'll send this to Supabase
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create New Player</h1>

      <form onSubmit={handleSubmit}>
        
        {/* Name input */}
        <label>
          Player Name:
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ display: "block", margin: "10px 0" }}
          />
        </label>

        {/* Clickable position buttons */}
        <div>
          <p>Select Position:</p>
          {positions.map((pos) => (
            <button
              type="button"
              key={pos}
              onClick={() => setPosition(pos)}
              style={{
                margin: "5px",
                padding: "10px",
                backgroundColor: position === pos ? "lightgreen" : "white",
                border: "1px solid black",
                cursor: "pointer",
              }}
            >
              {pos}
            </button>
          ))}
        </div>

        <button type="submit" style={{ marginTop: "20px" }}>
          Create Player
        </button>
      </form>
    </div>
  );
}
