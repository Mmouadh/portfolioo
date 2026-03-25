import { Link } from "react-router-dom";
import AnalyticsPreview from "./partials/AnalyticsPreview";

function Dashboard() {
  return (
    <>
      <h1>Portfolio <span style={{ color: "crimson" }}>Admin Panel</span></h1>
      <p style={{color: 'var(--text-muted)', maxWidth: '60ch', fontSize: '1.1em'}}>
        Welcome! Use the sidebar to navigate and manage the different sections of your portfolio website.
      </p>
      <Link to="/projects">
        <button className="dashboard-cta-btn">Manage Projects</button>
      </Link>
      <div style={{ marginTop: 30 }}>
        <AnalyticsPreview />
      </div>
    </>
  );
}

export default Dashboard;
