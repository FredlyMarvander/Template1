import { useEffect, useRef, useState } from "react";

export default function HeroParallax() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState(0);

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
        className="absolute inset-0 will-change-transform scale-[1.08]"
        style={{
          transform: `translate3d(0, -${offset}px, 0)`,
          backgroundImage:
            "url('https://res.cloudinary.com/degghm3hf/image/upload/v1768916730/bride-wet-maldives-rocks-hugging_mfeiow.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "110%",
        }}
      />

      {/* Overlay: gelap tipis + wash warna tema (biar mirip foto) */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-[#A9907E]/25 mix-blend-multiply" />

      {/* Soft vignette biar fokus ke tengah */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/35" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <h1
            className="text-white text-4xl sm:text-5xl md:text-6xl italic drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Welcome to our big day
          </h1>

          <p
            className="mt-6 text-white/90 text-base sm:text-lg leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or less normal
            distribution of letters.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
            <a
              className="
            rounded-full bg-white/95 text-[#A9907E]
            px-12 py-3 font-semibold
            shadow-lg shadow-black/20
            hover:bg-white hover:shadow-xl
            transition
          "
              href="#location"
            >
              Location
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
