import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

export default function CreatePlayer() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [rating, setRating] = useState(50);
  const [skills, setSkills] = useState([]);
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  const positions = ["GK", "DEF", "MID", "FWD"];
  const allSkills = ["Passing", "Shooting", "Dribbling", "Defense"];

  const toggleSkill = (skill) => {
    setSkills(skills.includes(skill) ? skills.filter(s => s !== skill) : [...skills, skill]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !position) return alert("Name and position required");

    const { error } = await supabase
      .from("players")
      .insert([{ name, position, rating, skills, avatar_url: avatar, created_at: new Date().toISOString() }]);

    if (error) alert(error.message);
    else navigate("/summary");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Player</h1>
      <form onSubmit={handleSubmit}>
        <label>Name: <input value={name} onChange={e => setName(e.target.value)} /></label>

        <div>
          <p>Position:</p>
          {positions.map(pos => (
            <button
              type="button"
              key={pos}
              onClick={() => setPosition(pos)}
              style={{ margin: "5px", backgroundColor: position === pos ? "lightgreen" : "white" }}
            >
              {pos}
            </button>
          ))}
        </div>

        <div>
          <label>Rating: {rating}</label>
          <input type="range" min="1" max="100" value={rating} onChange={e => setRating(Number(e.target.value))} />
        </div>

        <div>
          <p>Skills:</p>
          {allSkills.map(skill => (
            <button
              type="button"
              key={skill}
              onClick={() => toggleSkill(skill)}
              style={{ margin: "5px", backgroundColor: skills.includes(skill) ? "lightgreen" : "white" }}
            >
              {skill}
            </button>
          ))}
        </div>

        <div>
          <label>Avatar URL: <input value={avatar} onChange={e => setAvatar(e.target.value)} placeholder="Optional" /></label>
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>Create Player</button>
      </form>
    </div>
  );
}
