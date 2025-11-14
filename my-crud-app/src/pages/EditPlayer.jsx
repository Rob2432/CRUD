import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

export default function EditPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const positions = ["GK", "DEF", "MID", "FWD"];
  const allSkills = ["Passing", "Shooting", "Dribbling", "Defense"];

  useEffect(() => {
    const fetchPlayer = async () => {
      const { data, error } = await supabase.from("players").select("*").eq("id", id).single();
      if (error) alert(error.message);
      else setPlayer(data);
      setLoading(false);
    };
    fetchPlayer();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!player) return <p>Player not found.</p>;

  const handleSave = async () => {
    const { error } = await supabase
      .from("players")
      .update({
        name: player.name,
        position: player.position,
        rating: player.rating,
        skills: player.skills,
        avatar_url: player.avatar_url,
      })
      .eq("id", id);

    if (error) alert(error.message);
    else navigate("/summary");
  };

  const handleDelete = async () => {
    const { error } = await supabase.from("players").delete().eq("id", id);
    if (error) alert(error.message);
    else navigate("/summary");
  };

  const toggleSkill = (skill) => {
    setPlayer({
      ...player,
      skills: player.skills.includes(skill)
        ? player.skills.filter(s => s !== skill)
        : [...player.skills, skill],
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Player</h1>
      <label>Name: <input value={player.name} onChange={e => setPlayer({ ...player, name: e.target.value })} /></label>

      <div>
        <p>Position:</p>
        {positions.map(pos => (
          <button
            key={pos}
            type="button"
            onClick={() => setPlayer({ ...player, position: pos })}
            style={{ margin: "5px", backgroundColor: player.position === pos ? "lightgreen" : "white" }}
          >
            {pos}
          </button>
        ))}
      </div>

      <div>
        <label>Rating: {player.rating}</label>
        <input
          type="range"
          min="1"
          max="100"
          value={player.rating}
          onChange={e => setPlayer({ ...player, rating: Number(e.target.value) })}
        />
      </div>

      <div>
        <p>Skills:</p>
        {allSkills.map(skill => (
          <button
            key={skill}
            type="button"
            onClick={() => toggleSkill(skill)}
            style={{ margin: "5px", backgroundColor: player.skills.includes(skill) ? "lightgreen" : "white" }}
          >
            {skill}
          </button>
        ))}
      </div>

      <div>
        <label>Avatar URL: <input value={player.avatar_url} onChange={e => setPlayer({ ...player, avatar_url: e.target.value })} /></label>
      </div>

      <button onClick={handleSave}>Save Changes</button>
      <button onClick={handleDelete} style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}>Delete Player</button>
    </div>
  );
}
