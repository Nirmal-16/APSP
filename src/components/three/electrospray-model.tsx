"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html, OrbitControls } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { AdditiveBlending, Color, DoubleSide, type Points } from "three";
import { useMounted } from "@/hooks/use-mounted";

// Illustrative electrospray thruster, built entirely from primitives (no
// external assets). Layout along +x: propellant reservoir → emitter needle
// → Taylor cone at the tip → extractor electrode → ion beam.

// Numbered hotspots on the model, in Thruster's local coordinates. Tapping
// one (or its chip in the info panel) explains that part.
const parts = [
  {
    title: "Propellant reservoir",
    text: "Holds an ionic liquid — a salt that stays liquid at room temperature and doesn't evaporate in vacuum, so no pressurised tanks are needed.",
    position: [-1.55, 0.55, 0],
  },
  {
    title: "Emitter needle",
    text: "A sharp emitter wetted with propellant and held at a high voltage relative to the extractor.",
    position: [-0.7, 0.24, 0],
  },
  {
    title: "Taylor cone",
    text: "The electric field pulls the liquid into a fine cone; ions and charged droplets are emitted from its tip.",
    position: [-0.02, -0.2, 0],
  },
  {
    title: "Extractor electrode",
    text: "Creates the strong field at the tip and accelerates the charged particles through its aperture.",
    position: [0.3, 0.72, 0],
  },
  {
    title: "Ion beam",
    text: "The exhaust leaves at tens of km/s, giving tiny but very precise and efficient thrust — well suited to CubeSats.",
    position: [1.7, 0.42, 0],
  },
] as const satisfies readonly { title: string; text: string; position: [number, number, number] }[];

type Selection = { active: number | null; select: (i: number) => void };

const ION_COUNT = 320;
const BEAM_START = 0.02; // Taylor cone tip
const BEAM_LENGTH = 2.2;

// Deterministic pseudo-random in [0, 1) — the same beam on every render.
const hash = (i: number, k: number) => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

