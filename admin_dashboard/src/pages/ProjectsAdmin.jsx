import { useEffect, useState } from "react";
import axios from "axios";

const cleanPath = (p) => (p ? p.replace(/\\/g, "/") : "");

function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    githubLink: "",
    liveDemo: "",
    tags: "",
    technologies: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const token = localStorage.getItem("adminToken");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/projects`);
      setProjects(data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => fd.append(key, value));
    if (imageFile) fd.append("image", imageFile);

    try {
      if (editingId) {
        const { data } = await axios.put(
          `${BACKEND_URL}/api/projects/${editingId}`,
          fd,
          config
        );
        setProjects(projects.map((p) => (p._id === editingId ? data : p)));
        setMessage("Project updated!");
        setEditingId(null);
      } else {
        const { data } = await axios.post(`${BACKEND_URL}/api/projects`, fd, config);
        setProjects([...projects, data]);
        setMessage("Project added!");
      }

      setForm({
        title: "",
        description: "",
        link: "",
        githubLink: "",
        liveDemo: "",
        tags: "",
        technologies: "",
      });
      setImageFile(null);
    } catch (err) {
      console.error(err);
      setMessage("Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title || "",
      description: project.description || "",
      link: project.link || "",
      githubLink: project.githubLink || "",
      liveDemo: project.liveDemo || "",
      tags: (project.tags || []).join(", "),
      technologies: (project.technologies || []).join(", "),
    });
    setEditingId(project._id);
    setImageFile(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/projects/${id}`, config);
      setProjects(projects.filter((p) => p._id !== id));
      setMessage("Project deleted!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete project");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <h2>Manage Projects</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
          <input
            name="link"
            placeholder="Main Link (demo or live)"
            value={form.link}
            onChange={handleChange}
          />
          <input
            name="githubLink"
            placeholder="GitHub Link"
            value={form.githubLink}
            onChange={handleChange}
          />
          <input
            name="liveDemo"
            placeholder="Secondary Link (optional)"
            value={form.liveDemo}
            onChange={handleChange}
          />
          <input
            name="tags"
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={handleChange}
          />
          <input
            name="technologies"
            placeholder="Technologies (comma separated)"
            value={form.technologies}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
          {editingId && (
            <small style={{ color: "#888" }}>
              Leave empty to keep current image
            </small>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : editingId ? "Update Project" : "Add Project"}
        </button>
      </form>

      {message && <p style={{ color: "crimson", marginTop: 10 }}>{message}</p>}

      <hr style={{ margin: "20px 0" }} />

      <h3>Existing Projects</h3>
      {projects.length === 0 ? (
        <p>No projects added yet.</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project._id} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                {project.image && (
                  <img
                    src={`${BACKEND_URL}/${cleanPath(project.image)}`}
                    alt={project.title}
                    style={{ width: 96, height: 64, objectFit: "cover", borderRadius: 6 }}
                  />
                )}
                <div>
                  <strong>{project.title}</strong> - {project.description}{" "}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer">
                      Link
                    </a>
                  )}
                  {project.tags?.length ? (
                    <div style={{ fontSize: 12, color: "#666" }}>
                      Tags: {project.tags.join(", ")}
                    </div>
                  ) : null}
                </div>
              </div>
              <div style={{ marginTop: 5 }}>
                <button onClick={() => handleEdit(project)}>Edit</button>
                <button
                  onClick={() => handleDelete(project._id)}
                  style={{ marginLeft: 5, color: "red" }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProjectsAdmin;
