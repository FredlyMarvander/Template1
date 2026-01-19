import { useEffect, useState } from "react";
import { formatTime } from "./helper/formatTime";

export default function CoupleSection() {
  const weddingDate = new Date("2026-12-31T01:00:00Z").getTime();

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
      <div>
        {formattedTime.message ? (
          <div className="text-center text-2xl font-semibold mb-8 text-gray-800">
            {formattedTime.message}
          </div>
        ) : null}
        {formattedTime.days} days {formattedTime.hours} hours{" "}
        {formattedTime.minutes} minutes {formattedTime.seconds} seconds
      </div>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Meet the Couple
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Kenzie & Angel are excited to celebrate their special day with you!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg">
              <img
                src="/images/couple1.jpg"
                alt="Kenzie"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg">
              <img
                src="/images/couple2.jpg"
                alt="Angel"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
