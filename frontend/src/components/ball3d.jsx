import React, { Suspense, useMemo, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"

// Distorted Sphere - Optimized for your GPU
function DistortedSphere() {
  const mesh = useRef(null)
  
  useFrame(({ clock }) => {
    if (!mesh.current) return
    mesh.current.rotation.y = clock.getElapsedTime() * 0.35
  })

  // Using MeshPhongMaterial: It's way lighter than PhysicalMaterial but still looks "pro"
  const material = useMemo(() => new THREE.MeshPhongMaterial({
    color: new THREE.Color("#4169e1"), // Royal Blue to match your navbar
    shininess: 100,
    transparent: true,
    opacity: 0.9,
    emissive: "#112244", // Gives it a deep inner glow
  }), [])

  return (
    <Float speed={1.3} rotationIntensity={0.6} floatIntensity={0.9}>
      <mesh ref={mesh} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.2, 2]} />
        <primitive object={material} attach="material" />
      </mesh>
    </Float>
  )
}

// Orbiting Ring of Points
function OrbitingPoints() {
  const group = useRef(null)
  const matRef = useRef(null)

  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.getElapsedTime() * 0.4
    if (matRef.current) matRef.current.size = 0.02 + 0.01 * Math.sin(state.clock.getElapsedTime() * 1.5)
  })

  const points = useMemo(() => {
    const geom = new THREE.BufferGeometry()
    const N = 400 // Slightly lower count for performance
    const positions = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const angle = (i / N) * Math.PI * 2
      const r = 2.2 + (i % 7) * 0.01
      positions[i * 3 + 0] = Math.cos(angle) * r
      positions[i * 3 + 1] = Math.sin(angle * 1.3) * 0.2
      positions[i * 3 + 2] = Math.sin(angle) * r
    }
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return geom
  }, [])

  return (
    <group ref={group} position={[0, 0, 0]}>
      <points>
        <primitive attach="geometry" object={points} />
        <pointsMaterial ref={matRef} size={0.02} color="#4169e1" transparent opacity={0.8} />
      </points>
    </group>
  )
}

// Parallax Logic - Makes the scene move with your mouse
function ParallaxRig({ children }) {
  const group = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(({ clock }) => {
    if (!group.current) return
    const targetX = mouse.current.x * 0.8 
    const targetY = mouse.current.y * -0.4
    
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.1)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetY, 0.1)
    
    const px = mouse.current.x * 0.2
    const py = 0.02 * Math.sin(clock.getElapsedTime() * 1.0)
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, 0.5 + px, 0.1)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, py, 0.1)
  })

  return <group ref={group}>{children}</group>
}

// MAIN HERO COMPONENT
export default function HeroCTA() {
  return (
    <section className="relative h-screen w-full flex items-center bg-[#fafafa] overflow-hidden">
      
      {/* Left Side Content: Stylish Typography */}
      <div className="relative z-10 container mx-auto px-10 pointer-events-none">
        <div className="max-w-xl animate-[slideIn_1.2s_ease-out_forwards]">
          <h1 className="text-7xl font-black tracking-tighter text-[#1a1a1a] leading-none mb-6">
            SYSTEMS <br /> ARCHITECT.
          </h1>
          <p className="text-lg text-gray-500 font-medium max-w-sm">
            Building high-performance MERN applications with a focus on system-level optimization.
          </p>
        </div>
      </div>

      {/* Right Side: The 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: false, dpr: 1 }} // Performance hacks for your i5
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <Suspense fallback={null}>
            <ParallaxRig>
              <DistortedSphere />
              <OrbitingPoints />
            </ParallaxRig>
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}