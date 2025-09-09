import { Canvas } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import { useRef, useState } from 'react'

function Skybox() {
  // Texture 360° - même que demo3
  const texture = useTexture('/_base/rogland_clear_night.jpg')
  
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

function ClickablePoint({ position, onClick, isActive }) {
  const meshRef = useRef()
  
  return (
    <mesh 
      ref={meshRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer'
        meshRef.current.scale.setScalar(1.2)
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto'
        meshRef.current.scale.setScalar(1)
      }}
    >
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial 
        color={isActive ? "#ff6b6b" : "#4ecdc4"} 
        transparent 
        opacity={0.8}
      />
    </mesh>
  )
}

function Demo4() {
  const [activePoint, setActivePoint] = useState(null)
  
  // Positions des points cliquables sur la sphère
  const clickablePoints = [
    { id: 1, position: [10, 5, 0], name: "Point 1" },
    { id: 2, position: [-8, 3, 5], name: "Point 2" },
    { id: 3, position: [0, -10, 8], name: "Point 3" },
    { id: 4, position: [5, 8, -5], name: "Point 4" },
  ]
  
  const handlePointClick = (pointId, pointName) => {
    setActivePoint(pointId)
    console.log(`Clic sur ${pointName}!`)
    // Ici tu peux ajouter ta logique personnalisée
  }
  
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
        {/* La sphère 360° */}
        <Skybox />
        
        {/* Points cliquables */}
        {clickablePoints.map((point) => (
          <ClickablePoint
            key={point.id}
            position={point.position}
            onClick={() => handlePointClick(point.id, point.name)}
            isActive={activePoint === point.id}
          />
        ))}
        
        {/* Contrôles de navigation */}
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={1}
          maxDistance={10}
        />
      </Canvas>
      
      {/* Interface pour afficher les infos */}
      {activePoint && (
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          zIndex: 20
        }}>
          Point {activePoint} sélectionné !
        </div>
      )}
    </div>
  )
}

export default Demo4
