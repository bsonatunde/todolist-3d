"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

interface ProgressCubeProps {
  ratio: number;
}

function Cube({ ratio }: ProgressCubeProps) {
  const mesh = useRef<Mesh>(null!);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

  let color = "red";
  if (ratio === 1) color = "green";
  else if (ratio > 0) color = "orange";

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function ProgressCube({ ratio }: ProgressCubeProps) {
  return (
    <Canvas className="w-full h-40">
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Cube ratio={ratio} />
    </Canvas>
  );
}
