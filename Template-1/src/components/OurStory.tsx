import React, { useEffect, useRef, useState } from "react";

/** =========================
 *  DATA
 *  ========================= */
const STORY_ITEMS = [
  {
    title: "Pertemuan Pertama",
    date: "20 Juli 2020",
    desc: "Ada banyak kisah yang mengiringi awal pertemuan kami.Namun dari semua itu, pertemuan inilah yang menjadi awal dari perjalanan cinta kami.",
    image:
      "https://res.cloudinary.com/degghm3hf/image/upload/v1769090910/young-couple-running-along-tracks_c5zshm.jpg",
  },
  {
    title: "Kencan Pertama Kami",
    date: "25 Desember 2023",
    desc: "Hari itu menjadi momen yang tak terlupakan bagi kami. Sebuah kencan sederhana yang penuh tawa, cerita, dan awal dari rasa yang semakin tumbuh.",
    image:
      "https://res.cloudinary.com/degghm3hf/image/upload/v1769090987/couple-holding-hands-valentines-evening-restaurant_lkzepi.jpg",
  },
  {
    title: "Lamaran Pernikahan Kami",
    date: "10 Januari 2026",
    desc: "Hari yang penuh haru dan kebahagiaan. Sebuah pertanyaan sederhana yang akhirnya membawa kami pada satu jawaban: untuk melangkah bersama selamanya.",
    image:
      "https://res.cloudinary.com/degghm3hf/image/upload/v1769091101/side-view-happy-man-proposing_elzhaj.jpg",
  },
  {
    title: "Pertunangan Kami",
    date: "22 Juni 2026",
    desc: "Hari yang penuh kebahagiaan dan harapan. Pada hari itu, kami resmi bertunangan dan berkomitmen untuk melangkah bersama menuju masa depan.",
    image:
      "https://res.cloudinary.com/degghm3hf/image/upload/v1769091164/groom-putting-ring-bride-s-finger_u1w6a1.jpg",
  },
];

/** =========================
 *  HOOK: Animate on scroll once
 *  (No library needed)
 *  ========================= */
