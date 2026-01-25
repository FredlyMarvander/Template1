import { useEffect, useMemo, useRef, useState } from "react";
import { formatTime } from "../helper/formatTime";
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaLinkedinIn,
} from "react-icons/fa";
import data from "../config/wedding-data.json";

/** ✅ Hook ringan untuk animasi saat elemen masuk viewport */
function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect(); // sekali animasi saja
      }
    }, options);

    observer.observe(el);

    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
}

function TimeBox({
  label,
  value,
  visible,
  delay = 0,
}: {
  label: string;
  value: number;
  visible: boolean;
  delay?: number;
}) {
  return (
    <div
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        "border border-white/40 px-4 md:px-8 py-8 md:py-10 text-center",
        "transition-[opacity,transform] duration-700 ease-out will-change-transform",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      ].join(" ")}
    >
      <div className="text-white text-6xl md:text-7xl leading-none">
        {String(value).padStart(2, "0")}
      </div>
      <div className="mt-6 text-white/90 tracking-widest text-sm md:text-base">
        {label}
      </div>
    </div>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        text-[#A9907E] text-xl
        transition-all duration-300 ease-out
        hover:text-[#8f7662]
        hover:-translate-y-1 hover:scale-110
        active:scale-95
      "
    >
      {icon}
    </a>
  );
}

