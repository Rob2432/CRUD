import { Link } from "react-router-dom";

export default function PlayerSummary({ players }) {
  const sortedPlayers = [...players].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Players</h1>

      {sortedPlayers.map((player) => (
        <div key={player.id} style={{ border: "1px solid black", padding: "10px", margin: "10px 0" }}>
          <h3>{player.name}</h3>
          <p>Position: {player.position}</p>
          <p>Created: {new Date(player.created_at).toLocaleString()}</p>

          {/* EDIT BUTTON */}
          <Link to={`/edit/${player.id}`}>
            <button>Edit</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
