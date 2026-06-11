import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sphere, Box, Cylinder, Html } from '@react-three/drei'
import * as THREE from 'three'

interface PipelineStage {
  name: string
  position: [number, number, number]
  color: string
  label: string
}

const STAGES: PipelineStage[] = [
  { name: 'Supplier', position: [-6, 2, 0], color: '#10B981', label: 'Manufacturers' },
  { name: 'Warehouse', position: [-2, 0, 0], color: '#06B6D4', label: 'Fulfillment' },
  { name: 'Pool', position: [2, 0, 0], color: '#2563EB', label: 'Demand Aggregator' },
  { name: 'Merchants', position: [6, -2, 0], color: '#F59E0B', label: 'Delivery Network' }
]

function FlowTimeline() {
  const group = useRef<THREE.Group>(null)
  const { width } = useThree().size
  const isMobile = width < 640

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.position.y = Math.sin(clock.getElapsedTime() * 0.8) * 0.15
    }
  })

  const packetCount = 8
  const packets = useMemo(() => {
    const temp = []
    for (let i = 0; i < packetCount; i++) {
      temp.push({
        progress: i / packetCount,
        speed: 0.003 + Math.random() * 0.002,
        size: 0.14 + Math.random() * 0.08
      })
    }
    return temp
  }, [])

  const packetRefs = useRef(packets)

  useFrame(() => {
    packetRefs.current.forEach(p => {
      p.progress += p.speed
      if (p.progress > 1) p.progress = 0
    })
  })

  const getPacketPos = (progress: number): [number, number, number] => {
    const segmentCount = STAGES.length - 1
    const scaledProgress = progress * segmentCount
    const segmentIndex = Math.min(Math.floor(scaledProgress), segmentCount - 1)
    const segmentProgress = scaledProgress - segmentIndex

    const start = STAGES[segmentIndex].position
    const end = STAGES[segmentIndex + 1].position

    const t = segmentProgress
    return [
      THREE.MathUtils.lerp(start[0], end[0], t),
      THREE.MathUtils.lerp(start[1], end[1], t),
      THREE.MathUtils.lerp(start[2], end[2], t)
    ]
  }

  const render3DPipe = (start: [number, number, number], end: [number, number, number], color: string, opacity: number, key: string, thickness = 0.035) => {
    const pStart = new THREE.Vector3(...start)
    const pEnd = new THREE.Vector3(...end)
    const distance = pStart.distanceTo(pEnd)
    const position = pStart.clone().add(pEnd).multiplyScalar(0.5)
    
    const direction = new THREE.Vector3().subVectors(pEnd, pStart).normalize()
    const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction)

    return (
      <Cylinder
        key={key}
        args={[thickness, thickness, distance, 6]}
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

  const scale = isMobile ? 0.52 : 1

  return (
    <group ref={group} scale={[scale, scale, scale]}>
      {/* 3D Grid Floor */}
      <gridHelper args={[20, 10, '#334155', '#1E293B']} position={[0, -3.5, 0]} />

      {/* Draw connecting physical pipelines */}
      {STAGES.map((s, idx) => {
        if (idx === STAGES.length - 1) return null
        const next = STAGES[idx + 1]
        return render3DPipe(s.position, next.position, idx % 2 === 0 ? "#10B981" : "#2563EB", 0.4, `pipe-timeline-${idx}`, isMobile ? 0.025 : 0.045)
      })}

      {/* Draw stage nodes */}
      {STAGES.map((s, idx) => (
        <group key={s.name} position={s.position}>
          <Sphere args={[isMobile ? 0.35 : 0.5, 32, 32]}>
            <meshPhysicalMaterial
              color={s.color}
              emissive={s.color}
              emissiveIntensity={0.5}
              roughness={0.15}
              metalness={0.9}
              clearcoat={1.0}
            />
          </Sphere>
          
          <Html position={[0, isMobile ? 0.7 : 1, 0]} center>
            <div className={`bg-q-dark-surface/95 border border-white/10 rounded-xl text-center shadow-xl backdrop-blur-md transition-all duration-300 ${
              isMobile ? 'p-1.5 min-w-[80px]' : 'p-2.5 min-w-[140px]'
            }`}>
              <p className="text-[8px] font-bold uppercase tracking-wider text-white/40">Stage 0{idx + 1}</p>
              <p className="text-[10px] sm:text-[11px] font-extrabold text-white mt-0.5">{s.name}</p>
              {!isMobile && <p className="text-[9px] text-white/50 mt-1 leading-none font-medium">{s.label}</p>}
            </div>
          </Html>
        </group>
      ))}

      {/* Render animated inventory cargo */}
      {packetRefs.current.map((p, idx) => {
        const pos = getPacketPos(p.progress)
        const size = isMobile ? p.size * 0.75 : p.size
        return (
          <Box key={`box-${idx}`} args={[size, size, size]} position={pos}>
            <meshPhysicalMaterial
              color={p.progress > 0.66 ? '#F59E0B' : p.progress > 0.33 ? '#2563EB' : '#10B981'}
              emissive={p.progress > 0.66 ? '#F59E0B' : p.progress > 0.33 ? '#2563EB' : '#10B981'}
              emissiveIntensity={0.6}
              roughness={0.2}
              metalness={0.8}
            />
          </Box>
        )
      })}

      <ambientLight intensity={0.8} />
      <directionalLight position={[0, 10, 5]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#2563EB" />
    </group>
  )
}

export function InventoryFlowCanvas() {
  return (
    <div className="w-full h-[260px] sm:h-[350px] relative rounded-2xl overflow-hidden border border-white/5 bg-q-dark-surface/35 backdrop-blur-md">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <FlowTimeline />
      </Canvas>
    </div>
  )
}
