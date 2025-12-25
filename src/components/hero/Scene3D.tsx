'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleWave() {
    const ref = useRef<THREE.Points>(null)

    // Generate particles in a grid pattern
    const particles = useMemo(() => {
        const count = 2000
        const positions = new Float32Array(count * 3)

        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 10
            const y = (Math.random() - 0.5) * 10
            const z = (Math.random() - 0.5) * 5

            positions[i * 3] = x
            positions[i * 3 + 1] = y
            positions[i * 3 + 2] = z
        }

        return positions
    }, [])

    useFrame((state) => {
        if (!ref.current) return

        const time = state.clock.getElapsedTime()
        const positions = ref.current.geometry.attributes.position.array as Float32Array

        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i]
            const y = positions[i + 1]

            // Create wave effect
            positions[i + 2] = Math.sin(x * 0.5 + time * 0.5) * 0.5 +
                Math.cos(y * 0.5 + time * 0.3) * 0.5
        }

        ref.current.geometry.attributes.position.needsUpdate = true
        ref.current.rotation.y = time * 0.05
    })

    return (
        <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#06b6d4"
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    )
}

function FloatingGrid() {
    const ref = useRef<THREE.LineSegments>(null)

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry()
        const gridSize = 20
        const divisions = 20
        const step = gridSize / divisions
        const positions: number[] = []

        // Create grid lines
        for (let i = 0; i <= divisions; i++) {
            const pos = -gridSize / 2 + i * step

            // Horizontal lines
            positions.push(-gridSize / 2, 0, pos)
            positions.push(gridSize / 2, 0, pos)

            // Vertical lines
            positions.push(pos, 0, -gridSize / 2)
            positions.push(pos, 0, gridSize / 2)
        }

        geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
        return geo
    }, [])

    useFrame((state) => {
        if (!ref.current) return
        const time = state.clock.getElapsedTime()
        ref.current.position.y = -3 + Math.sin(time * 0.2) * 0.3
        ref.current.rotation.x = -Math.PI / 2.5
    })

    return (
        <lineSegments ref={ref} geometry={geometry}>
            <lineBasicMaterial color="#3b82f6" transparent opacity={0.2} />
        </lineSegments>
    )
}

export default function Scene3D() {
    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 60 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
        >
            <ambientLight intensity={0.5} />
            <ParticleWave />
            <FloatingGrid />
        </Canvas>
    )
}
