import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Cylinder, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// 3D Laptop Component
const Laptop = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  const laptopRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (laptopRef.current) {
      laptopRef.current.rotation.y = rotation[1] + (hovered ? Math.sin(state.clock.elapsedTime) * 0.1 : 0);
      laptopRef.current.position.y = position[1] + (hovered ? Math.sin(state.clock.elapsedTime * 2) * 0.05 : 0);
    }
  });

  return (
    <group 
      ref={laptopRef} 
      position={position} 
      rotation={rotation}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Laptop Base */}
      <RoundedBox args={[2, 0.1, 1.4]} radius={0.05} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2d3748" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      
      {/* Laptop Screen */}
      <RoundedBox args={[1.8, 1.2, 0.05]} radius={0.02} smoothness={4} position={[0, 0.6, -0.65]} rotation={[-0.1, 0, 0]}>
        <meshStandardMaterial color="#1a202c" metalness={0.9} roughness={0.1} />
      </RoundedBox>
      
      {/* Screen Content */}
      <Box args={[1.6, 1, 0.01]} position={[0, 0.6, -0.62]} rotation={[-0.1, 0, 0]}>
        <meshStandardMaterial color="#4299e1" emissive="#1a365d" emissiveIntensity={0.3} />
      </Box>
      
      {/* Keyboard */}
      <Box args={[1.6, 0.02, 1]} position={[0, 0.06, 0.1]}>
        <meshStandardMaterial color="#4a5568" />
      </Box>
    </group>
  );
};

// Floating Icon Component
const FloatingIcon = ({ position, icon, color = "#4299e1" }) => {
  const iconRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (iconRef.current) {
      iconRef.current.rotation.y += 0.01;
      iconRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
      iconRef.current.scale.setScalar(hovered ? 1.2 : 1);
    }
  });

  const IconShape = () => {
    switch (icon) {
      case 'code':
        return (
          <group>
            <Box args={[0.3, 0.3, 0.05]} position={[-0.1, 0, 0]}>
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
            </Box>
            <Box args={[0.3, 0.3, 0.05]} position={[0.1, 0, 0]}>
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
            </Box>
          </group>
        );
      case 'design':
        return (
          <Cylinder args={[0.2, 0.2, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
          </Cylinder>
        );
      case 'ai':
        return (
          <Sphere args={[0.2]}>
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
          </Sphere>
        );
      default:
        return (
          <Box args={[0.3, 0.3, 0.3]}>
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
          </Box>
        );
    }
  };

  return (
    <group 
      ref={iconRef} 
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <IconShape />
    </group>
  );
};

// Particle System
const Particles = () => {
  const particlesRef = useRef();
  const particleCount = 100;
  
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    
    colors[i * 3] = Math.random() * 0.5 + 0.5;
    colors[i * 3 + 1] = Math.random() * 0.5 + 0.5;
    colors[i * 3 + 2] = 1;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.6} />
    </points>
  );
};

// Main 3D Scene Component
const Workspace3D = ({ className = "" }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 2, 5], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4299e1" />
        
        {/* Main Laptop */}
        <Laptop position={[0, 0, 0]} rotation={[0, 0.3, 0]} />
        
        {/* Floating Icons */}
        <FloatingIcon position={[-3, 1, 1]} icon="code" color="#4299e1" />
        <FloatingIcon position={[3, 1.5, -1]} icon="design" color="#ed64a6" />
        <FloatingIcon position={[0, 2.5, 2]} icon="ai" color="#48bb78" />
        <FloatingIcon position={[-2, -1, -2]} icon="code" color="#9f7aea" />
        <FloatingIcon position={[2.5, -0.5, 1.5]} icon="design" color="#f6ad55" />
        
        {/* Particle System */}
        <Particles />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default Workspace3D;