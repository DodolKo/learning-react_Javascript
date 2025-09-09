import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function StaticCube() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#4f46e5" />
    </mesh>
  )
}

function ThreeFiberTest() {
  return (
    <div style={{ width: '400px', height: '400px', margin: '20px auto' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        {/* Éclairage */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        
        {/* Le cube */}
        <StaticCube />
        
        {/* Contrôles de drag avec la souris */}
        <OrbitControls 
          enablePan={false} // Désactive le déplacement
          enableZoom={true} // Garde le zoom
          enableRotate={true} // Active la rotation
        />
      </Canvas>
    </div>
  )
}

export default ThreeFiberTest