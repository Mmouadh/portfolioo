import React from "react";

const data = {
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
  courseList: "Computer Hardware Management, Web Development, Responsive Web Design, MySQL",
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

export default function Experience({ compact = false }) {
  return (
    <section
      id="experience"
      className="section-surface text-white py-24"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6 space-y-12">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.32em] text-blue-300">
            Experience
          </p>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            {data.title}
          </h2>
          <p className="max-w-3xl text-white/70 leading-relaxed">
            {data.description}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Education */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/60">
              {data.education}
            </p>
            <h3 className="mt-2 text-2xl font-bold">Academic Path</h3>
            <div className="mt-6 space-y-4 text-white/80">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{data.bachelor}</span>
                  <span className="text-xs text-white/50">{data.bachelorYears}</span>
                </div>
              </div>
              <Divider />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{data.technician}</span>
                  <span className="text-xs text-white/50">{data.technicianYears}</span>
                </div>
              </div>
              <Divider />
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                  {data.coursework}
                </p>
                <p className="mt-2 text-sm">
                  {data.courseList}
                </p>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/60">
              {data.experience}
            </p>
            <h3 className="mt-2 text-2xl font-bold">Recent Roles</h3>

            <div className="mt-6 space-y-5 text-white/80">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{data.internship}</span>
                  <span className="text-xs text-white/50">{data.internshipYear}</span>
                </div>
                <p className="mt-2 text-sm">{data.internshipDesc}</p>
              </div>
              <Divider />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{data.SecondIntership}</span>
                  <span className="text-xs text-white/50">{data.SecondIntershipYear}</span>
                </div>
                <ul className="mt-2 space-y-2 text-sm list-disc list-inside">
                  {data.SecondIntershipDesc.split("\n").map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </div>
              <Divider />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{data.FirstWork.trim()}</span>
                  <span className="text-xs text-white/50">{data.FirstWorkYear}</span>
                </div>
                <ul className="mt-2 space-y-2 text-sm list-disc list-inside">
                  {data.FirstWorkDesc.split("\n").map((line, idx) => (
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
