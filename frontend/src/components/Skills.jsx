import React, { useEffect, useState } from "react";
import { Sparkles, Layers3 } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://<your-vercel-backend>.vercel.app";

/* ---------------- HELPERS ---------------- */

const normalizeName = (n) =>
  String(n ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");

const isFundamental = (n) =>
  ["html", "html5", "css", "css3", "javascript", "js"].includes(normalizeName(n)) ||
  normalizeName(n).includes("sql");

const isMern = (n) =>
  ["express", "react", "node"].includes(normalizeName(n)) ||
  ["mongodb", "expressjs", "reactjs", "nodejs"].some((k) =>
    normalizeName(n).includes(k)
  );

const isStyling = (n) =>
  ["tailwind", "bootstrap"].some((k) => normalizeName(n).includes(k));

const normalizeLevel = (level) => {
  const raw = String(level ?? "").trim();
  const num = Number(raw);

  if (!isNaN(num) && raw !== "") {
    const v = Math.max(0, Math.min(100, num));
    if (v >= 85) return { label: `${v}%`, tag: "Expert", progress: v };
    if (v >= 65) return { label: `${v}%`, tag: "Advanced", progress: v };
    if (v >= 40) return { label: `${v}%`, tag: "Intermediate", progress: v };
    return { label: `${v}%`, tag: "Beginner", progress: v };
  }

  const l = raw.toLowerCase();
  if (l.includes("expert")) return { label: raw, tag: "Expert", progress: 92 };
  if (l.includes("advanced")) return { label: raw, tag: "Advanced", progress: 76 };
  if (l.includes("beginner")) return { label: raw, tag: "Beginner", progress: 30 };

  return { label: raw || "Intermediate", tag: "Intermediate", progress: 58 };
};

const getBadge = (tag) => {
  switch (tag) {
    case "Expert":
      return "text-emerald-300 border-emerald-400/20 bg-emerald-500/10";
    case "Advanced":
      return "text-blue-300 border-blue-400/20 bg-blue-500/10";
    case "Beginner":
      return "text-amber-300 border-amber-400/20 bg-amber-500/10";
    default:
      return "text-violet-300 border-violet-400/20 bg-violet-500/10";
  }
};

const getTechColor = (name) => {
  const n = normalizeName(name);

  if (n.includes("javascript") || n === "js") return "from-yellow-300 to-yellow-500";
  if (n.includes("html")) return "from-orange-400 to-red-500";
  if (n.includes("css")) return "from-blue-400 to-blue-600";
  if (n.includes("react")) return "from-cyan-300 to-blue-500";
  if (n.includes("node")) return "from-green-400 to-green-600";
  if (n.includes("mongodb")) return "from-green-500 to-emerald-700";
  if (n.includes("tailwind")) return "from-cyan-400 to-sky-500";
  if (n.includes("bootstrap")) return "from-purple-400 to-indigo-600";
  if (n === "c") return "from-gray-300 to-gray-500";
  if (n.includes("csharp")) return "from-purple-500 to-indigo-700";

  return "from-violet-400 to-blue-500";
};

/* ---------------- UI ---------------- */

const SkillRail = ({ skill }) => {
  const level = normalizeLevel(skill.level);
  const color = getTechColor(skill.name);

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 hover:bg-white/[0.07] transition">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
          {skill.icon ? (
            <img src={skill.icon} className="h-8 w-8 object-contain" />
          ) : (
            <Sparkles size={20} className="text-blue-300" />
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-semibold">{skill.name}</h3>
          <p className="text-[11px] text-white/60">{level.label}</p>
        </div>

        <span
          className={`px-2 py-[6px] text-[10px] rounded-full border font-semibold ${getBadge(
            level.tag
          )}`}
        >
          {level.tag}
        </span>
      </div>

      <div className="mt-4">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${color}`}
            style={{ width: `${level.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const Cluster = ({ title, skills }) => (
  <section className="rounded-xl border border-white/10" style={{ background: "rgba(255,255,255,0.04)" , padding: "1rem" }}>
    <h3 className="text-base font-bold">{title}</h3>
    <div className="grid gap-2.5 mt-3 sm:grid-cols-2">
      {skills.map((s) => (
        <SkillRail key={s._id} skill={s} />
      ))}
    </div>
  </section>
);

const TextPanel = () => (
  <div className="rounded-xl border border-white/12" style={{ background: "linear-gradient(135deg, rgba(46,64,82,0.9), rgba(165,201,202,0.18))", padding: "1rem" }}>
    <div className="flex items-center gap-2 text-blue-300 text-[10px] uppercase tracking-widest">
      <Layers3 size={12} />
      Skills Index
    </div>

    <h2 className="mt-3 text-2xl font-black">
      Technical Capabilities
    </h2>

    <p className="mt-2 text-white/60 text-xs">
      A curated stack of technologies I rely on to build fast, scalable, and maintainable applications. Each skill represents hands-on experience, not just familiarity.
    </p>
  </div>
);

/* ---------------- MAIN ---------------- */

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/skills`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((d) => {
        setSkills(d);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, []);

  const fundamentals = skills.filter((s) => isFundamental(s.name));
  const mern = skills.filter((s) => !isFundamental(s.name) && !isStyling(s.name) && isMern(s.name));
  const styling = skills.filter((s) => !isFundamental(s.name) && isStyling(s.name));

  const other = skills.filter(
    (s) => !isFundamental(s.name) && !isStyling(s.name) && !isMern(s.name)
  );

  const nonCSkills = other;
  return (
    <section id="skills" className="section-surface py-12 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6 relative z-10">
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.32em] text-blue-300">
            Skills &amp; Stack
          </p>
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Tech I build with
          </h2>
          <p className="text-white/60 text-sm md:text-base">
            A quick overview of the tools and languages I rely on day to day.
          </p>
        </div>

        {status === "loading" && <p>Loading...</p>}
        {status === "error" && <p>Error loading skills</p>}

        {status === "success" && (
          <>
            {/* FUNDAMENTALS */}
            {fundamentals.length > 0 && (
              <Cluster title="Core Fundamentals" skills={fundamentals} />
            )}

            {/* STYLING + INFO PANEL */}
            {styling.length > 0 ? (
              <div className="grid lg:grid-cols-2 gap-4">
                <Cluster title="Styling Systems" skills={styling} />
                <TextPanel />
              </div>
            ) : (
              <TextPanel />
            )}

            {/* MERN */}
            {mern.length > 0 && (
              <Cluster title="MERN Stack" skills={mern} />
            )}

            {/* ✅ FINAL FALLBACK: ENSURE NOTHING IS LOST */}
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
              {nonCSkills.map((s) => (
                <SkillRail key={s._id} skill={s} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
