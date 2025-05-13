
import React, { useEffect, useState } from "react";

// Configuración
const WIDTH = 1920;
const HEIGHT = 1080;
const NUM_HLINES = 12; // Líneas horizontales
const NUM_VLINES = 12; // Líneas verticales
const NUM_ANGLES = 24; // Conexiones en ángulo recto
const NUM_NODES = 15;

// Genera líneas horizontales y verticales cortadas
function generateRandomLines() {
  const lines = [];

  // Líneas horizontales cortadas
  for (let i = 0; i < NUM_HLINES; i++) {
    const y = Math.random() * HEIGHT;
    const x1 = Math.random() * (WIDTH * 0.7);
    const x2 = x1 + Math.random() * (WIDTH - x1) * 0.5;
    lines.push([
      { x: x1, y },
      { x: x2, y },
    ]);
  }

  // Líneas verticales cortadas
  for (let i = 0; i < NUM_VLINES; i++) {
    const x = Math.random() * WIDTH;
    const y1 = Math.random() * (HEIGHT * 0.7);
    const y2 = y1 + Math.random() * (HEIGHT - y1) * 0.5;
    lines.push([
      { x, y: y1 },
      { x, y: y2 },
    ]);
  }

  // Conexiones en ángulo recto (tipo PCB)
  for (let i = 0; i < NUM_ANGLES; i++) {
    const x1 = Math.random() * WIDTH;
    const y1 = Math.random() * HEIGHT;
    const x2 = Math.random() * WIDTH;
    const y2 = Math.random() * HEIGHT;
    // Solo ángulos rectos
    if (Math.abs(x1 - x2) > 60 && Math.abs(y1 - y2) > 60) {
      lines.push([
        { x: x1, y: y1 },
        { x: x2, y: y1 },
        { x: x2, y: y2 },
      ]);
    }
  }
  return lines;
}

// Helper para interpolar posición a lo largo de una línea poligonal
function getPointAt(path, t) {
  let total = 0;
  const segLengths = [];
  for (let i = 0; i < path.length - 1; i++) {
    const dx = path[i + 1].x - path[i].x;
    const dy = path[i + 1].y - path[i].y;
    const len = Math.sqrt(dx * dx + dy * dy);
    segLengths.push(len);
    total += len;
  }
  let dist = t * total;
  for (let i = 0; i < segLengths.length; i++) {
    if (dist <= segLengths[i]) {
      const ratio = segLengths[i] === 0 ? 0 : dist / segLengths[i];
      const x = path[i].x + (path[i + 1].x - path[i].x) * ratio;
      const y = path[i].y + (path[i + 1].y - path[i].y) * ratio;
      return { x, y };
    }
    dist -= segLengths[i];
  }
  return path[path.length - 1];
}

// Nodos que se mueven aleatoriamente por las líneas
function useRandomNodes(lines) {
  const [nodes, setNodes] = useState(() =>
    Array.from({ length: NUM_NODES }, () => ({
      line: Math.floor(Math.random() * lines.length),
      t: Math.random(),
      dir: Math.random() > 0.5 ? 1 : -1,
      speed: 0.09 + Math.random() * 0.11,
    }))
  );

  useEffect(() => {
    let lastTime = performance.now();
    function animate(now) {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      setNodes((prev) =>
        prev.map((node) => {
          let t = node.t + node.dir * node.speed * dt;
          let line = node.line;
          let dir = node.dir;
          let speed = node.speed;
          // Si llega al final o inicio, cambia de línea y dirección aleatoriamente
          if (t > 1 || t < 0) {
            line = Math.floor(Math.random() * lines.length);
            t = t > 1 ? 1 : 0;
            dir = Math.random() > 0.5 ? 1 : -1;
            speed = 0.09 + Math.random() * 0.11;
          }
          // Ocasionalmente, cambia de línea aleatoriamente para mayor caos
          if (Math.random() < 0.002) {
            line = Math.floor(Math.random() * lines.length);
          }
          return { line, t, dir, speed };
        })
      );
      requestAnimationFrame(animate);
    }
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line
  }, [lines.length]);
  return nodes;
}

const AnimatedCircuitBackground = () => {
  const [lines] = useState(() => generateRandomLines());
  const nodes = useRandomNodes(lines);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(120deg, #0f2027 0%, #2c5364 100%)",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.10 }}
      >
        {/* Líneas de circuito cortadas */}
        <g stroke="#00ffe7" strokeWidth="2" strokeLinecap="square" fill="none">
          {lines.map((path, idx) => (
            <polyline
              key={idx}
              points={path.map((p) => `${p.x},${p.y}`).join(" ")}
              className="circuit-anim"
            />
          ))}
        </g>
        {/* Nodos en movimiento */}
        <g>
          {nodes.map((node, idx) => {
            const { x, y } = getPointAt(lines[node.line], node.t);
            return (
              <circle
                key={idx}
                cx={x}
                cy={y}
                r="8"
                fill="#00ffe7"
                filter="url(#glow)"
                opacity="0.85"
              />
            );
          })}
        </g>
        {/* Glow filter para los nodos */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="7" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      <style>
        {`
          .circuit-anim {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: draw-circuit 2.5s linear forwards;
          }
          @keyframes draw-circuit {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AnimatedCircuitBackground;
