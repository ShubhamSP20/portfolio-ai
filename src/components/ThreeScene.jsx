import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const width = mount.clientWidth
    const height = mount.clientHeight

    // Scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Central glowing sphere (holographic planet)
    const sphereGeo = new THREE.SphereGeometry(1.2, 64, 64)
    const sphereMat = new THREE.MeshPhongMaterial({
      color: 0x001133,
      emissive: 0x002266,
      wireframe: false,
      transparent: true,
      opacity: 0.8,
    })
    const sphere = new THREE.Mesh(sphereGeo, sphereMat)
    scene.add(sphere)

    // Wireframe overlay
    const wireGeo = new THREE.SphereGeometry(1.22, 24, 24)
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    })
    const wireSphere = new THREE.Mesh(wireGeo, wireMat)
    scene.add(wireSphere)

    // Outer ring 1
    const ring1Geo = new THREE.TorusGeometry(2.0, 0.015, 8, 100)
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00f5ff, transparent: true, opacity: 0.6 })
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat)
    ring1.rotation.x = Math.PI / 2.5
    scene.add(ring1)

    // Outer ring 2
    const ring2Geo = new THREE.TorusGeometry(2.5, 0.01, 8, 100)
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xbf00ff, transparent: true, opacity: 0.4 })
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
    ring2.rotation.x = Math.PI / 4
    ring2.rotation.z = Math.PI / 6
    scene.add(ring2)

    // Outer ring 3
    const ring3Geo = new THREE.TorusGeometry(3.0, 0.008, 8, 100)
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0x00ff88, transparent: true, opacity: 0.3 })
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat)
    ring3.rotation.x = Math.PI / 1.8
    ring3.rotation.y = Math.PI / 5
    scene.add(ring3)

    // Orbiting nodes
    const nodeColors = [0x00f5ff, 0xbf00ff, 0x00ff88, 0xff6b35, 0xffcc00]
    const nodes = []
    const orbits = [
      { radius: 2.0, speed: 0.008, y: 0 },
      { radius: 2.5, speed: 0.005, y: 0.5 },
      { radius: 3.0, speed: 0.003, y: -0.3 },
    ]

    orbits.forEach((orbit, oi) => {
      for (let i = 0; i < 3; i++) {
        const nodeGeo = new THREE.SphereGeometry(0.06, 16, 16)
        const nodeMat = new THREE.MeshBasicMaterial({ color: nodeColors[(oi * 3 + i) % nodeColors.length] })
        const node = new THREE.Mesh(nodeGeo, nodeMat)
        node.userData = {
          orbitRadius: orbit.radius,
          orbitSpeed: orbit.speed * (i % 2 === 0 ? 1 : -1),
          orbitAngle: (i / 3) * Math.PI * 2,
          orbitY: orbit.y,
          orbitTilt: (oi * 0.4) + (i * 0.2),
        }
        scene.add(node)
        nodes.push(node)
      }
    })

    // Particle stars
    const starCount = 2000
    const starPositions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 40
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.04,
      transparent: true,
      opacity: 0.8,
    })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    // Colored nebula particles
    const nebulaCount = 300
    const nebulaPositions = new Float32Array(nebulaCount * 3)
    const nebulaColors = new Float32Array(nebulaCount * 3)
    for (let i = 0; i < nebulaCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.5 + Math.random() * 4
      nebulaPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      nebulaPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      nebulaPositions[i * 3 + 2] = r * Math.cos(phi)

      const choice = Math.random()
      if (choice < 0.33) { nebulaColors[i * 3] = 0; nebulaColors[i * 3 + 1] = 0.96; nebulaColors[i * 3 + 2] = 1 }
      else if (choice < 0.66) { nebulaColors[i * 3] = 0.75; nebulaColors[i * 3 + 1] = 0; nebulaColors[i * 3 + 2] = 1 }
      else { nebulaColors[i * 3] = 0; nebulaColors[i * 3 + 1] = 1; nebulaColors[i * 3 + 2] = 0.53 }
    }
    const nebulaGeo = new THREE.BufferGeometry()
    nebulaGeo.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3))
    nebulaGeo.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3))
    const nebulaMat = new THREE.PointsMaterial({ size: 0.08, vertexColors: true, transparent: true, opacity: 0.7 })
    const nebula = new THREE.Points(nebulaGeo, nebulaMat)
    scene.add(nebula)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x111133, 2)
    scene.add(ambientLight)
    const pointLight1 = new THREE.PointLight(0x00f5ff, 3, 10)
    pointLight1.position.set(3, 3, 3)
    scene.add(pointLight1)
    const pointLight2 = new THREE.PointLight(0xbf00ff, 2, 10)
    pointLight2.position.set(-3, -2, 2)
    scene.add(pointLight2)

    // Mouse interaction
    let mouseX = 0, mouseY = 0
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    let frameId
    let t = 0
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      t += 0.01

      sphere.rotation.y += 0.003
      sphere.rotation.x += 0.001
      wireSphere.rotation.y -= 0.002
      wireSphere.rotation.x += 0.001

      ring1.rotation.z += 0.005
      ring2.rotation.y += 0.004
      ring3.rotation.x += 0.003

      nodes.forEach((node) => {
        node.userData.orbitAngle += node.userData.orbitSpeed
        const a = node.userData.orbitAngle
        const r = node.userData.orbitRadius
        const tilt = node.userData.orbitTilt
        node.position.x = r * Math.cos(a)
        node.position.y = r * Math.sin(a) * Math.sin(tilt) + node.userData.orbitY
        node.position.z = r * Math.sin(a) * Math.cos(tilt)
      })

      stars.rotation.y += 0.0001
      nebula.rotation.y += 0.0005

      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const handleResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="w-full h-full" />
}
