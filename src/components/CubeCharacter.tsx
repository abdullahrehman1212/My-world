import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { OrbitControls, RoundedBox } from '@react-three/drei';

// The actual cube character component
const CubeBody = ({ position = [0, 0, 0], color = '#4285F4' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [bounce, setBounce] = useState(0);
  
  // Bouncing animation
  useEffect(() => {
    const interval = setInterval(() => {
      setBounce((prev) => (prev + 1) % 100);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Spring animations for hover, click, and bounce
  const { scale, rotation, position: animatedPosition } = useSpring({
    scale: clicked ? [1.2, 0.8, 1.2] : hovered ? [1.1, 0.95, 1.1] : [1, 1, 1],
    rotation: [0, hovered ? 0.2 : 0, 0],
    position: [
      position[0], 
      position[1] + (Math.sin(bounce * 0.05) * 0.3), 
      position[2]
    ],
    config: { mass: 1, tension: 170, friction: 15 }
  });

  // Blinking animation
  const [blinking, setBlinking] = useState(false);
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 200);
    }, Math.random() * 3000 + 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Subtle continuous rotation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <animated.group
      position={animatedPosition}
      rotation={rotation}
      scale={scale}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main cube body */}
      <RoundedBox args={[2, 2, 2]} radius={0.2} smoothness={4} ref={meshRef}>
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.9}
          roughness={0.3}
          metalness={0.2}
        />
      </RoundedBox>

      {/* Eyes */}
      <mesh position={[-0.5, 0.3, 1.01]} scale={blinking ? [0.25, 0.05, 0.1] : [0.25, 0.25, 0.1]}>
        <boxGeometry />
        <meshBasicMaterial color="black" />
      </mesh>
      <mesh position={[0.5, 0.3, 1.01]} scale={blinking ? [0.25, 0.05, 0.1] : [0.25, 0.25, 0.1]}>
        <boxGeometry />
        <meshBasicMaterial color="black" />
      </mesh>

      {/* Smile */}
      <mesh position={[0, -0.3, 1.01]} scale={[0.8, 0.2, 0.1]}>
        <boxGeometry />
        <meshBasicMaterial color="black" />
      </mesh>
      <mesh position={[-0.5, -0.15, 1.01]} scale={[0.2, 0.2, 0.1]}>
        <boxGeometry />
        <meshBasicMaterial color="black" />
      </mesh>
      <mesh position={[0.5, -0.15, 1.01]} scale={[0.2, 0.2, 0.1]}>
        <boxGeometry />
        <meshBasicMaterial color="black" />
      </mesh>
    </animated.group>
  );
};

// The scene component with lighting
const CubeScene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <CubeBody position={[0, 0, 0]} />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />
    </>
  );
};

// The main component that renders the Canvas
const CubeCharacter: React.FC = () => {
  return (
    <div className="w-full h-full" style={{ height: '400px' }}>
      <Canvas>
        <CubeScene />
      </Canvas>
    </div>
  );
};

export default CubeCharacter;