// src/pages/PlayerSummary.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../supabaseClient";

function PlayerSummary() {
  const [players, setPlayers] = useState([]);

  const fetchPlayers = async () => {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Fetch players failed:", error.message);
    else setPlayers(data);
  };

  useEffect(() => {
    fetchPlayers();

    const subscription = supabase
      .from("players")
      .on("*", () => fetchPlayers())
      .subscribe();

    return () => supabase.removeSubscription(subscription);
  }, []);

  if (!players || players.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Player Summary</h1>
        <p>No players created yet. Go to Create Player to add one.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Player Summary</h1>
      {players.map((player) => (
        <div
          key={player.id}
          style={{ border: "1px solid black", padding: "10px", margin: "10px 0" }}
        >
          <h3>{player.name}</h3>
          <p>Position: {player.position}</p>
          <p>Created: {new Date(player.created_at).toLocaleString()}</p>
          <Link to={`/edit/${player.id}`}>
            <button>Edit</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PlayerSummary;
