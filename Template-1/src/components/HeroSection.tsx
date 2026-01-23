import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const images = [
  "https://res.cloudinary.com/degghm3hf/image/upload/v1767793011/beautiful-couple-posing-their-wedding-day_cckap5.jpg",
  "https://res.cloudinary.com/degghm3hf/image/upload/v1768729046/beautiful-couple-posing-their-wedding-day_2_wzwkmq.jpg",
  "https://res.cloudinary.com/degghm3hf/image/upload/v1768729034/beautiful-couple-posing-their-wedding-day_1_ksmnzr.jpg",
];

export default function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // ✅ animasi masuk saat pertama kali render
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // ✅ update active slide
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setActive(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // ✅ autoplay (tanpa ubah UI)
  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="relative min-h-screen" id="#home">
      {/* ✅ keyframes animasi (tanpa ubah tailwind) */}
      <style>{`
        @keyframes heroKenBurns {
          0%   { transform: scale(1) translate3d(0, 0, 0); }
          100% { transform: scale(1.08) translate3d(0, -10px, 0); }
        }

        @keyframes fadeUp {
          0%   { opacity: 0; transform: translate3d(0, 18px, 0); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        @keyframes floatBtn {
          0%   { transform: translate3d(0, 0, 0); }
          50%  { transform: translate3d(0, -6px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
      `}</style>

      {/* Background utama */}
      <div ref={emblaRef} className="overflow-hidden absolute inset-0">
        <div className="flex h-screen">
          {images.map((img, i) => (
            <div key={i} className="min-w-full">
              <div
                className="h-screen bg-cover bg-center"
                style={{
                  backgroundImage: `url(${img})`,
                  // ✅ Ken Burns hanya di slide aktif
                  animation:
                    i === active ? "heroKenBurns 6s ease-out forwards" : "none",
                  willChange: "transform",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Arrows */}
      <button
        onClick={scrollPrev}
        className="
    absolute left-6 top-1/2 -translate-y-1/2 z-20
    w-14 h-14 flex items-center justify-center
    rounded-full border border-white/60
    text-white text-3xl
    backdrop-blur-md bg-white/10
    hover:bg-white/20 hover:border-white hover:scale-110
    transition-all duration-300
    cursor-pointer
  "
        style={{
          animation: mounted ? "floatBtn 3.5s ease-in-out infinite" : "none",
        }}
      >
        <span className="mb-2" style={{ marginRight: "2px" }}>
          ‹
        </span>
      </button>

      <button
        onClick={scrollNext}
        className="
    absolute right-6 top-1/2 -translate-y-1/2 z-20
    w-14 h-14
    flex items-center justify-center
    rounded-full
    border border-white/60
    text-white text-3xl
    backdrop-blur-md bg-white/10
    hover:bg-white/20 hover:border-white
    hover:scale-110
    transition-all duration-300
    cursor-pointer
  "
        style={{
          animation: mounted ? "floatBtn 3.5s ease-in-out infinite" : "none",
          animationDelay: "0.35s",
        }}
      >
        <span className="mb-2" style={{ marginLeft: "2px" }}>
          ›
        </span>
      </button>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4">
        {/* Frame love */}
        <div
          className="
            bg-[url('https://res.cloudinary.com/degghm3hf/image/upload/v1768721970/1.5434f27c_lp0gmg.png')]
            bg-center bg-no-repeat bg-contain
            flex flex-col items-center justify-center
            px-16 py-10
            min-w-3xl
            h-84 md:h-108 lg:h-120
          "
          style={{
            opacity: mounted ? 1 : 0,
            animation: mounted ? "fadeUp 1.1s ease-out forwards" : "none",
            willChange: "transform, opacity",
          }}
        >
          <p
            className="text-lg md:text-xl text-[#F9F8F6] mb-6"
            style={{
              opacity: mounted ? 1 : 0,
              animation: mounted ? "fadeUp 1.1s ease-out forwards" : "none",
              animationDelay: "0.15s",
              willChange: "transform, opacity",
            }}
          >
            Kami Akan Menikah!
          </p>

          <h1
            className="text-3xl md:text-6xl font-serif text-white"
            style={{
              fontFamily: "Great Vibes, cursive",
              opacity: mounted ? 1 : 0,
              animation: mounted ? "fadeUp 1.1s ease-out forwards" : "none",
              animationDelay: "0.25s",
              willChange: "transform, opacity",
            }}
          >
            Kenzie & Angel
          </h1>

          <div
            className="mt-3 text-[#F9F8F6]"
            style={{
              opacity: mounted ? 1 : 0,
              animation: mounted ? "fadeUp 1.1s ease-out forwards" : "none",
              animationDelay: "0.35s",
              willChange: "transform, opacity",
            }}
          >
            <p className="text-lg md:text-xl mt-2">
              15 Desember 2026 | 16.00 WIB
            </p>
            <p className="text-lg md:text-xl mt-2">Jakarta, Indonesia</p>
          </div>
        </div>
      </div>
    </section>
  );
}