function IonBeam() {
  const ref = useRef<Points>(null);

  const { positions, colors } = useMemo(() => {
    const cyan = new Color("#22d3ee");
    const violet = new Color("#a78bfa");
    const colors = new Float32Array(ION_COUNT * 3);
    for (let i = 0; i < ION_COUNT; i++) {
      (hash(i, 4) < 0.75 ? cyan : violet).toArray(colors, i * 3);
    }
    return { positions: new Float32Array(ION_COUNT * 3), colors };
  }, []);

  useFrame(({ clock }) => {
    const attr = ref.current?.geometry.attributes.position;
    if (!attr) return;
    const time = clock.elapsedTime;
    for (let i = 0; i < ION_COUNT; i++) {
      // Progress along the beam loops 0 → 1; the beam widens with distance.
      const t = (hash(i, 1) + time * (0.22 + hash(i, 2) * 0.2)) % 1;
      const radius = 0.01 + t * hash(i, 3) * 0.45;
      const angle = hash(i, 5) * Math.PI * 2;
      attr.setXYZ(i, BEAM_START + t * BEAM_LENGTH, Math.cos(angle) * radius, Math.sin(angle) * radius);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

function chipClass(isActive: boolean) {
  return `flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold transition-colors ${
    isActive
      ? "border-accent bg-accent text-white"
      : "border-border bg-background/80 text-foreground hover:border-accent hover:text-accent"
  }`;
}

function Hotspots({ active, select }: Selection) {
  return parts.map((part, i) => (
    // zIndexRange keeps the labels under the sticky navbar (z-50).
    <Html key={part.title} position={part.position} center zIndexRange={[20, 0]}>
      <button
        type="button"
        onClick={() => select(i)}
        aria-label={part.title}
        aria-pressed={active === i}
        className={`${chipClass(active === i)} shadow-lg backdrop-blur-sm`}
      >
        {i + 1}
      </button>
    </Html>
  ));
}

function Thruster(selection: Selection) {
  return (
    <group position={[-0.15, 0, 0]} scale={0.9}>
      {/* Propellant (ionic liquid) reservoir */}
      <mesh position={[-1.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.42, 0.42, 0.7, 40]} />
        <meshStandardMaterial color="#5a6488" metalness={0.45} roughness={0.4} />
      </mesh>
      <mesh position={[-1.2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.42, 0.025, 12, 48]} />
        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={1.2} toneMapped={false} />
      </mesh>
      {/* Emitter mount + needle */}
      <mesh position={[-1.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.16, 0.2, 0.35, 32]} />
        <meshStandardMaterial color="#6b7599" metalness={0.5} roughness={0.35} />
      </mesh>
      <mesh position={[-0.5, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.12, 0.75, 32]} />
        <meshStandardMaterial color="#b8c0d6" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Taylor cone — the liquid meniscus ions are extracted from */}
      <mesh position={[-0.06, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.05, 0.14, 24]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2.5} toneMapped={false} />
      </mesh>
      <pointLight position={[0.05, 0, 0]} intensity={2} distance={2} color="#22d3ee" />
      {/* Extractor electrode — a plate with an aperture the beam passes through */}
      <mesh position={[0.3, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <ringGeometry args={[0.16, 0.62, 48]} />
        <meshStandardMaterial color="#6b7599" metalness={0.5} roughness={0.4} side={DoubleSide} />
      </mesh>
      <mesh position={[0.3, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.16, 0.015, 12, 48]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={2} toneMapped={false} />
      </mesh>
      {/* Faint beam envelope */}
      <mesh position={[1.25, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.5, 1.9, 32, 1, true]} />
        <meshStandardMaterial
          color="#7c6cf6"
          emissive="#7c6cf6"
          emissiveIntensity={1}
          transparent
          opacity={0.12}
          side={DoubleSide}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <IonBeam />
      <Hotspots {...selection} />
    </group>
  );
}

// The model is wide, and the camera's fov is vertical — so in narrower
// frames (e.g. square on phones) back the camera off to keep it all in view.
const BASE_DISTANCE = 4.35; // framed for a 4:3 canvas
function FitWidth() {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = size.width / size.height;
    camera.position.setLength(BASE_DISTANCE * Math.max(1, 4 / 3 / aspect));
  }, [camera, size]);
  return null;
}

// Top panel: explains the selected part, or invites the viewer to pick one.
function InfoPanel({ active, select }: Selection) {
  const part = active === null ? null : parts[active];
  return (
    <div className="absolute inset-x-3 top-3 rounded-2xl border border-border bg-background/75 px-4 py-3 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">
          {part ? part.title : "How an electrospray thruster works"}
        </p>
        <div className="flex gap-1.5">
          {parts.map((p, i) => (
            <button
              key={p.title}
              type="button"
              onClick={() => select(i)}
              aria-label={p.title}
              aria-pressed={active === i}
              className={chipClass(active === i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm" aria-live="polite">
        {part ? part.text : "Tap a numbered point to see what each part does and how it turns liquid into thrust."}
      </p>
    </div>
  );
}

export function ElectrosprayCanvas() {
  const mounted = useMounted();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  // Tapping the selected part again clears it.
  const select = (i: number) => setActive((current) => (current === i ? null : i));

  if (!mounted) {
    return <div className="h-full w-full" />;
  }

  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0.6, 0.9, 4.2], fov: 40 }}
        dpr={[1, 1.5]}
        frameloop={reduceMotion ? "demand" : "always"}
      >
        <FitWidth />
        <ambientLight intensity={0.9} />
        <directionalLight position={[1, 2, 4]} intensity={1.2} />
        <pointLight position={[3, 3, 3]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-3, -2, -2]} intensity={0.8} color="#818cf8" />
        <Float speed={1} rotationIntensity={0.15} floatIntensity={0.4}>
          <Thruster active={active} select={select} />
        </Float>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          // Hold still while a part is selected so its label is easy to read.
          autoRotate={!reduceMotion && active === null}
          autoRotateSpeed={0.5}
          rotateSpeed={0.6}
          makeDefault
        />
      </Canvas>
      <InfoPanel active={active} select={select} />
    </div>
  );
}
