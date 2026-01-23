import { useEffect, useState } from "react";
import { Icon } from "./Icon";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrollY(true);
      } else {
        setScrollY(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
    fixed top-0 left-0 right-0 z-50
    ${scrollY ? "bg-[#A9907E]/70" : "bg-white/0"}
    backdrop-blur-lg
    transition-all duration-700 ease-out
  `}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 sm:gap-3 mt-2 text-3xl sm:text-3xl md:text-3xl leading-none text-[#F9F8F6] font-bold ">
          <span
            style={{
              fontFamily: "Great Vibes, cursive",
            }}
          >
            Kenzie
          </span>
          <Icon
            name="heart"
            size={30}
            className="inline-flex sm:w-6 sm:h-6 text-[#F9F8F6]"
          />
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
            Keluarga
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
              Keluarga
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
