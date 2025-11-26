import { Canvas } from '@react-three/fiber'
import { Scene } from './Scene'
import './index.css'

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000000' }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55 }}
        gl={{ antialias: true, toneMappingExposure: 1.5 }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

export default App
