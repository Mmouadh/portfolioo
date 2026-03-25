import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import CVPage from "./components/CVPage";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import AnalyticsBeacon from "./components/AnalyticsBeacon";
import ProjectsPage from "./components/ProjectsPage";
import ExperiencePage from "./components/ExperiencePage";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cv" element={<CVPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AnalyticsBeacon />
      <BackToTop />
      <Footer />
    </>
  );
}

export default App;
