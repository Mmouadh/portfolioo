import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full px-6 py-6" style={{ background: "rgba(13,18,27,0.9)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="mx-auto max-w-5xl text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight text-white">Made with ❤️ & React</span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/70 mt-1">Dev</span>
          </div>
          <p className="text-[12px] font-medium uppercase tracking-widest text-white/70">
            ${new Date().getFullYear()} MDev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
