import { useState, useEffect, useRef } from "react";
import api from "../services/api";

/**
 * Animated circuit board status indicator.
 * Pings the backend /health endpoint and shows a flowing current animation
 * that lights up green (live) or pulses red (offline).
 */
export default function CircuitStatus() {
  const [status, setStatus] = useState("checking"); // checking | live | offline
  const [latency, setLatency] = useState(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  // Ping backend
  useEffect(() => {
    let mounted = true;
    const check = async () => {
      const start = Date.now();
      try {
        await api.get("/health");
        if (mounted) {
          setStatus("live");
          setLatency(Date.now() - start);
        }
      } catch {
        if (mounted) {
          setStatus("offline");
          setLatency(null);
        }
      }
    };
    check();
    const interval = setInterval(check, 30000); // re-check every 30s
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  // Canvas animation
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

    // Circuit path nodes
    const getNodes = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      const nodes = [];
      // Main horizontal trunk
      const y1 = h * 0.35, y2 = h * 0.65;
      const segments = 12;
      for (let i = 0; i <= segments; i++) {
        const x = (w / segments) * i;
        nodes.push({ x, y: i % 2 === 0 ? y1 : y2 });
      }
      return nodes;
    };

    // Create particles along the path
    const createParticle = (nodes) => {
      const seg = Math.floor(Math.random() * (nodes.length - 1));
      return {
        seg,
        t: 0,
        speed: 0.005 + Math.random() * 0.008,
        size: 1.5 + Math.random() * 2,
        alpha: 0.4 + Math.random() * 0.6,
      };
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width, h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const nodes = getNodes();
      const isLive = status === "live";
      const color = isLive ? "61, 217, 168" : status === "offline" ? "239, 68, 68" : "156, 163, 175";

      // Draw circuit traces
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${color}, 0.15)`;
      ctx.beginPath();
      for (let i = 0; i < nodes.length - 1; i++) {
        const a = nodes[i], b = nodes[i + 1];
        if (i === 0) ctx.moveTo(a.x, a.y);
        // Draw with right-angle bends
        const midX = (a.x + b.x) / 2;
        ctx.lineTo(midX, a.y);
        ctx.lineTo(midX, b.y);
        ctx.lineTo(b.x, b.y);
      }
      ctx.stroke();

      // Draw junction dots
      nodes.forEach((n, i) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.3)`;
        ctx.fill();
      });

      // Animate particles
      if (isLive || status === "checking") {
        // Ensure enough particles
        while (particlesRef.current.length < 15) {
          particlesRef.current.push(createParticle(nodes));
        }

        particlesRef.current.forEach((p) => {
          p.t += p.speed;
          if (p.t >= 1) {
            p.seg++;
            p.t = 0;
            if (p.seg >= nodes.length - 1) {
              p.seg = 0;
            }
          }
          const a = nodes[p.seg];
          const b = nodes[p.seg + 1] || nodes[0];
          const midX = (a.x + b.x) / 2;

          // Calculate position along the right-angle path
          let px, py;
          const phase = p.t * 3; // 3 segments in each right-angle path
          if (phase < 1) {
            px = a.x + (midX - a.x) * phase;
            py = a.y;
          } else if (phase < 2) {
            px = midX;
            py = a.y + (b.y - a.y) * (phase - 1);
          } else {
            px = midX + (b.x - midX) * (phase - 2);
            py = b.y;
          }

          // Glow
          const gradient = ctx.createRadialGradient(px, py, 0, px, py, p.size * 4);
          gradient.addColorStop(0, `rgba(${color}, ${p.alpha * 0.6})`);
          gradient.addColorStop(1, `rgba(${color}, 0)`);
          ctx.beginPath();
          ctx.arc(px, py, p.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
          ctx.fill();
        });
      }

      // Center status indicator
      const cx = w / 2, cy = h / 2;
      const pulseScale = 1 + Math.sin(Date.now() / 500) * 0.1;

      // Outer glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20 * pulseScale);
      glow.addColorStop(0, `rgba(${color}, 0.2)`);
      glow.addColorStop(1, `rgba(${color}, 0)`);
      ctx.beginPath();
      ctx.arc(cx, cy, 20 * pulseScale, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, 0.9)`;
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
    <div className="relative w-full" style={{ height: "60px" }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.8 }}
      />
      <div className="absolute inset-0 flex items-center justify-center gap-2 z-10">
        <div className={`w-2 h-2 rounded-full ${dotColor}`} style={{
          boxShadow: status === "live" ? "0 0 8px rgba(61,217,168,0.6)" : status === "offline" ? "0 0 8px rgba(239,68,68,0.6)" : "none",
          animation: status === "checking" ? "pulse 1.5s ease-in-out infinite" : "none",
        }} />
        <span className={`text-xs font-medium ${statusColor}`}>{statusLabel}</span>
        {latency !== null && <span className="text-[10px] text-txt-muted font-mono">{latency}ms</span>}
      </div>
    </div>
  );
}
