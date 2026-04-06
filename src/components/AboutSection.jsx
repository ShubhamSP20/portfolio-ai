import { useEffect, useRef, useState } from 'react'

const codeLines = [
  { text: 'const developer = {', color: '#00f5ff' },
  { text: '  name: "Alex Dev",', color: 'rgba(255,255,255,0.8)' },
  { text: '  status: "Student & Developer",', color: 'rgba(255,255,255,0.8)' },
  { text: '  passion: ["coding", "design", "AI"],', color: '#00ff88' },
  { text: '  education: "CS Degree (In Progress)",', color: 'rgba(255,255,255,0.8)' },
  { text: '  openToWork: true,', color: '#bf00ff' },
  { text: '  coffee: Infinity,', color: '#ff6b35' },
  { text: '}', color: '#00f5ff' },
]

export default function AboutSection() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [typedLines, setTypedLines] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    let i = 0
    const interval = setInterval(() => {
      i++
      setTypedLines(i)
      if (i >= codeLines.length) clearInterval(interval)
    }, 300)
    return () => clearInterval(interval)
  }, [visible])

  return (
    <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* BG decoration */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(0,245,255,0.02) 50%, transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div
          className="text-center mb-20"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
          }}
        >
          <span className="font-fira text-sm" style={{ color: 'rgba(0,245,255,0.7)' }}>
            01. about
          </span>
          <h2 className="font-orbitron text-4xl lg:text-5xl font-bold mt-3">
            <span className="gradient-text">Who I Am</span>
          </h2>
          <div
            className="w-24 h-0.5 mx-auto mt-4 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, #00f5ff, transparent)' }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: About text */}
          <div
            className="space-y-6"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.8s ease 0.2s',
            }}
          >
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
              I&apos;m a passionate software development student on a mission to build
              the future of the web. I love crafting experiences that blend
              technical excellence with creative vision.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
              From 3D web experiences to intelligent backend systems, I thrive
              at the intersection of design and engineering. Every project is
              an opportunity to push boundaries.
            </p>

            {/* Traits */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: '⚡', label: 'Fast Learner' },
                { icon: '🎨', label: 'Creative Coder' },
                { icon: '🔧', label: 'Problem Solver' },
                { icon: '🚀', label: 'Goal Driven' },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{
                    background: 'rgba(0,245,255,0.04)',
                    border: '1px solid rgba(0,245,255,0.1)',
                  }}
                >
                  <span className="text-xl">{icon}</span>
                  <span className="font-fira text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Download CV button */}
            <button
              className="mt-4 px-6 py-3 rounded-full font-fira text-sm transition-all duration-300 hover:scale-105 relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(191,0,255,0.15))',
                border: '1px solid rgba(0,245,255,0.4)',
                color: '#00f5ff',
                boxShadow: '0 0 20px rgba(0,245,255,0.1)',
              }}
            >
              <span className="relative z-10">Download CV</span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.25), rgba(191,0,255,0.25))' }}
              />
            </button>
          </div>

          {/* Right: Code terminal */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.8s ease 0.4s',
            }}
          >
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: 'rgba(0,0,0,0.6)',
                border: '1px solid rgba(0,245,255,0.2)',
                boxShadow: '0 0 40px rgba(0,245,255,0.1)',
              }}
            >
              {/* Terminal header */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
                <span
                  className="ml-4 font-fira text-xs"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  developer.js
                </span>
              </div>

              {/* Code content */}
              <div className="p-6 font-fira text-sm leading-8">
                {codeLines.map((line, i) => (
                  <div
                    key={i}
                    className="flex gap-4"
                    style={{
                      opacity: i < typedLines ? 1 : 0,
                      transform: i < typedLines ? 'translateX(0)' : 'translateX(-10px)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <span style={{ color: 'rgba(255,255,255,0.2)', userSelect: 'none', minWidth: '24px' }}>
                      {i + 1}
                    </span>
                    <span style={{ color: line.color }}>{line.text}</span>
                  </div>
                ))}
                {/* Cursor */}
                <div className="flex gap-4 mt-1">
                  <span style={{ color: 'rgba(255,255,255,0.2)', minWidth: '24px' }}>
                    {codeLines.length + 1}
                  </span>
                  <span
                    className="inline-block w-2 h-5 rounded-sm"
                    style={{
                      background: '#00f5ff',
                      animation: 'blink-cursor 1s step-end infinite',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
