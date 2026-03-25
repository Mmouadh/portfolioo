import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Terminal } from 'lucide-react';
import SocialCard from './SocialCard';

const titles = [

  'Full-Stack JavaScript Developer',
  'IT Support Technician',
  'MERN Stack Developer (Junior)',
  'Web Application Developer',
  'React UI Developer',
];

export default function HeroCTA() {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  // FINAL FIX: No synchronous setState calls inside the effect body
  useEffect(() => {
    let timeout;

    if (subIndex === titles[index].length + 1 && !reverse) {
      timeout = setTimeout(() => setReverse(true), 1500);
    } else if (subIndex === 0 && reverse) {
      timeout = setTimeout(() => {
        setReverse(false);
        setIndex((prev) => (prev + 1) % titles.length);
      }, 200);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(titles[index].substring(0, subIndex));
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      }, reverse ? 40 : 80);
    }

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-[#0a0a0a] text-white pt-32 md:pt-44">
      
      {/* --- BACKGROUND SYSTEM --- */}
      {/* 1. The Cyber Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`, 
          backgroundSize: '45px 45px' 
        }} 
      />

      {/* 2. THE TOP BLACK MASK (Seamless Navbar Transition) */}
      <div className="absolute top-0 left-0 w-full h-64 z-[1] bg-gradient-to-b from-[#000000] via-[#0a0a0a]/80 to-transparent pointer-events-none" />
      
      {/* 3. Radial Glows */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,rgba(14,165,233,0.12),transparent_70%)] pointer-events-none" />

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
        
        {/* The Jumping Badge - Positioned in the fade zone */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-mono tracking-[0.2em] uppercase animate-bounce mb-12 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          <Terminal size={14} /> Available for New Projects
        </div>

        {/* Headline */}
        <div className="max-w-5xl mb-8">
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-6">
            MOUADH <br />
            <span className="bg-gradient-to-b from-white via-white to-gray-600 bg-clip-text text-transparent italic">
              JELJELI
            </span>
          </h1>
          
          <div className="h-10 text-xl md:text-3xl font-light text-blue-400 tracking-widest uppercase">
            {displayText}
            <span className="w-1.5 h-7 bg-blue-500 inline-block ml-2 animate-pulse align-middle shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          </div>
        </div>

        <p className="max-w-2xl text-gray-400 text-base md:text-lg leading-relaxed font-light mb-10">
         Building modern web applications with React and the MERN stack, focused on performance, clean UI, and real-world usability.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-5 mb-16">
          <a href="#projects" className="group relative px-10 py-4 bg-white text-black font-bold text-sm tracking-widest rounded-sm transition-all hover:bg-blue-50 hover:scale-105 active:scale-95 shadow-xl shadow-white/5">
            <span className="relative z-10 flex items-center gap-2">
              VIEW PROJECTS <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>

          <Link to="/cv" className="px-10 py-4 border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white font-medium text-sm tracking-widest rounded-sm transition-all flex items-center gap-2">
            <FileText size={18} /> OPEN CV
          </Link>
        </div>

        {/* Socials */}
        <div className="py-6 border-t border-white/5 w-full flex justify-center">
          <SocialCard />
        </div>
      </div>

      {/* Decorative Sidebar */}
      <div className="absolute right-8 bottom-12 hidden xl:block opacity-30">
        <span className="text-[9px] font-mono text-gray-400 vertical-text tracking-[1.5em] uppercase" style={{ writingMode: 'vertical-rl' }}>
          TUNISIA // ARCHITECT_LOG_V3
        </span>
      </div>

    </section>
  );
}