export default function CoupleSection() {
  const weddingDate = new Date(data.countdown.weddingDateISO).getTime();
  const [time, setTime] = useState(weddingDate - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = weddingDate - Date.now();
      if (diff <= 0) {
        setTime(0);
        clearInterval(interval);
      } else {
        setTime(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [weddingDate]);

  const formattedTime = formatTime(time);

  /** ✅ animasi on-scroll */
  const { ref: sectionRef, inView } = useInView<HTMLDivElement>({
    threshold: 0.15,
  });

  return (
    <section className="relative bg-white" id="couple">
      {/* ========== COUNTDOWN ========== */}
      <div className="py-20 bg-white/70 backdrop-blur-md">
        <div
          ref={sectionRef}
          className="
            w-full max-w-6xl mx-auto
            rounded-md overflow-hidden
            bg-[url('/images/your-bg.jpg')] bg-cover bg-center
          "
        >
          {/* overlay */}
          <div className="bg-[#A9907E]">
            <div
              className={[
                "flex flex-col md:flex-row items-stretch gap-6 px-6 md:px-10 py-10",
                "transition-[opacity,transform] duration-700 ease-out",
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5",
              ].join(" ")}
            >
              {/* KIRI */}
              <div className="md:w-[40%] flex items-center">
                <div
                  style={{ transitionDelay: "80ms" }}
                  className={[
                    "w-full border border-white/40 px-8 py-10",
                    "transition-[opacity,transform] duration-700 ease-out",
                    inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6",
                  ].join(" ")}
                >
                  <p className="text-white/95 tracking-wide text-2xl md:text-3xl font-semibold">
                    {data.countdown.titleMain}
                  </p>

                  <p
                    className="mt-6 text-white text-5xl md:text-6xl italic leading-none"
                    style={{ fontFamily: "'Great Vibes', cursive" }}
                  >
                    {data.countdown.titleSmall}
                  </p>
                </div>
              </div>

              {/* KANAN */}
              <div className="md:w-[60%] flex items-center">
                <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-5">
                  <TimeBox
                    label="HARI"
                    value={formattedTime.days || 0}
                    visible={inView}
                    delay={120}
                  />
                  <TimeBox
                    label="JAM"
                    value={formattedTime.hours || 0}
                    visible={inView}
                    delay={190}
                  />
                  <TimeBox
                    label="MENIT"
                    value={formattedTime.minutes || 0}
                    visible={inView}
                    delay={260}
                  />
                  <TimeBox
                    label="DETIK"
                    value={formattedTime.seconds || 0}
                    visible={inView}
                    delay={330}
                  />
                </div>
              </div>
            </div>

            {formattedTime.message && (
              <div
                style={{ transitionDelay: "420ms" }}
                className={[
                  "px-6 md:px-10 pb-8 text-center text-white text-2xl font-semibold",
                  "transition-[opacity,transform] duration-700 ease-out",
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4",
                ].join(" ")}
              >
                {formattedTime.message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========== COUPLE ========== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div
            className={[
              "text-center mb-14",
              "transition-[opacity,transform] duration-700 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
            ].join(" ")}
          >
            <h2
              className="text-5xl md:text-6xl italic text-[#A9907E]"
              style={{ fontFamily: "cursive" }}
            >
              {data.couple.sectionTitle}
            </h2>

            {/* Ornamen simpel */}
            <div className="mt-4 flex items-center justify-center gap-4 opacity-60">
              <span className="h-px w-16 bg-[#A9907E]" />
              <span className="text-[#A9907E] text-xl">♡</span>
              <span className="h-px w-16 bg-[#A9907E]" />
            </div>
          </div>

          {/* Content */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-10 md:gap-16">
              {/* Left */}
              <div
                style={{ transitionDelay: "120ms" }}
                className={[
                  "text-center",
                  "transition-[opacity,transform] duration-700 ease-out will-change-transform",
                  inView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-6",
                ].join(" ")}
              >
                <div className="mx-auto w-72 h-72 md:w-[360px] md:h-[360px] rounded-full overflow-hidden border-4 border-[#A9907E] shadow-sm">
                  <img
                    src={data.couple.people[0].photo}
                    alt={data.couple.people[0].name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <p className="mt-8 text-lg md:text-xl tracking-widest text-[#A9907E] uppercase">
                  {data.couple.people[0].name}
                </p>
                <p className="mt-3 text-md text-[#2B2A2A]">
                  {data.couple.people[0].bio}
                </p>

                <div className="mt-8 flex items-center justify-center gap-6">
                  <SocialIcon
                    href={data.couple.people[0].socials[0].url}
                    icon={<FaFacebookF />}
                  />
                  <SocialIcon
                    href={data.couple.people[0].socials[1].url}
                    icon={<FaTwitter />}
                  />
                  <SocialIcon
                    href={data.couple.people[0].socials[2].url}
                    icon={<FaGooglePlusG />}
                  />
                  <SocialIcon
                    href={data.couple.people[0].socials[3].url}
                    icon={<FaLinkedinIn />}
                  />
                </div>
              </div>

              {/* Heart center */}
              <div
                style={{ transitionDelay: "220ms" }}
                className={[
                  "flex items-center justify-center",
                  "transition-[opacity,transform] duration-700",
                  inView ? "opacity-100 scale-100" : "opacity-0 scale-95",
                ].join(" ")}
              >
                <img
                  src="https://res.cloudinary.com/degghm3hf/image/upload/v1768913204/ChatGPT_Image_Jan_20_2026_07_46_16_PM_e73z3d.png"
                  alt="Heart Icon"
                  loading="lazy"
                />
              </div>

              {/* Right */}
              <div
                style={{ transitionDelay: "120ms" }}
                className={[
                  "text-center",
                  "transition-[opacity,transform] duration-700 ease-out will-change-transform",
                  inView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-6",
                ].join(" ")}
              >
                <div className="mx-auto w-72 h-72 md:w-[360px] md:h-[360px] rounded-full overflow-hidden border-4 border-[#A9907E] shadow-sm">
                  <img
                    src={data.couple.people[1].photo}
                    alt={data.couple.people[1].name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <p className="mt-8 text-lg md:text-xl tracking-widest text-[#A9907E] uppercase">
                  {data.couple.people[1].name}
                </p>

                <p className="mt-3 text-md text-[#2B2A2A]">
                  {data.couple.people[1].bio}
                </p>

                <div className="mt-8 flex items-center justify-center gap-6">
                  <SocialIcon
                    href={data.couple.people[1].socials[0].url}
                    icon={<FaFacebookF />}
                  />
                  <SocialIcon
                    href={data.couple.people[1].socials[1].url}
                    icon={<FaTwitter />}
                  />
                  <SocialIcon
                    href={data.couple.people[1].socials[2].url}
                    icon={<FaGooglePlusG />}
                  />
                  <SocialIcon
                    href={data.couple.people[1].socials[3].url}
                    icon={<FaLinkedinIn />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
