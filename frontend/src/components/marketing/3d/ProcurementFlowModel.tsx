import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere, Box, Cylinder, Html } from "@react-three/drei";
import * as THREE from "three";

interface MerchantNode {
  id: string;
  label: string;
  color: string;
  alonePos: [number, number, number];
  pooledPos: [number, number, number];
}

const MERCHANTS: MerchantNode[] = [
  {
    id: "m1",
    label: "Pharmacy",
    color: "#38BDF8",
    alonePos: [-5, -2, 0],
    pooledPos: [-1.2, -2, 0],
  },
  {
    id: "m2",
    label: "Grocery",
    color: "#FBBF24",
    alonePos: [-2.2, -2, -1],
    pooledPos: [-0.4, -2, -0.5],
  },
  {
    id: "m3",
    label: "Restaurant",
    color: "#F43F5E",
    alonePos: [2.2, -2, 1],
    pooledPos: [0.4, -2, 0.5],
  },
  {
    id: "m4",
    label: "Retailer",
    color: "#8B5CF6",
    alonePos: [5, -2, 0],
    pooledPos: [1.2, -2, 0],
  },
];

function ProcurementNarrative() {
  const group = useRef<THREE.Group>(null);
  const { width } = useThree().size;
  const isMobile = width < 640;

  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [transitionProgress, setTransitionProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => {
        if (prev === 0) return 1;
        if (prev === 1) return 2;
        return 0;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useFrame(() => {
    const target = phase === 0 ? 0 : phase === 1 ? 0.5 : 1;
    setTransitionProgress((prev) => THREE.MathUtils.lerp(prev, target, 0.08));

    if (group.current) {
      group.current.rotation.y =
        Math.sin(
          THREE.MathUtils.mapLinear(transitionProgress, 0, 1, 0.05, 0.1),
        ) * 0.15;
    }
  });

  const getMerchantPos = (m: MerchantNode): [number, number, number] => {
    const factor = Math.min(transitionProgress * 2, 1);
    return [
      THREE.MathUtils.lerp(m.alonePos[0], m.pooledPos[0], factor),
      THREE.MathUtils.lerp(m.alonePos[1], m.pooledPos[1], factor),
      THREE.MathUtils.lerp(m.alonePos[2], m.pooledPos[2], factor),
    ];
  };

  const particleProgress = useRef<number[]>([0, 0.25, 0.5, 0.75]);
  useFrame(() => {
    particleProgress.current = particleProgress.current.map((p) => {
      const next = p + 0.012;
      return next > 1 ? 0 : next;
    });
  });

  const render3DPipe = (
    start: [number, number, number],
    end: [number, number, number],
    color: string,
    opacity: number,
    key: string,
    thickness = 0.025,
  ) => {
    const pStart = new THREE.Vector3(...start);
    const pEnd = new THREE.Vector3(...end);
    const distance = pStart.distanceTo(pEnd);
    if (distance < 0.05) return null;
    const position = pStart.clone().add(pEnd).multiplyScalar(0.5);

    const direction = new THREE.Vector3().subVectors(pEnd, pStart).normalize();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction,
    );

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
    );
  };

  const scale = isMobile ? 0.65 : 1;

  return (
    <group ref={group} scale={[scale, scale, scale]}>
      {/* 3D Grid Floor */}
      <gridHelper args={[20, 12, "#334155", "#1E293B"]} position={[0, -4, 0]} />

      {/* Supplier Hub at Top */}
      <group position={[0, 3.5, 0]}>
        <Sphere args={[isMobile ? 0.45 : 0.6, 32, 32]}>
          <meshPhysicalMaterial
            color="#10B981"
            emissive="#10B981"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.95}
            clearcoat={1.0}
          />
        </Sphere>
        <Html position={[0, isMobile ? 0.8 : 1.1, 0]} center>
          <div className="bg-q-dark-surface/90 border border-q-green/35 text-q-green text-[10px] sm:text-xs font-semibold px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg whitespace-nowrap shadow-xl">
            Direct Suppliers
          </div>
        </Html>
      </group>

      {/* Quantigo Pool in Middle */}
      <group position={[0, 0.5, 0]}>
        <Box
          args={[isMobile ? 2.5 : 3.5, 0.8, 2]}
          visible={transitionProgress > 0.1}
        >
          <meshPhysicalMaterial
            color="#2563EB"
            emissive="#2563EB"
            emissiveIntensity={transitionProgress * 0.9}
            roughness={0.15}
            metalness={0.9}
            clearcoat={1.0}
            transmission={0.5}
            thickness={1}
            transparent
            opacity={transitionProgress}
          />
        </Box>
        <Html position={[0, 0, 0]} center>
          <div
            className={`transition-all duration-500 bg-q-dark-surface/95 border text-[10px] sm:text-xs font-semibold px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg whitespace-nowrap shadow-xl ${
              transitionProgress > 0.3
                ? "border-q-blue/40 text-q-blue opacity-100 scale-100"
                : "border-white/10 text-white/40 opacity-0 scale-95 pointer-events-none"
            }`}
          >
            Quantigo Pool
          </div>
        </Html>
      </group>

      {/* Merchants */}
      {MERCHANTS.map((m) => {
        const pos = getMerchantPos(m);
        const isAlone = transitionProgress < 0.4;

        return (
          <group key={m.id} position={pos}>
            <Sphere args={[isMobile ? 0.22 : 0.32, 24, 24]}>
              <meshPhysicalMaterial
                color={m.color}
                emissive={m.color}
                emissiveIntensity={0.6}
                roughness={0.1}
                metalness={0.8}
                clearcoat={0.8}
              />
            </Sphere>

            <Html position={[0, isMobile ? -0.45 : -0.6, 0]} center>
              <div className="bg-q-dark-surface/90 border border-white/10 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-white/80 shadow-md">
                {m.label}
              </div>
            </Html>

            {/* Alone/Pulsing pipeline */}
            {isAlone && (
              <group>
                {render3DPipe(
                  [0, 0, 0],
                  [0, 5, 0],
                  "#EF4444",
                  0.35,
                  `pipe-alone-${m.id}`,
                  0.012,
                )}
                <Html position={[0, isMobile ? 1.0 : 1.3, 0]} center>
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[8px] sm:text-[9px] font-bold px-1 py-0.5 rounded backdrop-blur-sm whitespace-nowrap">
                    100% Markup
                  </div>
                </Html>
              </group>
            )}

            {/* Coordinated connection pipe to pool */}
            {!isAlone &&
              render3DPipe(
                [0, 0, 0],
                [-pos[0], 0.5 - pos[1], -pos[2]],
                "#2563EB",
                transitionProgress * 0.5,
                `pipe-pooled-${m.id}`,
                0.028,
              )}
          </group>
        );
      })}

      {/* Collective Supplier Pipeline */}
      {transitionProgress > 0.4 && (
        <group>
          {render3DPipe(
            [0, 3.5, 0],
            [0, 0.9, 0],
            "#10B981",
            (transitionProgress - 0.4) * 2 * 0.7,
            "pipe-main-supplier",
            0.05,
          )}

          {particleProgress.current.map((p, idx) => {
            const y = THREE.MathUtils.lerp(3.5, 0.9, p);
            return (
              <Sphere
                key={`inv-p-${idx}`}
                args={[isMobile ? 0.08 : 0.13, 12, 12]}
                position={[0, y, 0]}
              >
                <meshPhysicalMaterial
                  color="#10B981"
                  emissive="#10B981"
                  emissiveIntensity={2}
                  roughness={0.1}
                  metalness={0.8}
                />
              </Sphere>
            );
          })}
        </group>
      )}

      {/* Explanatory Overlay Text */}
      <Html position={[0, isMobile ? -4.3 : -3.9, 0]} center>
        <div className="text-center w-[260px] sm:w-[320px] bg-q-dark-surface/95 border border-white/5 rounded-xl p-3 sm:p-4 shadow-2xl backdrop-blur-md">
          {phase === 0 && (
            <div>
              <p className="text-[10px] sm:text-xs font-bold text-red-400 uppercase tracking-widest">
                Phase 1: Buying Alone
              </p>
              <p className="text-[9px] sm:text-[11px] text-white/60 mt-1 leading-normal">
                Merchants order independently. High transit overheads and up to
                100% middleman markups.
              </p>
            </div>
          )}
          {phase === 1 && (
            <div>
              <p className="text-[10px] sm:text-xs font-bold text-q-blue uppercase tracking-widest animate-pulse">
                Phase 2: Pooling Demand
              </p>
              <p className="text-[9px] sm:text-[11px] text-white/60 mt-1 leading-normal">
                Quantigo's engine automatically aggregates purchasing lists
                across community retailers.
              </p>
            </div>
          )}
          {phase === 2 && (
            <div>
              <p className="text-[10px] sm:text-xs font-bold text-q-green uppercase tracking-widest">
                Phase 3: Wholesale Scale
              </p>
              <p className="text-[9px] sm:text-[11px] text-white/60 mt-1 leading-normal">
                Direct supplier orders unlocked. Group shipping saves up to 35%
                on procurement.
              </p>
            </div>
          )}
        </div>
      </Html>

      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 15, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[0, 0.5, 2]} intensity={1.5} color="#2563EB" />
    </group>
  );
}

export function ProcurementFlowModel() {
  return (
    <div className="w-full h-[360px] sm:h-[450px] relative rounded-2xl overflow-hidden border border-white/5 bg-q-dark-surface/30 backdrop-blur-sm">
      <Canvas camera={{ position: [0, 0.5, 9], fov: 45 }}>
        <ProcurementNarrative />
      </Canvas>
    </div>
  );
}
