import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Archive', href: '/projects' },
    { name: 'Stack', href: '/#skills', hash: '#skills' },
    { name: 'Experience', href: '/experience' },
    { name: 'CV', href: '/cv' },
  ];

  const handleNavClick = (e, item) => {
    if (item.hash === '#skills') {
      e.preventDefault();
      const scrollToSkills = () => {
        const el = document.getElementById('skills');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };

      if (location.pathname !== '/') {
        navigate('/', { replace: false });
        setTimeout(scrollToSkills, 120);
      } else {
        scrollToSkills();
      }
      setIsOpen(false);
      return;
    }

    setIsOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-[100] px-6 py-6 pointer-events-none">
      <nav className={`
        mx-auto max-w-5xl pointer-events-auto transition-all duration-700 ease-in-out
        ${scrolled 
          ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-2xl px-8 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
          : 'bg-transparent px-2 py-4 border-b border-white/5'}
        flex items-center justify-between
      `}>
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-6">
          <div className="flex flex-col leading-none">
            <span className="text-lg font-black tracking-tighter text-white">Mouadh J. </span>
          </div>
          
          <div className="hidden min-[1025px]:block h-8 w-[1px] bg-white/10"></div>
        </Link>

        {/* Desktop Links - Darker & Muted */}
        <div className="hidden min-[1025px]:flex items-center gap-10">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className="group relative text-[11px] font-bold uppercase tracking-[0.25em] text-white/35 hover:text-white transition-all duration-300"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-600 transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
            </Link>
          ))}
          
          <div className="h-4 w-[1px] bg-white/10"></div>

          <Link to="/contact" className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/30 hover:text-blue-400 transition-all active:scale-95">
            Contact
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="flex flex-col gap-1.5 min-[1025px]:hidden group p-2 outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={`h-[1px] w-6 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`h-[1px] w-4 bg-white self-end transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <div className={`h-[1px] w-6 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile Overlay - Darker Theme */}
      <div className={`fixed inset-0 bg-[#070707]/98 backdrop-blur-2xl z-[90] transition-all duration-500 flex flex-col items-center justify-center gap-10 min-[1025px]:hidden pointer-events-auto ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
      }`}>
         {menuItems.map((item) => (
          <Link
            key={item.name} 
            to={item.href} 
            className="text-2xl font-bold text-white/40 hover:text-blue-500 tracking-[0.3em] uppercase transition-colors" 
            onClick={(e) => handleNavClick(e, item)}
          >
            {item.name}
          </Link>
        ))}
        <Link
          to="/contact"
          onClick={() => setIsOpen(false)}
          className="text-2xl font-bold text-white/40 hover:text-blue-500 tracking-[0.3em] uppercase transition-colors"
        >
          Contact
        </Link>
        <button 
          onClick={() => setIsOpen(false)} 
          className="mt-10 text-[10px] uppercase tracking-[0.5em] text-blue-500 border-b border-blue-500/30 pb-2 hover:text-white transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Navbar;
