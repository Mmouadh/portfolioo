import React, { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://portfolioo-backend.onrender.com";

const resolveImage = (image) => {
  if (!image) return null;
  if (image.startsWith("http")) return image;
  const clean = image.replace(/\\/g, "/").replace(/^\//, "");
  return `${BACKEND_URL}/${clean}`;
};

export default function ProjectsPage() {
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

        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
          setStatus("success");
        } else {
          setStatus("empty");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch projects:", error);
        if (isMounted) setStatus("error");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const rows = useMemo(() => projects, [projects]);

  return (
    <main className="page-shell section-surface min-h-screen text-white pt-28 pb-16 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10">
        <div className="mb-12 space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-blue-300">
            Project Archive
          </p>
          <h1 className="text-5xl font-black leading-none tracking-tight md:text-6xl">
            Builds & Case Studies
          </h1>
          <p className="max-w-3xl text-white/60">
            Every row pairs a quick synopsis with its hero image. Rows alternate
            left/right to keep the flow lively. Click through to the live link when
            available.
          </p>
        </div>

        {status === "loading" && (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 md:grid-cols-2 animate-pulse"
              >
                <div className="h-6 w-2/3 rounded bg-white/10" />
                <div className="h-48 w-full rounded bg-white/10" />
              </div>
            ))}
          </div>
        )}

        {status === "error" && (
          <p className="text-red-400">Error loading projects.</p>
        )}

        {status === "empty" && (
          <p className="text-white/60">No projects found.</p>
        )}

        {status === "success" && (
          <div className="space-y-14">
            {rows.map((project, idx) => {
              const imageUrl = resolveImage(project.image);
              const reversed = idx % 2 === 1;
              const primaryLink =
                project.link || project.liveDemo || project.githubLink;

              return (
                <div
                  key={project._id || project.title}
                  className="grid items-center gap-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] lg:grid-cols-2"
                >
                  <div className={reversed ? "lg:order-2" : "lg:order-1"}>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-blue-300">
                      {project.tags?.[0] || "Project"}
                    </p>
                    <h2 className="mt-2 text-3xl font-bold">{project.title}</h2>
                    <p className="mt-3 text-white/70 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {(project.tags || []).slice(0, 6).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {primaryLink && (
                      <a
                        href={primaryLink}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex items-center gap-2 rounded-full border border-blue-400/50 bg-blue-500/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-200 transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-white"
                      >
                        View Project
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>

                  <div className={reversed ? "lg:order-1" : "lg:order-2"}>
                    {imageUrl ? (
                      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-inner">
                        <img
                          src={imageUrl}
                          alt={project.title}
                          className="h-full w-full object-cover transition duration-500 hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="flex h-full min-h-[260px] items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5 text-white/40">
                        Image coming soon
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
