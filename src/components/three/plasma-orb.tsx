"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useEffect, useState } from "react";

function PlasmaCore() {
  return (
    <Float speed={1.4} rotationIntensity={0.9} floatIntensity={1.2}>
      <group>
        {/* Glowing plasma core */}
        <mesh>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={1.6}
            toneMapped={false}
          />
        </mesh>
        {/* Magnetic containment field (wireframe) */}
        <mesh rotation={[0.4, 0, 0]}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial color="#818cf8" wireframe transparent opacity={0.55} />
        </mesh>
      </group>
    </Float>
  );
}

export function PlasmaOrbCanvas() {
  // Guard against SSR: WebGL only exists in the browser, so we render a
  // placeholder on the server and swap in the real canvas after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="aspect-square w-full" />;
  }

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.4} color="#22d3ee" />
      <pointLight position={[-5, -3, -5]} intensity={0.9} color="#818cf8" />
      <PlasmaCore />
      <Sparkles count={100} scale={4} size={2.5} speed={0.4} color="#22d3ee" />
    </Canvas>
  );
}
