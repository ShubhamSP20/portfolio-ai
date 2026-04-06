import { useEffect, useRef, useState } from 'react'

const skills = [
  { name: 'JavaScript', level: 90, color: '#f7df1e', category: 'Frontend' },
  { name: 'React.js', level: 88, color: '#61dafb', category: 'Frontend' },
  { name: 'TypeScript', level: 78, color: '#3178c6', category: 'Frontend' },
  { name: 'HTML/CSS', level: 95, color: '#e34f26', category: 'Frontend' },
  { name: 'Three.js', level: 72, color: '#00f5ff', category: 'Frontend' },
  { name: 'Node.js', level: 82, color: '#339933', category: 'Backend' },
  { name: 'Python', level: 80, color: '#3776ab', category: 'Backend' },
  { name: 'SQL', level: 75, color: '#336791', category: 'Backend' },
  { name: 'MongoDB', level: 70, color: '#47a248', category: 'Backend' },
  { name: 'Git', level: 88, color: '#f05032', category: 'Tools' },
  { name: 'Docker', level: 65, color: '#2496ed', category: 'Tools' },
  { name: 'Linux', level: 72, color: '#fcc624', category: 'Tools' },
]

const techIcons = [
  { name: 'React', color: '#61dafb', symbol: '⚛' },
  { name: 'Node', color: '#339933', symbol: '⬡' },
  { name: 'Python', color: '#3776ab', symbol: '🐍' },
  { name: 'JS', color: '#f7df1e', symbol: 'JS' },
  { name: 'Git', color: '#f05032', symbol: '⑂' },
  { name: 'Docker', color: '#2496ed', symbol: '🐳' },
  { name: 'SQL', color: '#336791', symbol: '⛁' },
  { name: 'CSS', color: '#1572b6', symbol: '𝟥' },
]

