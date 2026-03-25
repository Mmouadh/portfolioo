import React from "react";
import { LogoLoop } from "./LogoLoop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiHtml5,
  SiBootstrap,
  SiNodedotjs,
  SiMongodb,
  SiJavascript,
  SiExpress,
  SiNpm,
  SiMysql,
  SiVite,
  SiReactrouter,
} from "react-icons/si";
import { FaCode, FaDatabase, FaCss3Alt } from "react-icons/fa";

const techLogos = [
  { node: <SiHtml5 />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML", color: "#e34f26" },
  { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", color: "#f7df1e" },
  { node: <FaCss3Alt />, title: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS", color: "#1572b6" },
  { node: <SiBootstrap />, title: "Bootstrap", href: "https://getbootstrap.com/", color: "#7952b3" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org/", color: "#3178c6" },
  { node: <SiReact />, title: "React", href: "https://react.dev/", color: "#61dafb" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org/", color: "#ffffff" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com/", color: "#38bdf8" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org/", color: "#5fa04e" },
  { node: <SiExpress />, title: "Express", href: "https://expressjs.com/", color: "#ffffff" },
  { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com/", color: "#4faa41" },
  { node: <SiNpm />, title: "NPM", href: "https://www.npmjs.com/", color: "#cb0000" },
  { node: <SiMysql />, title: "MySQL", href: "https://www.mysql.com/", color: "#005e86" },
  { node: <SiVite />, title: "Vite", href: "https://vitejs.dev/", color: "#646cff" },
  { node: <SiReactrouter />, title: "React Router", href: "https://reactrouter.com/", color: "#f44250" },
  { node: <FaCode />, title: "Code", color: "#9ca3af" },
  { node: <FaDatabase />, title: "Database", color: "#9ca3af" },
];

export default function TechLoop() {
  return (
    <section className="section-surface py-8 text-white">
      <div className="w-full mx-auto px-0 sm:px-4 relative z-10">
        <LogoLoop
          logos={techLogos}
          speed={60}
          direction="left"
          logoHeight={35}
          gap={32}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="rgb(85, 86, 92)"
          ariaLabel="Technology stack logos"
        />
      </div>
    </section>
  );
}
