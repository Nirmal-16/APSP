"use client";

import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { useMounted } from "@/hooks/use-mounted";
import { DoubleSide } from "three";

function SatelliteBody() {
  return (
    <group rotation={[0.1, 0.6, 0]}>
      {/* Bus */}
      <mesh>
        <boxGeometry args={[0.6, 0.6, 0.9]} />
        <meshStandardMaterial color="#3a4160" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Solar panel wings */}
      <mesh position={[-1.3, 0, 0]}>
        <boxGeometry args={[1.6, 0.05, 0.7]} />
        <meshStandardMaterial
          color="#1d2440"
          emissive="#7c6cf6"
          emissiveIntensity={0.25}
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>
      <mesh position={[1.3, 0, 0]}>
        <boxGeometry args={[1.6, 0.05, 0.7]} />
        <meshStandardMaterial
          color="#1d2440"
          emissive="#7c6cf6"
          emissiveIntensity={0.25}
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>
      {/* Dish antenna */}
      <mesh position={[0, 0.55, 0.25]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.25, 0.15, 24, 1, true]} />
        <meshStandardMaterial color="#c7cbe0" metalness={0.7} roughness={0.2} side={DoubleSide} />
      </mesh>
      {/* Rear thruster glow */}
      <mesh position={[0, 0, -0.58]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2} toneMapped={false} />
      </mesh>
    </group>
  );
}

export function SatelliteCanvas() {
  const mounted = useMounted();

  if (!mounted) {
    return <div className="aspect-square w-full" />;
  }

  return (
    <Canvas camera={{ position: [2, 1.2, 3.2], fov: 45 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 3]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-2, -1, -3]} intensity={1} color="#7c6cf6" />
      <Float speed={1} rotationIntensity={0.25} floatIntensity={0.5}>
        <SatelliteBody />
      </Float>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
        rotateSpeed={0.6}
        makeDefault
      />
    </Canvas>
  );
}
