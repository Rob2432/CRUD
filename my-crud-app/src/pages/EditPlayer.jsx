// src/pages/EditPlayer.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

function EditPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const positions = ["GK", "DEF", "MID", "FWD"];

  useEffect(() => {
    const fetchPlayer = async () => {
      const { data, error } = await supabase
        .from("players")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Fetch player failed:", error.message);
        alert("Player not found");
      } else setPlayer(data);

      setLoading(false);
    };
    fetchPlayer();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!player) return <p>Player not found.</p>;

  const handleSave = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("players")
      .update({ name: player.name, position: player.position })
      .eq("id", id);

    if (error) {
      console.error("Update failed:", error.message);
      alert("Failed to update player");
    } else {
      navigate("/summary");
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from("players")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete failed:", error.message);
      alert("Failed to delete player");
    } else {
      navigate("/summary");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Player</h1>
      <form onSubmit={handleSave}>
        <label>
          Name:
          <input
            type="text"
            value={player.name}
            onChange={(e) => setPlayer({ ...player, name: e.target.value })}
          />
        </label>

        <div style={{ marginTop: "10px" }}>
          <p>Select Position:</p>
          {positions.map((pos) => (
            <button
              type="button"
              key={pos}
              onClick={() => setPlayer({ ...player, position: pos })}
              style={{
                margin: "5px",
                backgroundColor: player.position === pos ? "lightgreen" : "white",
              }}
            >
              {pos}
            </button>
          ))}
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>Save Changes</button>
        <button
          type="button"
          onClick={handleDelete}
          style={{
            marginTop: "10px",
            marginLeft: "10px",
            backgroundColor: "red",
            color: "white",
          }}
        >
          Delete Player
        </button>
      </form>
    </div>
  );
}

export default EditPlayer;
