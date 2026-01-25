import React, { useEffect, useMemo, useRef, useState } from "react";
import data from "../config/wedding-data.json";

/** =========================
 *  TYPES
 *  ========================= */
type Person = {
  name: string;
  role: string;
  photo: string;
};

type TabKey = "groomsmen" | "bridesmaids";

/** =========================
 *  DATA (contoh)
 *  ========================= */
const GROOMSMEN: Person[] = data.people.groomsmen;

const BRIDESMAIDS: Person[] = data.people.bridesmaids;

/** =========================
 *  HOOK: animate once on scroll
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
 *  UI
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

function PersonCard({
  person,
  index,
  sectionVisible,
  tabKey,
}: {
  person: Person;
  index: number;
  sectionVisible: boolean;
  tabKey: TabKey;
}) {
  // Stagger animation: delay per card
  const delay = Math.min(index * 80, 480);

  return (
    <div
      className={`
        bg-white border border-black/5
        shadow-[0_12px_30px_rgba(0,0,0,0.06)]
        transition-all duration-700 ease-out
        ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      style={{
        transitionDelay: sectionVisible ? `${delay}ms` : "0ms",
      }}
      // key kecil supaya saat tab ganti, animasi terasa fresh
      data-tab={tabKey}
    >
      <div className="p-6">
        {/* Image */}
        <div className="aspect-[4/3] w-full overflow-hidden bg-black/5">
          <img
            src={person.photo}
            alt={person.name}
            loading="lazy"
            className="
              h-full w-full object-cover
              transition-transform duration-700 ease-out
              hover:scale-105
            "
          />
        </div>

        {/* Text */}
        <div className="text-center pt-4">
          <h3 className="text-[#5C8E83] font-medium tracking-wide">
            {person.name}
          </h3>
          <p className="mt-1 text-xs text-black/55 tracking-wide">
            {person.role}
          </p>
        </div>
      </div>
    </div>
  );
}

/** =========================
 *  MAIN
 *  ========================= */
export default function Relative() {
  const [activeTab, setActiveTab] = useState<TabKey>("groomsmen");
  const { ref, show } = useInViewOnce<HTMLDivElement>(0.15);

  const list = useMemo(() => {
    return activeTab === "groomsmen" ? GROOMSMEN : BRIDESMAIDS;
  }, [activeTab]);

  return (
    <section ref={ref} className="bg-white py-20" id="people">
      <div className="mx-auto max-w-6xl px-4">
        {/* Title */}
        <div
          className={`
            text-center transition-all duration-700 ease-out
            ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <h2 className="font-[cursive] text-4xl text-[#A9907E]">
            {data.people.sectionTitle}
          </h2>
          <HeartDivider color="#A9907E" />
        </div>

        {/* Tabs */}
        <div
          className={`
            mt-10 flex items-center justify-center
            transition-all duration-700 ease-out
            ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <div className="relative inline-flex border border-black/10 bg-white shadow-sm">
            {/* Active highlight */}
            <span
              className={`
                absolute top-0 bottom-0 w-1/2 bg-[#A9907E]
                transition-transform duration-300 ease-out
              `}
              style={{
                transform:
                  activeTab === "groomsmen"
                    ? "translateX(0%)"
                    : "translateX(100%)",
              }}
            />

            <button
              type="button"
              onClick={() => setActiveTab("groomsmen")}
              className={`
                relative z-10 px-6 py-2 text-sm tracking-wide
                transition-colors duration-300
                ${activeTab === "groomsmen" ? "text-white" : "text-black/70"}
              `}
              aria-selected={activeTab === "groomsmen"}
              role="tab"
            >
              {data.people.sectionGroomsmen}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("bridesmaids")}
              className={`
                relative z-10 px-6 py-2 text-sm tracking-wide
                transition-colors duration-300
                ${activeTab === "bridesmaids" ? "text-white" : "text-black/70"}
              `}
              aria-selected={activeTab === "bridesmaids"}
              role="tab"
            >
              {data.people.sectionBridesmaids}
            </button>
          </div>
        </div>

        {/* Divider line under tabs (like the design) */}
        <div className="mt-6 flex justify-center">
          <div className="w-full max-w-4xl h-px bg-black/10" />
        </div>

        {/* Content (fade when tab changes) */}
        <div
          className="
            mt-10
            transition-opacity duration-300
          "
          key={activeTab}
        >
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((person, idx) => (
              <PersonCard
                key={person.name + idx}
                person={person}
                index={idx}
                sectionVisible={show}
                tabKey={activeTab}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
