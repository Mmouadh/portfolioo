import { useEffect, useState } from "react";
import axios from "axios";

const barColor = "#3b82f6";

export default function AnalyticsPreview() {
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "https://portfolioo-backend.onrender.com";
  const token = localStorage.getItem("adminToken");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/analytics/summary?days=14`,
          config
        );
        setData(data);
      } catch (err) {
        if (err?.response?.status === 401) {
          setMessage("Unauthorized. Please log in again.");
          localStorage.removeItem("adminToken");
          window.location.href = "/login";
        } else {
          setMessage("Failed to load analytics");
        }
      }
    };
    load();
  }, []);

  if (message) return <p style={{ color: "crimson" }}>{message}</p>;
  if (!data) return <p>Loading analytics...</p>;

  const maxCount = Math.max(1, ...data.perDay.map((d) => d.count));
  const perMonth = data.perMonth || [];
  const perYear = data.perYear || [];
  const topBrowsers = data.topBrowsers || [];
  const topUsers = data.topUsers || [];
  const topIps = data.topIps || [];

  return (
    <div style={{
      border: "1px solid #222",
      padding: 16,
      borderRadius: 12,
      background: "#0f1117",
      color: "#e5e7eb"
    }}>
      <h3 style={{ marginBottom: 8 }}>Last 14 days</h3>
      <p style={{ margin: 0, color: "#9ca3af" }}>Total page views: {data.total}</p>

      <div style={{ display: "flex", gap: 8, alignItems: "flex-end", marginTop: 14 }}>
        {data.perDay.map((d) => (
          <div key={d.date} style={{ textAlign: "center", width: 26 }}>
            <div
              style={{
                height: `${(d.count / maxCount) * 90 || 4}px`,
                background: barColor,
                borderRadius: 6,
                transition: "height 200ms ease",
              }}
              title={`${d.date}: ${d.count}`}
            />
            <small style={{ color: "#6b7280", fontSize: 10 }}>
              {d.date.slice(5)}
            </small>
          </div>
        ))}
      </div>

      <h4 style={{ marginTop: 16, marginBottom: 8 }}>Top paths</h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#d1d5db", fontSize: 14 }}>
        {data.topPaths.map((p) => (
          <li key={p.path} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span>{p.path}</span>
            <span style={{ color: "#9ca3af" }}>{p.count}</span>
          </li>
        ))}
        {data.topPaths.length === 0 && <li style={{ color: "#6b7280" }}>No data yet</li>}
      </ul>

      <h4 style={{ marginTop: 16, marginBottom: 8 }}>Top browsers</h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#d1d5db", fontSize: 14 }}>
        {topBrowsers.map((b) => (
          <li key={b.browser} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span>{b.browser || "Unknown"}</span>
            <span style={{ color: "#9ca3af" }}>{b.count}</span>
          </li>
        ))}
        {topBrowsers.length === 0 && <li style={{ color: "#6b7280" }}>No browser data yet</li>}
      </ul>

      <h4 style={{ marginTop: 16, marginBottom: 8 }}>Top visitors</h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#d1d5db", fontSize: 14 }}>
        {topUsers.map((u) => (
          <li key={u.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span>{u.label}</span>
            <span style={{ color: "#9ca3af" }}>{u.count}</span>
          </li>
        ))}
        {topUsers.length === 0 && <li style={{ color: "#6b7280" }}>No visitor data yet</li>}
      </ul>

      <h4 style={{ marginTop: 16, marginBottom: 8 }}>Top IPs (dev/testing)</h4>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", fontSize: 12, color: "#d1d5db", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #222" }}>
              <th style={{ textAlign: "left", padding: "6px 4px" }}>IP</th>
              <th style={{ textAlign: "left", padding: "6px 4px" }}>City</th>
              <th style={{ textAlign: "left", padding: "6px 4px" }}>Country</th>
              <th style={{ textAlign: "right", padding: "6px 4px" }}>Hits</th>
              <th style={{ textAlign: "right", padding: "6px 4px" }}>Last</th>
            </tr>
          </thead>
          <tbody>
            {topIps.map((ip) => (
              <tr key={ip.ip} style={{ borderBottom: "1px solid #111" }}>
                <td style={{ padding: "6px 4px" }}>{ip.ip || "Unknown"}</td>
                <td style={{ padding: "6px 4px" }}>{ip.city || "Unknown"}</td>
                <td style={{ padding: "6px 4px" }}>{ip.country || "Unknown"}</td>
                <td style={{ padding: "6px 4px", textAlign: "right" }}>{ip.count}</td>
                <td style={{ padding: "6px 4px", textAlign: "right", color: "#9ca3af" }}>
                  {ip.lastVisit ? new Date(ip.lastVisit).toLocaleDateString() : ""}
                </td>
              </tr>
            ))}
            {topIps.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: "6px 4px", color: "#6b7280" }}>
                  No IP data yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h4 style={{ marginTop: 16, marginBottom: 8 }}>Monthly</h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#d1d5db", fontSize: 14 }}>
        {perMonth.map((m) => (
          <li key={m.month} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span>{m.month}</span>
            <span style={{ color: "#9ca3af" }}>{m.count}</span>
          </li>
        ))}
        {perMonth.length === 0 && <li style={{ color: "#6b7280" }}>No monthly data</li>}
      </ul>

      <h4 style={{ marginTop: 16, marginBottom: 8 }}>Yearly</h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#d1d5db", fontSize: 14 }}>
        {perYear.map((y) => (
          <li key={y.year} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span>{y.year}</span>
            <span style={{ color: "#9ca3af" }}>{y.count}</span>
          </li>
        ))}
        {perYear.length === 0 && <li style={{ color: "#6b7280" }}>No yearly data</li>}
      </ul>
    </div>
  );
}
