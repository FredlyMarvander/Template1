import { useState, useEffect } from "react";
import data from "../config/wedding-data.json";

interface WelcomePopupProps {
  onOpen?: () => void; // callback saat popup dibuka (bisa untuk trigger music)
}

export default function WelcomePopup({ onOpen }: WelcomePopupProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Animasi masuk saat pertama kali render
  useEffect(() => {
    // Disable scroll saat popup terbuka
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => setMounted(true), 100);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  const handleOpenInvitation = () => {
    setIsClosing(true);

    // Tunggu animasi selesai baru hide
    setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
      onOpen?.();
    }, 600);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed inset-0 z-[9999]
        flex items-center justify-center
        transition-all duration-600
        ${isClosing ? "opacity-0" : "opacity-100"}
      `}
    >
      {/* Keyframes untuk animasi */}
      <style>{`
        @keyframes popupFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes popupSlideUp {
          0% { 
            opacity: 0; 
            transform: translate3d(-50%, calc(-50% + 40px), 0) scale(0.95);
          }
          100% { 
            opacity: 1; 
            transform: translate3d(-50%, -50%, 0) scale(1);
          }
        }

        @keyframes popupSlideDown {
          0% { 
            opacity: 1; 
            transform: translate3d(-50%, -50%, 0) scale(1);
          }
          100% { 
            opacity: 0; 
            transform: translate3d(-50%, calc(-50% + 40px), 0) scale(0.95);
          }
        }

        @keyframes floatSoft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1); }
          75% { transform: scale(1.05); }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }

        @keyframes fadeUpStagger {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Background dengan efek blur dan overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${data.hero.sliderImages[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px) brightness(0.4)",
          transform: "scale(1.1)",
          animation: mounted ? "popupFadeIn 800ms ease-out forwards" : "none",
        }}
      />

      {/* Overlay gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"
        style={{
          animation: mounted ? "popupFadeIn 800ms ease-out forwards" : "none",
        }}
      />

      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Sparkles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animation: `sparkle ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main popup card */}
      <div
        className={`
          absolute left-1/2 top-1/2
          w-[92%] max-w-md
          bg-white/95 backdrop-blur-xl
          shadow-[0_30px_100px_rgba(0,0,0,0.5)]
          overflow-hidden
        `}
        style={{
          animation: mounted
            ? isClosing
              ? "popupSlideDown 600ms ease-in forwards"
              : "popupSlideUp 800ms cubic-bezier(0.16, 1, 0.3, 1) forwards"
            : "none",
          animationDelay: mounted && !isClosing ? "200ms" : "0ms",
          opacity: 0,
          transform: "translate3d(-50%, -50%, 0)",
        }}
      >
        {/* Top decorative border */}
        <div className="h-1.5 bg-gradient-to-r from-[#A9907E]/30 via-[#A9907E] to-[#A9907E]/30" />

        {/* Content */}
        <div className="px-8 py-10 text-center">
          {/* Ornament top */}
          <div
            className="flex items-center justify-center mb-6"
            style={{
              animation: mounted
                ? "fadeUpStagger 700ms ease-out forwards"
                : "none",
              animationDelay: "400ms",
              opacity: 0,
            }}
          >
            <svg width="120" height="24" viewBox="0 0 120 24" fill="none">
              <path
                d="M0 12h35"
                stroke="#A9907E"
                strokeWidth="0.5"
                opacity="0.5"
              />
              <path
                d="M60 6c-4-5.5-11.5-3.5-11.5 3C48.5 13 53 17 60 17s11.5-4 11.5-8C71.5 2.5 64 0.5 60 6Z"
                stroke="#A9907E"
                strokeWidth="1.2"
                fill="none"
              />
              <path
                d="M85 12h35"
                stroke="#A9907E"
                strokeWidth="0.5"
                opacity="0.5"
              />
            </svg>
          </div>

          {/* Label */}
          <p
            className="text-xs tracking-[0.3em] uppercase text-[#A9907E]/80 mb-3"
            style={{
              animation: mounted
                ? "fadeUpStagger 700ms ease-out forwards"
                : "none",
              animationDelay: "500ms",
              opacity: 0,
            }}
          >
            {data.hero.subtitle}
          </p>

          {/* Couple names */}
          <h1
            className="text-4xl md:text-5xl text-[#A9907E] mb-2"
            style={{
              fontFamily: "'Great Vibes', cursive",
              animation: mounted
                ? "fadeUpStagger 700ms ease-out forwards"
                : "none",
              animationDelay: "600ms",
              opacity: 0,
            }}
          >
            {data.site.coupleNames.left}
          </h1>

          {/* Heart icon */}
          <div
            className="my-3"
            style={{
              animation: mounted
                ? "fadeUpStagger 700ms ease-out forwards"
                : "none",
              animationDelay: "700ms",
              opacity: 0,
            }}
          >
            <span
              className="inline-block text-[#A9907E]/60 text-2xl"
              style={{
                animation: mounted
                  ? "heartbeat 2s ease-in-out infinite"
                  : "none",
                animationDelay: "1.2s",
              }}
            >
              ♡
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl text-[#A9907E] mb-6"
            style={{
              fontFamily: "'Great Vibes', cursive",
              animation: mounted
                ? "fadeUpStagger 700ms ease-out forwards"
                : "none",
              animationDelay: "800ms",
              opacity: 0,
            }}
          >
            {data.site.coupleNames.right}
          </h1>

          {/* Date & location */}
          <div
            className="space-y-1 mb-8"
            style={{
              animation: mounted
                ? "fadeUpStagger 700ms ease-out forwards"
                : "none",
              animationDelay: "900ms",
              opacity: 0,
            }}
          >
            <p className="text-sm text-black/60">{data.hero.meta.dateText}</p>
            <p className="text-sm text-black/50">
              {data.hero.meta.locationText}
            </p>
          </div>

          {/* Invitation message */}
          <p
            className="text-sm text-black/55 mb-8 leading-relaxed max-w-xs mx-auto"
            style={{
              animation: mounted
                ? "fadeUpStagger 700ms ease-out forwards"
                : "none",
              animationDelay: "1000ms",
              opacity: 0,
            }}
          >
            {data.welcome.message}
          </p>

          {/* Open button */}
          <div
            style={{
              animation: mounted
                ? "fadeUpStagger 700ms ease-out forwards"
                : "none",
              animationDelay: "1100ms",
              opacity: 0,
            }}
          >
            <button
              onClick={handleOpenInvitation}
              className="
                group relative
                px-10 py-3.5
                bg-[#A9907E] text-white
                text-sm tracking-wider uppercase
                overflow-hidden
                shadow-[0_10px_40px_rgba(169,144,126,0.4)]
                transition-all duration-500 ease-out
                hover:shadow-[0_15px_50px_rgba(169,144,126,0.5)]
                hover:scale-105
                hover:-translate-y-0.5
                active:scale-95
                focus:outline-none
                focus:ring-2 focus:ring-[#A9907E]/50
                focus:ring-offset-2
              "
              style={{
                animation: mounted
                  ? "floatSoft 3s ease-in-out infinite"
                  : "none",
                animationDelay: "1.5s",
              }}
            >
              {/* Shimmer effect */}
              <span
                className="
                  absolute inset-0
                  bg-gradient-to-r from-transparent via-white/20 to-transparent
                  -translate-x-full
                  group-hover:translate-x-full
                  transition-transform duration-700
                "
              />

              <span className="relative flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                  />
                </svg>
                Klik untuk Melanjutkan
              </span>
            </button>
          </div>

          {/* Music hint */}
          <p
            className="mt-6 text-xs text-black/40"
            style={{
              animation: mounted
                ? "fadeUpStagger 700ms ease-out forwards"
                : "none",
              animationDelay: "1200ms",
              opacity: 0,
            }}
          >
            🎵 Aktifkan audio untuk pengalaman terbaik
          </p>
        </div>

        {/* Bottom decorative border */}
        <div className="h-1.5 bg-gradient-to-r from-[#A9907E]/30 via-[#A9907E] to-[#A9907E]/30" />
      </div>

      {/* Corner decorations */}
      <div
        className="absolute top-8 left-8 opacity-30"
        style={{
          animation: mounted ? "popupFadeIn 1s ease-out forwards" : "none",
          animationDelay: "800ms",
        }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M0 60V0h60" stroke="#fff" strokeWidth="0.5" />
          <path
            d="M10 50V10h40"
            stroke="#fff"
            strokeWidth="0.5"
            opacity="0.5"
          />
        </svg>
      </div>

      <div
        className="absolute bottom-8 right-8 opacity-30"
        style={{
          animation: mounted ? "popupFadeIn 1s ease-out forwards" : "none",
          animationDelay: "800ms",
        }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M60 0v60H0" stroke="#fff" strokeWidth="0.5" />
          <path
            d="M50 10v40H10"
            stroke="#fff"
            strokeWidth="0.5"
            opacity="0.5"
          />
        </svg>
      </div>
    </div>
  );
}
