import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-5 right-5 z-[120] inline-flex items-center justify-center rounded-full bg-gray-400 text-gray-900 p-3 shadow-lg hover:bg-blue-300 active:bg-blue-400 hover:text-white active:text-white active:scale-95 transition-all"
      title="Back to top"
      aria-label="Back to top"
    >
      <ArrowUp size={24} />
    </button>
  );
}
