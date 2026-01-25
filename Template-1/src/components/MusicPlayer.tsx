import { useState, useEffect, useRef } from "react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Show button after a short delay
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Initialize audio and try autoplay immediately
  useEffect(() => {
    const audio = new Audio("/music/Beautiful_In_White.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = "auto";
    audioRef.current = audio;

    const tryAutoplay = () => {
      setIsReady(true);

      // Attempt autoplay immediately
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowPrompt(false);
          console.log("✅ Autoplay berhasil!");
        })
        .catch((err) => {
          console.log("⚠️ Autoplay diblokir browser:", err.message);
          setShowPrompt(true); // Show prompt to user
        });
    };

    audio.addEventListener("canplaythrough", tryAutoplay);

    return () => {
      audio.removeEventListener("canplaythrough", tryAutoplay);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowPrompt(false);
        })
        .catch((err) => {
          console.error("Play error:", err);
        });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleClick = () => {
    setShowPrompt(false);
    if (isMuted) {
      toggleMute();
    } else {
      togglePlay();
    }
  };

  return (
    <div
      className={`fixed bottom-8 left-8 z-50 transition-all duration-500
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      {/* Prompt bubble when autoplay blocked */}
      {showPrompt && !isPlaying && (
        <div className="absolute bottom-full left-0 mb-3 animate-bounce">
          <div className="bg-white/95 backdrop-blur text-[#675D50] text-sm px-4 py-2 rounded-full shadow-lg whitespace-nowrap font-medium">
            🎵 Klik untuk putar musik
          </div>
          <div className="absolute -bottom-1 left-5 w-3 h-3 bg-white/95 rotate-45" />
        </div>
      )}

      <button
        onClick={handleClick}
        aria-label={
          isMuted ? "Unmute music" : isPlaying ? "Pause music" : "Play music"
        }
        className={`
          group
          w-12 h-12 flex items-center justify-center
          rounded-full
          bg-[#A9907E]/90 backdrop-blur
          border border-white/20
          text-white
          shadow-[0_8px_30px_rgba(0,0,0,0.25)]
          transition-all duration-300 ease-out
          hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]
          hover:scale-110
          hover:-translate-y-1
          active:scale-95
          focus:outline-none
          focus:ring-2
          focus:ring-white/70
          focus:ring-offset-2
          focus:ring-offset-[#A9907E]
          ${showPrompt ? "ring-2 ring-white/50 animate-pulse" : ""}
        `}
      >
        {isMuted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            />
          </svg>
        ) : isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        )}
      </button>

      {/* Animated sound waves when playing */}
      {isPlaying && !isMuted && (
        <div className="absolute -top-1 -right-1 flex gap-0.5">
          <span
            className="w-0.5 bg-white/70 rounded-full animate-pulse"
            style={{ height: "8px", animationDuration: "0.6s" }}
          />
          <span
            className="w-0.5 bg-white/70 rounded-full animate-pulse"
            style={{
              height: "12px",
              animationDuration: "0.6s",
              animationDelay: "0.2s",
            }}
          />
          <span
            className="w-0.5 bg-white/70 rounded-full animate-pulse"
            style={{
              height: "8px",
              animationDuration: "0.6s",
              animationDelay: "0.4s",
            }}
          />
        </div>
      )}

      {/* Loading indicator */}
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
