import { useState, useEffect } from "react";

function SkillsAdmin() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ name: "", level: 50, iconFile: null, iconUrl: "" });
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setStatus("loading");
      const token = localStorage.getItem("adminToken");
      const base =
        import.meta.env.VITE_BACKEND_URL || "https://portfolioo-backend.onrender.com";
      const res = await fetch(`${base}/api/skills`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to fetch skills");
      const data = await res.json();
      setSkills(data);
      setStatus("idle");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "iconFile") {
      setForm((prev) => ({ ...prev, iconFile: files[0] }));
    } else {
      setForm((prev) => {
        const updated = { ...prev, [name]: value };
        if (name === "name") {
          // Try to auto-assign icon from devicon.dev
          let slug = value.trim().toLowerCase().replace(/[ .]/g, "");
          if (slug === "html") slug = "html5";
          if (slug === "css") slug = "css3";
          if (slug === "tailwind") slug = "tailwindcss";
          updated.iconUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-original.svg`;
        }
        return updated;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus("loading");

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("level", form.level);
      if (form.iconFile) {
        formData.append("iconFile", form.iconFile);
      } else if (form.iconUrl) {
        formData.append("icon", form.iconUrl);
      }

      const token = localStorage.getItem("adminToken");
      const res = await fetch(
        editingId
          ? `${base}/api/skills/${editingId}`
          : `${base}/api/skills`,
        {
          method: editingId ? "PUT" : "POST",
          body: formData,
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (!res.ok) throw new Error("Failed to save skill");
      setForm({ name: "", level: 50, iconFile: null, iconUrl: "" });
      setEditingId(null);
      fetchSkills();
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const handleEdit = (skill) => {
    setForm({ name: skill.name, level: skill.level, iconFile: null, iconUrl: skill.icon || "" });
    setEditingId(skill._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      setStatus("loading");
      const token = localStorage.getItem("adminToken");
      const base =
        import.meta.env.VITE_BACKEND_URL || "https://portfolioo-backend.onrender.com";
      const res = await fetch(`${base}/api/skills/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete skill");
      fetchSkills();
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="skills-admin-layout">
      {/* Skill List */}
      <div className="skills-list-container">
        <h2>Skills</h2>
        {skills.length === 0 && <p>No skills yet.</p>}
        <div className="skills-grid">
          {skills.map((skill) => (
            <div key={skill._id} className="skill-card">
              {skill.icon && (
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="skill-card-icon"
                />
              )}
              <strong>{skill.name}</strong>
              <span className="skill-card-level">Level: {skill.level}</span>
              <div className="skill-card-actions">
                <button className="btn btn-secondary" onClick={() => handleEdit(skill)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(skill._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="skills-form-container">
        <h2>{editingId ? "Edit Skill" : "Add Skill"}</h2>
        {status === "loading" && <p>Loading...</p>}
        {status === "success" && <p style={{ color: "lightgreen" }}>Action successful!</p>}
        {status === "error" && <p style={{ color: "crimson" }}>An error occurred.</p>}

        {/* Icon Preview */}
        {(form.iconFile || form.iconUrl) && (
          <div className="icon-preview-container">
            <img
              src={form.iconFile ? URL.createObjectURL(form.iconFile) : form.iconUrl}
              alt="Icon Preview"
              className="icon-preview"
              onError={(e) => (e.target.style.display = "none")}
              onLoad={(e) => (e.target.style.display = "block")}
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="page-form">
          <div className="form-row">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Skill name"
              required
              style={{ flex: 2 }}
            />
            <input
              name="level"
              type="number"
              min="0"
              max="100"
              value={form.level}
              onChange={handleChange}
              style={{ flex: 1 }}
            />
          </div>

          <label className="file-input-label">
            Upload Icon (Overrides auto-detect)
            <input type="file" name="iconFile" onChange={handleChange} accept="image/*" />
          </label>

          <button type="submit">
            {editingId ? "Update Skill" : "Add Skill"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SkillsAdmin;
