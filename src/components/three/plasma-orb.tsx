"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles, useTexture } from "@react-three/drei";
import { SRGBColorSpace, type Mesh, type Texture } from "three";
import { useMounted } from "@/hooks/use-mounted";

const EARTH_RADIUS = 0.95;
const AXIAL_TILT = (23.4 * Math.PI) / 180;

// Earth from NASA Blue Marble imagery, spinning on a tilted axis. The day map
// is also used as the emissive map so the planet reads in true colour even
// under the scene's cyan and indigo lights.
function Earth() {
  const spin = useRef<Mesh>(null);
  const [day, bump] = useTexture(["/textures/earth-day.jpg", "/textures/earth-bump.png"], (textures) => {
    (textures as Texture[])[0].colorSpace = SRGBColorSpace;
  });

  useFrame((_, delta) => {
    if (spin.current) spin.current.rotation.y += delta * 0.12;
  });

  return (
    <group rotation={[0, 0, AXIAL_TILT]}>
      <mesh ref={spin}>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
        <meshStandardMaterial
          map={day}
          bumpMap={bump}
          bumpScale={0.6}
          emissiveMap={day}
          emissive="#ffffff"
          emissiveIntensity={0.55}
          roughness={0.85}
          metalness={0}
        />
      </mesh>
    </group>
  );
}

function PlasmaCore() {
  return (
    <Float speed={1.4} rotationIntensity={0.9} floatIntensity={1.2}>
      <group>
        {/* Earth at the centre; the net shows straight away while it loads. */}
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
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
  const mounted = useMounted();

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
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
        rotateSpeed={0.6}
        makeDefault
      />
    </Canvas>
  );
}
