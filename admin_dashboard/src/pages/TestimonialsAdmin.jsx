import { useEffect, useState } from "react";
import axios from "axios";

export default function TestimonialsAdmin() {
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "https://<your-vercel-backend>.vercel.app";
  const token = localStorage.getItem("adminToken");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const [items, setItems] = useState([]);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [message, setMessage] = useState("");

  const fetchAll = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/testimonials/all?status=${statusFilter}`,
        config
      );
      setItems(data);
    } catch (err) {
      setMessage("Failed to load testimonials");
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${BACKEND_URL}/api/testimonials/${id}/status`, { status }, config);
      fetchAll();
    } catch {
      setMessage("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/testimonials/${id}`, config);
      setItems(items.filter((i) => i._id !== id));
    } catch {
      setMessage("Delete failed");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <h2>Testimonials</h2>
      <div style={{ display: "flex", gap: 10, margin: "10px 0" }}>
        <button onClick={() => setStatusFilter("pending")}>Pending</button>
        <button onClick={() => setStatusFilter("approved")}>Approved</button>
        <button onClick={() => setStatusFilter("")}>All</button>
      </div>

      {message && <p style={{ color: "crimson" }}>{message}</p>}

      {items.length === 0 ? (
        <p>No testimonials</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
          {items.map((t) => (
            <li key={t._id} style={{ border: "1px solid #ccc", borderRadius: 8, padding: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{t.name}</strong>
                <span>{t.age ? `${t.age} yrs` : ""}</span>
              </div>
              <div style={{ color: "#666" }}>{t.city}</div>
              <p style={{ marginTop: 6 }}>{t.message}</p>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                {t.status !== "approved" && (
                  <button onClick={() => updateStatus(t._id, "approved")}>Approve</button>
                )}
                {t.status !== "denied" && (
                  <button onClick={() => updateStatus(t._id, "denied")}>Deny</button>
                )}
                <button onClick={() => handleDelete(t._id)} style={{ color: "red" }}>
                  Delete
                </button>
              </div>
              <small>Status: {t.status}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
