import { useEffect, useRef } from "react";

function isMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

const ROWS = 40;
const COLS = 8;
const SPACING = 40;
const GRID_H = ROWS * SPACING;
const VIEWBOX_W = 400;
const VIEWBOX_H = 1300;

export default function MobileDotGrid() {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!isMobile()) return;

    const svg = svgRef.current;
    if (!svg) return;

    const circles = svg.querySelectorAll("circle");
    let animId;

    function animate() {
      const now = performance.now() / 1000;
      const scrollOffset = window.scrollY * 0.22;

      circles.forEach((circle) => {
        const row = parseFloat(circle.dataset.row);
        const col = parseFloat(circle.dataset.col);
        const baseCy = SPACING / 2 + row * SPACING;

        // Parallax: shift cy en dirección del contenido, con wrapping infinito
        let cy = baseCy - scrollOffset;
        cy = ((cy % GRID_H) + GRID_H) % GRID_H;

        // Ola continua suave
        const wave = Math.sin((row + col) * 0.3 - now * 1.8) * 0.5 + 0.5;

        circle.setAttribute("cy", cy);
        circle.setAttribute("r", 0.1 + wave * 24); // radio del circulo
        circle.setAttribute("opacity", 0.25 + wave * 0.5);
      });

      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => cancelAnimationFrame(animId);
  }, []);

  if (!isMobile()) return null;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1]">
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: ROWS }).map((_, row) =>
          Array.from({ length: COLS }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              data-row={row}
              data-col={col}
              cx={VIEWBOX_W / COLS / 2 + col * (VIEWBOX_W / COLS)}
              r={3}
              fill="#68DBA9"
              opacity={0.25}
            />
          ))
        )}
      </svg>
    </div>
  );
}
