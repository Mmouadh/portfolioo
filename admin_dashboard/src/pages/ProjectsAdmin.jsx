import { useEffect, useState, useMemo } from "react";
import axios from "axios";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://<your-vercel-backend>.vercel.app";

const toImageUrl = (p) => {
  if (!p) return "";
  const clean = p.replace(/\\/g, "/");
  if (/^https?:\/\//i.test(clean)) return clean;
  return `${BACKEND_URL}/${clean.replace(/^\//, "")}`;
};

const emptyForm = () => ({
  title: "",
  description: "",
  link: "",
  githubLink: "",
  liveDemo: "",
  tags: "",
  technologies: "",
  createdAt: new Date().toISOString().slice(0, 16),
});

function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm());
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
    Object.entries(form).forEach(([key, value]) => {
      if (value !== undefined && value !== null) fd.append(key, value);
    });
    if (imageFile) fd.append("image", imageFile);

    try {
      if (editingId) {
        const { data } = await axios.put(
          `${BACKEND_URL}/api/projects/${editingId}`,
          fd,
          config
        );
        setProjects((prev) => prev.map((p) => (p._id === editingId ? data : p)));
        setMessage("Project updated!");
        setEditingId(null);
      } else {
        const { data } = await axios.post(`${BACKEND_URL}/api/projects`, fd, config);
        setProjects((prev) => [...prev, data]);
        setMessage("Project added!");
      }

      setForm(emptyForm());
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
      createdAt: project.createdAt
        ? new Date(project.createdAt).toISOString().slice(0, 16)
        : new Date().toISOString().slice(0, 16),
    });
    setEditingId(project._id);
    setImageFile(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/projects/${id}`, config);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      setMessage("Project deleted!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete project");
    }
  };

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)),
    [projects]
  );

  const at = form.createdAt;

  return (
    <div className="page-shell text-white" style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-blue-400">Control Room</p>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-sm text-white/60 mt-1">Create, edit, and reorder your case studies.</p>
        </div>
        {message && (
          <span className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/80">
            {message}
          </span>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm uppercase tracking-[0.25em] text-blue-300">
              {editingId ? "Edit Project" : "New Project"}
            </h3>
            {editingId && (
              <button
                type="button"
                className="text-xs text-white/60 hover:text-white"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm());
                  setImageFile(null);
                }}
              >
                Reset
              </button>
            )}
          </div>

          <input
            name="title"
            placeholder="Project Title"
            value={form.title}
            onChange={handleChange}
            required
            className="input"
          />

          <textarea
            name="description"
            placeholder="Short description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            required
            className="input"
          />

          <div className="grid gap-3 md:grid-cols-2">
            <input
              name="link"
              placeholder="Primary link (live/demo)"
              value={form.link}
              onChange={handleChange}
              className="input"
            />
            <input
              name="githubLink"
              placeholder="GitHub link"
              value={form.githubLink}
              onChange={handleChange}
              className="input"
            />
            <input
              name="liveDemo"
              placeholder="Secondary link"
              value={form.liveDemo}
              onChange={handleChange}
              className="input"
            />
            <input
              type="datetime-local"
              name="createdAt"
              value={at}
              onChange={handleChange}
              className="input"
              title="Publish date/time"
            />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <input
              name="tags"
              placeholder="Tags (comma separated)"
              value={form.tags}
              onChange={handleChange}
              className="input"
            />
            <input
              name="technologies"
              placeholder="Technologies (comma separated)"
              value={form.technologies}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-white/50">Hero image</label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="input"
              />
              {editingId && (
                <span className="text-[11px] text-white/50">Leave empty to keep current</span>
              )}
              {imageFile && (
                <span className="text-[11px] text-white/70">{imageFile.name}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? "Saving..." : editingId ? "Update Project" : "Add Project"}
          </button>
        </form>

        {/* List */}
        <div className="space-y-3">
          {sortedProjects.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/70">
              No projects yet.
            </div>
          ) : (
            sortedProjects.map((project) => {
              const primary = project.link || project.liveDemo || project.githubLink;
              return (
                <div
                  key={project._id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 flex gap-4 items-center shadow-md"
                >
                  <div className="w-28 h-20 rounded-lg overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                    {project.image ? (
                      <img
                        src={toImageUrl(project.image)}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/30 text-xs">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-semibold">{project.title}</h4>
                      <span className="text-[11px] text-white/50">
                        {project.createdAt ? new Date(project.createdAt).toLocaleString() : ""}
                      </span>
                    </div>
                    <p className="text-sm text-white/70 leading-snug">{project.description}</p>
                    <div className="flex flex-wrap gap-2 text-[11px]">
                      {(project.tags || []).map((tag) => (
                        <span key={tag} className="px-2 py-1 rounded-full bg-white/10 border border-white/15">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2 text-xs text-blue-200">
                      {primary && (
                        <a href={primary} target="_blank" rel="noreferrer" className="hover:text-white">
                          View
                        </a>
                      )}
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noreferrer" className="hover:text-white">
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button className="btn-ghost" onClick={() => handleEdit(project)}>
                      Edit
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(project._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectsAdmin;
