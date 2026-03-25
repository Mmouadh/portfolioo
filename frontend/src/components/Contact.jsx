import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, MapPin, Send, Terminal, Globe, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Contact() {
  const form = useRef();
  const [status, setStatus] = useState('idle');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    // CONFIGURATION - injected via Vite env
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error("EmailJS env vars missing");
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(() => {
          setStatus('success');
          form.current.reset();
          setTimeout(() => setStatus('idle'), 6000);
      }, (error) => {
          console.error("Transmission Error:", error.text);
          setStatus('error');
          setTimeout(() => setStatus('idle'), 4000);
      });
  };

  return (
    <section id="contact" className="page-shell section-surface relative w-full min-h-screen py-24 text-white overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]" 
           style={{ backgroundImage: "linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
      
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Column: Info Nodes */}
          <div className="space-y-12">
            <div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85]">
                INITIALIZE <br />
                <span className="text-white/10 italic">CONTACT</span>
              </h2>
              <p className="mt-8 text-white/40 max-w-sm font-light leading-relaxed border-l-2 border-blue-500/20 pl-6">
                Direct route to my Gmail inbox. Systems are operational and ready for your transmission payload.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="h-14 w-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0)] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-mono mb-1">Gmail_Uplink</p>
                  <p className="text-lg font-bold tracking-tight group-hover:text-blue-400 transition-colors">mouadhhjeljeli@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="h-14 w-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-blue-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-mono mb-1">Geospatial_Base</p>
                  <p className="text-lg font-bold tracking-tight">Ben Arous, Tunisia // Remote_Ready</p>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-sm border border-blue-500/20 bg-blue-500/5">
              <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_#3b82f6]" />
              <span className="text-[10px] font-mono tracking-[0.2em] text-blue-400 uppercase">
                Uplink_Status: Secure_and_Active
              </span>
            </div>
          </div>

          {/* Right Column: The Terminal */}
          <div className="relative group/terminal">
            <div className="absolute -inset-2 bg-blue-500/10 blur-3xl rounded-full opacity-50 group-hover/terminal:opacity-80 transition-opacity" />
            
            <form ref={form} onSubmit={sendEmail} className="relative border border-white/10 bg-[#0a0a0a] rounded-sm shadow-2xl overflow-hidden">
              {/* Terminal Header */}
              <div className="bg-white/[0.03] px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/40" />
                    <div className="h-3 w-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                  </div>
                  <div className="h-4 w-[1px] bg-white/10 mx-2" />
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em]">New_Transmission.bin</span>
                </div>
                <Terminal size={26} className="text-blue-500/50" />
              </div>

              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[9px] uppercase tracking-widest text-white/30 font-mono flex items-center gap-2">
                      <span className="text-blue-500">01_</span> Client_Identity
                    </label>
                    <input required name="user_name" type="text" placeholder="NAME" className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-blue-500 transition-all font-mono text-sm text-white placeholder:text-white/5" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] uppercase tracking-widest text-white/30 font-mono flex items-center gap-2">
                      <span className="text-blue-500">02_</span> Return_Path
                    </label>
                    <input required name="user_email" type="email" placeholder="EMAIL" className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-blue-500 transition-all font-mono text-sm text-white placeholder:text-white/5" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[9px] uppercase tracking-widest text-white/30 font-mono flex items-center gap-2">
                    <span className="text-blue-500">03_</span> Payload_Message
                  </label>
                  <textarea 
                    required 
                    name="message" 
                    rows="5" 
                    placeholder="[ INPUT_DATA_BUFFER... ]" 
                    className="w-full bg-white/[0.02] border border-white/10 p-5 rounded-sm outline-none focus:border-blue-500/50 transition-all font-mono text-sm text-blue-50/90 placeholder:text-white/5 resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  className={`w-full group flex items-center justify-center gap-4 py-5 sm:py-6 transition-all font-black uppercase tracking-[0.5em] text-[10px] rounded-sm
                    ${status === 'success' 
                      ? "bg-emerald-600 text-white shadow-[0_0_25px_rgba(16,185,129,0.4)]" 
                      : status === 'error'
                      ? "bg-red-600 text-white"
                      : "bg-[#0b0b0f] text-white border border-white/15 hover:bg-blue-600 hover:text-white active:scale-[0.98] sm:bg-white sm:text-black sm:border-transparent"
                    }`}
                >
                  {status === 'sending' ? (
                    <span className="animate-pulse">SYNCHRONIZING_UPLINK...</span>
                  ) : status === 'success' ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={18} />
                      <span>DATA_DELIVERED</span>
                    </div>
                  ) : status === 'error' ? (
                    <div className="flex items-center gap-2">
                      <AlertCircle size={18} />
                      <span>LINK_FAILURE</span>
                    </div>
                  ) : (
                    <>
                      <div className="hidden sm:flex items-center gap-3">
                        <span>EXECUTE_TRANSMISSION</span>
                      </div>
                      <div className="flex sm:hidden flex-col leading-tight text-left gap-1">
                        <span className="text-[11px] tracking-[0.35em]">SEND</span>
                        <span className="text-[9px] tracking-[0.2em] text-white/60">Secure uplink</span>
                      </div>
                      <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              <div className="bg-white/[0.02] px-8 py-4 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-white/20 uppercase tracking-[0.4em]">
                <span>Log_Session: {status.toUpperCase()}</span>
                <span className="flex items-center gap-2">
                  <Globe size={10} /> AES-256_SECURED
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
