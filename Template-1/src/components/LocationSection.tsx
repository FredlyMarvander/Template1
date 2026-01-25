import { useEffect, useRef, useState } from "react";
import data from "../config/wedding-data.json";

export default function HeroParallax() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState(0);
  const [visible, setVisible] = useState(false);

  // ✅ Animasi muncul saat masuk viewport (sekali saja)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ✅ Parallax scroll
  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;

      const progress = Math.min(
        1,
        Math.max(0, (windowH - rect.top) / (windowH + rect.height)),
      );

      const maxMove = 140;
      setOffset(progress * maxMove);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[75vh] min-h-[520px] w-full overflow-hidden"
    >
      {/* Background (parallax) */}
      <div
        className={[
          "absolute inset-0 will-change-transform scale-[1.08]",
          "transition-transform duration-300 ease-out", // ✅ smooth parallax
        ].join(" ")}
        style={{
          transform: `translate3d(0, -${offset}px, 0)`,
          backgroundImage:
            "url('https://res.cloudinary.com/degghm3hf/image/upload/v1768916730/bride-wet-maldives-rocks-hugging_mfeiow.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "110%",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-[#A9907E]/25 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/35" />

      {/* ✅ Soft glow di tengah (biar lebih premium) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-56 w-56 rounded-full bg-white/10 blur-3xl opacity-60 animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="max-w-3xl text-center mt-15">
          {/* ✅ Title animation */}
          <h1
            className={[
              "text-white text-3xl sm:text-4xl md:text-5xl italic",
              "drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)]",
              "transition-all duration-900 ease-out",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {data.locationSection.title}
          </h1>

          {/* ✅ Desc animation (delay) */}
          <p
            className={[
              "mt-6 text-white/90 text-base sm:text-lg leading-relaxed",
              "drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]",
              "transition-all duration-900 ease-out delay-150",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {data.locationSection.subtitle}
          </p>

          {/* ✅ Button animation (delay + scale) */}
          <div
            className={[
              "mt-10 flex flex-col sm:flex-row items-center justify-center gap-5",
              "transition-all duration-900 ease-out delay-300",
              visible ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]",
            ].join(" ")}
          >
            <a
              className="
                rounded-full bg-white/95 text-[#A9907E]
                px-12 py-3 font-semibold
                shadow-lg shadow-black/20
                hover:bg-white hover:shadow-xl
                hover:-translate-y-1 hover:scale-[1.03]
                active:scale-95
                transition-all duration-300 ease-out
              "
              href={`#${data.locationSection.urlLocation}`}
            >
              {data.locationSection.buttonText}
            </a>
          </div>

          {/* ✅ Ornamen kecil (muncul terakhir) */}
          <div
            className={[
              "mt-8 flex items-center justify-center gap-4",
              "transition-all duration-900 ease-out delay-500",
              visible ? "opacity-80" : "opacity-0",
            ].join(" ")}
          >
            <span className="h-px w-20 bg-white/40" />
            <span className="text-white/70 text-xl">♡</span>
            <span className="h-px w-20 bg-white/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
