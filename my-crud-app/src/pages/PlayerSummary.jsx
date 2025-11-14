import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../supabaseClient";
import "../index.css";

export default function PlayerSummary() {
  const [players, setPlayers] = useState([]);

  const fetchPlayers = async () => {
    const { data, error } = await supabase.from("players").select("*").order("created_at", { ascending: false });
    if (error) console.error(error.message);
    else setPlayers(data);
  };

  useEffect(() => {
    fetchPlayers();
    const subscription = supabase.from("players").on("*", fetchPlayers).subscribe();
    return () => supabase.removeSubscription(subscription);
  }, []);

  if (!players.length) return <p style={{ padding: "20px" }}>No players yet.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Player Summary</h1>
      {players.map(p => (
        <div key={p.id} className="player-card">
          {p.avatar_url && <img src={p.avatar_url} alt={p.name} />}
          <div>
            <h3>{p.name} <span className={`position-badge position-${p.position}`}>{p.position}</span></h3>
            <p>Rating: {p.rating}</p>
            <p>Skills: {p.skills?.join(", ") || "None"}</p>
            <p>Created: {new Date(p.created_at).toLocaleString()}</p>
            <Link to={`/edit/${p.id}`}><button>Edit</button></Link>
          </div>
        </div>
      ))}
    </div>
  );
}
