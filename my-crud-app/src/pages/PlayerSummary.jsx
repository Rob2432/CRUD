import { useState } from "react";

export default function PlayerSummary() {
  // Temporary dummy players to test the page.
  // Later this will come from Supabase.
  const [players] = useState([
    { id: 1, name: "Player One", position: "FWD", created_at: "2025-01-01T12:00:00Z" },
    { id: 2, name: "Player Two", position: "MID", created_at: "2025-01-02T15:00:00Z" },
    { id: 3, name: "Player Three", position: "GK", created_at: "2025-01-05T10:00:00Z" },
  ]);

  // Sort players by newest first
  const sortedPlayers = [...players].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Created Players</h1>

      {sortedPlayers.map((player) => (
        <div
          key={player.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <h3>{player.name}</h3>
          <p>Position: {player.position}</p>
          <p>Created: {new Date(player.created_at).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