function useInViewOnce<T extends HTMLElement>(threshold = 0.2) {
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
 *  UI Components
 *  ========================= */
function HeartDivider({ color = "#A9907E" }: { color?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-2">
      <span className="h-px w-12 bg-[rgba(169,144,126,0.35)]" />
      <svg width="54" height="16" viewBox="0 0 54 16" fill="none">
        <path
          d="M12 8c-2.8-3.8-8-2.3-8 2.3C4 13 7 15 12 15c5 0 8-2 8-4.7C20 5.7 14.8 4.2 12 8Z"
          stroke={color}
          strokeWidth="1.2"
        />
        <path
          d="M27 8c-2.8-3.8-8-2.3-8 2.3C19 13 22 15 27 15c5 0 8-2 8-4.7C35 5.7 29.8 4.2 27 8Z"
          stroke={color}
          strokeWidth="1.2"
          opacity="0.75"
        />
        <path
          d="M42 8c-2.8-3.8-8-2.3-8 2.3C34 13 37 15 42 15c5 0 8-2 8-4.7C50 5.7 44.8 4.2 42 8Z"
          stroke={color}
          strokeWidth="1.2"
          opacity="0.55"
        />
      </svg>
      <span className="h-px w-12 bg-[rgba(169,144,126,0.35)]" />
    </div>
  );
}

function TimelineNode() {
  return (
    <div className="relative z-10 flex items-center justify-center">
      <span className="h-5 w-5 rounded-full bg-[#A9907E]/20 ring-1 ring-[#A9907E]/35" />
      <span className="absolute h-2 w-2 rounded-full bg-[#A9907E]" />
    </div>
  );
}

function CenterOrnament({
  top = false,
  bottom = false,
}: {
  top?: boolean;
  bottom?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      {top && (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path
            d="M13 5c2.2-3 6.6-1.8 6.6 1.8 0 2.1-1.4 3.6-3.1 4.7-1 .7-2.2 1.2-3.5 1.6-1.3-.4-2.5-.9-3.5-1.6C4.8 10.4 3.4 8.9 3.4 6.8 3.4 3.2 7.8 2 10 5"
            stroke="#A9907E"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
          <path
            d="M13 13v8"
            stroke="#A9907E"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.65"
          />
        </svg>
      )}

      {bottom && (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path
            d="M13 21c-2.2 3-6.6 1.8-6.6-1.8 0-2.1 1.4-3.6 3.1-4.7 1-.7 2.2-1.2 3.5-1.6 1.3.4 2.5.9 3.5 1.6 1.7 1.1 3.1 2.6 3.1 4.7 0 3.6-4.4 4.8-6.6 1.8"
            stroke="#A9907E"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
          <path
            d="M13 13V5"
            stroke="#A9907E"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.65"
          />
        </svg>
      )}
    </div>
  );
}

function StoryCard({ item }: { item: (typeof STORY_ITEMS)[number] }) {
  const { ref, show } = useInViewOnce<HTMLDivElement>(0.15);

  return (
    <div
      ref={ref}
      className={`
        bg-white border border-black/5
        shadow-[0_10px_30px_rgba(0,0,0,0.08)]
        transition-all duration-700 ease-out
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
    >
      <div className="p-6">
        <div className="aspect-[16/10] w-full overflow-hidden bg-black/5">
          <img
            src={item.image}
            alt={item.title}
            className="
              h-full w-full object-cover
              transition-transform duration-700 ease-out
              hover:scale-105
            "
            loading="lazy"
          />
        </div>

        <h3 className="mt-5 font-[cursive] text-2xl text-[#A9907E]">
          {item.title}
        </h3>

        <p className="mt-2 text-sm text-black/55">{item.date}</p>

        <p className="mt-4 text-sm leading-6 text-black/70">{item.desc}</p>
      </div>
    </div>
  );
}

/** =========================
 *  MAIN COMPONENT
 *  ========================= */
export default function OurStory() {
  return (
    <section className="bg-white py-20" id="story">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-[cursive] text-4xl text-[#A9907E]">Kisah Kami</h2>
          <HeartDivider />
        </div>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Center vertical line (desktop only) */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full -translate-x-1/2 md:block">
            <div className="mx-auto h-full w-px bg-[#A9907E]/25" />
          </div>

          {/* Top ornament (desktop only) */}
          <div className="pointer-events-none absolute left-1/2 -top-10 hidden -translate-x-1/2 md:block">
            <CenterOrnament top />
          </div>

          {/* Items */}
          <div className="space-y-14">
            {STORY_ITEMS.map((item, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <div key={idx} className="relative">
                  {/* ✅ DESKTOP: left-right alternating */}
                  <div className="hidden md:grid items-start gap-8 md:grid-cols-[1fr_80px_1fr]">
                    {/* Left */}
                    <div className={isLeft ? "block" : "invisible"}>
                      <StoryCard item={item} />
                    </div>

                    {/* Center node */}
                    <div className="flex justify-center pt-10">
                      <TimelineNode />
                    </div>

                    {/* Right */}
                    <div className={!isLeft ? "block" : "invisible"}>
                      <StoryCard item={item} />
                    </div>
                  </div>

                  {/* ✅ MOBILE: single column (NO DOUBLE BUG) */}
                  <div className="md:hidden">
                    <StoryCard item={item} />

                    {/* small connector line between cards */}
                    {idx !== STORY_ITEMS.length - 1 && (
                      <div className="mt-8 flex justify-center">
                        <span className="h-10 w-px bg-[#A9907E]/25" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom ornament (desktop only) */}
          <div className="pointer-events-none absolute left-1/2 -bottom-10 hidden -translate-x-1/2 md:block">
            <CenterOrnament bottom />
          </div>
        </div>
      </div>
    </section>
  );
}
