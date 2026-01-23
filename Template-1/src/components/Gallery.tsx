import React, { useEffect, useMemo, useRef, useState } from "react";

type GalleryItem = {
  src: string;
  alt: string;
};

const GALLERY: GalleryItem[] = [
  {
    src: "https://res.cloudinary.com/degghm3hf/image/upload/v1769092664/beautiful-couple-having-their-wedding-beach_qymixf.jpg",
    alt: "Wedding moment 1",
  },
  {
    src: "https://res.cloudinary.com/degghm3hf/image/upload/v1769092763/beautiful-couple-spend-time-summer-park_p1fwuf.jpg",
    alt: "Wedding moment 2",
  },
  {
    src: "https://res.cloudinary.com/degghm3hf/image/upload/v1769093324/pexels-diohelmy-19035611_lcz8od.jpg",
    alt: "Wedding moment 3",
  },
  {
    src: "https://res.cloudinary.com/degghm3hf/image/upload/v1769093366/canggu-bali-prewedding_auqjd0.jpg",
    alt: "Wedding moment 4",
  },
  {
    src: "https://res.cloudinary.com/degghm3hf/image/upload/v1769093428/Snapinsta.app_311004689_867196497603115_64550288706484395_n_1080_ahyu2q.jpg",
    alt: "Wedding moment 5",
  },
  {
    src: "https://res.cloudinary.com/degghm3hf/image/upload/v1769093553/beautiful-wedding-ceremony-nature_1_dz2i1r.jpg",
    alt: "Wedding moment 6",
  },
];

/** =========================
 *  Hook: animate once on scroll
 *  ========================= */
function useInViewOnce<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { threshold },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, show };
}

/** =========================
 *  Ornament Divider
 *  ========================= */
function HeartDivider({ color = "#A9907E" }: { color?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-2">
      <span className="h-px w-14 bg-[rgba(169,144,126,0.25)]" />
      <svg width="64" height="18" viewBox="0 0 64 18" fill="none">
        <path
          d="M14 9c-3-4-8.4-2.5-8.4 2.2C5.6 14 8.7 16.5 14 16.5c5.3 0 8.4-2.5 8.4-5.3C22.4 6.5 17 5 14 9Z"
          stroke={color}
          strokeWidth="1.2"
        />
        <path
          d="M32 9c-3-4-8.4-2.5-8.4 2.2C23.6 14 26.7 16.5 32 16.5c5.3 0 8.4-2.5 8.4-5.3C40.4 6.5 35 5 32 9Z"
          stroke={color}
          strokeWidth="1.2"
          opacity="0.75"
        />
        <path
          d="M50 9c-3-4-8.4-2.5-8.4 2.2C41.6 14 44.7 16.5 50 16.5c5.3 0 8.4-2.5 8.4-5.3C58.4 6.5 53 5 50 9Z"
          stroke={color}
          strokeWidth="1.2"
          opacity="0.55"
        />
      </svg>
      <span className="h-px w-14 bg-[rgba(169,144,126,0.25)]" />
    </div>
  );
}

/** =========================
 *  Lightbox Modal
 *  ========================= */
function Lightbox({
  open,
  src,
  alt,
  onClose,
  onPrev,
  onNext,
}: {
  open: boolean;
  src: string;
  alt: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  // ESC to close
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose, onPrev, onNext]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center px-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl">
        <div className="overflow-hidden rounded-xl bg-white shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <div className="relative">
            <img
              src={src}
              alt={alt}
              className="w-full max-h-[80vh] object-contain bg-black"
            />
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 h-10 w-10 rounded-full bg-white/90 hover:bg-white transition flex items-center justify-center shadow"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Prev */}
            <button
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 hover:bg-white transition flex items-center justify-center shadow"
              aria-label="Previous"
            >
              ‹
            </button>

            {/* Next */}
            <button
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 hover:bg-white transition flex items-center justify-center shadow"
              aria-label="Next"
            >
              ›
            </button>
          </div>

          <div className="px-5 py-4 text-sm text-black/70">
            {alt}
            <span className="ml-2 text-black/40">
              (ESC to close • ← → to navigate)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** =========================
 *  MAIN COMPONENT
 *  ========================= */
export default function Gallery() {
  const { ref, show } = useInViewOnce<HTMLDivElement>(0.15);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeItem = useMemo(() => {
    if (activeIndex === null) return null;
    return GALLERY[activeIndex];
  }, [activeIndex]);

  const open = activeIndex !== null;

  const handlePrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? GALLERY.length - 1 : prev - 1;
    });
  };

  const handleNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => {
      if (prev === null) return null;
      return prev === GALLERY.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <section ref={ref} className="bg-white py-20" id="gallery">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div
          className={`
            text-center transition-all duration-700 ease-out
            ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <h2 className="font-[cursive] text-4xl text-[#5C8E83]">
            Our Gallery
          </h2>
          <HeartDivider color="#A9907E" />
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((item, idx) => {
            const delay = Math.min(idx * 90, 500);

            return (
              <button
                key={item.src + idx}
                onClick={() => setActiveIndex(idx)}
                className={`
                  group relative overflow-hidden bg-white
                  border border-black/5
                  shadow-[0_12px_30px_rgba(0,0,0,0.06)]
                  transition-all duration-700 ease-out
                  focus:outline-none focus:ring-2 focus:ring-[#A9907E]/60 focus:ring-offset-2

                  ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                `}
                style={{
                  transitionDelay: show ? `${delay}ms` : "0ms",
                }}
                aria-label={`Open image: ${item.alt}`}
              >
                {/* Image box (square like screenshot) */}
                <div className="aspect-square w-full overflow-hidden bg-black/5">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="
                      h-full w-full object-cover
                      transition-transform duration-700 ease-out
                      group-hover:scale-110
                    "
                  />
                </div>

                {/* Overlay */}
                <div
                  className="
                    pointer-events-none absolute inset-0
                    bg-black/0 group-hover:bg-black/20
                    transition-colors duration-300
                  "
                />

                {/* Icon */}
                <div
                  className="
                    pointer-events-none absolute inset-0 flex items-center justify-center
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                  "
                >
                  <div className="h-12 w-12 rounded-full bg-white/90 shadow flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#5C8E83]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-4.553a1.5 1.5 0 00-2.121-2.121L13 7.879V6a2 2 0 00-2-2H6a2 2 0 00-2 2v5a2 2 0 002 2h1.879l-4.553 4.553a1.5 1.5 0 102.121 2.121L10 15v3a2 2 0 002 2h5a2 2 0 002-2v-5a2 2 0 00-2-2h-1.879z"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        src={activeItem?.src || ""}
        alt={activeItem?.alt || ""}
        onClose={() => setActiveIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
