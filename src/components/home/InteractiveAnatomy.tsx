"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { ContactShadows, Float, Grid, OrbitControls, useCursor } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { PerspectiveCamera, Vector3, type Group } from "three";

const EMBER = "#FF5A00";

type PartId = "engine" | "transmission" | "brakes" | "exhaust" | "suspension";

type PartCopy = {
  id: PartId;
  name: string;
  role: string;
  symptom: string;
  solution: string;
};

type AnatomyCopy = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  emptyTitle: string;
  emptyText: string;
  roleLabel: string;
  symptomLabel: string;
  solutionLabel: string;
  hint: string;
  partsLabel: string;
  parts: PartCopy[];
};

const COPY: Record<"tr" | "en", AnatomyCopy> = {
  tr: {
    eyebrow: "İnteraktif anatomi",
    titleLead: "Aracınızı",
    titleAccent: "Yakından Tanıyın",
    description: "Hangi parça ne işe yarar? Arıza belirtileri nelerdir? Etkileşime geçerek keşfedin.",
    emptyTitle: "Bir parçaya tıklayın",
    emptyText: "İskeletin üzerindeki parçaya gelin. Turuncu yanan bölüme tıklayınca görev, belirti ve çözüm burada açılır.",
    roleLabel: "Görevi",
    symptomLabel: "Arıza belirtisi",
    solutionLabel: "Çözümümüz",
    hint: "Üzerine gelin, tıklayın. Sürükleyerek döndürün.",
    partsLabel: "Parçalar",
    parts: [
      {
        id: "engine",
        name: "Motor Bloğu",
        role: "Aracın kalbidir. Yakıt ve havayı yakarak krank miline hareket verir; çekişin kaynağı burasıdır.",
        symptom: "Motordan gelen vuruntu sesi, düzensiz rölanti, hararet yükselmesi ve yağ eksiltme.",
        solution: "Revizyon ve orijinal parça değişimi. Kompresyon ölçülür, iş emrine teslim saati yazılır.",
      },
      {
        id: "transmission",
        name: "Şanzıman",
        role: "Motorun ürettiği torku tekerleklere doğru oranda aktarır. Vites geçişini kontrollü tutar.",
        symptom: "Vites kaçırma, geçişte sarsıntı, uğultu ve kavrama kayması.",
        solution: "Yağ analizi, adaptasyon ve gerekirse revizyon. Orijinal conta ve kavrama seti kullanılır.",
      },
      {
        id: "brakes",
        name: "Fren Sistemi",
        role: "Pedal kuvvetini balata ve diske çevirerek aracı güvenli mesafede durdurur.",
        symptom: "Direksiyonda titreme, frenlemede ötme, uzun duruş mesafesi ve yana çekme.",
        solution: "Disk, balata ve hidrolik ölçümü. Aşınan parçalar orijinal setle değiştirilir.",
      },
      {
        id: "exhaust",
        name: "Egzoz",
        role: "Yanmış gazı motordan uzaklaştırır, sesi ve emisyonu kontrol altında tutar.",
        symptom: "Alt takımdan metalik ses, egzoz kokusu ve yakıt tüketiminde artış.",
        solution: "Kaçak tespiti, manifold ve susturucu değişimi. Bağlantılar yeniden contalanır.",
      },
      {
        id: "suspension",
        name: "Süspansiyon",
        role: "Yol darbesini emer, lastiği yere bastırır ve direksiyon hakimiyetini korur.",
        symptom: "Virajda yalpalama, takırdama ve lastikte tek taraflı aşınma.",
        solution: "Rot, amortisör ve burç kontrolü. Bozuk parça değiştirilir, rot ayarı yapılır.",
      },
    ],
  },
  en: {
    eyebrow: "Interactive anatomy",
    titleLead: "Know Your Vehicle",
    titleAccent: "Up Close",
    description: "What does each part do? What are the fault symptoms? Explore by interacting.",
    emptyTitle: "Click a part",
    emptyText: "Hover the skeleton. When a section turns orange, click it to open its job, symptom, and fix.",
    roleLabel: "What it does",
    symptomLabel: "Fault symptom",
    solutionLabel: "Our fix",
    hint: "Hover, then click. Drag to rotate.",
    partsLabel: "Parts",
    parts: [
      {
        id: "engine",
        name: "Engine Block",
        role: "The heart of the vehicle. It burns fuel and air, then sends that force through the crankshaft.",
        symptom: "Knocking from the engine, uneven idle, rising temperature, and oil loss.",
        solution: "Overhaul and original-part replacement. Compression is measured and the handoff time is written on the work order.",
      },
      {
        id: "transmission",
        name: "Transmission",
        role: "It sends engine torque to the wheels in the right ratio and keeps gear changes controlled.",
        symptom: "Slipping gears, a jolt on shift, whine, and clutch slip.",
        solution: "Fluid analysis, adaptation, and an overhaul when needed. Original seals and clutch sets are used.",
      },
      {
        id: "brakes",
        name: "Brake System",
        role: "It turns pedal force into pad and disc pressure so the vehicle stops in a safe distance.",
        symptom: "Steering shake, squeal under braking, a long stopping distance, and pulling to one side.",
        solution: "Disc, pad, and hydraulic measurement. Worn parts are replaced with an original set.",
      },
      {
        id: "exhaust",
        name: "Exhaust",
        role: "It carries burned gas away from the engine and keeps noise and emissions in check.",
        symptom: "Metallic noise underneath, exhaust smell, and higher fuel use.",
        solution: "Leak check, then manifold and muffler replacement. Joints are resealed.",
      },
      {
        id: "suspension",
        name: "Suspension",
        role: "It absorbs road impact, keeps the tire planted, and holds steering control.",
        symptom: "Body roll in corners, clunking, and uneven tire wear.",
        solution: "Link, shock, and bushing inspection. Failed parts are replaced and the alignment is set.",
      },
    ],
  },
};

