"use client";

import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles } from "@react-three/drei";
import { useMounted } from "@/hooks/use-mounted";
import { DoubleSide } from "three";

function ThrusterBody() {
  return (
    <group rotation={[0.15, 0.5, 0]}>
      {/* Housing */}
      <mesh position={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.55, 0.65, 0.9, 32]} />
        <meshStandardMaterial color="#2a2f45" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* Acceleration channel — glowing discharge ring */}
      <mesh position={[0, 0, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.08, 16, 48]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2} toneMapped={false} />
      </mesh>
      {/* Ionized exhaust plume */}
      <mesh position={[0, 0, -1.15]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.45, 1.6, 32, 1, true]} />
        <meshStandardMaterial
          color="#7c6cf6"
          emissive="#7c6cf6"
          emissiveIntensity={1.4}
          transparent
          opacity={0.35}
          side={DoubleSide}
          toneMapped={false}
        />
      </mesh>
      <Sparkles count={80} scale={[1, 1, 2.2]} position={[0, 0, -1.4]} size={2} speed={0.6} color="#22d3ee" />
    </group>
  );
}

export function ThrusterCanvas() {
  const mounted = useMounted();

  if (!mounted) {
    return <div className="aspect-square w-full" />;
  }

  return (
    <Canvas camera={{ position: [1.8, 1, 3], fov: 45 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 3]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-2, -1, -3]} intensity={1} color="#22d3ee" />
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
        <ThrusterBody />
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
