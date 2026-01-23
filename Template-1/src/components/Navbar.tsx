import { useEffect, useState } from "react";
import { Icon } from "./Icon";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ✅ animasi masuk saat pertama load
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrollY(true);
      } else {
        setScrollY(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      data-animate={mounted ? "1" : "0"}
      style={{
        animation: mounted ? "navEnter 900ms ease-out both" : "none",
      }}
      className={`
    fixed top-0 left-0 right-0 z-50
    ${scrollY ? "bg-[#A9907E]/70" : "bg-white/0"}
    backdrop-blur-lg
    transition-all duration-700 ease-out
  `}
    >
      {/* ✅ CSS animasi tanpa ubah Tailwind */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }

        @keyframes navEnter {
          0%   { opacity: 0; transform: translate3d(0, -16px, 0); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        @keyframes fadeUpSoft {
          0%   { opacity: 0; transform: translate3d(0, 10px, 0); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        @keyframes popSoft {
          0%   { opacity: 0; transform: scale(0.96); }
          100% { opacity: 1; transform: scale(1); }
        }

        /* ✅ Logo masuk halus */
        header[data-animate="1"] h2 {
          animation: fadeUpSoft 900ms ease-out both;
          animation-delay: 120ms;
          will-change: transform, opacity;
        }

        /* ✅ Desktop nav: link muncul satu-satu */
        header[data-animate="1"] nav.hidden.md\\:flex a {
          opacity: 0;
          animation: fadeUpSoft 800ms ease-out both;
          will-change: transform, opacity;
        }
        header[data-animate="1"] nav.hidden.md\\:flex a:nth-child(1) { animation-delay: 220ms; }
        header[data-animate="1"] nav.hidden.md\\:flex a:nth-child(2) { animation-delay: 280ms; }
        header[data-animate="1"] nav.hidden.md\\:flex a:nth-child(3) { animation-delay: 340ms; }
        header[data-animate="1"] nav.hidden.md\\:flex a:nth-child(4) { animation-delay: 400ms; }
        header[data-animate="1"] nav.hidden.md\\:flex a:nth-child(5) { animation-delay: 460ms; }
        header[data-animate="1"] nav.hidden.md\\:flex a:nth-child(6) { animation-delay: 520ms; }

        /* ✅ Mobile menu container muncul lebih halus saat open */
        header[data-animate="1"] nav.md\\:hidden {
          will-change: transform, opacity;
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 sm:gap-3 mt-2 text-3xl sm:text-3xl md:text-3xl leading-none text-[#F9F8F6] font-bold ">
          <span
            style={{
              fontFamily: "Great Vibes, cursive",
            }}
          >
            Kenzie
          </span>

          {/* ✅ Heart icon pop halus (tanpa ubah class Tailwind) */}
          <span
            style={{
              display: "inline-flex",
              animation: mounted ? "popSoft 700ms ease-out both" : "none",
              animationDelay: "180ms",
            }}
          >
            <Icon
              name="heart"
              size={30}
              className="inline-flex sm:w-6 sm:h-6 text-[#F9F8F6]"
            />
          </span>

          <span
            style={{
              fontFamily: "Great Vibes, cursive",
            }}
          >
            Angel
          </span>
        </h2>

        {/* Mobile menu button - Animated Hamburger */}
        <button
          className="md:hidden p-2 relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 hover:opacity-80 transition-all duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          style={{
            animation: mounted ? "fadeUpSoft 900ms ease-out both" : "none",
            animationDelay: "220ms",
          }}
        >
          <span
            className={`block w-6 h-0.5 bg-[#2E2E2E] rounded-full transition-all duration-300 ease-out ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#2E2E2E] rounded-full transition-all duration-300 ease-out ${
              isMenuOpen ? "opacity-0 scale-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#2E2E2E] rounded-full transition-all duration-300 ease-out ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8 text-base lg:text-lg text-[#F9F8F6] font-medium">
          <a
            className="hover:opacity-70 transition-opacity duration-300 "
            href="#"
            style={{
              scrollBehavior: "smooth",
            }}
          >
            Beranda
          </a>
          <a
            className="hover:opacity-70 transition-opacity duration-300 "
            href="#couple"
          >
            Pasangan
          </a>
          <a
            className="hover:opacity-70 transition-opacity duration-300"
            href="#story"
          >
            Kisah Kami
          </a>
          <a
            className="hover:opacity-70 transition-opacity duration-300"
            href="#people"
          >
            Pengiring Pengantin
          </a>

          <a
            className="hover:opacity-70 transition-opacity duration-300"
            href="#gallery"
          >
            Galeri
          </a>
          <a
            className="hover:opacity-70 transition-opacity duration-300"
            href="#location"
          >
            Lokasi
          </a>
        </nav>
      </div>

      {/* Mobile navigation */}
      <nav
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          transform: isMenuOpen
            ? "translate3d(0,0,0)"
            : "translate3d(0,-6px,0)",
          transitionProperty: "max-height, opacity, transform",
        }}
      >
        <div className="bg-[#FAF9EE] border-t border-[#2E2E2E]/10">
          <div className="flex flex-col px-6 py-4 gap-1 text-base text-[#2E2E2E]">
            <a
              className="hover:opacity-70 hover:bg-[#2E2E2E]/5 transition-all duration-300 py-3 px-4 rounded-lg"
              href="#home"
            >
              Beranda
            </a>
            <a
              className="hover:opacity-70 hover:bg-[#2E2E2E]/5 transition-all duration-300 py-3 px-4 rounded-lg"
              href="#couple"
            >
              Pasangan
            </a>
            <a
              className="hover:opacity-70 hover:bg-[#2E2E2E]/5 transition-all duration-300 py-3 px-4 rounded-lg"
              href="#story"
            >
              Kisah Kami
            </a>
            <a
              className="hover:opacity-70 hover:bg-[#2E2E2E]/5 transition-all duration-300 py-3 px-4 rounded-lg"
              href="#people"
            >
              Pengiring Pengantin
            </a>

            <a
              className="hover:opacity-70 hover:bg-[#2E2E2E]/5 transition-all duration-300 py-3 px-4 rounded-lg"
              href="#gallery"
            >
              Galeri
            </a>
            <a
              className="hover:opacity-70 hover:bg-[#2E2E2E]/5 transition-all duration-300 py-3 px-4 rounded-lg"
              href="#location"
            >
              Lokasi
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
