import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://portfolioo-backend.onrender.com";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("adminToken", res.data.token);
      alert("Logged in!");
      // Use client-side navigation so GitHub Pages (hash router) doesn't 404
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0f172a] to-black text-white px-4">
      
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl">
        
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-8 tracking-widest uppercase text-blue-400">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="flex flex-col">
            <label className="text-xs text-white/60 mb-2 uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-black/40 border border-white/10 p-3 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-white/60 mb-2 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-black/40 border border-white/10 p-3 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-[0.98] font-semibold tracking-wide uppercase transition-all shadow-lg shadow-blue-500/20"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}
