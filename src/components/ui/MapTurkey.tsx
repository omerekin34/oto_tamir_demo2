"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/types";

type Location = Dictionary["about"]["map"]["locations"][number];

const WIDTH = 1000;
const HEIGHT = 460;
const LON_MIN = 25.6;
const LON_MAX = 45.2;
const LAT_MIN = 35.7;
const LAT_MAX = 42.3;

function formatWorkshop(map: Dictionary["about"]["map"], location: Location) {
  const word = location.count === 1 ? map.workshopOne : map.workshopMany;
  return `${location.name} - ${location.count} ${word}`;
}

function project(lon: number, lat: number) {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * 920 + 40;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * 390 + 28;
  return { x, y };
}

const THRACE: [number, number][] = [
  [26.05, 41.72],
  [26.35, 41.2],
  [26.08, 40.55],
  [26.42, 40.18],
  [26.78, 40.52],
  [27.35, 40.62],
  [28.05, 41.02],
  [28.85, 41.22],
  [28.55, 41.48],
  [27.4, 41.72],
  [26.45, 41.78],
];

const ANATOLIA: [number, number][] = [
  [29.12, 41.18],
  [30.4, 41.28],
  [31.7, 41.5],
  [33.0, 41.82],
  [34.4, 41.98],
  [35.25, 42.08],
  [36.6, 41.62],
  [38.0, 41.25],
  [39.5, 41.02],
  [40.9, 41.12],
  [42.2, 41.38],
  [43.4, 41.18],
  [44.15, 41.48],
  [44.82, 40.95],
  [44.35, 40.05],
  [44.15, 39.35],
  [44.55, 38.55],
  [44.25, 37.55],
  [43.1, 37.15],
  [41.6, 37.05],
  [39.8, 36.65],
  [37.0, 36.25],
  [36.1, 36.02],
  [35.7, 36.75],
  [34.5, 36.15],
  [32.8, 36.08],
  [31.2, 36.55],
  [30.55, 36.88],
  [29.6, 36.4],
  [28.2, 36.5],
  [27.25, 36.8],
  [27.1, 37.45],
  [26.35, 38.2],
  [26.9, 38.6],
  [26.5, 38.95],
  [27.0, 39.45],
  [26.65, 40.15],
  [27.15, 40.62],
  [28.15, 40.55],
  [28.95, 41.02],
];

function smoothClosed(points: [number, number][]) {
  const projected = points.map(([lon, lat]) => project(lon, lat));
  const count = projected.length;
  let path = "";
  for (let index = 0; index < count; index += 1) {
    const p0 = projected[(index - 1 + count) % count];
    const p1 = projected[index];
    const p2 = projected[(index + 1) % count];
    const p3 = projected[(index + 2) % count];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    path +=
      index === 0
        ? `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} `
        : "";
    path += `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)} `;
  }
  return `${path}Z`;
}

export function MapTurkey({ map }: { map: Dictionary["about"]["map"] }) {
  const [active, setActive] = useState<Location | null>(null);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c0f]">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-auto w-full"
        role="img"
        aria-label={map.title}
      >
        <defs>
          <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2a211c" />
            <stop offset="55%" stopColor="#1a1a1f" />
            <stop offset="100%" stopColor="#121214" />
          </linearGradient>
          <filter id="glow">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#FF5A00" floodOpacity="0.45" />
          </filter>
        </defs>
        <rect width={WIDTH} height={HEIGHT} fill="#0c0c0f" />
        <path d={smoothClosed(THRACE)} fill="url(#land)" stroke="#FF5A00" strokeOpacity="0.45" strokeWidth="1.4" />
        <path d={smoothClosed(ANATOLIA)} fill="url(#land)" stroke="#FF5A00" strokeOpacity="0.55" strokeWidth="1.6" />
        {map.locations.map((location) => {
          const point = project(location.lon, location.lat);
          const isActive = active?.id === location.id;
          return (
            <g
              key={location.id}
              transform={`translate(${point.x} ${point.y})`}
              onMouseEnter={() => setActive(location)}
              onMouseLeave={(event) => {
                if (event.currentTarget.matches(":focus")) return;
                setActive((current) => (current?.id === location.id ? null : current));
              }}
              onFocus={() => setActive(location)}
              onBlur={() => setActive(null)}
              tabIndex={0}
              role="button"
              aria-label={formatWorkshop(map, location)}
              className="cursor-pointer outline-none"
            >
              <circle r="6" fill="#FF5A00" opacity="0.45">
                <animate attributeName="r" values="6;18" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.55;0" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <circle r="6" fill="#FF5A00" opacity="0.28">
                <animate attributeName="r" values="6;16" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
              </circle>
              <circle r={isActive ? 7 : 5} fill="#FF5A00" filter="url(#glow)" />
              <circle r="2" fill="#fff4ec" />
            </g>
          );
        })}
      </svg>
      {active ? <MapTooltip location={active} label={formatWorkshop(map, active)} /> : null}
    </div>
  );
}

function MapTooltip({ location, label }: { location: Location; label: string }) {
  const point = project(location.lon, location.lat);
  const left = `${(point.x / WIDTH) * 100}%`;
  const top = `${(point.y / HEIGHT) * 100}%`;

  return (
    <div
      className="pointer-events-none absolute z-10 w-56 -translate-x-1/2 -translate-y-[120%] rounded-xl border border-ember/40 bg-zinc-950/95 p-3 shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
      style={{ left, top }}
    >
      <p className="text-sm font-semibold text-ember">{label}</p>
      <p className="mt-1 text-xs leading-relaxed text-zinc-400">{location.detail}</p>
    </div>
  );
}
