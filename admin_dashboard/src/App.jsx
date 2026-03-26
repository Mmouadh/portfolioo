import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AboutAdmin from "./pages/AboutAdmin";
import ProjectsAdmin from "./pages/ProjectsAdmin";
import SkillsAdmin from "./pages/SkillsAdmin";
import CVAdmin from "./pages/CVAdmin";
import TestimonialsAdmin from "./pages/TestimonialsAdmin";
import AdminLayout from "./components/AdminLayout";
import Login from "./components/auth/Login";

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected admin routes */}
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<AboutAdmin />} />
          <Route path="/projects" element={<ProjectsAdmin />} />
          <Route path="/skills" element={<SkillsAdmin />} />
          <Route path="/cv" element={<CVAdmin />} />
          <Route path="/testimonials" element={<TestimonialsAdmin />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
