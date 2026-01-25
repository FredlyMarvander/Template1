import React, { useEffect, useMemo, useRef, useState } from "react";
import { MdDateRange } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa";
import data from "../config/wedding-data.json";

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
 *  Types
 *  ========================= */
type EventLocation = {
  label: "AKAD" | "RESEPSI";
  title: string;
  date: string;
  time: string;
  address: string;
  mapQuery: string; // dipakai untuk google maps link
  note?: string;
};

/** =========================
 *  DATA (ganti sesuai kebutuhanmu)
 *  ========================= */
const LOCATIONS: EventLocation[] = data.location.events as EventLocation[];
/** =========================
 *  UI Components
 *  ========================= */
function LocationCard({
  item,
  visible,
  delay,
}: {
  item: EventLocation;
  visible: boolean;
  delay: number;
}) {
  const mapsUrl = useMemo(() => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      item.mapQuery,
    )}`;
  }, [item.mapQuery]);

  return (
    <div
      className={`
        bg-white border border-black/5
        shadow-[0_12px_30px_rgba(0,0,0,0.06)]
        transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      style={{
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
    >
      <div className="p-7 flex flex-col items-center">
        {/* Badge */}
        <div className="flex items-center justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-1 text-xs tracking-widest uppercase border border-[#A9907E]/30 text-[#A9907E] bg-[#A9907E]/5">
            <span className="h-2 w-2 rounded-full bg-[#A9907E]" />
            {item.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-5 text-center font-[cursive] text-3xl text-[#A9907E]">
          {item.title}
        </h3>

        {/* Info */}
        <div className="mt-5 space-y-3 text-sm text-black/70 w-50">
          <div className="flex items-start gap-3">
            <span className="mt-[4px] text-[#A9907E]">
              <MdDateRange />
            </span>
            <div>
              <p className="font-medium text-black/75">{item.date}</p>
              <p className="text-black/55">{item.time}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="mt-[5px] text-[#A9907E]">
              <FaLocationDot />
            </span>
            <p className="leading-6">{item.address}</p>
          </div>

          {item.note && (
            <div className="flex items-start gap-3">
              <span className="mt-[6px] text-[#A9907E]">
                <FaLightbulb />
              </span>
              <p className="leading-6 text-black/55">{item.note}</p>
            </div>
          )}
        </div>

        {/* Button */}
        <div className="mt-7 flex justify-center">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex items-center justify-center gap-2
              px-6 py-2
              bg-[#A9907E] text-white
              text-sm tracking-wide
              shadow-[0_10px_25px_rgba(169,144,126,0.35)]
              transition-all duration-300 ease-out
              hover:scale-105 hover:shadow-[0_14px_35px_rgba(169,144,126,0.45)]
              active:scale-95
              focus:outline-none focus:ring-2 focus:ring-[#A9907E]/60 focus:ring-offset-2
            "
          >
            Lihat di Google Maps
            <span className="text-lg">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/** =========================
 *  MAIN COMPONENT
 *  ========================= */
export default function LocationDetail() {
  const { ref, show } = useInViewOnce<HTMLDivElement>(0.15);

  // Embed map: pilih satu lokasi utama (misal ceremony)
  const mainEmbed = useMemo(() => {
    const query = LOCATIONS[0]?.mapQuery || "Jakarta, Indonesia";
    return `https://www.google.com/maps?q=${encodeURIComponent(
      query,
    )}&output=embed`;
  }, []);

  return (
    <section ref={ref} className="bg-white py-20" id="location">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div
          className={`
            text-center transition-all duration-700 ease-out
            ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <h2 className="font-[cursive] text-4xl text-[#A9907E]">
            {data.location.sectionTitle}
          </h2>
          <HeartDivider color="#A9907E" />
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-black/55">
            {data.location.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {LOCATIONS.map((item, idx) => (
            <LocationCard
              key={item.label}
              item={item}
              visible={show}
              delay={Math.min(idx * 120, 240)}
            />
          ))}
        </div>

        {/* Map Embed */}
        <div
          className={`
            mt-12 overflow-hidden border border-black/5 bg-white
            shadow-[0_14px_40px_rgba(0,0,0,0.08)]
            transition-all duration-700 ease-out
            ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
          style={{ transitionDelay: show ? "260ms" : "0ms" }}
        >
          <div className="aspect-[16/7] w-full">
            <iframe
              title="Wedding Location Map"
              src={mainEmbed}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
