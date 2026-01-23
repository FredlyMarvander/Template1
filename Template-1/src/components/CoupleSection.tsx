import { useEffect, useState } from "react";
import { formatTime } from "../helper/formatTime";
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaLinkedinIn,
} from "react-icons/fa";

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-white/40 px-4 md:px-8 py-8 md:py-10 text-center">
      <div className="text-white text-6xl md:text-7xl leading-none">
        {String(value).padStart(2, "0")}
      </div>
      <div className="mt-6 text-white/90 tracking-widest text-sm md:text-base">
        {label}
      </div>
    </div>
  );
}

function HeartIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M32 56s-20-12.6-26.3-25.1C1.7 22.3 6.4 14 15 14c5.2 0 9.2 3 11.4 6.2C28.6 17 32.6 14 38 14c8.6 0 13.3 8.3 9.3 16.9C52 43.4 32 56 32 56Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* “brush tail” biar mirip icon di contoh */}
      <path
        d="M32 56c8-6 13-13 16-20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        text-[#A9907E]
        text-xl
        transition
        hover:text-[#8f7662]
        hover:-translate-y-1
      "
    >
      {icon}
    </a>
  );
}

export default function CoupleSection() {
  const weddingDate = new Date("2026-01-31T01:00:00Z").getTime();

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
  }, []);

  const formattedTime = formatTime(time);

  return (
    <section
      className="relative py-20 bg-white/70 backdrop-blur-md"
      id="couple"
    >
      <div
        className="
    w-full max-w-6xl mx-auto
    rounded-md overflow-hidden
    bg-[url('/images/your-bg.jpg')] bg-cover bg-center
  "
      >
        {/* overlay */}
        <div className="bg-[#A9907E]">
          <div className="flex flex-col md:flex-row items-stretch gap-6 px-6 md:px-10 py-10">
            {/* KIRI */}
            <div className="md:w-[40%] flex items-center">
              <div className="w-full border border-white/40 px-8 py-10">
                <p className="text-white/95 tracking-wide text-2xl md:text-3xl font-semibold">
                  Kami Menantikan…..
                </p>

                <p
                  className="mt-6 text-white text-5xl md:text-6xl italic leading-none"
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                >
                  Hari Bahagia
                </p>
              </div>
            </div>

            {/* KANAN */}
            <div className="md:w-[60%] flex items-center">
              <div className="w-full grid grid-cols-4 gap-5">
                <TimeBox label="HARI" value={formattedTime.days || 0} />
                <TimeBox label="JAM" value={formattedTime.hours || 0} />
                <TimeBox label="MENIT" value={formattedTime.minutes || 0} />
                <TimeBox label="DETIK" value={formattedTime.seconds || 0} />
              </div>
            </div>
          </div>

          {formattedTime.message && (
            <div className="px-6 md:px-10 pb-8 text-center text-white text-2xl font-semibold">
              {formattedTime.message}
            </div>
          )}
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-14">
            <h2
              className="text-5xl md:text-6xl italic text-[#A9907E]"
              style={{ fontFamily: "cursive" }}
            >
              Pasangan Bahagia
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
              <div className="text-center">
                <div className="mx-auto w-72 h-72 md:w-[360px] md:h-[360px] rounded-full overflow-hidden border-4 border-[#A9907E] shadow-sm">
                  <img
                    src="https://res.cloudinary.com/degghm3hf/image/upload/v1768914893/adorable-bride-is-getting-ready-morning_4_dbao9k.jpg"
                    alt="Angel Valencia"
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="mt-8 text-lg md:text-xl tracking-widest text-[#A9907E] uppercase">
                  Angel Valencia
                </p>
                <p className="mt-3 text-md text-[#2B2A2A]">
                  Halo, saya Angel Valencia. Saya ingin memperkenalkan diri.
                  Saya seorang desainer grafis profesional yang senang
                  menciptakan karya visual yang bermakna.
                </p>

                <div className="mt-8 flex items-center justify-center gap-6">
                  <SocialIcon href="#" icon={<FaFacebookF />} />
                  <SocialIcon href="#" icon={<FaTwitter />} />
                  <SocialIcon href="#" icon={<FaGooglePlusG />} />
                  <SocialIcon href="#" icon={<FaLinkedinIn />} />
                </div>
              </div>

              {/* Heart center */}
              <div className="flex items-center justify-center">
                <img
                  src="https://res.cloudinary.com/degghm3hf/image/upload/v1768913204/ChatGPT_Image_Jan_20_2026_07_46_16_PM_e73z3d.png"
                  alt="Heart Icon"
                />
              </div>

              {/* Right */}
              <div className="text-center">
                <div className="mx-auto w-72 h-72 md:w-[360px] md:h-[360px] rounded-full overflow-hidden border-4 border-[#A9907E] shadow-sm">
                  <img
                    src="https://res.cloudinary.com/degghm3hf/image/upload/v1768914509/groom-with-bouquet-flowers_2_bd59ki.jpg"
                    alt="Kenzie Yang"
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="mt-8 text-lg md:text-xl tracking-widest text-[#A9907E] uppercase">
                  Kenzie Yang
                </p>

                <p className="mt-3 text-md text-[#2B2A2A]">
                  Halo, saya Kenzie Yang. Saya ingin memperkenalkan diri. Saya
                  seorang desainer grafis profesional yang senang menciptakan
                  karya visual yang bermakna.
                </p>

                <div className="mt-8 flex items-center justify-center gap-6">
                  <SocialIcon href="#" icon={<FaFacebookF />} />
                  <SocialIcon href="#" icon={<FaTwitter />} />
                  <SocialIcon href="#" icon={<FaGooglePlusG />} />
                  <SocialIcon href="#" icon={<FaLinkedinIn />} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
