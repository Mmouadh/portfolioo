import React, { useEffect, useState } from "react";
import { Shield, Cpu, Globe, Database } from "lucide-react";

const experienceData = {
  title: "About Me & Experience",
  description:
    "I’ve been passionate about tech since I was 10, teaching myself web development, exploring IT tricks, and solving real problems like fixing broken apps and troubleshooting software errors. Over time, I realized: “Nothing is impossible in IT.”",
  frontend: "Front-End",
  backend: "Back End",
  databases: "Databases",
  education: "Education",
  bachelor: "Bachelor of Computer Science",
  bachelorYears: "(2016–2021)",
  technician: "IT Management Technician",
  technicianYears: "(2022–2024)",
  coursework: "Relevant Coursework",
  courseList:
    "Computer Hardware Management, Web Development, Responsive Web Design, MySQL",
  experience: "Work Experience",
  internship: "Internship at Technopole Borj Cédria",
  internshipYear: "(2023)",
  internshipDesc:
    "Assisted in building front-end interfaces using WordPress, configuring plugins, and providing technical support.",
  SecondIntership: "Internship at Ministry of Equipment and Housing",
  SecondIntershipYear: "(2024)",
  SecondIntershipDesc:
    "Monitored Equipment Inventory Operations.\nMaintained and troubleshooted printers and legacy PCs in the server room.\nDeveloped a web application (HTML, CSS, JavaScript & PHP) for managing equipment.",
  FirstWork: " Web Developer at Clinic",
  FirstWorkYear: "(2025)",
  FirstWorkDesc:
    "Developed and maintained the clinic's website using React and Tailwind.\nEnsured a user-friendly experience and responsive design.",
};

const Divider = () => <div className="h-px w-full bg-white/10" />;

const iconMap = {
  "Stack": <Cpu size={16} />,
  "Frontend & UI": <Database size={16} />,
  "IT & Environment": <Globe size={16} />,
  "Support Tools": <Shield size={16} />,
};

export default function AboutExperience() {
  const [aboutData, setAboutData] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://<your-vercel-backend>.vercel.app";

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/about`)
      .then((res) => res.json())
      .then((data) => setAboutData(data))
      .catch((err) => console.error("Failed to fetch about data:", err));
  }, []);

  if (!aboutData) {
    return (
      <section
        id="about"
        className="section-surface min-h-screen w-full text-white py-24 flex items-center justify-center"
      >
        <div>Loading...</div>
      </section>
    );
  }

  const {
    subheading,
    heading1,
    heading2,
    location,
    bio,
    status,
    specs,
    title,
  } = aboutData;

  const displaySubheading = (subheading || "").replace(/^\s*\d+\s*\/\/\s*/i, "");

  return (
    <section
      id="about"
      className="section-surface min-h-screen w-full text-white py-24"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6 space-y-16">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.32em] text-blue-300">
            About Me &amp; Experience
          </p>
          <div className="h-px w-10 bg-blue-500/50" />
        </div>
        {/* About */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xs font-mono tracking-[0.5em] text-blue-500 uppercase">
                {displaySubheading || subheading}
              </h2>
              <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
                {heading1} <span className="text-white/40 italic">{heading2}</span>
              </h3>
            </div>

            <div className="space-y-6 text-gray-300 font-light leading-relaxed text-lg">
              <p>
                I am a <span className="text-white font-medium">{title}</span> based in{" "}
                {location}.
              </p>
              {bio.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              <p>{experienceData.description}</p>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">
                {status}
              </span>
            </div>
          </div>

          {/* Technical Specs */}
          <div className="relative">
            <div className="relative border border-white/10 bg-white/[0.04] p-8 md:p-12 rounded-sm shadow-2xl">
              <h4 className="text-sm font-bold tracking-widest uppercase mb-10 pb-4 border-b border-white/5">
                Technical
              </h4>

              <div className="space-y-8">
                {specs.map((spec, index) => (
                  <div key={index} className="group flex items-start gap-4">
                    <div className="p-2 rounded bg-white/5 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                      {iconMap[spec.label] || <Database size={16} />}
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">
                        {spec.label}
                      </p>
                      <p className="text-sm md:text-base font-medium text-white/90">
                        {spec.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/60">
              {experienceData.education}
            </p>
            <h3 className="mt-2 text-2xl font-bold">Academic Path</h3>
            <div className="mt-6 space-y-4 text-white/80">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{experienceData.bachelor}</span>
                  <span className="text-xs text-white/50">
                    {experienceData.bachelorYears}
                  </span>
                </div>
              </div>
              <Divider />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{experienceData.technician}</span>
                  <span className="text-xs text-white/50">
                    {experienceData.technicianYears}
                  </span>
                </div>
              </div>
              <Divider />
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                  {experienceData.coursework}
                </p>
                <p className="mt-2 text-sm">{experienceData.courseList}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/60">
              {experienceData.experience}
            </p>
            <h3 className="mt-2 text-2xl font-bold">Recent Roles</h3>

            <div className="mt-6 space-y-5 text-white/80">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{experienceData.internship}</span>
                  <span className="text-xs text-white/50">
                    {experienceData.internshipYear}
                  </span>
                </div>
                <p className="mt-2 text-sm">{experienceData.internshipDesc}</p>
              </div>
              <Divider />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{experienceData.SecondIntership}</span>
                  <span className="text-xs text-white/50">
                    {experienceData.SecondIntershipYear}
                  </span>
                </div>
                <ul className="mt-2 space-y-2 text-sm list-disc list-inside">
                  {experienceData.SecondIntershipDesc.split("\n").map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </div>
              <Divider />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{experienceData.FirstWork.trim()}</span>
                  <span className="text-xs text-white/50">
                    {experienceData.FirstWorkYear}
                  </span>
                </div>
                <ul className="mt-2 space-y-2 text-sm list-disc list-inside">
                  {experienceData.FirstWorkDesc.split("\n").map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
