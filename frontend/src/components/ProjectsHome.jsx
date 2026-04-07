import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://<your-vercel-backend>.vercel.app";
const MAX_FEATURED = 3;

const formatDate = (date) => {
  try {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  } catch (err) {
    return "Recently";
  }
};

export default function ProjectsHome() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let isMounted = true;

    fetch(`${BACKEND_URL}/api/projects`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to load projects");
        }
        return response.json();
      })
      .then((data) => {
        if (!isMounted) return;

        const safeData = Array.isArray(data) ? data : [];

        if (safeData.length === 0) {
          setStatus("empty");
          return;
        }

        const sorted = [...safeData].sort((a, b) =>
          new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );

        setProjects(sorted);
        setStatus("success");
      })
      .catch((error) => {
        console.error("Failed to fetch projects:", error);
        if (isMounted) setStatus("error");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredProjects = useMemo(
    () => projects.slice(0, MAX_FEATURED),
    [projects]
  );

  return (
    <section
      id="projects"
      className="section-surface py-24 text-white"
    >
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0,rgba(56,189,248,0.3),transparent_40%)]" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-blue-300">
              <Sparkles size={14} /> Latest Builds
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
              Featured Projects
            </h2>
            <p className="mt-3 max-w-2xl text-white/60">
              Pulled from the same data powering the projects page — here&apos;s a quick peek at a few highlights. Jump in to see the full writeups and stack details.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] transition duration-200 hover:-translate-y-0.5 hover:border-blue-400/60 hover:bg-blue-500/20"
          >
            View More
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {status === "loading" &&
            Array.from({ length: MAX_FEATURED }).map((_, idx) => (
              <div
                key={idx}
                className="h-full rounded-2xl border border-white/5 bg-white/[0.04] p-6 animate-pulse"
              >
                <div className="h-3 w-24 rounded bg-white/10" />
                <div className="mt-4 h-6 w-3/4 rounded bg-white/10" />
                <div className="mt-3 h-4 w-full rounded bg-white/5" />
                <div className="mt-2 h-4 w-2/3 rounded bg-white/5" />
                <div className="mt-6 h-10 w-28 rounded bg-white/10" />
              </div>
            ))}

          {status === "error" && (
            <p className="text-red-400">Error loading projects. Please try again.</p>
          )}

          {status === "empty" && (
            <p className="text-white/60">No projects found.</p>
          )}

          {status === "success" &&
            featuredProjects.map((project) => (
              <article
                key={project._id || project.title}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 shadow-2xl shadow-black/40 transition duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-blue-500/10"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.35),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.25),transparent_30%)]" />
                </div>

                <div className="relative z-10 flex h-full flex-col gap-4">
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/60">
                    <span className="flex items-center gap-1 text-blue-300">
                      <Sparkles size={14} /> Fresh Drop
                    </span>
                    <span className="h-px flex-1 bg-white/10" />
                    <time dateTime={project.createdAt || ""}>
                      {formatDate(project.createdAt)}
                    </time>
                  </div>

                  <h3 className="text-2xl font-bold leading-tight">{project.title}</h3>
                  <p className="text-sm text-white/70 line-clamp-3">
                    {project.description || "A quick look at this build."}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {(project.tags || []).slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                    <Link
                      to="/projects"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition group-hover:text-white"
                    >
                      View full details
                      <ArrowUpRight size={16} />
                    </Link>
                    <span className="text-xs text-white/50">
                      {(project.tags || []).slice(0, 1).join(" ") || "MERN"}
                    </span>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
