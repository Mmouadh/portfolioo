import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles/layout.css";

function AdminLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // --- AUTH CHECK ---
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/login"); // redirect to login if no token
    }
  }, [navigate]);

  const handleLinkClick = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <div className="admin-layout">
      {/* Hamburger button */}
      <button className="hamburger-btn" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <h2>Admin</h2>
        <Link to="/" onClick={handleLinkClick}>Dashboard</Link>
        <Link to="/projects" onClick={handleLinkClick}>Projects</Link>
        <Link to="/skills" onClick={handleLinkClick}>Skills</Link>
        <Link to="/about" onClick={handleLinkClick}>About</Link>
        <Link to="/cv" onClick={handleLinkClick}>CV</Link>
        <Link to="/testimonials" onClick={handleLinkClick}>Testimonials</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}

      {/* Main content */}
      <div className="content"><Outlet /></div>
    </div>
  );
}

export default AdminLayout;
