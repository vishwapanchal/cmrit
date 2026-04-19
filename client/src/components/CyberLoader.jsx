import { useState, useEffect } from "react";

/**
 * Cyberpunk-style glitchy loading screen with scanlines,
 * random data fragments, and chromatic aberration effects.
 */

const GLITCH_WORDS = [
  "INITIALIZING NEURAL MESH...",
  "DECRYPTING MSME VECTORS...",
  "LOADING CREDIT MATRIX...",
  "PARSING GST TELEMETRY...",
  "SYNCING FINANCIAL NODES...",
  "ASSEMBLING SCORE ENGINE...",
  "CONNECTING TO DATABASE...",
  "VERIFYING AUTH TOKENS...",
  "MAPPING RISK TOPOLOGY...",
  "CALIBRATING AI MODEL...",
];

const HEX_CHARS = "0123456789ABCDEF";
const randomHex = (len) => Array.from({ length: len }, () => HEX_CHARS[Math.floor(Math.random() * 16)]).join("");

export default function CyberLoader() {
  const [line, setLine] = useState(0);
  const [glitchText, setGlitchText] = useState("");
  const [hexDump, setHexDump] = useState([]);
  const [progress, setProgress] = useState(0);
  const [flicker, setFlicker] = useState(false);

  // Cycle status lines
  useEffect(() => {
    const interval = setInterval(() => {
      setLine((p) => (p + 1) % GLITCH_WORDS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  // Glitch text effect
  useEffect(() => {
    const interval = setInterval(() => {
      const target = GLITCH_WORDS[line];
      const garbled = target
        .split("")
        .map((c) => (Math.random() > 0.7 ? String.fromCharCode(33 + Math.floor(Math.random() * 93)) : c))
        .join("");
      setGlitchText(garbled);
    }, 80);
    return () => clearInterval(interval);
  }, [line]);

  // Hex dump
  useEffect(() => {
    const interval = setInterval(() => {
      setHexDump((prev) => {
        const next = [...prev, `0x${randomHex(4)}  ${randomHex(8)}  ${randomHex(8)}  ${randomHex(4)}`];
        return next.slice(-6);
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 8 + 2, 98));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Random flicker
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setFlicker(true);
        setTimeout(() => setFlicker(false), 100 + Math.random() * 150);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 max-w-[1200px]">
      <div
        className="card overflow-hidden relative"
        style={{
          background: "linear-gradient(135deg, rgba(var(--primary-rgb, 99,102,241), 0.03) 0%, transparent 100%)",
          opacity: flicker ? 0.7 : 1,
          transition: "opacity 50ms",
        }}
      >
        {/* Scanlines overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
          }}
        />

        <div className="p-8 relative z-20">
          {/* Header with glitch */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm"
                style={{
                  background: "var(--color-primary)",
                  color: "white",
                  boxShadow: "0 0 20px rgba(99,102,241,0.3)",
                }}
              >
                CS
              </div>
              {/* Chromatic aberration */}
              <div
                className="absolute inset-0 w-10 h-10 rounded-lg opacity-30"
                style={{
                  background: "var(--color-primary)",
                  transform: `translate(${Math.random() > 0.5 ? 2 : -2}px, ${Math.random() > 0.5 ? 1 : -1}px)`,
                  mixBlendMode: "screen",
                }}
              />
            </div>
            <div>
              <h2 className="text-sm font-bold text-txt tracking-wider">CREDITSAATHI</h2>
              <p className="text-[10px] text-txt-muted font-mono tracking-widest">SYSTEM LOADING</p>
            </div>
          </div>

          {/* Glitch status text */}
          <div className="mb-5">
            <p
              className="font-mono text-xs tracking-wider"
              style={{
                color: "var(--color-primary)",
                textShadow: "0 0 10px rgba(99,102,241,0.4)",
              }}
            >
              {"> "}{glitchText}
              <span className="animate-pulse">█</span>
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono text-txt-muted tracking-wider">LOADING</span>
              <span className="text-[10px] font-mono text-txt-muted">{Math.floor(progress)}%</span>
            </div>
            <div className="h-1 bg-surface-alt rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, var(--color-primary), var(--color-success))",
                  boxShadow: "0 0 12px rgba(99,102,241,0.5)",
                }}
              />
            </div>
          </div>

          {/* Hex dump */}
          <div
            className="font-mono text-[10px] space-y-0.5 p-3 rounded-lg"
            style={{
              background: "rgba(0,0,0,0.15)",
              color: "var(--color-txt-muted)",
              maxHeight: "110px",
              overflow: "hidden",
            }}
          >
            {hexDump.map((h, i) => (
              <div
                key={i}
                className="flex gap-3"
                style={{
                  opacity: i === hexDump.length - 1 ? 1 : 0.4 + (i / hexDump.length) * 0.4,
                }}
              >
                <span style={{ color: "var(--color-primary)", opacity: 0.6 }}>
                  {String(i).padStart(3, "0")}
                </span>
                <span>{h}</span>
              </div>
            ))}
          </div>

          {/* Bottom status dots */}
          <div className="flex items-center gap-4 mt-5">
            {["DATABASE", "AUTH", "ML ENGINE", "API"].map((label, i) => (
              <div key={label} className="flex items-center gap-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: progress > (i + 1) * 20 ? "var(--color-success)" : "var(--color-border)",
                    boxShadow: progress > (i + 1) * 20 ? "0 0 6px rgba(61,217,168,0.5)" : "none",
                    transition: "all 0.5s",
                  }}
                />
                <span className="text-[9px] font-mono text-txt-muted tracking-wider">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
