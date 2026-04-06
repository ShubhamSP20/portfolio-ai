import { useEffect, useRef } from 'react'

export default function CursorTrail() {
  const trailRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const particles = []

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }

      const particle = document.createElement('div')
      const size = Math.random() * 8 + 4
      const colors = ['#00f5ff', '#bf00ff', '#00ff88']
      const color = colors[Math.floor(Math.random() * colors.length)]

      particle.style.cssText = `
        position: fixed;
        left: ${e.clientX - size / 2}px;
        top: ${e.clientY - size / 2}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        box-shadow: 0 0 ${size * 2}px ${color};
        pointer-events: none;
        z-index: 9999;
        transition: opacity 0.5s ease, transform 0.5s ease;
        transform: scale(1);
      `
      container.appendChild(particle)

      setTimeout(() => {
        particle.style.opacity = '0'
        particle.style.transform = 'scale(0)'
      }, 50)

      setTimeout(() => {
        if (container.contains(particle)) container.removeChild(particle)
      }, 600)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50" />
}
