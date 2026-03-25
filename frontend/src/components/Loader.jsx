import React, { useState, useEffect } from "react";
import { SiTailwindcss } from "react-icons/si";
import { FaReact } from "react-icons/fa";

const Loader = () => {

  const icons = [
    <SiTailwindcss size={50} />,
    <FaReact size={50} />
  ];

  const [iconIndex, setIconIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {

      setVisible(false);

      setTimeout(() => {
        setIconIndex((prev) => (prev === 0 ? 1 : 0));
        setVisible(true);
      }, 300);

    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-28 h-28 border-8 text-blue-400 animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">

        <div className={`transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}>
          {icons[iconIndex]}
        </div>

      </div>
    </div>
  );
};

export default Loader;