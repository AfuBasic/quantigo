import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Box, Cylinder, Ring } from '@react-three/drei'
import * as THREE from 'three'

function IntelligenceCore() {
  const group = useRef<THREE.Group>(null)

  const barCount = 12
  const bars = useMemo(() => {
    const temp = []
    for (let i = 0; i < barCount; i++) {
      const angle = (i / barCount) * Math.PI * 2
      const radius = 3.3
      const height = 1.2 + Math.random() * 2.2
      temp.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        height,
        color: i % 2 === 0 ? '#10B981' : '#2563EB'
      })
    }
    return temp
  }, [])

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.12
      group.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.08) * 0.04
    }
  })

  const render3DLine = (start: [number, number, number], end: [number, number, number], color: string, opacity: number, key: string) => {
    const pStart = new THREE.Vector3(...start)
    const pEnd = new THREE.Vector3(...end)
    const distance = pStart.distanceTo(pEnd)
    const position = pStart.clone().add(pEnd).multiplyScalar(0.5)
    
    const direction = new THREE.Vector3().subVectors(pEnd, pStart).normalize()
    const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction)

    return (
      <Cylinder
        key={key}
        args={[0.01, 0.01, distance, 4]}
        position={[position.x, position.y, position.z]}
        quaternion={quaternion}
      >
        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity}
        />
      </Cylinder>
    )
  }

  return (
    <group ref={group}>
      {/* 3D Grid Floor */}
      <gridHelper args={[15, 10, '#334155', '#1E293B']} position={[0, -2.5, 0]} />

      {/* Central Server Cloud Hub */}
      <Box args={[1.3, 1.3, 1.3]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#0F172A"
          roughness={0.1}
          metalness={0.9}
          clearcoat={1.0}
          transmission={0.4}
          thickness={1.5}
          transparent
          opacity={0.8}
        />
      </Box>
      <Sphere args={[0.4, 24, 24]}>
        <meshPhysicalMaterial
          color="#2563EB"
          emissive="#2563EB"
          emissiveIntensity={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>

      {/* Orbiting Ring of Commerce Intelligence */}
      <Ring args={[2.5, 2.56, 64]} rotation={[Math.PI / 2.3, 0, 0]}>
        <meshBasicMaterial color="#10B981" transparent opacity={0.35} side={THREE.DoubleSide} />
      </Ring>

      {/* Orbiting data packages */}
      {[0, 1, 2].map((idx) => (
        <group key={`orbit-${idx}`} rotation={[0, (idx * Math.PI) / 1.5, 0]}>
          <Sphere args={[0.13, 16, 16]} position={[2.53, 0, 0]}>
            <meshPhysicalMaterial
              color="#10B981"
              emissive="#10B981"
              emissiveIntensity={1.5}
              roughness={0.1}
              metalness={0.9}
            />
          </Sphere>
        </group>
      ))}

      {/* 3D Bar charts representing pooled buying power / savings growth */}
      {bars.map((bar, i) => (
        <group key={`bar-${i}`} position={[bar.x, -2.5 + bar.height / 2, bar.z]}>
          <Box args={[0.22, bar.height, 0.22]}>
            <meshPhysicalMaterial
              color={bar.color}
              emissive={bar.color}
              emissiveIntensity={0.4}
              roughness={0.15}
              metalness={0.9}
              clearcoat={0.8}
              transparent
              opacity={0.85}
            />
          </Box>
          <Sphere args={[0.13, 12, 12]} position={[0, bar.height / 2, 0]}>
            <meshPhysicalMaterial
              color={bar.color}
              emissive={bar.color}
              emissiveIntensity={1.2}
              roughness={0.1}
              metalness={0.8}
            />
          </Sphere>
          {/* Connector lines to center server */}
          {render3DLine([0, 0, 0], [-bar.x, 2.5 - bar.height / 2, -bar.z], bar.color, 0.15, `connector-bar-${i}`)}
        </group>
      ))}

      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 10]} intensity={2.5} color="#ffffff" />
      <pointLight position={[0, 0, 2]} intensity={2} color="#2563EB" />
    </group>
  )
}

export function VisionModel() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen">
      <Canvas camera={{ position: [0, 1.5, 7.5], fov: 45 }}>
        <IntelligenceCore />
      </Canvas>
    </div>
  )
}
