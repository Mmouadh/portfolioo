import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Mail, ArrowUpRight, X, Send, CheckCircle2, AlertCircle } from "lucide-react";

const SERVICE_ID = "service_dxby2k7";
const TEMPLATE_ID = "template_l7jmabn";
const PUBLIC_KEY = "UgC97kTp2YVOi8zv-";

export default function ContactPopup() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY).then(
      () => {
        setStatus("success");
        formRef.current?.reset();
        setTimeout(() => setStatus("idle"), 2500);
      },
      () => {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 2500);
      }
    );
  };

  const close = () => {
    setOpen(false);
    setStatus("idle");
  };

  return (
    <section className="section-surface py-12 text-white">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.3em] text-blue-300">
              Quick Contact
            </p>
            <h3 className="text-2xl md:text-3xl font-black">Got a project in mind?</h3>
            <p className="text-white/60 text-sm">
              Drop a short note and I’ll get back soon. No long forms, just the essentials.
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 self-start rounded-full bg-white text-black px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] transition hover:bg-blue-50 active:scale-95"
          >
            <Mail size={16} />
            Open Contact
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[130] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={close}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c111f] via-[#0a0f1a] to-[#05060d] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.65)] animate-[fadeIn_200ms_ease]"
            style={{ animation: "fadeIn 200ms ease" }}
          >
            <button
              onClick={close}
              className="absolute right-3 top-3 rounded-full bg-white/10 p-2 text-white/70 hover:bg-white/20"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2 text-blue-300 text-[11px] uppercase tracking-[0.3em]">
              <Mail size={13} />
              Quick Message
            </div>
            <h4 className="mt-2 text-2xl font-bold text-white">Let’s talk</h4>
            <p className="mt-1 text-white/60 text-sm">
              Share a line about what you need and how to reach you.
            </p>

            <ul className="mt-4 space-y-2 text-white/80 text-sm list-disc list-inside">
              <li>📌 Ask anything about the projects you just saw.</li>
              <li>🕒 Get an ETA or availability check for your idea.</li>
              <li>✍️ Request a tailored demo or code sample.</li>
            </ul>

            <form ref={formRef} onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  required
                  name="user_name"
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-md border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-blue-400/70 focus:outline-none"
                />
                <input
                  required
                  name="user_email"
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-md border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-blue-400/70 focus:outline-none"
                />
              </div>

              <textarea
                required
                name="message"
                rows="4"
                placeholder="What do you have in mind?"
                className="w-full rounded-md border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-blue-400/70 focus:outline-none resize-none"
              />

              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold uppercase tracking-[0.25em] transition
                  ${
                    status === "success"
                      ? "bg-emerald-600 text-white"
                      : status === "error"
                      ? "bg-red-600 text-white"
                      : "bg-white text-black hover:bg-blue-50 active:scale-98"
                  }`}
              >
                {status === "sending" ? (
                  "Sending..."
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 size={16} />
                    Sent
                  </>
                ) : status === "error" ? (
                  <>
                    <AlertCircle size={16} />
                    Retry
                  </>
                ) : (
                  <>
                    Send
                    <Send size={14} className="translate-y-[1px]" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
