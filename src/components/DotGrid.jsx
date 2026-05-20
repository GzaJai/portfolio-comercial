import { useEffect, useRef } from "react";

export default function DotGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const spacing = 36;
    const mouse = { x: -1000, y: -1000 };
    let scrollY = 0;
    let dots = [];

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      initDots(w, h);
    }

    function initDots(w, h) {
      dots = [];
      const cols = Math.ceil(w / spacing) + 2;
      const rows = Math.ceil(h / spacing) + 2;
      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          dots.push({
            baseX: i * spacing,
            baseY: j * spacing,
          });
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const parallaxY = (scrollY * -0.2) % spacing;

      dots.forEach((dot) => {
        let x = dot.baseX;
        let y = dot.baseY + parallaxY;

        if (y < -spacing) y += canvas.height + spacing * 2;
        if (y > canvas.height + spacing) y -= canvas.height + spacing * 2;

        const dx = mouse.x - x;
        const dy = mouse.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let radius = 1.2;
        let opacity = 0.3;
        let color = "#cbd5e1";

        const maxDist = 200;
        if (dist < maxDist) {
          const effect = 1 - dist / maxDist;
          x -= dx * effect * 0.1;
          y -= dy * effect * 0.1;
          radius += effect * 2;
          opacity += effect * 0.6;
          color = "#1e293b";
        }

        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    function onMouseMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function onScroll() {
      scrollY = window.scrollY;
    }

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
    />
  );
}
