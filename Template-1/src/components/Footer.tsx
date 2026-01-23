import React, { useEffect, useRef, useState } from "react";

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
 *  Small Ornament Divider
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
 *  Inline Icons (no library)
 *  ========================= */
function IconInstagram() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 2H8a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6V8a6 6 0 0 0-6-6Z"
      />
      <path
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
      />
      <path
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.5 6.5h.01"
      />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 2h-3a5 5 0 0 0-5 5v3H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2Z"
      />
    </svg>
  );
}

function IconTwitterX() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4l8.5 9.7L4 20h4.5l5.9-5.8L19.5 20H22l-8.8-10L22 4h-4.5l-5.2 5.2L8.3 4H4Z"
      />
    </svg>
  );
}

/** =========================
 *  MAIN FOOTER
 *  ========================= */
export default function Footer() {
  const { ref, show } = useInViewOnce<HTMLElement>(0.12);
  const year = new Date().getFullYear();

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer ref={ref} className="bg-white">
      {/* Top border + subtle background */}
      <div className="border-t border-black/5 bg-gradient-to-b from-white to-[#A9907E]/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div
            className={`
              transition-all duration-700 ease-out
              ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
          >
            {/* Header / Couple */}
            <div className="text-center">
              <p className="text-xs tracking-[0.35em] uppercase text-black/45">
                Thank you for celebrating with us
              </p>

              <h3 className="mt-4 font-[cursive] text-4xl text-[#A9907E]">
                Kenzie <span className="text-[#A9907E]">&</span> Angel
              </h3>

              <HeartDivider color="#A9907E" />

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-black/55">
                “Every love story is beautiful, but ours is my favorite.”
              </p>
            </div>

            {/* Content columns */}
            <div className="mt-12 grid gap-10 md:grid-cols-3">
              {/* Quick Links */}
              <div className="text-center md:text-left">
                <h4 className="text-sm font-medium tracking-widest text-black/65">
                  QUICK LINKS
                </h4>

                <div className="mt-5 space-y-3 text-sm text-black/55">
                  <button
                    onClick={() => scrollToId("home")}
                    className="hover:text-black transition"
                  >
                    Home
                  </button>
                  <div />
                  <button
                    onClick={() => scrollToId("story")}
                    className="hover:text-black transition"
                  >
                    Our Story
                  </button>
                  <div />
                  <button
                    onClick={() => scrollToId("gallery")}
                    className="hover:text-black transition"
                  >
                    Gallery
                  </button>
                  <div />
                  <button
                    onClick={() => scrollToId("location")}
                    className="hover:text-black transition"
                  >
                    Location
                  </button>
                </div>
              </div>

              {/* Contact */}
              <div className="text-center">
                <h4 className="text-sm font-medium tracking-widest text-black/65">
                  CONTACT
                </h4>

                <div className="mt-5 space-y-3 text-sm text-black/55">
                  <p>
                    Email:{" "}
                    <a
                      className="hover:text-black transition underline underline-offset-4 decoration-black/20"
                      href="mailto:hello@wedding.com"
                    >
                      hello@wedding.com
                    </a>
                  </p>
                  <p>
                    Phone:{" "}
                    <a
                      className="hover:text-black transition underline underline-offset-4 decoration-black/20"
                      href="tel:+6281234567890"
                    >
                      +62 812-3456-7890
                    </a>
                  </p>
                  <p className="leading-6">
                    Jakarta, Indonesia
                    <br />
                    Ceremony & Reception
                  </p>
                </div>
              </div>

              {/* Social */}
              <div className="text-center md:text-right">
                <h4 className="text-sm font-medium tracking-widest text-black/65">
                  FOLLOW US
                </h4>

                <div className="mt-5 flex items-center justify-center md:justify-end gap-3">
                  <a
                    href="#"
                    className="
                      group h-11 w-11 rounded-full
                      border border-black/10 bg-white/70 backdrop-blur
                      shadow-[0_10px_25px_rgba(0,0,0,0.06)]
                      flex items-center justify-center
                      transition-all duration-300 ease-out
                      hover:scale-110 hover:-translate-y-0.5
                      hover:shadow-[0_14px_35px_rgba(0,0,0,0.10)]
                      focus:outline-none focus:ring-2 focus:ring-[#A9907E]/60 focus:ring-offset-2
                    "
                    aria-label="Instagram"
                  >
                    <span className="text-[#A9907E] group-hover:text-[#5C8E83] transition-colors">
                      <IconInstagram />
                    </span>
                  </a>

                  <a
                    href="#"
                    className="
                      group h-11 w-11 rounded-full
                      border border-black/10 bg-white/70 backdrop-blur
                      shadow-[0_10px_25px_rgba(0,0,0,0.06)]
                      flex items-center justify-center
                      transition-all duration-300 ease-out
                      hover:scale-110 hover:-translate-y-0.5
                      hover:shadow-[0_14px_35px_rgba(0,0,0,0.10)]
                      focus:outline-none focus:ring-2 focus:ring-[#A9907E]/60 focus:ring-offset-2
                    "
                    aria-label="Facebook"
                  >
                    <span className="text-[#A9907E] group-hover:text-[#5C8E83] transition-colors">
                      <IconFacebook />
                    </span>
                  </a>

                  <a
                    href="#"
                    className="
                      group h-11 w-11 rounded-full
                      border border-black/10 bg-white/70 backdrop-blur
                      shadow-[0_10px_25px_rgba(0,0,0,0.06)]
                      flex items-center justify-center
                      transition-all duration-300 ease-out
                      hover:scale-110 hover:-translate-y-0.5
                      hover:shadow-[0_14px_35px_rgba(0,0,0,0.10)]
                      focus:outline-none focus:ring-2 focus:ring-[#A9907E]/60 focus:ring-offset-2
                    "
                    aria-label="X"
                  >
                    <span className="text-[#A9907E] group-hover:text-[#5C8E83] transition-colors">
                      <IconTwitterX />
                    </span>
                  </a>
                </div>

                <p className="mt-5 text-xs text-black/45">
                  Share your moments with{" "}
                  <span className="text-[#A9907E] font-medium">
                    #NancyElizabeth
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-black/5">
          <div className="mx-auto max-w-6xl px-4 py-5">
            <p className="text-center text-xs text-black/45">
              © {year} Nancy & Elizabeth. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
