import { useEffect, useRef } from "react";

// A canvas-based animated GIS-style crowd heatmap. No token required.
// Simulates Jagannath Puri temple + surrounding zones.
export function HeatmapCanvas({ intensity = 1 }: { intensity?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let t = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Zones (relative coords 0..1)
    const zones = [
      { x: 0.5, y: 0.5, r: 130, heat: 0.95, name: "Main Temple" },
      { x: 0.34, y: 0.45, r: 90, heat: 0.75, name: "Grand Road" },
      { x: 0.66, y: 0.6, r: 80, heat: 0.6, name: "Market Area" },
      { x: 0.28, y: 0.7, r: 65, heat: 0.45, name: "Parking A" },
      { x: 0.75, y: 0.32, r: 55, heat: 0.35, name: "East Gate" },
      { x: 0.18, y: 0.28, r: 45, heat: 0.25, name: "North Rest" },
    ];

    // Moving dots (people)
    const dots = Array.from({ length: 140 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0008,
      vy: (Math.random() - 0.5) * 0.0008,
    }));

    // Roads (curves)
    const roads = [
      [[0.05, 0.55], [0.5, 0.5], [0.95, 0.55]],
      [[0.5, 0.05], [0.5, 0.5], [0.5, 0.95]],
      [[0.2, 0.15], [0.55, 0.4], [0.85, 0.75]],
    ];

    const draw = () => {
      t += 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      // background — subtle map tone
      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, "#0b1f3a");
      bg.addColorStop(1, "#0a2a4a");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // grid
      ctx.strokeStyle = "rgba(120,180,255,0.06)";
      ctx.lineWidth = 1;
      for (let i = 0; i < w; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, h);
        ctx.stroke();
      }
      for (let i = 0; i < h; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(w, i);
        ctx.stroke();
      }

      // roads
      ctx.strokeStyle = "rgba(180,210,255,0.35)";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      roads.forEach((r) => {
        ctx.beginPath();
        ctx.moveTo(r[0][0] * w, r[0][1] * h);
        for (let i = 1; i < r.length; i++) {
          ctx.lineTo(r[i][0] * w, r[i][1] * h);
        }
        ctx.stroke();
      });
      // route glow
      ctx.strokeStyle = "rgba(80,220,180,0.5)";
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 6]);
      ctx.lineDashOffset = -t * 0.5;
      ctx.beginPath();
      ctx.moveTo(0.1 * w, 0.85 * h);
      ctx.quadraticCurveTo(0.35 * w, 0.6 * h, 0.5 * w, 0.5 * h);
      ctx.stroke();
      ctx.setLineDash([]);

      // heatmap zones
      zones.forEach((z, i) => {
        const pulse = 1 + Math.sin(t * 0.05 + i) * 0.08;
        const cx = z.x * w;
        const cy = z.y * h;
        const r = z.r * pulse * intensity;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        if (z.heat > 0.8) {
          grad.addColorStop(0, "rgba(255,60,60,0.85)");
          grad.addColorStop(0.4, "rgba(255,120,40,0.5)");
          grad.addColorStop(1, "rgba(255,60,60,0)");
        } else if (z.heat > 0.6) {
          grad.addColorStop(0, "rgba(255,160,40,0.7)");
          grad.addColorStop(0.5, "rgba(255,200,60,0.35)");
          grad.addColorStop(1, "rgba(255,160,40,0)");
        } else if (z.heat > 0.4) {
          grad.addColorStop(0, "rgba(255,220,80,0.5)");
          grad.addColorStop(1, "rgba(255,220,80,0)");
        } else {
          grad.addColorStop(0, "rgba(90,220,140,0.55)");
          grad.addColorStop(1, "rgba(90,220,140,0)");
        }
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();

        // core marker
        ctx.fillStyle = z.heat > 0.7 ? "#ff3b3b" : z.heat > 0.5 ? "#f59e0b" : "#22c55e";
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, Math.PI * 2);
        ctx.fill();
        // pulse ring
        const ringR = 8 + ((t + i * 20) % 60);
        ctx.strokeStyle = `rgba(${z.heat > 0.7 ? "255,80,80" : z.heat > 0.5 ? "255,180,60" : "80,220,140"},${1 - ringR / 68})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
        ctx.stroke();
      });

      // moving people dots
      ctx.fillStyle = "rgba(200,240,255,0.85)";
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > 1) d.vx *= -1;
        if (d.y < 0 || d.y > 1) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, 1.4, 0, Math.PI * 2);
        ctx.fill();
      });

      // labels
      ctx.font = "600 11px system-ui";
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      zones.forEach((z) => {
        ctx.fillText(z.name, z.x * w + 8, z.y * h - 8);
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [intensity]);

  return <canvas ref={ref} className="h-full w-full rounded-2xl" />;
}