import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

const images = [
  "https://res.cloudinary.com/degghm3hf/image/upload/v1767793011/beautiful-couple-posing-their-wedding-day_cckap5.jpg",
  "https://res.cloudinary.com/degghm3hf/image/upload/v1767793011/beautiful-couple-posing-their-wedding-day_cckap5.jpg",
];

export default function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="relative min-h-screen" id="#home">
      {/* Background utama */}
      <div ref={emblaRef} className="overflow-hidden absolute inset-0">
        <div className="flex h-screen">
          {images.map((img, i) => (
            <div key={i} className="min-w-full">
              <div
                className="h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${img})` }}
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
        >
          <p className="text-lg md:text-xl text-[#F9F8F6] mb-6">
            We're Getting Married!
          </p>
          <h1
            className="text-3xl md:text-6xl font-serif text-white"
            style={{
              fontFamily: "Great Vibes, cursive",
            }}
          >
            Kenzie & Angel
          </h1>

          <div className="mt-3 text-[#F9F8F6]">
            <p className="text-lg md:text-xl mt-2">
              December 15, 2024 | 4:00 PM
            </p>
            <p className="text-lg md:text-xl mt-2">New York City, NY</p>
          </div>
        </div>
      </div>
    </section>
  );
}