function SkillOrb() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 })
  const animRef = useRef(null)
  const rotRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const autoRotate = () => {
      if (!isDragging) {
        rotRef.current.y += 0.3
        setRotation({ x: rotRef.current.x, y: rotRef.current.y })
      }
      animRef.current = requestAnimationFrame(autoRotate)
    }
    animRef.current = requestAnimationFrame(autoRotate)
    return () => cancelAnimationFrame(animRef.current)
  }, [isDragging])

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setLastMouse({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const dx = e.clientX - lastMouse.x
    const dy = e.clientY - lastMouse.y
    rotRef.current.y += dx * 0.5
    rotRef.current.x += dy * 0.5
    setLastMouse({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => setIsDragging(false)

  const radius = 140
  const items = techIcons.map((item, i) => {
    const phi = Math.acos(-1 + (2 * i) / techIcons.length)
    const theta = Math.sqrt(techIcons.length * Math.PI) * phi
    return {
      ...item,
      x: radius * Math.sin(phi) * Math.cos(theta),
      y: radius * Math.sin(phi) * Math.sin(theta),
      z: radius * Math.cos(phi),
    }
  })

  const rotX = (rotRef.current.x * Math.PI) / 180
  const rotY = (rotRef.current.y * Math.PI) / 180

  const transform3D = (x, y, z) => {
    const cosX = Math.cos(rotX), sinX = Math.sin(rotX)
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
    const y1 = y * cosX - z * sinX
    const z1 = y * sinX + z * cosX
    const x2 = x * cosY + z1 * sinY
    const z2 = -x * sinY + z1 * cosY
    return { tx: x2, ty: y1, tz: z2 }
  }

  return (
    <div
      className="relative w-80 h-80 mx-auto cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Central core */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle, rgba(0,245,255,0.3), rgba(191,0,255,0.2), transparent)',
          border: '1px solid rgba(0,245,255,0.4)',
          boxShadow: '0 0 40px rgba(0,245,255,0.3)',
          zIndex: 10,
        }}
      >
        <span className="font-orbitron text-xs font-bold" style={{ color: '#00f5ff' }}>DEV</span>
      </div>

      {/* Orbit rings */}
      {[1.0, 0.75, 0.55].map((scale, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: `${scale * 280}px`,
            height: `${scale * 280}px`,
            border: `1px solid rgba(0,245,255,${0.1 - i * 0.02})`,
            boxShadow: `0 0 15px rgba(0,245,255,${0.05})`,
          }}
        />
      ))}

      {/* Tech items */}
      {items.map((item, i) => {
        const { tx, ty, tz } = transform3D(item.x, item.y, item.z)
        const depth = (tz + radius) / (2 * radius)
        const size = 28 + depth * 16
        const opacity = 0.4 + depth * 0.6

        return (
          <div
            key={item.name}
            className="absolute flex flex-col items-center gap-0.5 transition-none"
            style={{
              left: `calc(50% + ${tx}px)`,
              top: `calc(50% + ${ty}px)`,
              transform: 'translate(-50%, -50%)',
              zIndex: Math.round(depth * 10),
              opacity,
            }}
          >
            <div
              className="rounded-lg flex items-center justify-center font-bold"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                background: `${item.color}20`,
                border: `1px solid ${item.color}60`,
                color: item.color,
                fontSize: `${size * 0.45}px`,
                boxShadow: `0 0 ${size / 2}px ${item.color}30`,
              }}
            >
              {item.symbol}
            </div>
            {depth > 0.7 && (
              <span
                className="font-fira text-xs whitespace-nowrap"
                style={{ color: item.color, fontSize: '9px' }}
              >
                {item.name}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function SkillsSection() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [animatedLevels, setAnimatedLevels] = useState({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    skills.forEach((skill, i) => {
      setTimeout(() => {
        setAnimatedLevels((prev) => ({ ...prev, [skill.name]: skill.level }))
      }, i * 100)
    })
  }, [visible])

  const categories = [...new Set(skills.map((s) => s.category))]

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(191,0,255,0.02) 50%, transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className="text-center mb-20"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
          }}
        >
          <span className="font-fira text-sm" style={{ color: 'rgba(0,245,255,0.7)' }}>
            02. skills
          </span>
          <h2 className="font-orbitron text-4xl lg:text-5xl font-bold mt-3">
            <span className="gradient-text">Tech Arsenal</span>
          </h2>
          <div
            className="w-24 h-0.5 mx-auto mt-4 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, #bf00ff, transparent)' }}
          />
          <p className="mt-4 font-fira text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Drag the sphere to explore my tech stack
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: 3D Orb */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.8s ease 0.2s',
            }}
          >
            <SkillOrb />
          </div>

          {/* Right: Skill bars */}
          <div
            className="space-y-6"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.8s ease 0.3s',
            }}
          >
            {categories.map((cat) => (
              <div key={cat}>
                <h3
                  className="font-orbitron text-sm font-bold mb-4 flex items-center gap-2"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  <span
                    className="w-1 h-4 rounded-full"
                    style={{ background: cat === 'Frontend' ? '#00f5ff' : cat === 'Backend' ? '#bf00ff' : '#00ff88' }}
                  />
                  {cat}
                </h3>
                <div className="space-y-3">
                  {skills.filter((s) => s.category === cat).map((skill, i) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-fira text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                          {skill.name}
                        </span>
                        <span className="font-fira text-xs" style={{ color: skill.color }}>
                          {animatedLevels[skill.name] || 0}%
                        </span>
                      </div>
                      <div
                        className="h-1.5 rounded-full overflow-hidden"
                        style={{ background: 'rgba(255,255,255,0.06)' }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out relative"
                          style={{
                            width: `${animatedLevels[skill.name] || 0}%`,
                            background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`,
                            boxShadow: `0 0 8px ${skill.color}60`,
                            transitionDelay: `${i * 100}ms`,
                          }}
                        >
                          <div
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                              animation: 'shimmer 2s ease infinite',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
