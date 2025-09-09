import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function ComputerModel() {
  // Importe le modèle 3D depuis le dossier public
  const { scene } = useGLTF('/_base/lowres computer.glb')
  
  return <primitive object={scene} scale={1} />
}

function Demo2() {
  return (
    <div style={{ width: '100%', height: '80vh', margin: '20px auto' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        {/* Éclairage */}
        <ambientLight intensity={0.} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        
        {/* Le modèle 3D importé */}
        <ComputerModel />
        
        {/* Contrôles de drag avec la souris */}
        <OrbitControls 
          enablePan={true} // Désactive le déplacement
          enableZoom={true} // Garde le zoom
          enableRotate={true} // Active la rotation
        />
      </Canvas>
    </div>
  )
}

export default Demo2
