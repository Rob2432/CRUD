import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePlayer({ players, setPlayers }) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const navigate = useNavigate();

  const positions = ["GK", "DEF", "MID", "FWD"];

  function handleSubmit(e) {
    e.preventDefault();

    const newPlayer = {
      id: crypto.randomUUID(),
      name,
      position,
      created_at: new Date().toISOString(),
    };

    setPlayers([...players, newPlayer]);

    navigate("/summary");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create New Player</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Player Name:
          <input
            type="text"
            value={name}
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <div>
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

        <button type="submit">Create Player</button>
      </form>
    </div>
  );
}
