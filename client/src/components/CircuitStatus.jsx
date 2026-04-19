import { useState, useEffect, useRef } from "react";
import api from "../services/api";

/**
 * Bouncing ball / Pong-style server status indicator.
 * Ball bounces and rolls when server is connected.
 * Ball stops and falls when connection is lost.
 */
export default function CircuitStatus() {
  const [status, setStatus] = useState("checking");
  const [latency, setLatency] = useState(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const ballRef = useRef({ x: 50, y: 20, vx: 2.5, vy: 0, radius: 5, trail: [] });

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

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width, h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const ball = ballRef.current;
      const isLive = status === "live";
      const isOffline = status === "offline";

      const r = isLive ? 61 : isOffline ? 239 : 156;
      const g = isLive ? 217 : isOffline ? 68 : 163;
      const b = isLive ? 168 : isOffline ? 68 : 175;

      // Ground line
      const groundY = h - 10;
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.15)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(w, groundY);
      ctx.stroke();

      // Tick marks on ground
      for (let gx = 0; gx < w; gx += 40) {
        ctx.beginPath();
        ctx.moveTo(gx, groundY);
        ctx.lineTo(gx, groundY + 3);
        ctx.stroke();
      }

      if (isLive || status === "checking") {
        // Ball physics — bouncing
        ball.vy += 0.15; // gravity
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Bounce off ground
        if (ball.y + ball.radius >= groundY) {
          ball.y = groundY - ball.radius;
          ball.vy = -(Math.abs(ball.vy) * 0.75); // energy loss on bounce
          if (Math.abs(ball.vy) < 0.8) ball.vy = -4.5; // re-energize to keep bouncing
        }

        // Bounce off walls
        if (ball.x + ball.radius >= w) { ball.x = w - ball.radius; ball.vx = -Math.abs(ball.vx); }
        if (ball.x - ball.radius <= 0) { ball.x = ball.radius; ball.vx = Math.abs(ball.vx); }

        // Add trail
        ball.trail.push({ x: ball.x, y: ball.y, age: 0 });
        if (ball.trail.length > 30) ball.trail.shift();
      } else {
        // Offline — ball falls and stops
        if (ball.y + ball.radius < groundY) {
          ball.vy += 0.3;
          ball.y += ball.vy;
          ball.vx *= 0.95;
          ball.x += ball.vx;
          if (ball.y + ball.radius >= groundY) {
            ball.y = groundY - ball.radius;
            ball.vy = 0;
            ball.vx = 0;
          }
        }
        // Fade trail
        ball.trail = ball.trail.filter((t) => t.age < 20);
      }

      // Draw trail
      ball.trail.forEach((t, i) => {
        t.age++;
        const alpha = Math.max(0, 1 - t.age / 30) * 0.3;
        const size = ball.radius * Math.max(0.2, 1 - t.age / 30);
        ctx.beginPath();
        ctx.arc(t.x, t.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();
      });

      // Draw shadow on ground
      const shadowWidth = ball.radius * 2 * (1 - (groundY - ball.y) / groundY);
      const shadowAlpha = Math.max(0.05, 0.2 * (1 - (groundY - ball.y) / groundY));
      ctx.beginPath();
      ctx.ellipse(ball.x, groundY, Math.max(2, shadowWidth), 2, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${shadowAlpha})`;
      ctx.fill();

      // Draw ball with glow
      const gradient = ctx.createRadialGradient(ball.x - 1, ball.y - 1, 0, ball.x, ball.y, ball.radius * 2.5);
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.3)`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Ball core
      const ballGrad = ctx.createRadialGradient(ball.x - 1.5, ball.y - 1.5, 0, ball.x, ball.y, ball.radius);
      ballGrad.addColorStop(0, `rgba(${Math.min(255, r + 60)}, ${Math.min(255, g + 60)}, ${Math.min(255, b + 60)}, 1)`);
      ballGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 1)`);
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = ballGrad;
      ctx.fill();

      // Specular highlight
      ctx.beginPath();
      ctx.arc(ball.x - 1.5, ball.y - 2, ball.radius * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, 0.4)`;
      ctx.fill();

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [status]);

  const statusLabel = status === "live" ? "Server Connected" : status === "offline" ? "Server Offline" : "Connecting...";
  const statusColor = status === "live" ? "text-success" : status === "offline" ? "text-danger" : "text-txt-muted";
  const dotColor = status === "live" ? "bg-success" : status === "offline" ? "bg-danger" : "bg-txt-muted";

  return (
    <div className="relative w-full" style={{ height: "56px" }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10">
        <div className={`w-2 h-2 rounded-full ${dotColor}`} style={{
          boxShadow: status === "live" ? "0 0 8px rgba(61,217,168,0.6)" : status === "offline" ? "0 0 8px rgba(239,68,68,0.6)" : "none",
          animation: status === "checking" ? "pulse 1.5s ease-in-out infinite" : "none",
        }} />
        <span className={`text-[11px] font-medium ${statusColor}`}>{statusLabel}</span>
        {latency !== null && <span className="text-[10px] text-txt-muted font-mono">({latency}ms)</span>}
      </div>
    </div>
  );
}
