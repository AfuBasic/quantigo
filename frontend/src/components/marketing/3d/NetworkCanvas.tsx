import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Cylinder, Box } from '@react-three/drei'
import * as THREE from 'three'

// Premium color palette
const COLORS = {
  pharmacy: '#06B6D4',   // Electric Cyan
  grocery: '#F59E0B',    // Amber Gold
  restaurant: '#F43F5E', // Crimson
  retail: '#3B82F6',     // Bright Blue
  distributor: '#8B5CF6',// Deep Purple
  pool: '#2563EB',       // Quantigo Blue
  supplier: '#10B981',   // Emerald Green
  warehouse: '#14B8A6'   // Teal
}

interface NodeItem {
  id: string
  position: [number, number, number]
  color: string
  size: number
}

interface FlowParticle {
  type: 'demand' | 'supply' | 'bulk'
  merchantIdx?: number
  supplierIdx?: number
  warehouseIdx?: number
  stage?: number
  progress: number
  speed: number
  color: string
}

function ProcurementNetwork() {
  const groupRef = useRef<THREE.Group>(null)

  // Generate nodes layout in a structured 3D space
  const { merchants, suppliers, warehouses, poolNode } = useMemo(() => {
    const merchantsList: NodeItem[] = []
    const types: ('pharmacy' | 'grocery' | 'restaurant' | 'retail' | 'distributor')[] = [
      'pharmacy', 'grocery', 'restaurant', 'retail', 'distributor'
    ]

    // 35 Merchants grouped in clusters
    for (let i = 0; i < 35; i++) {
      const type = types[i % types.length]
      const angle = (i / 35) * Math.PI * 2
      const r = 7 + Math.random() * 3
      const x = -6 - Math.random() * 4
      const y = Math.sin(angle) * r * 0.6
      const z = Math.cos(angle) * r * 0.6

      merchantsList.push({
        id: `m-${i}`,
        position: [x, y, z],
        color: COLORS[type],
        size: 0.22 + Math.random() * 0.1
      })
    }

    // 4 Suppliers on the far right
    const suppliersList: NodeItem[] = []
    for (let i = 0; i < 4; i++) {
      const y = (i - 1.5) * 4
      suppliersList.push({
        id: `s-${i}`,
        position: [10, y, (i % 2 === 0 ? 2 : -2)],
        color: COLORS.supplier,
        size: 0.55
      })
    }

    // 2 Warehouses between suppliers and pool
    const warehousesList: NodeItem[] = []
    for (let i = 0; i < 2; i++) {
      const y = (i - 0.5) * 3
      warehousesList.push({
        id: `w-${i}`,
        position: [5, y, 0],
        color: COLORS.warehouse,
        size: 0.45
      })
    }

    const pool: NodeItem = {
      id: 'pool',
      position: [0, 0, 0],
      color: COLORS.pool,
      size: 1.1
    }

    return { merchants: merchantsList, suppliers: suppliersList, warehouses: warehousesList, poolNode: pool }
  }, [])

  // Moving particles for flow simulation
  const particles = useMemo(() => {
    const temp: FlowParticle[] = []
    for (let i = 0; i < 20; i++) {
      temp.push({
        type: 'demand',
        merchantIdx: i % merchants.length,
        progress: Math.random(),
        speed: 0.006 + Math.random() * 0.005,
        color: COLORS.pool
      })
    }
    for (let i = 0; i < 15; i++) {
      temp.push({
        type: 'supply',
        merchantIdx: (i + 3) % merchants.length,
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.004,
        color: COLORS.supplier
      })
    }
    for (let i = 0; i < 8; i++) {
      temp.push({
        type: 'bulk',
        supplierIdx: i % suppliers.length,
        warehouseIdx: i % warehouses.length,
        stage: Math.random() > 0.5 ? 1 : 0,
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.003,
        color: COLORS.supplier
      })
    }
    return temp
  }, [merchants.length, suppliers.length, warehouses.length])

  const particleRefs = useRef(particles)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.06
      groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.08
    }

    particleRefs.current.forEach(p => {
      p.progress += p.speed
      if (p.progress > 1) {
        p.progress = 0
        if (p.type === 'bulk') {
          p.stage = p.stage === 0 ? 1 : 0
        }
      }
    })
  })

  // Helper function to render 3D pipe connecting two points
  const render3DPipe = (start: [number, number, number], end: [number, number, number], color: string, opacity: number, key: string) => {
    const pStart = new THREE.Vector3(...start)
    const pEnd = new THREE.Vector3(...end)
    const distance = pStart.distanceTo(pEnd)
    const position = pStart.clone().add(pEnd).multiplyScalar(0.5)
    
    // Calculate rotation to align cylinder with start/end points
    const direction = new THREE.Vector3().subVectors(pEnd, pStart).normalize()
    const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction)

    return (
      <Cylinder
        key={key}
        args={[0.018, 0.018, distance, 6]}
        position={[position.x, position.y, position.z]}
        quaternion={quaternion}
      >
        <meshStandardMaterial
          color={color}
          transparent
          opacity={opacity}
          roughness={0.2}
          metalness={0.9}
        />
      </Cylinder>
    )
  }

  return (
    <group ref={groupRef}>
      {/* 3D Grid Floor underneath for depth reference */}
      <gridHelper args={[40, 20, '#1E293B', '#0F172A']} position={[0, -5, 0]} />

      {/* Central Procurement Pool - Glass turbine / glowing engine */}
      <group position={poolNode.position}>
        <Sphere args={[poolNode.size, 32, 32]}>
          <meshPhysicalMaterial
            color={poolNode.color}
            emissive={poolNode.color}
            emissiveIntensity={1.8}
            roughness={0.1}
            metalness={0.9}
            clearcoat={1.0}
            transmission={0.6}
            thickness={1.5}
            transparent
            opacity={0.8}
          />
        </Sphere>
        {/* Outer orbital rings */}
        <Cylinder args={[poolNode.size * 1.3, poolNode.size * 1.3, 0.1, 32, 1, true]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial color="#22C55E" wireframe side={THREE.DoubleSide} emissive="#22C55E" emissiveIntensity={0.5} />
        </Cylinder>
        <Cylinder args={[poolNode.size * 1.5, poolNode.size * 1.5, 0.08, 32, 1, true]} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <meshStandardMaterial color="#2563EB" wireframe side={THREE.DoubleSide} emissive="#2563EB" emissiveIntensity={0.4} />
        </Cylinder>
      </group>

      {/* Merchants (High-end metallic spheres) */}
      {merchants.map((m) => (
        <group key={m.id} position={m.position}>
          <Sphere args={[m.size, 24, 24]}>
            <meshPhysicalMaterial
              color={m.color}
              emissive={m.color}
              emissiveIntensity={0.5}
              roughness={0.15}
              metalness={0.85}
              clearcoat={0.8}
            />
          </Sphere>
        </group>
      ))}

      {/* Suppliers (Metallic Industrial Drums/Spheres) */}
      {suppliers.map((s) => (
        <group key={s.id} position={s.position}>
          <Sphere args={[s.size, 32, 32]}>
            <meshPhysicalMaterial
              color={s.color}
              emissive={s.color}
              emissiveIntensity={0.4}
              roughness={0.2}
              metalness={0.95}
              clearcoat={0.9}
            />
          </Sphere>
        </group>
      ))}

      {/* Warehouses */}
      {warehouses.map((w) => (
        <group key={w.id} position={w.position}>
          <Box args={[w.size * 1.5, w.size * 1.5, w.size * 1.5]} position={[0, 0, 0]}>
            <meshPhysicalMaterial
              color={w.color}
              emissive={w.color}
              emissiveIntensity={0.3}
              roughness={0.25}
              metalness={0.9}
            />
          </Box>
        </group>
      ))}

      {/* 3D Physical Pipes instead of lines */}
      {merchants.map((m, idx) => 
        render3DPipe(m.position, poolNode.position, m.color, 0.25, `pipe-m-${idx}`)
      )}
      {suppliers.map((s, idx) => {
        const w = warehouses[idx % warehouses.length]
        return render3DPipe(s.position, w.position, COLORS.supplier, 0.4, `pipe-s-${idx}`)
      })}
      {warehouses.map((w, idx) => 
        render3DPipe(w.position, poolNode.position, COLORS.warehouse, 0.4, `pipe-w-${idx}`)
      )}

      {/* Flowing Cargo/Packets */}
      {particleRefs.current.map((p, i) => {
        let pos: [number, number, number] = [0, 0, 0]

        if (p.type === 'demand' && p.merchantIdx !== undefined) {
          const start = merchants[p.merchantIdx].position
          const end = poolNode.position
          pos = [
            THREE.MathUtils.lerp(start[0], end[0], p.progress),
            THREE.MathUtils.lerp(start[1], end[1], p.progress),
            THREE.MathUtils.lerp(start[2], end[2], p.progress)
          ]
        } else if (p.type === 'supply' && p.merchantIdx !== undefined) {
          const start = poolNode.position
          const end = merchants[p.merchantIdx].position
          pos = [
            THREE.MathUtils.lerp(start[0], end[0], p.progress),
            THREE.MathUtils.lerp(start[1], end[1], p.progress),
            THREE.MathUtils.lerp(start[2], end[2], p.progress)
          ]
        } else if (p.type === 'bulk' && p.supplierIdx !== undefined && p.warehouseIdx !== undefined) {
          const sup = suppliers[p.supplierIdx].position
          const war = warehouses[p.warehouseIdx].position
          const end = poolNode.position

          if (p.stage === 0) {
            pos = [
              THREE.MathUtils.lerp(sup[0], war[0], p.progress),
              THREE.MathUtils.lerp(sup[1], war[1], p.progress),
              THREE.MathUtils.lerp(sup[2], war[2], p.progress)
            ]
          } else {
            pos = [
              THREE.MathUtils.lerp(war[0], end[0], p.progress),
              THREE.MathUtils.lerp(war[1], end[1], p.progress),
              THREE.MathUtils.lerp(war[2], end[2], p.progress)
            ]
          }
        }

        return (
          <Sphere key={`part-${i}`} args={[0.11, 12, 12]} position={pos}>
            <meshPhysicalMaterial
              color={p.color}
              emissive={p.color}
              emissiveIntensity={2.5}
              roughness={0.1}
              metalness={0.8}
            />
          </Sphere>
        )
      })}
    </group>
  )
}

export function NetworkCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-45">
      <Canvas camera={{ position: [0, 1.5, 17], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.8} />
        
        {/* Cinematic Directional Lights for metallic specular highlights */}
        <directionalLight position={[10, 20, 10]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#2563EB" />
        
        {/* Glow point lights */}
        <pointLight position={[-8, 5, 5]} intensity={2} color="#2563EB" distance={25} />
        <pointLight position={[8, -5, 5]} intensity={2.5} color="#10B981" distance={25} />
        
        <ProcurementNetwork />
      </Canvas>
    </div>
  )
}
