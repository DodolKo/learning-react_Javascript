import { Canvas } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import { useRef } from 'react'

function Skybox() {
  // Texture 360° - tu peux remplacer par ton image
  const texture = useTexture('/_base/rogland_clear_night.jpg') // Image 360°
  
  return (
    <mesh>
      {/* Sphère inversée (intérieur visible) */}
      <sphereGeometry args={[50, 32, 32]} />
      <meshBasicMaterial 
        map={texture} 
        side={2} // THREE.BackSide - rend l'intérieur visible
      />
    </mesh>
  )
}

function Demo3() {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      zIndex: 1 
    }}>
      <Canvas camera={{ position: [0, 0, 0] }}>
        {/* Pas d'éclairage nécessaire pour une skybox */}
        
        {/* La sphère 360° */}
        <Skybox />
        
        {/* Contrôles de drag pour naviguer dans la scène 360° */}
        <OrbitControls 
          enablePan={true} // Active le déplacement
          enableZoom={true} // Garde le zoom
          enableRotate={true} // Active la rotation
          minDistance={1} // Distance minimum
          maxDistance={10} // Distance maximum
        />
      </Canvas>
    </div>
  )
}

export default Demo3