const CORNERS: Array<[number, number, number]> = [
  [1.18, 0.02, 1.22],
  [-1.18, 0.02, 1.22],
  [1.18, 0.02, -1.22],
  [-1.18, 0.02, -1.22],
];

function Metal({ active, color }: { active: boolean; color: string }) {
  return (
    <meshStandardMaterial
      color={active ? EMBER : color}
      metalness={active ? 0.94 : 0.84}
      roughness={active ? 0.16 : 0.32}
      emissive={active ? EMBER : "#050505"}
      emissiveIntensity={active ? 0.58 : 0}
    />
  );
}

const tipPos = new Vector3();
const tipCam = new Vector3();
const tipDelta = new Vector3();
const tipDir = new Vector3();
const tipProjected = new Vector3();

function PartTip({
  position,
  active,
  children,
}: {
  position: [number, number, number];
  active: boolean;
  children: string;
}) {
  const group = useRef<Group>(null);
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<Root | null>(null);
  const { camera, gl, size } = useThree();

  useLayoutEffect(() => {
    const parent = gl.domElement.parentElement;
    if (!parent) return;

    const node = document.createElement("div");
    node.style.position = "absolute";
    node.style.top = "0";
    node.style.left = "0";
    node.style.pointerEvents = "none";
    parent.appendChild(node);
    nodeRef.current = node;

    const root = createRoot(node);
    rootRef.current = root;

    return () => {
      nodeRef.current = null;
      rootRef.current = null;
      node.remove();
      // React 19 rejects root.unmount() while a commit is still running.
      window.setTimeout(() => root.unmount(), 0);
    };
  }, [gl]);

  useLayoutEffect(() => {
    rootRef.current?.render(
      <span
        style={{ transform: "translate3d(-50%, -50%, 0)", pointerEvents: "none" }}
        className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-md ${
          active ? "border-[#FF5A00] bg-black/85 text-[#FF5A00]" : "border-white/15 bg-zinc-950/80 text-zinc-100"
        }`}
      >
        <span className={`size-1.5 rounded-full ${active ? "bg-[#FF5A00]" : "bg-zinc-400"}`} />
        {children}
      </span>,
    );
  }, [active, children]);

  useFrame(() => {
    const object = group.current;
    const node = nodeRef.current;
    if (!object || !node) return;

    object.updateWorldMatrix(true, false);
    tipPos.setFromMatrixPosition(object.matrixWorld);
    tipCam.setFromMatrixPosition(camera.matrixWorld);
    const behind = tipDelta.copy(tipPos).sub(tipCam).angleTo(camera.getWorldDirection(tipDir)) > Math.PI / 2;

    tipProjected.copy(tipPos).project(camera);
    const x = (tipProjected.x * size.width) / 2 + size.width / 2;
    const y = -(tipProjected.y * size.height) / 2 + size.height / 2;
    node.style.display = behind ? "none" : "block";
    node.style.transform = `translate3d(${x}px,${y}px,0)`;

    if (camera instanceof PerspectiveCamera) {
      const distance = tipPos.distanceTo(tipCam);
      const slope = (0 - 20) / (camera.far - camera.near);
      node.style.zIndex = `${Math.round(slope * distance + (0 - slope * camera.far))}`;
    }
  });

  return <group ref={group} position={position} />;
}

function Chassis() {
  return (
    <group>
      {[-0.78, 0.78].map((x) => (
        <mesh key={x} position={[x, -0.22, 0]}>
          <boxGeometry args={[0.08, 0.1, 3.45]} />
          <meshStandardMaterial color="#3a4048" metalness={0.9} roughness={0.28} />
        </mesh>
      ))}
      {[-1.4, -0.45, 0.45, 1.35].map((z) => (
        <mesh key={z} position={[0, -0.22, z]}>
          <boxGeometry args={[1.56, 0.055, 0.07]} />
          <meshStandardMaterial color="#2e343b" metalness={0.88} roughness={0.3} />
        </mesh>
      ))}
      <mesh position={[0, -0.16, 0.05]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.035, 1.55, 12]} />
        <meshStandardMaterial color="#6a432c" metalness={0.7} roughness={0.35} emissive={EMBER} emissiveIntensity={0.12} />
      </mesh>
    </group>
  );
}

function EnginePart({
  active,
  onHover,
  onSelect,
}: {
  active: boolean;
  onHover: () => void;
  onSelect: () => void;
}) {
  return (
    <group
      position={[0, 0.46, 1.02]}
      onPointerOver={(event) => {
        event.stopPropagation();
        onHover();
      }}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
    >
      <mesh>
        <boxGeometry args={[0.92, 0.5, 0.78]} />
        <Metal active={active} color="#c5cad1" />
      </mesh>
      <mesh position={[0, 0.32, 0]}>
        <boxGeometry args={[0.74, 0.14, 0.62]} />
        <Metal active={active} color="#9aa1aa" />
      </mesh>
      {[-0.24, -0.08, 0.08, 0.24].map((x) => (
        <mesh key={x} position={[x, 0.5, 0]}>
          <cylinderGeometry args={[0.07, 0.08, 0.22, 16]} />
          <Metal active={active} color="#e4e7ec" />
        </mesh>
      ))}
      <mesh position={[0, 0.02, 0.48]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.1, 24]} />
        <Metal active={active} color="#2a2e34" />
      </mesh>
    </group>
  );
}

function TransmissionPart({
  label,
  active,
  onHover,
  onSelect,
}: {
  label: string;
  active: boolean;
  onHover: () => void;
  onSelect: () => void;
}) {
  return (
    <group
      position={[0, 0.16, 0.18]}
      onPointerOver={(event) => {
        event.stopPropagation();
        onHover();
      }}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
    >
      <mesh position={[0, 0, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.34, 0.28, 28]} />
        <Metal active={active} color="#8d939c" />
      </mesh>
      <mesh position={[0, -0.02, -0.16]}>
        <boxGeometry args={[0.5, 0.4, 0.62]} />
        <Metal active={active} color="#7e858e" />
      </mesh>
      <mesh position={[0, -0.24, -0.16]}>
        <boxGeometry args={[0.38, 0.08, 0.42]} />
        <Metal active={active} color="#5c6168" />
      </mesh>
      <PartTip position={[0.55, 0.46, -0.05]} active={active}>
        {label}
      </PartTip>
    </group>
  );
}

function BrakePart({
  label,
  active,
  onHover,
  onSelect,
}: {
  label: string;
  active: boolean;
  onHover: () => void;
  onSelect: () => void;
}) {
  return (
    <group
      onPointerOver={(event) => {
        event.stopPropagation();
        onHover();
      }}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
    >
      {CORNERS.map(([x, y, z]) => (
        <group key={`${x}-${z}`} position={[x, y, z]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.28, 0.28, 0.045, 32]} />
            <Metal active={active} color="#d5d8de" />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.2, 0.012, 10, 32]} />
            <Metal active={active} color="#f2f3f5" />
          </mesh>
          <mesh position={[x > 0 ? -0.04 : 0.04, 0.16, 0]}>
            <boxGeometry args={[0.1, 0.12, 0.2]} />
            <Metal active={active} color="#4c525a" />
          </mesh>
        </group>
      ))}
      <PartTip position={[1.18, 0.52, 1.22]} active={active}>
        {label}
      </PartTip>
    </group>
  );
}

function ExhaustPart({
  label,
  active,
  onHover,
  onSelect,
}: {
  label: string;
  active: boolean;
  onHover: () => void;
  onSelect: () => void;
}) {
  return (
    <group
      onPointerOver={(event) => {
        event.stopPropagation();
        onHover();
      }}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
    >
      {[-0.18, -0.06, 0.06, 0.18].map((z) => (
        <mesh key={z} position={[-0.62, 0.28, 0.95 + z]} rotation={[0, 0, Math.PI / 2.4]}>
          <cylinderGeometry args={[0.035, 0.04, 0.42, 12]} />
          <Metal active={active} color="#8a5a42" />
        </mesh>
      ))}
      <mesh position={[-1.02, -0.38, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 2.15, 14]} />
        <Metal active={active} color="#6d5348" />
      </mesh>
      <mesh position={[-1.02, -0.38, -1.28]}>
        <boxGeometry args={[0.22, 0.18, 0.46]} />
        <Metal active={active} color="#5a463e" />
      </mesh>
      <PartTip position={[-1.28, -0.05, -1.28]} active={active}>
        {label}
      </PartTip>
    </group>
  );
}

function SuspensionPart({
  label,
  active,
  onHover,
  onSelect,
}: {
  label: string;
  active: boolean;
  onHover: () => void;
  onSelect: () => void;
}) {
  return (
    <group
      onPointerOver={(event) => {
        event.stopPropagation();
        onHover();
      }}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
    >
      {CORNERS.map(([x, , z]) => (
        <group key={`${x}-${z}`} position={[x > 0 ? 0.78 : -0.78, -0.02, z]}>
          <mesh>
            <cylinderGeometry args={[0.055, 0.055, 0.42, 14]} />
            <Metal active={active} color="#b7bcc4" />
          </mesh>
          <mesh position={[x > 0 ? 0.16 : -0.16, -0.12, 0]}>
            <boxGeometry args={[0.34, 0.045, 0.07]} />
            <Metal active={active} color="#8e949c" />
          </mesh>
        </group>
      ))}
      <PartTip position={[-1.15, 0.42, -1.22]} active={active}>
        {label}
      </PartTip>
    </group>
  );
}

function CursorState({ active }: { active: boolean }) {
  useCursor(active);
  return null;
}

function AnatomyScene({
  labels,
  selected,
  onSelect,
  reduceMotion,
}: {
  labels: Record<PartId, string>;
  selected: PartId | null;
  onSelect: (id: PartId) => void;
  reduceMotion: boolean;
}) {
  const [hovered, setHovered] = useState<PartId | null>(null);
  const lit = (id: PartId) => hovered === id || selected === id;

  return (
    <Canvas
      camera={{ position: [3.5, 1.85, 4.35], fov: 34 }}
      dpr={[1, 1.7]}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      onPointerMissed={() => setHovered(null)}
    >
      <CursorState active={hovered !== null} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4.5, 6, 3.5]} intensity={2.8} color="#fff6ef" />
      <directionalLight position={[-3.5, 2.2, -2]} intensity={0.7} color="#c5d4e8" />
      <pointLight position={[-2.4, 1.8, 2.2]} intensity={6} color={EMBER} distance={8} />
      <spotLight position={[0, 4.8, 1.6]} intensity={14} angle={0.55} penumbra={0.75} color="#ffffff" />
      <Float speed={reduceMotion ? 0 : 1.15} rotationIntensity={reduceMotion ? 0 : 0.08} floatIntensity={reduceMotion ? 0 : 0.22}>
        <group rotation={[0.12, 0.55, 0]} scale={0.92}>
          <Chassis />
          <EnginePart active={lit("engine")} onHover={() => setHovered("engine")} onSelect={() => onSelect("engine")} />
          <PartTip position={[-0.78, 0.88, 1.17]} active={lit("engine")}>
            {labels.engine}
          </PartTip>
          <TransmissionPart
            label={labels.transmission}
            active={lit("transmission")}
            onHover={() => setHovered("transmission")}
            onSelect={() => onSelect("transmission")}
          />
          <BrakePart label={labels.brakes} active={lit("brakes")} onHover={() => setHovered("brakes")} onSelect={() => onSelect("brakes")} />
          <ExhaustPart label={labels.exhaust} active={lit("exhaust")} onHover={() => setHovered("exhaust")} onSelect={() => onSelect("exhaust")} />
          <SuspensionPart
            label={labels.suspension}
            active={lit("suspension")}
            onHover={() => setHovered("suspension")}
            onSelect={() => onSelect("suspension")}
          />
        </group>
      </Float>
      <Grid
        position={[0, -0.92, 0]}
        args={[12, 12]}
        cellSize={0.38}
        cellThickness={0.55}
        cellColor="#3f3f46"
        sectionSize={1.9}
        sectionThickness={1}
        sectionColor="#5a321c"
        fadeDistance={11}
        fadeStrength={1.5}
        infiniteGrid
      />
      <ContactShadows position={[0, -0.9, 0]} opacity={0.45} scale={9} blur={2.4} far={3.2} />
      <OrbitControls
        autoRotate={!reduceMotion && hovered === null}
        autoRotateSpeed={0.35}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={3.1}
        maxDistance={8}
        minPolarAngle={Math.PI / 5.2}
        maxPolarAngle={Math.PI / 1.85}
        target={[0, 0.05, 0]}
      />
    </Canvas>
  );
}

export function InteractiveAnatomy({ lang }: { lang: string }) {
  const copy = lang === "en" ? COPY.en : COPY.tr;
  const [activeId, setActiveId] = useState<PartId | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [mounted, setMounted] = useState(false);
  const active = copy.parts.find((part) => part.id === activeId) ?? null;

  useEffect(() => {
    setMounted(true);
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  const labels = useMemo(
    () => Object.fromEntries(copy.parts.map((part) => [part.id, part.name])) as Record<PartId, string>,
    [copy.parts],
  );

  return (
    <section id="anatomi" className="relative overflow-hidden border-t border-white/5 bg-zinc-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,#ff5a0018,transparent_52%)]" />
      <div className="relative mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#FF5A00]">{copy.eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-none text-white md:text-6xl">
            {copy.titleLead}
            <span className="mt-1 block text-[#FF5A00]">{copy.titleAccent}</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">{copy.description}</p>
        </div>

        <div className="mt-12 grid items-center gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.72fr)] lg:gap-8">
          <div className="relative h-[460px] touch-none overflow-hidden rounded-3xl border border-white/10 bg-black sm:h-[560px] lg:h-[680px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,#ff5a0014,transparent_58%)]" />
            {mounted ? (
              <AnatomyScene labels={labels} selected={activeId} onSelect={setActiveId} reduceMotion={reduceMotion} />
            ) : (
              <div className="grid h-full place-items-center">
                <span className="size-16 animate-pulse rounded-full border border-[#FF5A00]/50" />
              </div>
            )}
            <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.22em] text-zinc-500">
              {copy.hint}
            </p>
          </div>

          <aside className="bg-zinc-900 rounded-2xl p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FF5A00]">{copy.partsLabel}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {copy.parts.map((part) => {
                const selected = part.id === activeId;
                return (
                  <button
                    key={part.id}
                    type="button"
                    onClick={() => setActiveId(part.id)}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-wide transition ${
                      selected
                        ? "border-[#FF5A00] bg-[#FF5A00] text-zinc-950"
                        : "border-white/10 text-zinc-300 hover:border-[#FF5A00] hover:text-[#FF5A00]"
                    }`}
                  >
                    {part.name}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active?.id ?? "empty"}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="mt-6 min-h-[280px]"
              >
                {active ? (
                  <>
                    <h3 className="font-display text-4xl uppercase leading-none text-white">{active.name}</h3>
                    <div className="mt-6 space-y-5">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5A00]">{copy.roleLabel}</p>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-200">{active.role}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">{copy.symptomLabel}</p>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-300">{active.symptom}</p>
                      </div>
                      <div className="rounded-xl border border-[#FF5A00]/35 bg-[#FF5A00]/10 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5A00]">{copy.solutionLabel}</p>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-100">{active.solution}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="font-display text-4xl uppercase leading-none text-white">{copy.emptyTitle}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-400">{copy.emptyText}</p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </aside>
        </div>
      </div>
    </section>
  );
}
