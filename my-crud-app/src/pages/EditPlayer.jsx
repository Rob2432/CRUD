// src/pages/EditPlayer.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

const EditPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [player, setPlayer] = useState(null);

  // Fetch player by ID
  useEffect(() => {
    const fetchPlayer = async () => {
      const { data, error } = await supabase
        .from("players")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error(error);
      else setPlayer(data);
    };

    fetchPlayer();
  }, [id]);

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("players")
      .update({
        name: player.name,
        position: player.position,
      })
      .eq("id", id);

    if (error) console.error(error);
    else navigate("/summary");
  };

  // Handle delete player
  const handleDelete = async () => {
    const { error } = await supabase
      .from("players")
      .delete()
      .eq("id", id);

    if (error) console.error(error);
    else navigate("/summary");
  };

  if (!player) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Player</h1>

      <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
        <label>Player Name</label>
        <input
          type="text"
          value={player.name}
          onChange={(e) => setPlayer({ ...player, name: e.target.value })}
        />

        <label>Position</label>
        <select
          value={player.position}
          onChange={(e) => setPlayer({ ...player, position: e.target.value })}
        >
          <option value="Goalkeeper">Goalkeeper</option>
          <option value="Defender">Defender</option>
          <option value="Midfielder">Midfielder</option>
          <option value="Forward">Forward</option>
        </select>

        <button type="submit" style={{ marginTop: "10px" }}>
          Save Changes
        </button>

        <button
          type="button"
          onClick={handleDelete}
          style={{ marginTop: "10px", backgroundColor: "red", color: "white" }}
        >
          Delete Player
        </button>
      </form>
    </div>
  );
};

export default EditPlayer;
