import { useState, useEffect } from "react";

export default function ScrollUp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-500
  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
`}
    >
      <button
        onClick={handleClick}
        aria-label="Scroll to top"
        className="
      group
      w-12 h-12 flex items-center justify-center
      rounded-full
      bg-[#A9907E]/90 backdrop-blur
      border border-white/20
      text-white

      shadow-[0_8px_30px_rgba(0,0,0,0.25)]

      transition-all duration-300 ease-out
      hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]
      hover:scale-110
      hover:-translate-y-1
      active:scale-95

      focus:outline-none
      focus:ring-2
      focus:ring-white/70
      focus:ring-offset-2
      focus:ring-offset-[#A9907E]
    "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  );
}
