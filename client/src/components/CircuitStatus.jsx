import { useState, useEffect, useRef } from "react";
import api from "../services/api";

/**
 * EKG / heartbeat wave status indicator.
 * Pings the backend /health endpoint and draws a continuous
 * electrocardiogram-style wave — green when live, red when offline.
 */
export default function CircuitStatus() {
  const [status, setStatus] = useState("checking"); // checking | live | offline
  const [latency, setLatency] = useState(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const offsetRef = useRef(0);

  // Ping backend
  useEffect(() => {
    let mounted = true;
    const check = async () => {
      const start = Date.now();
      try {
        await api.get("/health");
        if (mounted) { setStatus("live"); setLatency(Date.now() - start); }
      } catch {
        if (mounted) { setStatus("offline"); setLatency(null); }
      }
    };
    check();
    const interval = setInterval(check, 30000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  // Canvas wave animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // EKG waveform pattern (normalized 0–1 for y, repeated every `period` px)
    const getEKGY = (t) => {
      // t is 0..1 within one heartbeat cycle
      const mid = 0.5;
      if (t < 0.10) return mid;                                      // flat
      if (t < 0.14) return mid - (t - 0.10) * 3.5;                   // small P wave up
      if (t < 0.18) return mid - 0.14 + (t - 0.14) * 3.5;           // P wave down
      if (t < 0.30) return mid;                                      // flat PR
      if (t < 0.34) return mid + (t - 0.30) * 5;                     // Q dip down
      if (t < 0.40) return mid + 0.20 - (t - 0.34) * 18;            // R spike up
      if (t < 0.44) return mid - 0.88 + (t - 0.40) * 16;            // R come back
      if (t < 0.48) return mid + (t - 0.44) * 6;                     // S dip
      if (t < 0.52) return mid + 0.24 - (t - 0.48) * 6;             // S return
      if (t < 0.62) return mid;                                      // ST segment
      if (t < 0.70) return mid - (t - 0.62) * 2.5;                   // T wave up
      if (t < 0.78) return mid - 0.20 + (t - 0.70) * 2.5;           // T wave down
      return mid;                                                     // flat
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width, h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const isLive = status === "live";
      const isOffline = status === "offline";

      // Colors
      const r = isLive ? 61 : isOffline ? 239 : 156;
      const g = isLive ? 217 : isOffline ? 68 : 163;
      const b = isLive ? 168 : isOffline ? 68 : 175;

      // Period of one heartbeat in pixels
      const period = 200;
      const speed = isLive ? 1.2 : isOffline ? 0.3 : 0.6;
      offsetRef.current += speed;

      // Draw faint grid lines
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.04)`;
      ctx.lineWidth = 0.5;
      for (let gx = 0; gx < w; gx += 20) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke();
      }
      for (let gy = 0; gy < h; gy += 10) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke();
      }

      // Draw the EKG wave
      const amplitude = h * 0.35;
      const centerY = h * 0.5;

      // Trailing glow line
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.6)`;
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.5)`;
      ctx.shadowBlur = 8;

      for (let x = 0; x < w; x++) {
        const phase = ((x + offsetRef.current) % period) / period;
        const flatline = isOffline ? 0 : 1;
        const y = centerY - (getEKGY(phase) - 0.5) * amplitude * 2 * flatline;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw a brighter "scan line" head
      const headX = (offsetRef.current % w);
      const fadeWidth = 80;
      
      // Bright leading section
      ctx.beginPath();
      ctx.lineWidth = 2.5;
      for (let x = Math.max(0, headX - fadeWidth); x < Math.min(w, headX); x++) {
        const alpha = (x - (headX - fadeWidth)) / fadeWidth;
        const phase = ((x + offsetRef.current) % period) / period;
        const flatline = isOffline ? 0 : 1;
        const y = centerY - (getEKGY(phase) - 0.5) * amplitude * 2 * flatline;
        if (x === Math.max(0, headX - fadeWidth)) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.9)`;
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Glow dot at the head
      const headPhase = ((headX + offsetRef.current) % period) / period;
      const flatline = isOffline ? 0 : 1;
      const headY = centerY - (getEKGY(headPhase) - 0.5) * amplitude * 2 * flatline;

      const gradient = ctx.createRadialGradient(headX, headY, 0, headX, headY, 10);
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.9)`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.beginPath();
      ctx.arc(headX, headY, 10, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(headX, headY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`;
      ctx.fill();

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [status]);

  const statusLabel = status === "live" ? "API Live" : status === "offline" ? "API Offline" : "Connecting...";
  const statusColor = status === "live" ? "text-success" : status === "offline" ? "text-danger" : "text-txt-muted";
  const dotColor = status === "live" ? "bg-success" : status === "offline" ? "bg-danger" : "bg-txt-muted";

  return (
    <div className="relative w-full" style={{ height: "56px" }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center gap-2.5 z-10">
        <div className={`w-2 h-2 rounded-full ${dotColor}`} style={{
          boxShadow: status === "live" ? "0 0 8px rgba(61,217,168,0.6)" : status === "offline" ? "0 0 8px rgba(239,68,68,0.6)" : "none",
          animation: status === "checking" ? "pulse 1.5s ease-in-out infinite" : "none",
        }} />
        <span className={`text-xs font-semibold ${statusColor} tracking-wide`}>{statusLabel}</span>
        {latency !== null && <span className="text-[10px] text-txt-muted font-mono">({latency}ms)</span>}
      </div>
    </div>
  );
}
