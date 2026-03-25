import React, { useState, useEffect } from 'react';
import { Shield, Cpu, Globe, Database } from 'lucide-react';

const iconMap = {
  'Stack': <Cpu size={16} />,
  'Frontend & UI': <Database size={16} />,
  'IT & Environment': <Globe size={16} />,
  'Support Tools': <Shield size={16} />,
};

export default function About() {
  const [aboutData, setAboutData] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://portfolioo-backend.onrender.com";

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/about`)
      .then(res => res.json())
      .then(data => setAboutData(data))
      .catch(err => console.error("Failed to fetch about data:", err));
  }, []);

  if (!aboutData) {
    return (
      <section
        id="about"
        className="section-surface min-h-screen w-full text-white py-24 flex items-center justify-center"
      >
        <div className="relative z-10">Loading...</div>
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
      className="section-surface min-h-screen w-full text-white py-24 flex items-center"
    >
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Narrative */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xs font-mono tracking-[0.5em] text-blue-500 uppercase">
                {displaySubheading || subheading}
              </h2>
              <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
                {heading1} <span className="text-white/40 italic">{heading2}</span>
              </h3>
            </div>

            <div className="space-y-6 text-gray-400 font-light leading-relaxed text-lg">
              <p>
                I am a <span className="text-white font-medium">{title}</span> based in {location}.
              </p>
              {bio.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Signature / Status */}
            <div className="pt-6 border-t border-white/5 flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">
                {status}
              </span>
            </div>
          </div>

          {/* Right Column: Technical Specs */}
          <div className="relative">
            {/* Decorative Card */}
            <div className="absolute -inset-4 bg-blue-500/5 blur-2xl rounded-full" />
            <div className="relative border border-white/10 bg-[#0d0d0d] p-8 md:p-12 rounded-sm shadow-2xl">
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

              {/* Decorative Corner Element */}
              <div className="absolute top-0 right-0 p-2 overflow-hidden">
                <div className="text-[40px] font-black text-white/5 select-none leading-none -mr-4 -mt-4">
                  LOG
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
